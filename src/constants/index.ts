/**
 * Application Constants
 * Centralized configuration values used throughout the app
 */

export const APP_CONFIG = {
  MAX_IMAGE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
  DEFAULT_LOGO_SIZE: 10,
  DEFAULT_LOGO_OPACITY: 0.8,
  DEFAULT_PATTERN_SIZE: 100,
} as const;

export const UI_CONFIG = {
  MAX_CONTAINER_WIDTH: 1400,
  HEADER_HEIGHT: 80,
  ANIMATION_DURATION: 300,
} as const;

export const THEME = {
  STORAGE_KEY: 'theme',
  DARK: 'dark',
  LIGHT: 'light',
} as const;
