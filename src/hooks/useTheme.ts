/**
 * Theme Hook
 * Manages dark/light theme state and persistence
 */

import { THEME } from '../constants';

export function useTheme() {
  const isDark = document.documentElement.classList.contains(THEME.DARK);
  
  const toggle = () => {
    document.documentElement.classList.toggle(THEME.DARK);
    localStorage.setItem(THEME.STORAGE_KEY, isDark ? THEME.LIGHT : THEME.DARK);
  };

  const set = (theme: 'dark' | 'light') => {
    document.documentElement.classList.toggle(THEME.DARK, theme === THEME.DARK);
    localStorage.setItem(THEME.STORAGE_KEY, theme);
  };

  return { isDark, toggle, set };
}
