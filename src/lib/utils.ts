import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export const positions = {
  'top-left': { x: 0.1, y: 0.1 },
  'top-center': { x: 0.5, y: 0.1 },
  'top-right': { x: 0.9, y: 0.1 },
  'center-left': { x: 0.1, y: 0.5 },
  center: { x: 0.5, y: 0.5 },
  'center-right': { x: 0.9, y: 0.5 },
  'bottom-left': { x: 0.1, y: 0.9 },
  'bottom-center': { x: 0.5, y: 0.9 },
  'bottom-right': { x: 0.9, y: 0.9 },
} as const;

export type Position = keyof typeof positions;

export const patternPresets = {
  'diagonal': { rotation: 45, size: 50, offsetX: 20, offsetY: 20 },
  'grid': { rotation: 0, size: 80, offsetX: 0, offsetY: 0 },
  'scattered': { rotation: 15, size: 30, offsetX: 10, offsetY: 10 },
  'dense': { rotation: 0, size: 40, offsetX: 5, offsetY: 5 },
};

export function useTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  
  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
  };

  const set = (theme: 'dark' | 'light') => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  };

  return { isDark, toggle, set };
}