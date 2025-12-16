import React, { useState } from 'react';

interface AIInputModalProps {
  onClose: () => void;
  onGenerate: (text: string) => void;
}

const AIInputModal: React.FC<AIInputModalProps> = ({ onClose, onGenerate }) => {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI delay
    setTimeout(() => {
        setIsGenerating(false);
        onGenerate(inputText); // In a real app, this would be the AI result
        onClose();
    }, 2000);
  };

  const handleQuickCommand = (command: string) => {
    const commands: Record<string, string> = {
        summarize: "Aşağıdaki metni özetle: ",
        draft: "Şu konuda bir taslak oluştur: ",
        rewrite: "Bu metni daha profesyonel bir dille yeniden yaz: ",
        fix: "Metindeki dilbilgisi hatalarını düzelt."
    };
    setInputText(commands[command] || '');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1A202C] rounded-[2rem] shadow-2xl overflow-hidden scale-100 animate-in zoom-in-95 duration-200 border border-white/20">
        
        {/* Header with gradient glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none"></div>
        
        <div className="relative p-6 pb-2">
            <div className="flex justify-between items-start mb-6">
                 <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="material-symbols-outlined text-gray-500">close</span>
                </button>
                <div className="flex flex-col items-center">
                    <div className="size-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30 mb-3">
                        <span className="material-symbols-outlined text-white text-[32px]">auto_awesome</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Asistanına Sor</h2>
                </div>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <span className="material-symbols-outlined text-gray-500">history</span>
                </button>
            </div>

            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6 px-4">
                İçerik oluşturmak, metinleri özetlemek veya düzenlemek için yapay zekadan yardım alın.
            </p>

            {/* Input Area */}
            <div className="relative group">
                <textarea 
                    className="w-full h-32 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none text-gray-800 dark:text-gray-200 placeholder:text-gray-400 transition-all text-base"
                    placeholder="Metninizi buraya girin veya ne yapmak istediğinizi yazın..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                ></textarea>
                <div className="absolute bottom-3 left-3 flex gap-2">
                     <button className="p-1.5 rounded-lg text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">mic</span>
                     </button>
                     <button className="p-1.5 rounded-lg text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">attach_file</span>
                     </button>
                </div>
                <span className="absolute bottom-4 right-4 text-xs font-bold text-purple-400/50">PRO</span>
            </div>
        </div>

        {/* Quick Commands */}
        <div className="px-6 py-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Hızlı Komutlar</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                <button onClick={() => handleQuickCommand('summarize')} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 hover:bg-orange-100 dark:hover:bg-orange-900/20 border border-orange-100 dark:border-transparent transition-colors shrink-0">
                    <div className="size-8 rounded-lg bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <span className="material-symbols-outlined text-[18px]">summarize</span>
                    </div>
                    <div className="text-left">
                        <span className="block text-sm font-bold text-gray-800 dark:text-gray-200">Özet Çıkar</span>
                        <span className="block text-[10px] text-gray-500">Uzun metinleri kısalt</span>
                    </div>
                </button>
                
                 <button onClick={() => handleQuickCommand('draft')} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20 border border-green-100 dark:border-transparent transition-colors shrink-0">
                    <div className="size-8 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600 dark:text-green-400">
                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                    </div>
                    <div className="text-left">
                        <span className="block text-sm font-bold text-gray-800 dark:text-gray-200">Taslak Oluştur</span>
                        <span className="block text-[10px] text-gray-500">Blog veya rapor yaz</span>
                    </div>
                </button>
            </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 flex gap-3">
             <button 
                onClick={onClose}
                className="flex-1 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
             >
                İptal
             </button>
             <button 
                onClick={handleGenerate}
                disabled={!inputText.trim() || isGenerating}
                className="flex-[2] h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
             >
                {isGenerating ? (
                    <>
                        <div className="animate-spin size-5 border-2 border-white/30 border-t-white rounded-full"></div>
                        <span>Oluşturuluyor...</span>
                    </>
                ) : (
                    <>
                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                        <span>Oluştur</span>
                    </>
                )}
             </button>
        </div>
      </div>
    </div>
  );
};

export default AIInputModal;