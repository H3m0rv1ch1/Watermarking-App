/**
 * Application Entry Point
 * Initializes the React app and theme
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { THEME } from './constants';

// Initialize theme from localStorage or system preference
const theme = localStorage.getItem(THEME.STORAGE_KEY) ?? 
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME.DARK : THEME.LIGHT);
document.documentElement.classList.toggle(THEME.DARK, theme === THEME.DARK);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);