/**
 * Main Application Component
 * Handles the primary UI and orchestrates all features
 */

import { useState } from 'react';
import { Download, Moon, Sun, Upload, Sticker, Settings, Eye, X, ChevronDown } from 'lucide-react';

// Components
import { ImageDropzone, ImagePreview, LogoList } from './components';

// Stores
import { useImageStore, useLanguageStore } from './store';

// Hooks
import { useTheme } from './hooks';

function App() {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  
  const {
    images,
    logos,
    patternMode,
    addImages,
    addLogo,
    updateLogo,
    removeLogo,
    removeImage,
    setPatternMode,
    processImages,
  } = useImageStore();

  const { toggle: toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguageStore();

  const handleExport = async () => {
    const processedFiles = await processImages();
    
    processedFiles.forEach((file) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
      URL.revokeObjectURL(link.href);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors overflow-x-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-colors sticky top-6 z-50 rounded-3xl shadow-lg backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 my-6">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg">
                    <svg width="32" height="32" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="12" y="12" width="40" height="40" rx="4" fill="white" opacity="0.95"/>
                      <rect x="15" y="15" width="34" height="25" rx="2" fill="#E5E7EB"/>
                      <path d="M15 35 L22 28 L27 33 L32 25 L40 33 L49 25 L49 40 L15 40 Z" fill="#9CA3AF"/>
                      <path d="M27 33 L32 25 L40 33 L49 25 L49 40 L27 40 Z" fill="#6B7280"/>
                      <circle cx="42" cy="20" r="2.5" fill="#FCD34D"/>
                      <rect x="17" y="42" width="15" height="1.5" rx="0.75" fill="#D1D5DB"/>
                      <rect x="17" y="45" width="22" height="1.5" rx="0.75" fill="#D1D5DB"/>
                      <circle cx="45" cy="45" r="5" fill="white"/>
                      <path d="M45 41.5 L45 48.5 M41.5 45 L48.5 45" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {t('title')}
                  </h1>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Professional watermarking tool
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm font-medium border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                  >
                    <span>{language === 'en' ? 'English' : 'العربية'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isLangDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsLangDropdownOpen(false)}
                      />
                      <div className="absolute right-0 z-50 mt-2 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-xl p-1.5 min-w-[120px]">
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage('en');
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2.5 text-left font-medium transition-colors rounded-md ${
                            language === 'en'
                              ? 'bg-blue-500 text-white'
                              : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                          }`}
                        >
                          English
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setLanguage('ar');
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2.5 text-left font-medium transition-colors rounded-md ${
                            language === 'ar'
                              ? 'bg-blue-500 text-white'
                              : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                          }`}
                        >
                          العربية
                        </button>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-white dark:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all border-2 border-gray-200 dark:border-gray-600 shadow-sm"
                  aria-label="Toggle theme"
                >
                  <Sun className="w-5 h-5 text-gray-900 dark:text-white dark:hidden" />
                  <Moon className="w-5 h-5 text-gray-900 dark:text-white hidden dark:block" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Update all text content with translations */}
        <main className="pb-12">
        <div className="space-y-6 scroll-smooth">
          {/* Top Row - Upload Images and Add Logos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg">
                    <Upload className="w-5 h-5 text-white" />
                  </div>
                </div>
                Upload Images
              </h2>
              <ImageDropzone
                onDrop={addImages}
                multiple
                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
              {images.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    {images.length} image{images.length !== 1 && 's'} selected
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                    {images.map((image) => (
                      <div key={image.id} className="relative group">
                        <img 
                          src={image.dataUrl} 
                          alt={image.file.name}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        />
                        <button
                          onClick={() => removeImage(image.id)}
                          className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          aria-label="Delete image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded truncate">
                          {image.file.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg">
                    <Sticker className="w-5 h-5 text-white" />
                  </div>
                </div>
                Add Logos
              </h2>
              <ImageDropzone
                onDrop={(files) => addLogo(files[0])}
                multiple={false}
                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
            </section>
          </div>

          {/* Logo Settings Section */}
          {logos.length > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-30"></div>
                        <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      Logo Settings
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({logos.length} {logos.length === 1 ? 'logo' : 'logos'})
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setPatternMode(!patternMode)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all border-2 shadow-sm text-sm ${
                        patternMode
                          ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        patternMode
                          ? 'bg-white border-white'
                          : 'border-gray-300 dark:border-gray-500'
                      }`}>
                        {patternMode && (
                          <svg className="w-2.5 h-2.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span>Pattern Mode</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <LogoList
                    logos={logos.map(logo => ({
                      ...logo,
                      patternSize: logo.patternSize || 100,
                      patternRotation: logo.patternRotation || 0,
                      patternOffsetX: logo.patternOffsetX || 0,
                      patternOffsetY: logo.patternOffsetY || 0
                    }))}
                    patternMode={patternMode}  // Pass pattern mode from store
                    onLogoUpdate={updateLogo}
                    onLogoRemove={removeLogo}
                    onReorder={(newLogos) => {
                      logos.forEach((logo, i) => {
                        if (newLogos[i].id !== logo.id) {
                          updateLogo(newLogos[i].id, { ...newLogos[i] });
                        }
                      });
                    }}
                  />
                </div>
              </div>
            </section>
          )}

          {/* Preview Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-xl blur-md opacity-30"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-xl shadow-lg">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>
              Preview
            </h2>
            
            <ImagePreview />

            {images.length > 0 && logos.length > 0 && (
              <button
                onClick={handleExport}
                className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/20"
              >
                <Download className="w-5 h-5" />
                Export Images
              </button>
            )}
          </section>
        </div>
      </main>
      </div>
    </div>
  );
}

export default App;