import React, { useState, useEffect } from 'react';
import { Moon, Sun, Edit3, Trash2, Plus, ArrowLeft, Lock, LogOut } from 'lucide-react';

// --- YOUR ARTICLES ---
const INITIAL_ARTICLES = [
  {
    id: '5',
    title: 'Perspective is Everything',
    date: 'January 19, 2026',
    content: 'Point is "GOOD" and "BAD" things happen to all of us. It\'s inevitable, you cannot escape it. These concepts are mutually exclusive and so incredibly complex/ intertwined to the point they almost don\'t even exist on their own. You quite literally cannot have "GOOD" without "BAD."\n\nLife is ultimately a string of experiences happening one after the other after the other. Like dominoes. But each experience happening, including the one that lead you to reading this message, was only made possible because you lived every single experience exactly the way you did prior to the one happening RIGHT NOW. Everything in your life had to happen exactly the way that it did for you to be in this very moment.\n\nRemember that next time something "GOOD" is happening, and remember that it\'s only because you experienced all of the "BAD" before that. Literally the best experience you will ever live in your life will only have been made possible because of the worst one that happened before.\n\n> Perspective is everything and a "GOOD" one will carry you through the worst imaginable pain, the most unfair circumstances, the "BAD" parts of life.\n\nWhen life is "GOOD" stay humble, grounded, slow down and when it\'s "BAD" be confident, optimistic to a delusional degree. You have the power to manipulate the bad parts into good ones, entirely. **Find the point.**'
  },
  {
    id: '4',
    title: 'The Habit of Effort vs. The Habit of Reward',
    date: 'December 31, 2025',
    content: 'The struggle against laziness is often misunderstood as a battle of willpower against a character flaw. However, a powerful psychological insight reframes this inertia: laziness is merely the symptom of a thinking habit that prioritizes cost over reward. Productivity, by contrast, is the result of reversing this cognitive bias, consciously focusing on the positive benefits that await us once the action is complete.\n\nThe lazy mindset is characterized by its fixation on friction. When faced with a task—whether it is writing a report or exercising—the mind immediately calculates the cost: the time, the effort, the discomfort, or the boredom. This habitual thought pattern leads to resistance, procrastination, and eventually, inaction. In neurological terms, the energy required for the task is perceived as higher than the immediate payoff, leading the brain to select avoidance.\n\nThe solution is not to grit one’s teeth through the effort, but to deliberately shift the mental lens to the outcome. This approach leverages the brain’s dopamine system, which is less concerned with effort and more focused on anticipation. By concentrating on the future reward—the sense of accomplishment, the completed project, the physical energy boost, or the clean desk—we tap into the motivational chemical that drives seeking behavior. This focus generates a constructive urgency, making the required effort a manageable means to an appealing end.\n\nUltimately, those who appear effortlessly productive are not morally superior; they have simply cultivated a **superior habit of mind**. Productivity is not the absence of effort, but the learned skill of dopamine priming, where the anticipation of a positive result becomes the fuel that overrides the discomfort of the task itself. By consistently choosing to think about the benefit first, we break the mental habit of avoidance and make meaningful action feel like the most logical step.'
  },
  {
    id: '3',
    title: 'What Rust is to Iron',
    date: 'October 30, 2025',
    content: '> Troubles are to man what rust is to iron.\n\nRust, a metaphor for chronic psychological stress, doesn’t manifest instantly; it develops gradually when metal is exposed to normal conditions like moisture, oxygen, or neglect.\n\nSimilarly, mental strain accumulates when individuals are exposed to reality and stressors without proper processing or rest.\n\nIn psychology, this phenomenon parallels chronic stress or rumination: minor worries that, when ignored, gradually erode emotional well-being and cognitive clarity.\n\nIron left unprotected, symbolizing neglect, rusts more rapidly.\n\nSimilarly, individuals who neglect their emotional hygiene, such as suppressing emotions, avoiding self-reflection, or overworking, become susceptible to burnout, anxiety, or depressive symptoms.\n\nPsychologically, this underscores the importance of preventive care: therapy, journaling, mindfulness, or meaningful rest act as protective measures that slow the rusting process.\n\nThis aligns with acceptance-based approaches, such as Acceptance and Commitment Therapy (ACT), which emphasize that distress doesn’t indicate personal failure but rather an interaction with reality.\n\nWhile rust cannot be removed by ignoring it, deliberate efforts like cleaning, polishing, and protection can restore the metal’s strength. Psychologically, healing operates similarly: reflection, reframing, and self-compassion don’t erase past troubles but transform the relationship one has with them.\n\nRust is a natural reaction, not a flaw in the metal. It signifies that the material has been exposed to the elements. Similarly, troubles and emotional friction are signs of being alive and engaged with the world. They serve as feedback, not a failure.'
  },
  {
    id: '6',
    title: 'Wants & Needs',
    date: 'October 17, 2025',
    content: 'There are endless self-improvement resolutions people make every year, month, week maybe even day – "This year is my year. I’m deleting all the socials, waking up at 5am, starting a business, taking cold showers" – all that yap.\n\nA generational cycle of temporary motivation, impulsive self-optimization and inevitable burnouts. Each wave of determination feels profound in the moment but collapses under the same weight of distraction, comfort, and unrealistic expectations.\n\n**The Central Idea**\n\nThe phrase "lock in" means to get serious, focus intensely and intensively on a goal.\n\nOn a first glance it sounds positive. Sounds like a call to discipline, focus and purpose.\n\nBut most people never actually lock in; they fantasize about it. The momentary rush of motivation – usually triggered by seeing their peers on the internet make a bunch of money or romanticize productivity – produces a burst of excitement, but not lasting results.\n\nPeople delete apps, make plans, journal, clean their rooms, organize calendars, and swear to change – but, within days, they relapse into their old habits. The cycle repeats, next time they get this rush of motivation yet again, leading to frustrations, disappointment, numbness, and self-doubt.\n\n**Oversights**\n\n**• A Missing Anchor**\n\nMost people pursue goals without a deep reason behind them. They imitate others – deciding to wake up early, get fit, or make money — but never clarify why those things truly matter to them.\n\nThe brain doesn\'t care about vague goals; it only responds strongly to needs (like food, safety, shelter) or powerful emotional motivations.\n\nWithout a compelling "why," the brain defaults to comfort and instant gratification — the easiest, fastest sources of dopamine. That’s why people give up on long-term work: their brains don’t understand the necessity of doing it.\n\nOnly when a goal becomes deeply personal — tied to identity, pain, or genuine desire — does effort become automatic.\n\nYour brain works only for the needs and not the wants, when you want something you have to work against your brain.\n\n**• Short-Term Thinking and Destroyed Attention Spans**\n\nOur culture, especially through short-form social media, has trained us to expect immediate results.\n\nPeople view focus and hard work as a quick sprint – a challenge or a detox – when in reality, meaningful goals are ultramarathons. Success comes from years of repetition and boredom, being open to things, not a single burst of motivation.\n\nThe human brain, evolved for survival, isn’t naturally built to chase long-term abstract rewards. Combined with modern digital overstimulation, this makes sustained focus nearly impossible.\n\nAs a result, people constantly chase shortcuts – new routines or productivity systems – instead of simply being consistent.\n\n**• It\'s Performative**\n\nDeclaring that you are "locked in" often becomes a substitute for actual action.\n\nPeople announce goals publicly because it feels good – it gives the brain a fake sense of progress. Posting on social media, journaling, or consuming motivational content triggers dopamine similar to genuine accomplishment, even though nothing tangible has changed.\n\nThis creates a performative self-improvement loop: people enjoy the identity of being disciplined more than the discipline itself.\n\n**• They Have Unrealistic Expectations**\n\nPeople assume that once they have this burst of focus, life will magically become smooth – as if the act of deciding to focus will summon a cinematic transformation.\n\nBut real discipline is boring, lonely, and unglamorous. Most days feel average or unproductive; breakthroughs are rare. Progress takes far longer than expected, and self-doubt is constant.\n\nConsistency matters a bit more than intensity.\n\nHuman evolution prioritized survival, not fulfillment. The brain\'s reward system pushes us to minimize pain and maximize comfort – not to chase abstract goals like building something or mastering a skill.\n\n**Conclusion**\n\nReal focus requires conscious rebellion against biology. You must treat your chosen mission as a need, not a want – something essential and vital, not optional. Otherwise, your brain will always choose the easier dopamine hit.\n\nAt its heart, this essay is a rejection of the aesthetic of self-improvement and a defense of reality.\n\n> True focus isn’t loud, cinematic, or glamorous – it’s quiet, slow, painful, and deeply human.\n\nIt demands purpose, consistency, and the willingness to be uncomfortable without immediate reward.'
  },
  {
    id: '2',
    title: 'The Quiet War of Cognitive Empathy',
    date: 'October 5, 2025',
    content: 'In psychology, one of the biggest signs of advanced emotional intelligence is being unable to fully hate or dislike someone because you understand the reasons behind their behavior. That’s called *cognitive empathy* — when you don’t just see what they did, you understand why they did it.\n\nAnd that’s a gift, but sometimes it also feels like a curse. Because when you’ve trained yourself to understand people, you can’t unsee their pain, even when they hurt you. You know the childhood wound behind the sarcasm. You know the fear behind the distance. You know the self-hate behind the betrayal.\n\nAnd now you’re stuck in the quiet war between awareness and boundaries — too aware to stay angry, but still walking around with that scar. So you just carry it, silently. And sometimes you wish someone would see you with the same level of depth you offer everyone else.\n\nBut here’s the truth: just because something makes sense doesn’t mean it gets to stay in your life. You can forgive someone’s humanity and still protect your peace. Being emotionally intelligent doesn’t mean being emotionally available to everything. You’re allowed to understand someone and still walk away.\n\n> That’s not cold. That is clarity.'
  },
  {
    id: '1',
    title: 'On Boundaries and Communication',
    date: 'September 6, 2025',
    content: 'If someone treats you inappropriately, you need to clearly articulate the problem and specify what exactly bothers you. At the same time, it’s important to calmly explain what will happen if such behavior continues.\n\nIt’s like at work: if you want a raise, you don’t just wait — you go and ask, while also showing your value and making it clear what the company risks losing if you leave.\n\nKeep in mind that a single incident may just mean the person was in a bad mood. But if the strange behavior repeats, then it’s time to take matters into your own hands: think carefully about what you want and **communicate it properly**.'
  }
];

// --- TEXT PARSER ---
// Passed isDark explicitly to guarantee readability in all environments
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
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [view, setView] = useState('home'); 
  const [activeArticleId, setActiveArticleId] = useState(null);
  const [isDark, setIsDark] = useState(false);
  
  // Auth & Admin state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Editor state
  const [editorTitle, setEditorTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');

  // --- EFFECTS ---
  // Load Google Fonts dynamically
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // --- HANDLERS ---
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
    setEditorContent('');
    setView('editor');
  };

  const editArticle = (id) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      setActiveArticleId(article.id);
      setEditorTitle(article.title);
      setEditorContent(article.content);
      setView('editor');
    }
  };

  const deleteArticle = (id) => {
    if (window.confirm("Are you sure you want to delete this piece?")) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const saveArticle = () => {
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
      setArticles(articles.map(a => 
        a.id === activeArticleId 
          ? { ...a, title: editorTitle, content: editorContent }
          : a
      ));
    } else {
      const newArticle = {
        id: Date.now().toString(),
        title: editorTitle,
        content: editorContent,
        date: today
      };
      setArticles([newArticle, ...articles]);
    }
    setView('admin');
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
              Admin
            </button>
          )}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={20} strokeWidth={1.5} /> : <Moon size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {/* Updated Title Block */}
        <div className="flex flex-col items-end cursor-pointer group" onClick={() => setView('home')}>
          <h1 
            className="text-5xl md:text-7xl font-black tracking-tight group-hover:opacity-90 transition-opacity"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            The Chronicle
          </h1>
          <span className={`text-xs md:text-sm font-sans tracking-widest mt-2 uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            by NISFALDAM
          </span>
        </div>

        <div className={`w-full h-[1px] mt-10 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
        <div className={`w-full h-[2px] mt-1 ${isDark ? 'bg-gray-800' : 'bg-gray-300'}`} />
      </header>

      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-6 pb-24 min-h-[60vh]">
        
        {/* VIEW: HOME (Article List) */}
        {view === 'home' && (
          <div className="space-y-20 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {articles.map(article => (
              <article key={article.id} className="group cursor-pointer" onClick={() => openArticle(article.id)}>
                <p className={`text-sm uppercase tracking-widest mb-4 font-sans font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {article.date}
                </p>
                <h2 
                  className={`text-3xl md:text-4xl font-bold mb-5 group-hover:opacity-70 transition-opacity leading-tight ${isDark ? 'text-white' : 'text-black'}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {article.title}
                </h2>
                <p className={`text-lg leading-relaxed line-clamp-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {article.content.replace(/[*|>]/g, '').substring(0, 220)}...
                </p>
              </article>
            ))}
          </div>
        )}

        {/* VIEW: SINGLE ARTICLE */}
        {view === 'article' && activeArticle && (
          <article className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <button 
              onClick={() => setView('home')}
              className="flex items-center text-sm uppercase tracking-widest mb-16 opacity-60 hover:opacity-100 transition-opacity font-sans"
            >
              <ArrowLeft size={16} className="mr-2" /> Back
            </button>
            
            <header className="mb-14 text-center">
              <p className={`text-sm uppercase tracking-widest mb-6 font-sans font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Published on {activeArticle.date}
              </p>
              <h1 
                className={`text-4xl md:text-6xl font-bold leading-tight mb-10 ${isDark ? 'text-white' : 'text-black'}`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {activeArticle.title}
              </h1>
              <div className={`w-16 h-[2px] mx-auto ${isDark ? 'bg-gray-700' : 'bg-gray-300'}`} />
            </header>
            
            <div className="article-body max-w-2xl mx-auto">
              {/* Passed the isDark state to the text renderer here */}
              {renderText(activeArticle.content, isDark)}
            </div>
          </article>
        )}

        {/* VIEW: ADMIN DASHBOARD */}
        {view === 'admin' && isAuthenticated && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className={`flex justify-between items-center mb-12 border-b pb-6 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>Editor's Desk</h2>
              <div className="flex space-x-4">
                <button 
                  onClick={createNewArticle}
                  className={`flex items-center px-5 py-2.5 rounded font-sans text-sm font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  <Plus size={16} className="mr-2" /> New Entry
                </button>
                <button 
                  onClick={handleLogout}
                  className={`p-2.5 rounded border transition-colors ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
                  title="Log out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {articles.map(article => (
                <div key={article.id} className={`p-6 rounded-lg flex justify-between items-center border transition-colors ${isDark ? 'border-gray-800 bg-[#1A1A1A] hover:border-gray-700' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                  <div>
                    <h3 className="text-xl font-bold font-serif mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{article.title}</h3>
                    <p className={`text-sm font-sans uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{article.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => editArticle(article.id)}
                      className={`p-3 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-500 hover:text-black hover:bg-gray-100'}`}
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => deleteArticle(article.id)}
                      className={`p-3 rounded-full transition-colors ${isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30' : 'text-red-400 hover:text-red-600 hover:bg-red-50'}`}
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
              <ArrowLeft size={16} className="mr-2" /> Cancel
            </button>

            <input
              type="text"
              placeholder="Headline..."
              value={editorTitle}
              onChange={(e) => setEditorTitle(e.target.value)}
              className={`w-full text-4xl md:text-5xl font-bold mb-8 bg-transparent border-none outline-none placeholder-opacity-30 placeholder-gray-500`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            />
            
            <div className={`mb-8 p-5 rounded border text-sm font-sans ${isDark ? 'bg-[#1A1A1A] border-gray-800 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <strong>Formatting guide:</strong> Use <code>**text**</code> for bold, <code>*text*</code> for italic, and start a paragraph with <code>&gt; </code> for a beautifully styled blockquote.
            </div>

            <textarea
              placeholder="Write your entry here..."
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className={`w-full h-[60vh] bg-transparent border-none outline-none text-xl leading-relaxed resize-none placeholder-opacity-30 placeholder-gray-500 font-serif`}
            />

            <div className={`flex justify-end mt-8 border-t pt-8 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <button 
                onClick={saveArticle}
                className={`px-8 py-3.5 rounded font-sans font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                Publish Entry
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer & Secret Access */}
      <footer className={`max-w-4xl mx-auto px-6 py-16 text-center relative border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <p className={`text-sm font-sans tracking-widest uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          © 2026 BY NISFALDAM.
        </p>
        
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
            <h3 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              Restricted Area
            </h3>
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                placeholder="Passcode" 
                autoFocus
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full p-4 mb-6 rounded font-sans border outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all text-center tracking-widest ${isDark ? 'bg-[#1A1A1A] border-gray-800 text-white' : 'bg-gray-50 border-gray-200'}`}
              />
              {loginError && <p className="text-red-500 text-sm mb-6 font-sans text-center">Incorrect passcode.</p>}
              <div className="flex space-x-3">
                <button 
                  type="button" 
                  onClick={() => {setShowLoginModal(false); setLoginError(false); setPasswordInput('');}}
                  className={`flex-1 p-3.5 rounded font-sans font-medium transition-colors ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className={`flex-1 p-3.5 rounded font-sans font-medium transition-colors ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                  Unlock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}