/**
 * Utility Functions
 * Helper functions used throughout the application
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import heic2any from 'heic2any';

/**
 * Merges Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Checks if a file is HEIC/HEIF format
 */
export function isHeicFile(file: File): boolean {
  const heicExtensions = ['.heic', '.heif'];
  const heicMimeTypes = ['image/heic', 'image/heif', 'image/heic-sequence', 'image/heif-sequence'];
  
  const fileName = file.name.toLowerCase();
  const hasHeicExtension = heicExtensions.some(ext => fileName.endsWith(ext));
  const hasHeicMimeType = heicMimeTypes.includes(file.type.toLowerCase());
  
  return hasHeicExtension || hasHeicMimeType;
}

/**
 * Converts HEIC/HEIF image to JPEG
 */
export async function convertHeicToJpeg(file: File): Promise<File> {
  try {
    const convertedBlob = await heic2any({
      blob: file,
      toType: 'image/jpeg',
      quality: 0.9
    });

    // heic2any can return Blob or Blob[], handle both cases
    const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
    
    // Create a new file with .jpg extension
    const newFileName = file.name.replace(/\.(heic|heif)$/i, '.jpg');
    return new File([blob], newFileName, { type: 'image/jpeg' });
  } catch (error) {
    console.error('HEIC conversion failed:', error);
    throw new Error('Failed to convert HEIC image. Please try a different image format.');
  }
}

/**
 * Reads a file and converts it to a Data URL
 * Automatically converts HEIC/HEIF files to JPEG
 */
export async function readFileAsDataURL(file: File): Promise<string> {
  // Convert HEIC to JPEG if needed
  let processedFile = file;
  if (isHeicFile(file)) {
    processedFile = await convertHeicToJpeg(file);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(processedFile);
  });
}

/**
 * Loads an image from a source URL
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Logo position presets with normalized coordinates (0-1)
 */
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

/**
 * Pattern mode presets for quick watermark configurations
 */
export const patternPresets = {
  'diagonal': { rotation: 45, size: 50, offsetX: 20, offsetY: 20 },
  'grid': { rotation: 0, size: 80, offsetX: 0, offsetY: 0 },
  'scattered': { rotation: 15, size: 30, offsetX: 10, offsetY: 10 },
  'dense': { rotation: 0, size: 40, offsetX: 5, offsetY: 5 },
};