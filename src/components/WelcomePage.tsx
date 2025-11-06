/**
 * Welcome Page Component
 * Initial landing page with app introduction
 */

import { ArrowRight, Github } from 'lucide-react';
import { useLanguageStore } from '../store';

interface WelcomePageProps {
  onGetStarted: () => void;
}

export function WelcomePage({ onGetStarted }: WelcomePageProps) {
  const { t } = useLanguageStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-4xl w-full">
        {/* Main Content */}
        <div className="text-center space-y-6 sm:space-y-8">
          {/* App Icon */}
          <div className="flex justify-center mb-4 sm:mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl">
                <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-20 sm:h-20">
                  <rect x="12" y="12" width="40" height="40" rx="4" fill="white" opacity="0.95"/>
                  <rect x="15" y="15" width="34" height="25" rx="2" fill="#E5E7EB"/>
                  <path d="M15 35 L22 28 L27 33 L32 25 L40 33 L49 25 L49 40 L15 40 Z" fill="#9CA3AF"/>
                  <path d="M27 33 L32 25 L40 33 L49 25 L49 40 L27 40 Z" fill="#6B7280"/>
                  <circle cx="42" cy="20" r="2.5" fill="#FCD34D"/>
                  <rect x="17" y="42" width="15" height="1.5" rx="0.75" fill="#D1D5DB"/>
                  <rect x="17" y="45" width="22" height="1.5" rx="0.75" fill="#D1D5DB"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3 sm:space-y-4 px-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto px-4">
            Add professional watermarks to your images in batch. 
            Fast, easy, and powerful watermarking tool for all your needs.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto mt-8 sm:mt-12 px-2">
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Fast Processing</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Process multiple images at once</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎨</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Customizable</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Full control over watermark style</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🌍</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 text-sm sm:text-base">Multi-Language</h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Available in 7 languages</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-12 px-4 sm:px-0">
            <button
              onClick={onGetStarted}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg shadow-blue-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
              href="https://github.com/H3m0rv1ch1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              Developer
            </a>
          </div>

          {/* Footer */}
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-8 sm:mt-12 px-4">
            Made with ❤️ by H3m0rv1ch1
          </p>
        </div>
      </div>
    </div>
  );
}
