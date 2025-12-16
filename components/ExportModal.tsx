import React, { useState } from 'react';

interface ExportModalProps {
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'DOCX' | 'HTML'>('PDF');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
        setIsExporting(false);
        // In a real app, this would trigger a download
        alert(`${selectedFormat} dosyası başarıyla dışa aktarıldı ve indirildi.`);
        onClose();
    }, 1500);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-50 flex flex-col max-h-[90vh] bg-background-light dark:bg-background-dark rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300">
       {/* Drag Handle Area */}
      <div className="pt-4 pb-2 flex justify-center w-full cursor-grab active:cursor-grabbing" onClick={onClose}>
        <div className="h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
      
      {/* Header Section */}
      <div className="px-6 pt-2 pb-4 text-center">
        <h3 className="text-gray-900 dark:text-white text-2xl font-bold leading-tight tracking-tight mb-2">Belgeyi Dışa Aktar</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed">
            Belgenizi kaydetmek için uygun bir format seçin.
        </p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-4">
        {/* Format Selection Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
            {/* PDF Option */}
            <button 
                onClick={() => setSelectedFormat('PDF')}
                className={`group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 shadow-glow ${selectedFormat === 'PDF' ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-transparent bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'}`}
            >
                {selectedFormat === 'PDF' && (
                    <div className="absolute top-2 right-2 text-primary opacity-100 transform scale-100 transition-all">
                        <span className="material-symbols-outlined text-[20px] font-bold">check_circle</span>
                    </div>
                )}
                <div className="h-12 w-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl text-red-500">picture_as_pdf</span>
                </div>
                <span className={`${selectedFormat === 'PDF' ? 'text-primary' : 'text-gray-600 dark:text-gray-300'} font-bold text-sm`}>PDF</span>
            </button>

            {/* DOCX Option */}
            <button 
                onClick={() => setSelectedFormat('DOCX')}
                className={`group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 shadow-glow ${selectedFormat === 'DOCX' ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-transparent bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'}`}
            >
                {selectedFormat === 'DOCX' && (
                    <div className="absolute top-2 right-2 text-primary opacity-100 transform scale-100 transition-all">
                        <span className="material-symbols-outlined text-[20px] font-bold">check_circle</span>
                    </div>
                )}
                <div className="h-12 w-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl text-blue-600 dark:text-blue-400">description</span>
                </div>
                <span className={`${selectedFormat === 'DOCX' ? 'text-primary' : 'text-gray-600 dark:text-gray-300'} font-bold text-sm`}>DOCX</span>
            </button>

             {/* HTML Option */}
             <button 
                onClick={() => setSelectedFormat('HTML')}
                className={`group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 shadow-glow ${selectedFormat === 'HTML' ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-transparent bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-600'}`}
            >
                {selectedFormat === 'HTML' && (
                    <div className="absolute top-2 right-2 text-primary opacity-100 transform scale-100 transition-all">
                        <span className="material-symbols-outlined text-[20px] font-bold">check_circle</span>
                    </div>
                )}
                <div className="h-12 w-12 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl text-orange-500">html</span>
                </div>
                <span className={`${selectedFormat === 'HTML' ? 'text-primary' : 'text-gray-600 dark:text-gray-300'} font-bold text-sm`}>HTML</span>
            </button>
        </div>

        {/* Settings */}
        <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <span className="material-symbols-outlined text-xl">comment</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-white text-sm font-semibold">Yorumları Dahil Et</span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">Belgedeki notlar da aktarılır.</span>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>
            
             <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700/50">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        <span className="material-symbols-outlined text-xl">compress</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-white text-sm font-semibold">Dosyayı Sıkıştır</span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">Dosya boyutu küçültülür.</span>
                    </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
            </div>
        </div>
      </div>

       {/* Footer */}
       <div className="p-6 pt-2 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
            <button 
                className="flex w-full items-center justify-center gap-2 rounded-xl h-14 bg-primary text-white text-base font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed" 
                onClick={handleExport}
                disabled={isExporting}
            >
                {isExporting ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                        <span>Hazırlanıyor...</span>
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined">ios_share</span>
                        <span>Dışa Aktar ({selectedFormat})</span>
                    </>
                )}
            </button>
            <button 
                className="mt-4 w-full text-center text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-gray-800 dark:hover:text-gray-200 transition-colors" 
                onClick={onClose}
                disabled={isExporting}
            >
                İptal
            </button>
       </div>
    </div>
  );
};

export default ExportModal;