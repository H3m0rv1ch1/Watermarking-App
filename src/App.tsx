import React from 'react';
import { ImageDropzone } from './components/ImageDropzone';
import { LogoList } from './components/LogoList';
import { ImagePreview } from './components/ImagePreview';
import { useImageStore } from './store/useImageStore';
import { Download, Image as ImageIcon, Moon, Sun } from 'lucide-react';
import { useTheme } from './lib/utils';
import { useLanguageStore } from './store/useLanguageStore';

function App() {
  const {
    images,
    logos,
    patternMode,
    addImages,
    addLogo,
    updateLogo,
    removeLogo,
    setPatternMode,
    processImages,
  } = useImageStore();

  const { isDark, toggle: toggleTheme } = useTheme();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <header className="bg-white dark:bg-gray-800 shadow-lg transition-colors sticky top-0 z-10 rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-lg">
                <ImageIcon className="w-8 h-8 text-blue-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('title')}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
                className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 text-sm"
              >
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gray-200" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Update all text content with translations */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Top Row - Upload Images and Add Logos */}
          <div className="grid grid-cols-2 gap-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Upload Images
              </h2>
              <ImageDropzone
                onDrop={addImages}
                multiple
                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              />
              {images.length > 0 && (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  {images.length} image{images.length !== 1 && 's'} selected
                </p>
              )}
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
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
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Logo Settings
                    </h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({logos.length} {logos.length === 1 ? 'logo' : 'logos'})
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-3 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={patternMode}
                        onChange={(e) => setPatternMode(e.target.checked)}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium">Pattern Mode</span>
                    </label>
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
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
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
  );
}

export default App;