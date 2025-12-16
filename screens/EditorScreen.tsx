import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AIInputModal from '../components/AIInputModal';
import ExportModal from '../components/ExportModal';
import { getDocumentById, saveDocument, createNewDocumentId } from '../utils/storage';
import { DocumentItem } from '../types';

const EditorScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [showAIModal, setShowAIModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  
  // Editor State
  const [docId, setDocId] = useState<string>('');
  const [title, setTitle] = useState('');
  
  // Style Preferences
  const [editorStyle, setEditorStyle] = useState({ fontSize: '16px', fontFamily: 'Inter' });
  
  // Formatting State
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    h1: false,
    h2: false,
    ul: false
  });

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Data
  useEffect(() => {
    // Load Settings
    const savedFontSize = localStorage.getItem('fontSize');
    const savedFontFamily = localStorage.getItem('fontFamily');
    setEditorStyle({
        fontSize: savedFontSize ? `${savedFontSize}px` : '16px',
        fontFamily: savedFontFamily === 'Serif' ? 'serif' : savedFontFamily === 'Monospace' ? 'monospace' : 'Inter, sans-serif'
    });

    if (id === 'new') {
      const newId = createNewDocumentId();
      setDocId(newId);
      setTitle('');
      if (editorRef.current) {
        editorRef.current.innerHTML = '<p>Buraya yazmaya başlayın...</p>';
      }
    } else if (id) {
      const existingDoc = getDocumentById(id);
      if (existingDoc) {
        setDocId(existingDoc.id);
        setTitle(existingDoc.title);
        if (editorRef.current) {
          editorRef.current.innerHTML = existingDoc.content;
        }
      } else {
        navigate('/dashboard');
      }
    }
  }, [id, navigate]);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleSave = () => {
    const content = editorRef.current?.innerHTML || '';
    const finalTitle = title.trim() || 'Adsız Belge';
    
    const docToSave: DocumentItem = {
      id: docId,
      title: finalTitle,
      content: content,
      lastModified: new Date().toISOString(),
      type: 'doc',
      icon: 'description',
      color: 'text-blue-600',
      isShared: false
    };

    saveDocument(docToSave);
    showToast('Belge kaydedildi!');
    
    if (id === 'new') {
        navigate(`/editor/${docId}`, { replace: true });
    }
  };

  // Check current selection formatting to update button states
  const updateToolbarState = () => {
    if (!document.getSelection()) return;
    
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      ul: document.queryCommandState('insertUnorderedList'),
      h1: document.queryCommandValue('formatBlock') === 'h1',
      h2: document.queryCommandValue('formatBlock') === 'h2',
    });
  };

  const executeCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateToolbarState();
  };

  // Trigger file input click
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection and insert as base64
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          // Insert image with style
          const html = `<img src="${result}" class="w-full rounded-xl my-4 shadow-sm" alt="Yüklenen Görsel" /><div><br></div>`;
          executeCommand('insertHTML', html);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Helper function to handle clicks on the main background
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      editorRef.current?.focus();
    }
  };

  const handleAIGenerated = (text: string) => {
    // Insert text at cursor or end
    const html = `<p>${text}</p>`;
    if (document.getSelection()?.rangeCount) {
        executeCommand('insertHTML', html);
    } else {
        if(editorRef.current) editorRef.current.innerHTML += html;
    }
    showToast("İçerik eklendi");
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 dark:bg-[#0f1115] overflow-hidden">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageSelect} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-in fade-in slide-in-from-top-5 duration-300">
            {notification}
        </div>
      )}

      {/* Top Bar */}
      <div className="sticky top-0 z-30 shrink-0 flex items-center justify-between bg-white px-4 py-3 shadow-sm dark:bg-[#1a202c] border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex size-10 items-center justify-center rounded-full text-slate-700 hover:bg-gray-100 active:scale-95 dark:text-slate-200 dark:hover:bg-white/10 transition-all"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
        </button>
        <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-white truncate max-w-[50%] text-center">
            {title || 'Adsız Belge'}
        </h2>
        <div className="flex items-center gap-1">
          <button 
             onClick={handleSave}
             className="flex size-10 items-center justify-center rounded-full text-primary hover:bg-primary/10 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px] fill-current">save</span>
          </button>
          <button 
             onClick={() => setShowExportModal(true)}
             className="flex size-10 items-center justify-center rounded-full text-slate-700 hover:bg-gray-100 active:scale-95 dark:text-slate-200 dark:hover:bg-white/10 transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">ios_share</span>
          </button>
          <button 
            onClick={() => setShowAIModal(true)}
            className="flex size-10 items-center justify-center rounded-full text-purple-600 bg-purple-50 hover:bg-purple-100 active:scale-95 dark:text-purple-300 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 transition-all"
          >
             <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-0 z-20 shrink-0 flex w-full items-center gap-1 overflow-x-auto bg-white px-4 py-2 dark:bg-[#1a202c] no-scrollbar border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <button 
          onClick={() => executeCommand('bold')}
          className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg transition-all ${activeFormats.bold ? 'bg-primary text-white' : 'bg-gray-50 text-slate-700 hover:bg-gray-100 hover:text-primary dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-gray-700'}`}
        >
          <span className="material-symbols-outlined text-[22px]">format_bold</span>
        </button>
        <button 
          onClick={() => executeCommand('italic')}
          className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg transition-all ${activeFormats.italic ? 'bg-primary text-white' : 'bg-gray-50 text-slate-700 hover:bg-gray-100 hover:text-primary dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-gray-700'}`}
        >
          <span className="material-symbols-outlined text-[22px]">format_italic</span>
        </button>
        <button 
          onClick={() => executeCommand('underline')}
          className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg transition-all ${activeFormats.underline ? 'bg-primary text-white' : 'bg-gray-50 text-slate-700 hover:bg-gray-100 hover:text-primary dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-gray-700'}`}
        >
          <span className="material-symbols-outlined text-[22px]">format_underlined</span>
        </button>
        <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
        <button 
          onClick={() => executeCommand('formatBlock', 'H1')}
          className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg transition-all ${activeFormats.h1 ? 'bg-primary text-white' : 'bg-gray-50 text-slate-700 hover:bg-gray-100 hover:text-primary dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-gray-700'}`}
        >
          <span className="font-bold text-sm">H1</span>
        </button>
        <button 
          onClick={() => executeCommand('formatBlock', 'H2')}
          className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg transition-all ${activeFormats.h2 ? 'bg-primary text-white' : 'bg-gray-50 text-slate-700 hover:bg-gray-100 hover:text-primary dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-gray-700'}`}
        >
          <span className="font-bold text-sm">H2</span>
        </button>
        <button 
          onClick={() => executeCommand('insertUnorderedList')}
          className={`flex h-10 min-w-[40px] items-center justify-center rounded-lg transition-all ${activeFormats.ul ? 'bg-primary text-white' : 'bg-gray-50 text-slate-700 hover:bg-gray-100 hover:text-primary dark:bg-gray-800 dark:text-slate-300 dark:hover:bg-gray-700'}`}
        >
          <span className="material-symbols-outlined text-[22px]">format_list_bulleted</span>
        </button>
        <div className="mx-1 h-6 w-px bg-gray-300 dark:bg-gray-700"></div>
        <button 
          onClick={handleImageButtonClick}
          className="flex h-10 min-w-[40px] items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>
        </button>
      </div>

      {/* Main Content Area - Scrollable Background */}
      <main 
        className="flex-1 overflow-y-auto w-full flex justify-center p-4 sm:p-8 cursor-text" 
        onClick={handleBackgroundClick}
      >
        {/* A4 Paper Container */}
        <div 
            className="relative w-full max-w-[210mm] min-h-[297mm] bg-white dark:bg-[#1e1e1e] shadow-lg shadow-gray-200/50 dark:shadow-black/50 mx-auto px-[25mm] py-[25mm] transition-all"
            style={{ height: 'fit-content' }}
            onClick={(e) => e.stopPropagation()} 
        >
            {/* Meta */}
            <div className="mb-8 flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
                      Taslak
                  </p>
                </div>
                <p className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  {new Date().toLocaleDateString('tr-TR')}
                </p>
            </div>

            {/* Editable Title */}
            <input 
              className="w-full bg-transparent border-none p-0 text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white placeholder:text-gray-300 focus:ring-0 mb-8" 
              placeholder="Başlık Girin"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
                 
            {/* Editable Content Area */}
            <div 
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="prose prose-lg prose-slate dark:prose-invert max-w-none outline-none text-slate-800 dark:text-slate-200 empty:before:content-['Yazmaya_başlayın...'] empty:before:text-gray-300"
              style={{ lineHeight: '1.6', minHeight: '150mm', ...editorStyle }}
              onKeyUp={updateToolbarState}
              onMouseUp={updateToolbarState}
              onClick={updateToolbarState}
            />
            
            {/* Bottom Padding within paper to simulate margin */}
            <div className="h-12"></div>
        </div>
        
        {/* Bottom spacer for scrolling */}
        <div className="h-24 w-full"></div>
      </main>

      {/* FAB - Edit Focus */}
      <div className="fixed bottom-6 right-6 z-20">
        <button 
          onClick={() => {
            if (editorRef.current) {
              editorRef.current.focus();
              updateToolbarState();
            }
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30 transition-transform active:scale-90 hover:scale-105"
        >
          <span className="material-symbols-outlined text-[28px]">edit</span>
        </button>
      </div>

      {/* Overlays */}
      {showAIModal && (
        <AIInputModal onClose={() => setShowAIModal(false)} onGenerate={handleAIGenerated} />
      )}

      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/40 backdrop-blur-sm">
             <ExportModal onClose={() => setShowExportModal(false)} />
        </div>
      )}

    </div>
  );
};

export default EditorScreen;