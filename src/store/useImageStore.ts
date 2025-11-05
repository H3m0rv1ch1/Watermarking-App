import { create } from 'zustand';
import { Position, loadImage, positions, readFileAsDataURL } from '../lib/utils';

interface Logo {
  id: string;
  file: File;
  dataUrl: string;
  position: Position;
  size: number;
  opacity: number;
  x: number;
  y: number;
}

interface ImageStore {
  images: { file: File; dataUrl: string }[];
  logos: Logo[];
  patternMode: boolean;
  addImages: (files: FileList) => Promise<void>;
  addLogo: (file: File) => Promise<void>;
  updateLogo: (id: string, updates: Partial<Logo>) => void;
  removeLogo: (id: string) => void;
  setPatternMode: (enabled: boolean) => void;
  processImages: () => Promise<File[]>;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  logos: [],
  patternMode: false,

  addImages: async (files) => {
    const newImages = await Promise.all(
      Array.from(files).map(async (file) => ({
        file,
        dataUrl: await readFileAsDataURL(file),
      }))
    );
    set((state) => ({ images: [...state.images, ...newImages] }));
  },

  addLogo: async (file) => {
    const dataUrl = await readFileAsDataURL(file);
    const logo: Logo = {
      id: Math.random().toString(36).slice(2),
      file,
      dataUrl,
      position: 'bottom-right',
      size: 10,
      opacity: 0.8,
      x: positions['bottom-right'].x,
      y: positions['bottom-right'].y,
    };
    set((state) => ({ logos: [...state.logos, logo] }));
  },

  updateLogo: (id, updates) => {
    set((state) => ({
      logos: state.logos.map((logo) =>
        logo.id === id ? { ...logo, ...updates } : logo
      ),
    }));
  },

  removeLogo: (id) => {
    set((state) => ({
      logos: state.logos.filter((logo) => logo.id !== id),
    }));
  },

  setPatternMode: (enabled) => {
    set({ patternMode: enabled });
  },

  processImages: async () => {
    const { images, logos, patternMode } = get();
    const processedFiles: File[] = [];

    for (const image of images) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      const img = await loadImage(image.dataUrl);
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      for (const logo of logos) {
        const logoImg = await loadImage(logo.dataUrl);
        
        if (patternMode) {
          ctx.save();
          ctx.globalAlpha = logo.opacity;
          
          const baseSize = Math.min(canvas.width, canvas.height) * 0.1;
          const patternSize = (logo.patternSize || 100) / 100 * baseSize;
          
          const patternCanvas = document.createElement('canvas');
          const patternCtx = patternCanvas.getContext('2d')!;
          
          patternCanvas.width = patternSize;
          patternCanvas.height = patternSize * (logoImg.height / logoImg.width);
          
          patternCtx.drawImage(logoImg, 0, 0, patternCanvas.width, patternCanvas.height);
          
          const pattern = ctx.createPattern(patternCanvas, 'repeat')!;
          
          const matrix = new DOMMatrix();
          matrix.translateSelf(
            (logo.patternOffsetX || 0) + canvas.width / 2,
            (logo.patternOffsetY || 0) + canvas.height / 2
          );
          matrix.rotateSelf((logo.patternRotation || 0));
          matrix.translateSelf(-canvas.width / 2, -canvas.height / 2);
          
          pattern.setTransform(matrix);
          
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.restore();
        } else {
          const logoWidth = (img.width * logo.size) / 100;
          const logoHeight = (logoWidth / logoImg.width) * logoImg.height;
          
          ctx.globalAlpha = logo.opacity;
          const x = logo.x * img.width - logoWidth / 2;
          const y = logo.y * img.height - logoHeight / 2;
          ctx.drawImage(logoImg, x, y, logoWidth, logoHeight);
        }
      }

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), image.file.type);
      });

      if (blob) {
        const fileName = `watermarked_${image.file.name}`;
        processedFiles.push(new File([blob], fileName, { type: image.file.type }));
      }
    }

    return processedFiles;
  },
}));