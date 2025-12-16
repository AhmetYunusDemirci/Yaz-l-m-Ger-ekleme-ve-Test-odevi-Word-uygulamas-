import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();

  // State Management
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontFamily, setFontFamily] = useState<string>('Inter');
  const [autoSave, setAutoSave] = useState<boolean>(true);
  const [spellCheck, setSpellCheck] = useState<boolean>(false);

  // Load Settings
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as any || 'system';
    const savedFontSize = localStorage.getItem('fontSize');
    const savedFontFamily = localStorage.getItem('fontFamily');

    setTheme(savedTheme);
    if (savedFontSize) setFontSize(parseInt(savedFontSize));
    if (savedFontFamily) setFontFamily(savedFontFamily);
  }, []);

  // Apply Theme Logic
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark' || (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSaveSettings = () => {
    localStorage.setItem('fontSize', fontSize.toString());
    localStorage.setItem('fontFamily', fontFamily);
    // Simulate save success
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 px-6 py-4 backdrop-blur-md dark:bg-background-dark/95 border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex size-10 items-center justify-center rounded-full text-slate-700 hover:bg-black/5 active:scale-95 dark:text-slate-200 dark:hover:bg-white/10 transition-all"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl">
             <span className="material-symbols-outlined text-gray-900 dark:text-white text-[28px]">settings</span>
        </div>
        <div className="size-10"></div> {/* Spacer */}
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-6 pb-24">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Ayarlar</h1>
            <p className="text-gray-500 dark:text-gray-400">Görünümü, yazı tiplerini ve çalışma tercihlerinizi buradan yönetebilirsiniz.</p>
        </div>

        {/* Theme Selection */}
        <section className="mb-8">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 pl-1">Görünüm</h2>
            <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Tema Seçimi</h3>
                <div className="grid grid-cols-3 gap-3">
                    <button 
                        onClick={() => handleThemeChange('light')}
                        className={`flex flex-col items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'}`}
                    >
                        <span className="material-symbols-outlined text-[28px]">light_mode</span>
                        <span className="text-sm font-bold">Açık</span>
                    </button>
                    <button 
                        onClick={() => handleThemeChange('dark')}
                        className={`flex flex-col items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'}`}
                    >
                        <span className="material-symbols-outlined text-[28px]">dark_mode</span>
                        <span className="text-sm font-bold">Koyu</span>
                    </button>
                    <button 
                        onClick={() => handleThemeChange('system')}
                        className={`flex flex-col items-center justify-center gap-3 py-4 rounded-2xl border-2 transition-all ${theme === 'system' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400'}`}
                    >
                        <span className="material-symbols-outlined text-[28px]">settings_brightness</span>
                        <span className="text-sm font-bold">Sistem</span>
                    </button>
                </div>
            </div>
        </section>

        {/* Editor Settings */}
        <section className="mb-8">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 pl-1">Editör</h2>
            <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-gray-800 space-y-6">
                
                {/* Font Family */}
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">Yazı Tipi</h3>
                    <div className="relative">
                        <select 
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 text-gray-800 dark:text-gray-200 font-medium appearance-none focus:ring-2 focus:ring-primary/50"
                        >
                            <option value="Inter">Inter (Varsayılan)</option>
                            <option value="Serif">Serif</option>
                            <option value="Monospace">Monospace</option>
                        </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                             <span className="material-symbols-outlined">expand_more</span>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-gray-700"></div>

                {/* Font Size */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-gray-900 dark:text-white">Yazı Boyutu</h3>
                        <span className="bg-blue-100 dark:bg-blue-900 text-primary dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-md">{fontSize} px</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-400">Aa</span>
                        <input 
                            type="range" 
                            min="12" 
                            max="24" 
                            step="1" 
                            value={fontSize}
                            onChange={(e) => setFontSize(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary"
                        />
                         <span className="text-lg font-bold text-gray-400">Aa</span>
                    </div>
                </div>
            </div>
        </section>

         {/* General Settings */}
         <section className="mb-8">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 pl-1">Genel</h2>
            <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-soft border border-gray-100 dark:border-gray-800 divide-y divide-gray-100 dark:divide-gray-800">
                
                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
                             <span className="material-symbols-outlined">save</span>
                        </div>
                        <div>
                             <h4 className="font-bold text-gray-900 dark:text-white text-sm">Otomatik Kaydetme</h4>
                             <p className="text-xs text-gray-500 dark:text-gray-400">Değişiklikleri anında yedekle</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={autoSave}
                            onChange={() => setAutoSave(!autoSave)}
                        />
                        <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                             <span className="material-symbols-outlined">spellcheck</span>
                        </div>
                        <div>
                             <h4 className="font-bold text-gray-900 dark:text-white text-sm">Yazım Denetimi</h4>
                             <p className="text-xs text-gray-500 dark:text-gray-400">Hataları vurgula</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={spellCheck}
                            onChange={() => setSpellCheck(!spellCheck)}
                        />
                        <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                </div>

            </div>
        </section>

      </main>

      <div className="sticky bottom-0 p-6 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
          <button 
            onClick={handleSaveSettings}
            className="w-full h-14 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
              <span className="material-symbols-outlined">check</span>
              Kaydet
          </button>
      </div>

    </div>
  );
};

export default SettingsScreen;