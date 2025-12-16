import React, { useState } from 'react';

interface AIPanelProps {
  onClose: () => void;
}

const AIPanel: React.FC<AIPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'outline' | 'sources'>('summary');
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [summaryText, setSummaryText] = useState(
    'Bu rapor, 2024 mali yılı için öngörülen stratejik büyüme hedeflerini ve pazar analizlerini kapsamaktadır. Yapay zeka, belgenin %85\'inin finansal verilere odaklandığını tespit etmiştir.'
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setIsLoading(true);
    // Simulate AI delay
    setTimeout(() => {
        setSummaryText("Yenilenen Analiz: Belge, pazar payını artırmak için agresif bir strateji öneriyor. Anahtar kelimeler: Büyüme, Q3 Hedefleri ve Müşteri Memnuniyeti. Finansal tablolar istikrarlı bir yükselişe işaret ediyor.");
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1A202C] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-[2rem] overflow-hidden">
      {/* Handle */}
      <div className="w-full flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing" onClick={onClose}>
        <div className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2 text-primary bg-primary/10 p-2 rounded-full">
          <span className="material-symbols-outlined text-[24px]">stars</span>
        </div>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold tracking-tight">AI Asistanı</h2>
        <button 
          onClick={onClose}
          className="flex items-center justify-center text-primary hover:bg-primary/5 px-3 py-1 rounded-full font-bold text-sm transition-colors"
        >
          Bitti
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4">
        <div className="flex h-12 w-full items-center rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
          {['summary', 'outline', 'sources'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 h-full rounded-lg font-medium text-sm flex items-center justify-center transition-all ${
                activeTab === tab
                  ? 'bg-white dark:bg-gray-700 shadow-[0_1px_3px_rgba(0,0,0,0.1)] text-primary dark:text-blue-400 font-bold border border-gray-100 dark:border-transparent'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'summary' ? 'Özet' : tab === 'outline' ? 'Ana Hatlar' : 'Kaynaklar'}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-28 space-y-6">
        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="text-sm text-gray-500">Analiz ediliyor...</p>
            </div>
        ) : (
            <>
                {/* Headline */}
                <div className="flex justify-between items-end pt-2">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Özet Paneli</h3>
                <div className="flex items-center gap-1 text-xs font-medium text-gray-400 mb-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    ~30 sn. okuma
                </div>
                </div>

                {/* Summary Card */}
                <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-4 mb-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-2.5 rounded-xl shrink-0 text-primary">
                    <span className="material-symbols-outlined">description</span>
                    </div>
                    <div>
                    <h4 className="text-base font-bold text-gray-900 dark:text-white leading-tight">Otomatik Belge Analizi</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Tamamlandı
                    </p>
                    </div>
                </div>
                <div className="prose prose-sm prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    <p className="text-sm leading-7">
                        {summaryText}
                    </p>
                </div>
                <div className="flex gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button 
                        onClick={handleCopy}
                        className="flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                    <span className="material-symbols-outlined text-[18px]">{isCopied ? 'check' : 'content_copy'}</span>
                    {isCopied ? 'Kopyalandı' : 'Kopyala'}
                    </button>
                    <button 
                        onClick={() => setIsLiked(!isLiked)}
                        className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-colors ${isLiked ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                    >
                    <span className="material-symbols-outlined text-[18px]">{isLiked ? 'thumb_up_filled' : 'thumb_up'}</span>
                    Faydalı
                    </button>
                </div>
                </div>
            </>
        )}

        {/* Outline Teaser */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">Önemli Çıkarımlar</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm transition-transform active:scale-[0.99]">
              <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                <span className="material-symbols-outlined text-[20px]">trending_up</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Büyüme Hedefi</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">%15 Yıllık artış beklentisi</p>
              </div>
              <span className="material-symbols-outlined text-gray-300 dark:text-gray-600 text-[20px]">chevron_right</span>
            </div>
          </div>
        </div>
      </div>

       {/* Floating Action Button Area */}
       <div className="absolute bottom-0 left-0 w-full p-6 bg-white/90 dark:bg-[#1A202C]/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800">
        <button 
            onClick={handleRegenerate}
            disabled={isLoading}
            className="w-full h-14 bg-primary hover:bg-blue-700 active:scale-[0.98] transition-all rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3 text-white font-bold text-base group disabled:opacity-70"
        >
            <span className={`material-symbols-outlined transition-transform duration-500 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180'}`}>autorenew</span>
            {isLoading ? 'Oluşturuluyor...' : 'Yeniden Oluştur'}
        </button>
      </div>
    </div>
  );
};

export default AIPanel;