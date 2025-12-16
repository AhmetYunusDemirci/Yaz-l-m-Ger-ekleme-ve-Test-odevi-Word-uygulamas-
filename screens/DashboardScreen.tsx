import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DocumentItem } from '../types';
import { getDocuments } from '../utils/storage';

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'folder' | 'shared'>('all');

  // Load documents on mount
  useEffect(() => {
    const docs = getDocuments();
    setDocuments(docs);
  }, []);

  // Filter Logic
  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = 
      activeFilter === 'all' ? true :
      activeFilter === 'folder' ? doc.type === 'folder' :
      activeFilter === 'shared' ? doc.isShared === true : true;
    
    return matchesSearch && matchesType;
  });

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md transition-all duration-300">
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                alt="User" 
                className="size-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD54fxYToT_Ivq33yUyqlS4iPSxoYIXaoSIvjJmJR3j7HiGuScz14JMa7ZKUZXxZ8v8VpW3uF11WIp_jq5zDCSrf57L0ODz2YPDu6Y2MWIpMQAhcR4Ue7J5_tJR-pQeSLRp8b60vmcVcnC0pMD5_1910QVv5sF7ddvtjlL-_OQB3qHSFSk5tPkZDXnYEqwrB_gTMF2Pkl9PY3Ibb-A7if5duErz631r6Ng6P-0fNS_So_pFILkMijv5Ut1TW0kVZKLnkWRfhawMxt0" 
              />
              <div className="absolute bottom-0 right-0 size-2.5 bg-green-500 rounded-full border-2 border-white dark:border-background-dark"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-text-sub dark:text-gray-400">Tekrar Hoş Geldin,</span>
              <h1 className="text-lg font-bold leading-tight text-text-main dark:text-white">Ahmet Yılmaz</h1>
            </div>
          </div>
          <button className="relative p-2 rounded-full bg-white dark:bg-surface-dark text-text-main dark:text-white shadow-soft hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-2 right-2.5 size-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Search */}
      <section className="px-6 mb-6">
        <label className="group flex items-center w-full h-14 rounded-2xl bg-white dark:bg-surface-dark shadow-soft transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-glow overflow-hidden cursor-text">
          <div className="pl-4 pr-3 text-primary">
            <span className="material-symbols-outlined text-[24px]">search</span>
          </div>
          <input 
            className="w-full h-full bg-transparent border-none text-base text-text-main dark:text-white placeholder:text-text-sub focus:ring-0 p-0 font-medium" 
            placeholder="Belgelerinizi Arayın..." 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="p-2 text-gray-400">
               <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
          <button className="pr-4 pl-2 text-text-sub dark:text-gray-400">
            <span className="material-symbols-outlined text-[24px]">tune</span>
          </button>
        </label>
      </section>

      {/* Filters */}
      <section className="mb-8">
        <div className="px-6 flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-text-main dark:text-white">Hızlı Erişim</h3>
          <button className="text-primary text-sm font-semibold hover:underline">Düzenle</button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-6 pb-4 no-scrollbar snap-x">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`snap-start shrink-0 flex items-center gap-2 h-10 px-5 rounded-full shadow-lg transition-transform active:scale-95 ${activeFilter === 'all' ? 'bg-primary text-white shadow-primary/30' : 'bg-white dark:bg-surface-dark text-text-main dark:text-gray-200 hover:border-primary/30 border border-transparent dark:border-gray-700'}`}
          >
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            <span className="text-sm font-semibold">Tümü</span>
          </button>
          <button 
            onClick={() => setActiveFilter('folder')}
            className={`snap-start shrink-0 flex items-center gap-2 h-10 px-5 rounded-full shadow-lg transition-transform active:scale-95 ${activeFilter === 'folder' ? 'bg-primary text-white shadow-primary/30' : 'bg-white dark:bg-surface-dark text-text-main dark:text-gray-200 hover:border-primary/30 border border-transparent dark:border-gray-700'}`}
          >
            <span className={`material-symbols-outlined text-[20px] ${activeFilter === 'folder' ? 'text-white' : 'text-yellow-500'}`}>folder</span>
            <span className="text-sm font-medium">Klasörler</span>
          </button>
          <button 
            onClick={() => setActiveFilter('shared')}
            className={`snap-start shrink-0 flex items-center gap-2 h-10 px-5 rounded-full shadow-lg transition-transform active:scale-95 ${activeFilter === 'shared' ? 'bg-primary text-white shadow-primary/30' : 'bg-white dark:bg-surface-dark text-text-main dark:text-gray-200 hover:border-primary/30 border border-transparent dark:border-gray-700'}`}
          >
            <span className={`material-symbols-outlined text-[20px] ${activeFilter === 'shared' ? 'text-white' : 'text-blue-400'}`}>people</span>
            <span className="text-sm font-medium">Paylaşılanlar</span>
          </button>
        </div>
      </section>

      {/* Recent Docs */}
      <section className="px-6 mb-8">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-bold text-text-main dark:text-white tracking-tight">Son Belgeler</h3>
          <button className="text-sm font-semibold text-primary flex items-center gap-0.5 hover:gap-1 transition-all">
            Tümünü Gör 
            <span className="material-symbols-outlined text-[16px]">arrow_forward_ios</span>
          </button>
        </div>
        
        {filteredDocs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
             <span className="material-symbols-outlined text-[48px] mb-2">sentiment_dissatisfied</span>
             <p>Belge bulunamadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredDocs.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => navigate(`/editor/${doc.id}`)}
                className="group relative flex flex-col bg-white dark:bg-surface-dark rounded-2xl p-3 shadow-soft border border-transparent hover:border-primary/20 transition-all active:scale-[0.98] cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  {doc.thumbnail ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-90 transition-transform duration-500 group-hover:scale-110" 
                      style={{ backgroundImage: `url('${doc.thumbnail}')` }}
                    ></div>
                  ) : (
                    <span className={`material-symbols-outlined text-[48px] ${doc.color} opacity-50`}>{doc.icon}</span>
                  )}
                  
                  <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/60 backdrop-blur-sm p-1.5 rounded-lg">
                    <span className={`material-symbols-outlined text-[18px] ${doc.color} block`}>{doc.icon}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h4 className="font-bold text-sm text-text-main dark:text-white truncate">{doc.title}</h4>
                  <p className="text-xs text-text-sub dark:text-gray-400 font-medium">{formatDate(doc.lastModified)}</p>
                </div>
                <button className="absolute bottom-3 right-3 p-1 rounded-full text-text-sub hover:bg-gray-100 dark:hover:bg-gray-700 z-10">
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FAB */}
      <button 
        onClick={() => navigate('/editor/new')}
        className="fixed z-30 bottom-24 right-6 size-14 rounded-full bg-primary text-white shadow-lg shadow-primary/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 active:bg-blue-700"
      >
        <span className="material-symbols-outlined text-[32px]">add</span>
      </button>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full z-40 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800 pb-safe">
        <div className="flex justify-around items-center h-20 px-2 pb-2">
          <button onClick={() => navigate('/')} className="flex flex-col items-center gap-1 p-2 min-w-[64px] text-text-sub hover:text-primary transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[28px]">home</span>
            <span className="text-[10px] font-medium">Ana Sayfa</span>
          </button>
          <button onClick={() => { setActiveFilter('all'); window.scrollTo({top:0, behavior:'smooth'}); }} className="flex flex-col items-center gap-1 p-2 min-w-[64px] text-primary transition-colors group cursor-pointer">
            <span className="material-symbols-outlined text-[28px] fill-current group-hover:scale-110 transition-transform">folder_open</span>
            <span className="text-[10px] font-semibold">Dosyalar</span>
          </button>
          <button onClick={() => { setActiveFilter('shared'); window.scrollTo({top:0, behavior:'smooth'}); }} className="flex flex-col items-center gap-1 p-2 min-w-[64px] text-text-sub dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group cursor-pointer">
            <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform">share</span>
            <span className="text-[10px] font-medium">Paylaşılan</span>
          </button>
          <button onClick={() => navigate('/settings')} className="flex flex-col items-center gap-1 p-2 min-w-[64px] text-text-sub dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors group cursor-pointer">
            <span className="material-symbols-outlined text-[28px] group-hover:scale-110 transition-transform">settings</span>
            <span className="text-[10px] font-medium">Ayarlar</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DashboardScreen;