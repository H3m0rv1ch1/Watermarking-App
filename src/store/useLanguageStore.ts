import { create } from 'zustand';
import { translations, type Language } from '../lib/i18n/translations';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en, ...args: any[]) => string;
}

export const useLanguageStore = create<LanguageStore>((set, get) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  t: (key, ...args) => {
    const { language } = get();
    const translation = translations[language][key];
    if (typeof translation === 'function') {
      return translation(...args);
    }
    return translation;
  }
}));