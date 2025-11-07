/**
 * Welcome Page Component
 * Initial landing page with app introduction
 */

import { ArrowRight, ArrowLeft, Github, Sun, Moon, Menu, X } from 'lucide-react';
import { useLanguageStore } from '../store';
import { languageNames } from '../lib/i18n/translations';
import { useTheme } from '../hooks';
import { useState } from 'react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export function WelcomePage({ onGetStarted }: WelcomePageProps) {
  const { t, language, setLanguage } = useLanguageStore();
  const { isDark, set: setTheme } = useTheme();
  const [isDarkLocal, setIsDarkLocal] = useState(isDark);
  const [menuOpen, setMenuOpen] = useState(false);

  // Short, uppercase labels to match segmented pill aesthetic
  const langShort: Record<keyof typeof languageNames, string> = {
    en: 'EN',
    ar: 'AR',
    es: 'ES',
    fr: 'FR',
    de: 'DE',
    zh: 'ZH',
    ja: 'JA'
  };

  // Map app languages to preview images placed in /public
  const langImageMap: Record<string, string> = {
    en: 'IMG.png', // default image for English
    ar: 'AR.png',
    es: 'ES.png',
    fr: 'FR.png',
    de: 'DE.png',
    zh: 'CH.png',
    ja: 'JP.png'
  };
  const previewImg = '/' + (langImageMap[language] || 'IMG.png');
  const authorName = 'H3m0rv1ch1';
  const madeWithText = useLanguageStore.getState().t('madeWithBy', authorName);
  const madeWithParts = madeWithText.split(authorName);
  const ArrowDir = language === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen relative overflow-hidden">
      {/* Background is now provided globally on body for perfect consistency */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-10 sm:pb-16 relative">
        {/* Desktop header restored: theme switcher (left), centered logo, language switcher (right) */}
        {/* Theme (desktop) */}
        <div className="hidden sm:flex absolute top-4 left-4 items-center gap-1.5 bg-white/70 dark:bg-gray-800/60 backdrop-blur rounded-full px-2 py-1 border border-gray-200 dark:border-gray-700 shadow-sm">
          <button
            type="button"
            title="Light"
            onClick={() => { setTheme('light'); setIsDarkLocal(false); }}
            className={`h-7 px-2 rounded-full flex items-center justify-center transition-all ${
              !isDarkLocal
                ? 'bg-blue-600 text-white ring-1 ring-blue-400 shadow-sm'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            title="Dark"
            onClick={() => { setTheme('dark'); setIsDarkLocal(true); }}
            className={`h-7 px-2 rounded-full flex items-center justify-center transition-all ${
              isDarkLocal
                ? 'bg-blue-600 text-white ring-1 ring-blue-400 shadow-sm'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Centered logo (desktop) */}
        <div className="hidden sm:flex absolute top-4 left-1/2 -translate-x-1/2 items-center bg-white/70 dark:bg-gray-800/60 backdrop-blur rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700 shadow-sm">
          <img src="/icon.svg" alt="App Logo" className="w-6 h-6" />
        </div>

        {/* Language (desktop) */}
        <div dir="ltr" className="hidden sm:flex absolute top-4 right-4 items-center gap-1.5 bg-white/70 dark:bg-gray-800/60 backdrop-blur rounded-full px-2 py-1 border border-gray-200 dark:border-gray-700 shadow-sm">
          {(Object.keys(languageNames) as Array<keyof typeof languageNames>).map((langKey) => (
            <button
              key={langKey}
              type="button"
              title={languageNames[langKey].native}
              onClick={() => setLanguage(langKey)}
              className={`h-7 px-2 rounded-full flex items-center justify-center text-[11px] uppercase tracking-wide font-medium transition-all ${
                language === langKey
                  ? 'bg-blue-600 text-white ring-1 ring-blue-400 shadow-sm'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {langShort[langKey]}
            </button>
          ))}
        </div>
        {/* Mobile header: left logo + right hamburger menu */}
        <div className="sm:hidden absolute top-2 left-0 right-0 px-4 z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: app logo */}
            <div className="flex items-center bg-white/70 dark:bg-gray-800/60 backdrop-blur rounded-full px-2 sm:px-3 py-1 border border-gray-200 dark:border-gray-700 shadow-sm">
              <img src="/icon.svg" alt="App Logo" className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            {/* Right: hamburger */}
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex items-center gap-2 bg-white/70 dark:bg-gray-800/60 backdrop-blur rounded-full px-2 sm:px-3 py-1 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-white/80 dark:hover:bg-gray-800/70"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>

          {/* Dropdown panel */}
          {menuOpen && (
            <>
              {/* click-away overlay */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              {/* Dropdown panel with pointer */}
              <div className="absolute top-12 right-4 sm:right-6 z-20 w-[min(92vw,420px)]">
                <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-gray-200 dark:ring-gray-700 p-4">
                  {/* Pointer caret refined for better look */}
                  <div className="absolute -top-3 right-6 w-4 h-3 bg-white/95 dark:bg-gray-900/95 ring-1 ring-gray-200 dark:ring-gray-700 shadow-sm [clip-path:polygon(50%_0,0_100%,100%_100%)]" />
                  <div className="flex flex-col gap-4">
                    {/* Theme toggle (segmented icons) */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('theme') ?? (isDarkLocal ? 'Dark' : 'Light')}</span>
                      <div className="flex items-center gap-1.5 bg-gray-100/80 dark:bg-gray-800/80 rounded-full px-1.5 py-1 ring-1 ring-gray-200 dark:ring-gray-700">
                        <button
                          type="button"
                          aria-pressed={!isDarkLocal}
                          title="Light"
                          onClick={() => { setTheme('light'); setIsDarkLocal(false); }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            !isDarkLocal
                              ? 'bg-blue-600 text-white ring-1 ring-blue-400 shadow-sm'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700'
                          }`}
                        >
                          <Sun className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          aria-pressed={isDarkLocal}
                          title="Dark"
                          onClick={() => { setTheme('dark'); setIsDarkLocal(true); }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            isDarkLocal
                              ? 'bg-blue-600 text-white ring-1 ring-blue-400 shadow-sm'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700'
                          }`}
                        >
                          <Moon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Language switcher (wrapped chips, fixed LTR order) */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{t('language')}</span>
                      <div dir="ltr" className="flex flex-wrap items-center justify-center gap-1.5 bg-gray-100/80 dark:bg-gray-800/80 rounded-full px-2 py-2 ring-1 ring-gray-200 dark:ring-gray-700">
                        {(Object.keys(languageNames) as Array<keyof typeof languageNames>).map((langKey) => (
                          <button
                            key={langKey}
                            type="button"
                            title={languageNames[langKey].native}
                            onClick={() => setLanguage(langKey)}
                            className={`h-7 px-2.5 rounded-full flex items-center justify-center text-[11px] uppercase tracking-wide font-medium transition-all ${
                              language === langKey
                                ? 'bg-blue-600 text-white ring-1 ring-blue-400 shadow-sm'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700'
                            }`}
                          >
                            {langShort[langKey]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Hero */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Hero content */}
          <div className="space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 shadow-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse" />
              {t('subtitle')}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              {t('welcomeDescription')}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 shadow-sm">
                <span className="font-medium">Formats</span>
                <span>{t('formatsHint')}</span>
              </span>
              <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-full px-3 py-1 text-xs sm:text-sm border border-blue-200 dark:border-blue-700 shadow-sm">
                {t('logos')}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="group w-full sm:w-auto px-6 sm:px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-base shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {t('getStarted')}
                <ArrowDir className={`w-5 h-5 transition-transform ${language === 'ar' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </button>
              <a
                href="https://github.com/H3m0rv1ch1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-7 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold text-base border border-gray-200 dark:border-gray-700 transition-all flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" />
                {t('developer')}
              </a>
            </div>
          </div>

          {/* Visual preview card */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-pink-500/20 blur-2xl rounded-3xl transition-opacity group-hover:opacity-90" />
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden transition-transform group-hover:scale-[1.01]">
              <div className="p-4 sm:p-6">
                {/* Mock toolbar */}
                <div className="flex items-center justify-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                </div>
                {/* Mock canvas */}
                <div className="relative overflow-hidden aspect-[13/9] sm:aspect-[18/9] rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  {/* Insert preview image from public folder */}
                  <img
                    src={previewImg}
                    alt={`Preview ${language}`}
                    className="absolute inset-0 w-full h-full object-contain md:object-cover object-center select-none"
                  />
                  {/* Removed the top-left "Upload Images" preview label */}
                  {/* Removed the top-right "Add Logos" preview label */}
                  {/* Removed the "Export Images" preview pill */}
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mt-20 sm:mt-24">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-5 px-2 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <span className="text-base sm:text-lg md:text-xl">🖼️</span>
              {t('uploadImages')}
            </span>
            <ArrowDir className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
            <span className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <span className="text-base sm:text-lg md:text-xl">⚙️</span>
              {t('logoSettings')}
            </span>
            <ArrowDir className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
            <span className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <span className="text-base sm:text-lg md:text-xl">⬇️</span>
              {t('exportImages')}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto mt-20 sm:mt-28 px-2">
          <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">⚡</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">{t('featureFastTitle')}</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('featureFastDesc')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎨</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">{t('featureCustomTitle')}</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('featureCustomDesc')}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🌍</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">{t('featureMultiTitle')}</h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t('featureMultiDesc')}</p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-10 sm:mt-14 text-center">
          {madeWithParts[0]}
          <a
            href="https://github.com/H3m0rv1ch1"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
          >
            {authorName}
          </a>
          {madeWithParts[1] ?? ''}
        </p>

        {/* Mobile footer controls removed per request */}
      </div>
    </div>
  );
}
