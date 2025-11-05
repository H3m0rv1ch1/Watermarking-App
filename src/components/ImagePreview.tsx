import React from 'react';
import { useImageStore } from '../store/useImageStore';
import { loadImage } from '../lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ImagePreview() {
  const { images, logos, patternMode } = useImageStore();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [previewIndex, setPreviewIndex] = React.useState(0);

  React.useEffect(() => {
    const renderPreview = async () => {
      if (!canvasRef.current || !images.length) return;

      const canvas = canvasRef.current;
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
          
          // Create a pattern buffer for better quality
          const patternCanvas = document.createElement('canvas');
          const patternCtx = patternCanvas.getContext('2d')!;
          
          // Set pattern canvas size
          patternCanvas.width = patternSize;
          patternCanvas.height = patternSize * (logoImg.height / logoImg.width);
          
          // Draw logo in pattern canvas
          patternCtx.drawImage(logoImg, 0, 0, patternCanvas.width, patternCanvas.height);
          
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

    renderPreview();
  }, [images, logos, patternMode, previewIndex]);

  if (!images.length) {
    return (
      <div className="aspect-video bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500">
        No images selected
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => setPreviewIndex((i) => Math.max(0, i - 1))}
          disabled={previewIndex === 0}
          className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {previewIndex + 1} of {images.length}
        </span>
        <button
          onClick={() => setPreviewIndex((i) => Math.min(images.length - 1, i + 1))}
          disabled={previewIndex === images.length - 1}
          className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-700"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}