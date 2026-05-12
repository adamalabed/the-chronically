import React, { useState, useEffect } from 'react';
import { Moon, Sun, Edit3, Trash2, Plus, ArrowLeft, Lock, LogOut } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE CONNECTION ---
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const UI_TEXT = {
  en: {
    by: "by",
    admin: "Admin",
    back: "Back",
    publishedOn: "Published on",
    editorsDesk: "Editor's Desk",
    newEntry: "New Entry",
    cancel: "Cancel",
    headline: "Headline...",
    categoriesLabel: "Categories",
    fmtGuide: "Formatting guide:",
    fmtDesc: "Use **text** for bold, *text* for italic, and start a paragraph with > for a beautifully styled blockquote.",
    writeHere: "Write your entry here...",
    publish: "Publish Entry",
    restricted: "Restricted Area",
    passcode: "Passcode",
    incorrect: "Incorrect passcode.",
    unlock: "Unlock",
    deletePrompt: "Are you sure you want to delete this piece?"
  },
  ru: {
    by: "от",
    admin: "Админ",
    back: "Назад",
    publishedOn: "Опубликовано",
    editorsDesk: "Стол редактора",
    newEntry: "Новая запись",
    cancel: "Отмена",
    headline: "Заголовок...",
    categoriesLabel: "Категории",
    fmtGuide: "Форматирование:",
    fmtDesc: "Используйте **текст** для жирного, *текст* для курсива, и начинайте абзац с > для цитаты.",
    writeHere: "Напишите вашу запись здесь...",
    publish: "Опубликовать",
    restricted: "Закрытая зона",
    passcode: "Код доступа",
    incorrect: "Неверный код.",
    unlock: "Войти",
    deletePrompt: "Вы уверены, что хотите удалить эту запись?"
  }
};

const AVAILABLE_CATEGORIES = [
  'Philosophy', 'Psychology', 'Life', 'Productivity', 
  'Self-Improvement', 'Relationships', 'Communication', 
  'Music', 'Art', 'Culture'
];

// --- TEXT PARSER ---
const renderText = (content, isDark) => {
  if (!content) return null;
  const blocks = content.split('\n\n');
  
  return blocks.map((block, index) => {
    let html = block
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Handle blockquotes
    if (block.startsWith('> ')) {
      html = html.substring(2);
      return (
        <blockquote 
          key={index} 
          className={`border-l-4 pl-6 py-2 my-10 text-2xl italic ${isDark ? 'border-gray-300 text-gray-200' : 'border-gray-800 text-gray-800'}`}
          style={{ fontFamily: "'Playfair Display', serif" }}
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      );
    }

    // Handle regular paragraphs
    return (
      <p 
        key={index} 
        className={`mb-8 text-lg md:text-xl leading-relaxed tracking-wide ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  });
};

export default function App() {
  // --- STATE ---
  const [articles, setArticles] = useState([]); // Starts empty, awaits Supabase
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('home'); 
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState('en');
  
  // Auth & Admin state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Editor state
  const [editorTitle, setEditorTitle] = useState('');
  const [editorCategories, setEditorCategories] = useState([]);
  const [editorContent, setEditorContent] = useState('');

  // --- EFFECTS ---
  useEffect(() => {
    // Load Google Fonts dynamically
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Amarante&family=Ballet&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Fetch articles from Supabase when the app loads
    fetchArticles();

    return () => document.head.removeChild(link);
  }, []);

  // --- DATABASE HANDLERS ---
  const fetchArticles = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false }); // Prioritizes newest
    
    if (error) {
      console.error("Error fetching articles:", error);
    } else {
      setArticles(data);
    }
    setIsLoading(false);
  };

  const deleteArticle = async (id) => {
    if (window.confirm(UI_TEXT[lang].deletePrompt)) {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error("Error deleting article:", error);
        alert("Failed to delete article. Please try again.");
      } else {
        setArticles(articles.filter(a => a.id !== id));
      }
    }
  };

  const saveArticle = async () => {
    if (!editorTitle.trim() || !editorContent.trim()) {
      alert("Title and content cannot be empty.");
      return;
    }

    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    if (activeArticleId) {
      // UPDATE
      const { error } = await supabase
        .from('articles')
        .update({ 
          title: editorTitle, 
          categories: editorCategories,
          content: editorContent 
        })
        .eq('id', activeArticleId);
        
      if (error) {
        console.error("Error updating article:", error);
        alert("Failed to update. Please try again.");
        return;
      }
    } else {
      // INSERT
      const { error } = await supabase
        .from('articles')
        .insert([{ 
          title: editorTitle, 
          categories: editorCategories,
          content: editorContent, 
          date: today 
        }]);
        
      if (error) {
        console.error("Error saving new article:", error);
        alert("Failed to publish. Please try again.");
        return;
      }
    }

    // Refresh data and redirect back to admin view
    await fetchArticles();
    setView('admin');
  };

  // --- UI HANDLERS ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'admin') {
      setIsAuthenticated(true);
      setShowLoginModal(false);
      setPasswordInput('');
      setLoginError(false);
      setView('admin');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('home');
  };

  const openArticle = (id) => {
    setActiveArticleId(id);
    setView('article');
    window.scrollTo(0, 0);
  };

  const createNewArticle = () => {
    setActiveArticleId(null);
    setEditorTitle('');
    setEditorCategories([]);
    setEditorContent('');
    setView('editor');
  };

  const editArticle = (id) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      setActiveArticleId(article.id);
      setEditorTitle(article.title);
      setEditorCategories(article.categories || []);
      setEditorContent(article.content);
      setView('editor');
    }
  };

  const activeArticle = articles.find(a => a.id === activeArticleId);

  // --- RENDERERS ---
  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark bg-[#121212] text-gray-100' : 'bg-[#FAFAFA] text-gray-900'}`} style={{ fontFamily: "'Lora', serif" }}>
      
      {/* Header / Masthead */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 flex flex-col items-center relative">
        <div className="absolute top-8 right-6 flex items-center space-x-4">
          {isAuthenticated && (
            <button onClick={() => setView('admin')} className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity font-sans">
              {UI_TEXT[lang].admin}
            </button>
          )}
        </div>

        {/* Updated Title Block */}
        <div className="flex flex-col items-center cursor-pointer group" onClick={() => {setView('home'); fetchArticles();}}>
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-black text-center tracking-tight group-hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Amarante', serif" }}
          >
            The Chronically
          </h1>
        </div>

        <div className={`w-full h-[1px] mt-10 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-6 pb-24 min-h-[60vh]">
        
        {/* VIEW: HOME (Article List) */}
        {view === 'home' && (
          <div className="space-y-16 sm:space-y-20 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {isLoading ? (
              <p className="text-center italic opacity-50 mt-20">Loading archive...</p>
            ) : articles.length === 0 ? (
              <p className="text-center italic opacity-50 mt-20">No entries yet. Unlock the restricted area to publish.</p>
            ) : (
              articles.map(article => (
                <article key={article.id} className="group cursor-pointer" onClick={() => openArticle(article.id)}>
                  <p className={`text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-sans font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {article.date}{article.categories && article.categories.length > 0 ? ` / ${article.categories.join(', ')}` : ''}
                  </p>
                  <h2 
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 group-hover:opacity-70 transition-opacity leading-tight ${isDark ? 'text-white' : 'text-black'}`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {article.title}
                  </h2>
                  <p className={`text-base sm:text-lg leading-relaxed line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {article.content.replace(/[*|>]/g, '').substring(0, 220)}...
                  </p>
                </article>
              ))
            )}
          </div>
        )}

        {/* VIEW: SINGLE ARTICLE */}
        {view === 'article' && activeArticle && (
          <article className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
              onClick={() => setView('home')}
              className="flex items-center text-sm uppercase tracking-widest mb-12 sm:mb-16 opacity-60 hover:opacity-100 transition-opacity font-sans"
            >
              <ArrowLeft size={16} className="mr-2" /> {UI_TEXT[lang].back}
            </button>
            
            <header className="mb-10 sm:mb-14 text-center">
              <p className={`text-xs sm:text-sm uppercase tracking-widest mb-4 sm:mb-6 font-sans font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {UI_TEXT[lang].publishedOn} {activeArticle.date}{activeArticle.categories && activeArticle.categories.length > 0 ? ` / ${activeArticle.categories.join(', ')}` : ''}
              </p>
              <h1 
                className={`text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-8 sm:mb-10 ${isDark ? 'text-white' : 'text-black'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {activeArticle.title}
              </h1>
              <div className={`w-16 h-[2px] mx-auto ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
            </header>
            
            <div className="article-body max-w-2xl mx-auto">
              {renderText(activeArticle.content, isDark)}
            </div>
          </article>
        )}

        {/* VIEW: ADMIN DASHBOARD */}
        {view === 'admin' && isAuthenticated && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className={`flex justify-between items-center mb-12 border-b pb-6 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>{UI_TEXT[lang].editorsDesk}</h2>
              <div className="flex space-x-2 sm:space-x-4">
                <button 
                  onClick={createNewArticle}
                  className={`flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded font-sans text-xs sm:text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  <Plus size={16} className="mr-1 sm:mr-2" /> {UI_TEXT[lang].newEntry}
                </button>
                <button 
                  onClick={handleLogout}
                  className={`p-2 sm:p-2.5 rounded border transition-colors ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
                  title="Log out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {articles.map(article => (
                <div key={article.id} className={`p-4 sm:p-6 rounded-lg flex justify-between items-center border transition-colors ${isDark ? 'border-gray-800 bg-[#1A1A1A] hover:border-gray-700' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                  <div className="pr-4">
                    <h3 className="text-lg sm:text-xl font-bold font-serif mb-1 sm:mb-2 line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{article.title}</h3>
                    <p className={`text-xs sm:text-sm font-sans uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{article.date}</p>
                  </div>
                  <div className="flex space-x-1 sm:space-x-2 shrink-0">
                    <button 
                      onClick={() => editArticle(article.id)}
                      className={`p-2 sm:p-3 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteArticle(article.id)}
                      className={`p-2 sm:p-3 rounded-full transition-colors ${isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30' : 'text-red-400 hover:text-red-600 hover:bg-red-50'}`}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW: ARTICLE EDITOR */}
        {view === 'editor' && isAuthenticated && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <button 
              onClick={() => setView('admin')}
              className="flex items-center text-sm uppercase tracking-widest mb-10 opacity-60 hover:opacity-100 transition-opacity font-sans"
            >
              <ArrowLeft size={16} className="mr-2" /> {UI_TEXT[lang].cancel}
            </button>

            <input
              type="text"
              placeholder={UI_TEXT[lang].headline}
              value={editorTitle}
              onChange={(e) => setEditorTitle(e.target.value)}
              className={`w-full text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-transparent border-none outline-none placeholder-opacity-30 placeholder-gray-500`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            />
            
            <div className="mb-8">
              <p className={`text-xs sm:text-sm uppercase tracking-widest mb-3 font-sans font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {UI_TEXT[lang].categoriesLabel}
              </p>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_CATEGORIES.map(cat => {
                  const isSelected = editorCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        if (isSelected) setEditorCategories(editorCategories.filter(c => c !== cat));
                        else setEditorCategories([...editorCategories, cat]);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-sans tracking-wide transition-colors border ${
                        isSelected 
                          ? (isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black') 
                          : (isDark ? 'bg-transparent text-gray-400 border-gray-700 hover:border-gray-500' : 'bg-transparent text-gray-500 border-gray-300 hover:border-gray-400')
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`mb-8 p-4 sm:p-5 rounded border text-xs sm:text-sm font-sans ${isDark ? 'bg-[#1A1A1A] border-gray-800 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <strong>{UI_TEXT[lang].fmtGuide}</strong> {UI_TEXT[lang].fmtDesc}
            </div>

            <textarea
              placeholder={UI_TEXT[lang].writeHere}
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className={`w-full h-[50vh] sm:h-[60vh] bg-transparent border-none outline-none text-lg sm:text-xl leading-relaxed resize-none placeholder-opacity-30 placeholder-gray-500 font-serif`}
            />

            <div className={`flex justify-end mt-8 border-t pt-8 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <button 
                onClick={saveArticle}
                className={`px-6 sm:px-8 py-3 sm:py-3.5 rounded font-sans text-sm sm:text-base font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                {UI_TEXT[lang].publish}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer & Secret Access */}
      <footer className={`max-w-4xl mx-auto px-6 py-12 sm:py-16 text-center relative border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        
        {/* Toggle Controls (Theme & Lang) */}
        <div className="flex justify-center items-center space-x-4 mb-6 text-sm font-sans tracking-widest uppercase">
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`transition-all duration-300 hover:opacity-70 ${isDark ? 'text-white' : 'text-black'}`}
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
          </button>
          
          <span className="text-gray-300 dark:text-gray-700">|</span>

          <button 
            onClick={() => setLang('en')} 
            className={`transition-all duration-300 ${lang === 'en' ? (isDark ? 'text-white font-bold' : 'text-black font-bold') : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
          >
            EN
          </button>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <button 
            onClick={() => setLang('ru')} 
            className={`transition-all duration-300 ${lang === 'ru' ? (isDark ? 'text-white font-bold' : 'text-black font-bold') : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
          >
            RU
          </button>
        </div>

        <div className={`flex justify-center items-center gap-2 text-xs sm:text-sm font-sans tracking-widest uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>© 2026 {UI_TEXT[lang].by}</span>
          <span style={{ fontFamily: "'Ballet', cursive", fontSize: '1.5rem', textTransform: 'none', letterSpacing: 'normal' }}>Nisfaldam</span>
        </div>
        
        {/* The Secret Button - Bottom Right */}
        {!isAuthenticated && (
          <button 
            onClick={() => setShowLoginModal(true)}
            className="absolute bottom-16 right-6 p-2 opacity-0 hover:opacity-40 transition-opacity"
            title="Secret Access"
          >
            <Lock size={14} />
          </button>
        )}
      </footer>

      {/* Secret Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className={`w-full max-w-sm p-8 rounded shadow-2xl animate-in zoom-in-95 ${isDark ? 'bg-[#121212] border border-gray-800' : 'bg-white'}`}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              {UI_TEXT[lang].restricted}
            </h3>
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                placeholder={UI_TEXT[lang].passcode}
                autoFocus
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full p-3 sm:p-4 mb-6 rounded font-sans border outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-center tracking-widest ${isDark ? 'bg-[#1A1A1A] border-gray-800 text-white' : 'bg-gray-50 border-gray-200'}`}
              />
              {loginError && <p className="text-red-500 text-sm mb-6 font-sans text-center">{UI_TEXT[lang].incorrect}</p>}
              <div className="flex space-x-3">
                <button 
                  type="button" 
                  onClick={() => {setShowLoginModal(false); setLoginError(false); setPasswordInput('');}}
                  className={`flex-1 p-3 sm:p-3.5 rounded font-sans text-sm sm:text-base font-medium transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
                >
                  {UI_TEXT[lang].cancel}
                </button>
                <button 
                  type="submit"
                  className={`flex-1 p-3 sm:p-3.5 rounded font-sans text-sm sm:text-base font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  {UI_TEXT[lang].unlock}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}