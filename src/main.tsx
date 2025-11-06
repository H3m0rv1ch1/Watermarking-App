/**
 * Application Entry Point
 * Initializes the React app and theme
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { THEME } from './constants';

// Force reset to light theme as default (remove this line after first load if needed)
localStorage.setItem(THEME.STORAGE_KEY, THEME.LIGHT);

// Initialize theme from localStorage or default to light theme
const theme = localStorage.getItem(THEME.STORAGE_KEY) ?? THEME.LIGHT;
document.documentElement.classList.toggle(THEME.DARK, theme === THEME.DARK);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);