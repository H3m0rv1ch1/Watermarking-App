/**
 * Shared TypeScript Types
 * Common type definitions used across the application
 */

export type Position = 
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface Logo {
  id: string;
  file: File;
  dataUrl: string;
  position: Position;
  size: number;
  opacity: number;
  x: number;
  y: number;
  patternSize?: number;
  patternRotation?: number;
  patternOffsetX?: number;
  patternOffsetY?: number;
}

export interface ImageFile {
  id: string;
  file: File;
  dataUrl: string;
}

export type Language = 'en' | 'ar';

export type Theme = 'light' | 'dark';
