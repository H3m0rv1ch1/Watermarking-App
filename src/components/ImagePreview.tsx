import React from 'react';
import { useImageStore } from '../store/useImageStore';
import { loadImage } from '../lib/utils';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { useLanguageStore } from '../store';

export function ImagePreview() {
  const { images, logos, patternMode } = useImageStore();
  const { t } = useLanguageStore();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const fullscreenCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const [previewIndex, setPreviewIndex] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [zoom, setZoom] = React.useState(1);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = React.useState<{ x: number; y: number } | null>(null);
  const [initialPinchDistance, setInitialPinchDistance] = React.useState<number | null>(null);
  const [initialPinchZoom, setInitialPinchZoom] = React.useState(1);

  React.useEffect(() => {
    const renderPreview = async (canvas: HTMLCanvasElement | null) => {
      if (!canvas || !images.length) return;

      const ctx = canvas.getContext('2d')!;

      const img = await loadImage(images[previewIndex].dataUrl);
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      for (const logo of logos) {
        const logoImg = await loadImage(logo.dataUrl);
        
        if (patternMode) {
          ctx.save();
          ctx.globalAlpha = logo.opacity;
          
          // Calculate optimal pattern size based on image dimensions
          const baseSize = Math.min(canvas.width, canvas.height) * 0.1; // 10% of smallest dimension
          const patternSize = (logo.patternSize || 100) / 100 * baseSize;
          const spacingX = (logo.patternSpacingX || 0) / 100 * baseSize;
          const spacingY = (logo.patternSpacingY || 0) / 100 * baseSize;
          
          // Create a pattern buffer for better quality
          const patternCanvas = document.createElement('canvas');
          const patternCtx = patternCanvas.getContext('2d')!;
          
          // Compute tile size including spacing
          const logoTileWidth = patternSize;
          const logoTileHeight = patternSize * (logoImg.height / logoImg.width);
          patternCanvas.width = Math.max(1, logoTileWidth + spacingX);
          patternCanvas.height = Math.max(1, logoTileHeight + spacingY);

          // Draw logo centered within tile to create spacing around
          const drawX = spacingX / 2;
          const drawY = spacingY / 2;
          patternCtx.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
          patternCtx.drawImage(logoImg, drawX, drawY, logoTileWidth, logoTileHeight);
          
          // Create pattern with the optimized logo
          const pattern = ctx.createPattern(patternCanvas, 'repeat')!;
          
          // Create pattern transform matrix
          const matrix = new DOMMatrix();
          matrix.translateSelf(
            (logo.patternOffsetX || 0) + canvas.width / 2,
            (logo.patternOffsetY || 0) + canvas.height / 2
          );
          matrix.rotateSelf((logo.patternRotation || 0));
          matrix.translateSelf(-canvas.width / 2, -canvas.height / 2);
          
          // Apply transform to pattern
          pattern.setTransform(matrix);
          
          // Fill with pattern
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.restore();
        } else {
          const logoWidth = (img.width * logo.size) / 100;
          const logoHeight = (logoWidth / logoImg.width) * logoImg.height;
          
          ctx.globalAlpha = logo.opacity;
          
          if (patternMode) {
            const pattern = ctx.createPattern(logoImg, 'repeat')!;
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          } else {
            const x = logo.x * img.width - logoWidth / 2;
            const y = logo.y * img.height - logoHeight / 2;
            ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
          }
        }
      }
    };

    renderPreview(canvasRef.current);
    if (isFullscreen) {
      renderPreview(fullscreenCanvasRef.current);
    }
  }, [images, logos, patternMode, previewIndex, isFullscreen]);

  // Reset zoom when changing images or closing fullscreen
  React.useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [previewIndex, isFullscreen]);

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 5));
  };

  // Handle mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch zoom (pinch) and pan
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch to zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      setInitialPinchDistance(distance);
      setInitialPinchZoom(zoom);
    } else if (e.touches.length === 1 && zoom > 1) {
      // Single touch pan when zoomed
      setTouchStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance) {
      // Pinch zoom
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
      const scale = distance / initialPinchDistance;
      setZoom(Math.min(Math.max(initialPinchZoom * scale, 0.5), 5));
    } else if (e.touches.length === 1 && touchStart && zoom > 1) {
      // Pan when zoomed
      e.preventDefault();
      setPosition({ 
        x: e.touches[0].clientX - touchStart.x, 
        y: e.touches[0].clientY - touchStart.y 
      });
    }
  };

  const handleTouchEnd = () => {
    setInitialPinchDistance(null);
    setTouchStart(null);
  };

  // Zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.3, 5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.3, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!images.length) {
    return (
      <div className="aspect-video bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
        {t('noImages')}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div 
          className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group cursor-pointer"
          onClick={() => setIsFullscreen(true)}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-gray-800/90 rounded-full p-3 shadow-lg">
              <ZoomIn className="w-6 h-6 text-gray-900 dark:text-white" />
            </div>
          </div>
        </div>
      
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setPreviewIndex((i) => Math.max(0, i - 1))}
          disabled={previewIndex === 0}
          className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('previous')}
        </button>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {previewIndex + 1} {t('of')} {images.length}
        </span>
        <button
          onClick={() => setPreviewIndex((i) => Math.min(images.length - 1, i + 1))}
          disabled={previewIndex === images.length - 1}
          className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700"
        >
          {t('next')}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Fullscreen Modal */}
    {isFullscreen && (
      <div 
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
        onClick={() => setIsFullscreen(false)}
      >
        {/* Top controls bar */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-4">
          {/* Zoom controls */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-3 py-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4 text-white" />
            </button>
            <div className="text-xs text-white text-center min-w-[45px] font-medium">
              {Math.round(zoom * 100)}%
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4 text-white" />
            </button>
            <div className="w-px h-5 bg-white/20" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleResetZoom();
              }}
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Reset zoom"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        
        {/* Canvas container with zoom and pan */}
        <div 
          className="max-w-full max-h-full w-full h-full flex items-center justify-center overflow-hidden touch-none"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => e.stopPropagation()}
        >
          <canvas
            ref={fullscreenCanvasRef}
            className="max-w-full max-h-full object-contain shadow-2xl transition-transform"
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
            }}
          />
        </div>

        {/* Navigation in fullscreen */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreviewIndex((i) => Math.max(0, i - 1));
              }}
              disabled={previewIndex === 0}
              className="p-2 hover:bg-white/20 rounded-full disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-sm font-medium text-white min-w-[80px] text-center">
              {previewIndex + 1} / {images.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPreviewIndex((i) => Math.min(images.length - 1, i + 1));
              }}
              disabled={previewIndex === images.length - 1}
              className="p-2 hover:bg-white/20 rounded-full disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>
    )}
    </>
  );
}