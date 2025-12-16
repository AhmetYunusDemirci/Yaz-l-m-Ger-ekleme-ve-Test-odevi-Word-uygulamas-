import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-screen w-full max-w-md mx-auto flex-col overflow-x-hidden shadow-2xl bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="flex items-center justify-between p-5 pt-8 sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <button className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="h-1 w-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div className="size-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-6 pb-24">
        <div className="flex flex-col items-center pt-4 pb-8">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary shadow-soft">
            <span className="material-symbols-outlined text-[36px]">description</span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-[32px] font-extrabold leading-tight text-center tracking-tight">
            Uygulamaya<br />Hoş Geldiniz
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed mt-3 text-center px-2">
            Modern ve güçlü araçlarla belgelerinizi yönetmeye, düzenlemeye ve paylaşmaya hemen başlayın.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col gap-4">
          <div 
            onClick={() => navigate('/editor/new')}
            className="group flex gap-4 rounded-2xl border border-transparent bg-card-light dark:bg-card-dark p-5 shadow-soft hover:shadow-md hover:border-primary/20 transition-all duration-300 items-start cursor-pointer active:scale-[0.98]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20 text-primary">
              <span className="material-symbols-outlined text-[24px]">note_add</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Yeni Bir Belge Oluşturun</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                Temiz bir sayfada düşüncelerinizi özgürce yazmaya başlayın.
              </p>
            </div>
          </div>

          <div className="group flex gap-4 rounded-2xl border border-transparent bg-card-light dark:bg-card-dark p-5 shadow-soft hover:shadow-md hover:border-primary/20 transition-all duration-300 items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">AI Destekli Özetler Alın</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                Yapay zeka asistanı ile uzun metinleri saniyeler içinde özetleyin.
              </p>
            </div>
          </div>

          <div className="group flex gap-4 rounded-2xl border border-transparent bg-card-light dark:bg-card-dark p-5 shadow-soft hover:shadow-md hover:border-primary/20 transition-all duration-300 items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400">
              <span className="material-symbols-outlined text-[24px]">ios_share</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Belgelerinizi Dışa Aktarın</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                Çalışmalarınızı PDF veya Word formatında kolayca paylaşın.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Bottom CTA */}
      <div className="sticky bottom-0 left-0 right-0 p-6 pt-0 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark z-20">
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full flex cursor-pointer items-center justify-center rounded-xl h-14 px-5 bg-primary hover:bg-primary-dark text-white text-[17px] font-semibold leading-normal tracking-wide shadow-lg shadow-primary/30 active:scale-[0.98] transition-all duration-200"
        >
          <span className="mr-2">Hemen Başlayın</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;