import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { CATEGORIES } from './constants';
import { AppMode, QuizResult, ViewState, Category, CharacterData } from './types';
import Sidebar from './components/Sidebar';
import WritingCanvas from './components/WritingCanvas';
import FreeCanvas from './components/FreeCanvas';
import AIFeedback from './components/AIFeedback';
import HomeScreen from './components/HomeScreen';
import HomeworkMenu, { TestHintMode } from './components/HomeworkMenu';
import LoginScreen from './components/LoginScreen';
import ComponentPopup from './components/ComponentPopup';
import { searchMandarin, playMandarinAudio } from './services/geminiService';
import { saveUserProgress, getUserProgress, saveSharedPacks, getSharedPacks } from './services/firebaseService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('HOME');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [quizType, setQuizType] = useState<'individual' | 'combined'>('individual');
  const [mode, setMode] = useState<AppMode>(AppMode.PRACTICE);

  // Persisted Results
  const [results, setResults] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('hanziwrite_results');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [practiceStage, setPracticeStage] = useState<'GUIDED' | 'MEMORY'>('GUIDED');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [currentName, setCurrentName] = useState<string | null>(localStorage.getItem('hanziwrite_login_name'));
  const [currentPin, setCurrentPin] = useState<string | null>(localStorage.getItem('hanziwrite_login_pin'));
  const [displayName, setDisplayName] = useState<string | null>(localStorage.getItem('hanziwrite_display_name'));

  const [customPacks, setCustomPacks] = useState<Category[]>([]);
  const [sessionCharacters, setSessionCharacters] = useState<CharacterData[] | null>(null);
  const [combinedProgress, setCombinedProgress] = useState<Set<string>>(new Set());
  const [showComponentPopup, setShowComponentPopup] = useState(false);
  const [testHintMode, setTestHintMode] = useState<TestHintMode | null>(null);

  useEffect(() => {
    localStorage.setItem('hanziwrite_results', JSON.stringify(results));
    // Sync to cloud if logged in
    if (currentName) {
      saveUserProgress(currentName, results);
    }
  }, [results, currentName]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load shared packs and user progress from cloud on login
  useEffect(() => {
    const loadCloudData = async () => {
      // Load shared packs from cloud
      const cloudPacks = await getSharedPacks();
      if (cloudPacks.length > 0) {
        setCustomPacks(cloudPacks);
        localStorage.setItem('hanziwrite_all_packs', JSON.stringify(cloudPacks));
      } else {
        // Fall back to local storage
        const saved = localStorage.getItem('hanziwrite_all_packs');
        if (saved) {
          setCustomPacks(JSON.parse(saved));
        }
      }

      // Load user progress from cloud
      if (currentName) {
        const cloudProgress = await getUserProgress(currentName);
        if (Object.keys(cloudProgress).length > 0) {
          setResults(prev => ({ ...cloudProgress, ...prev }));
        }
      }
    };
    loadCloudData();
  }, [currentName]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = (name: string, pin: string, displayNameFromAuth: string) => {
    setCurrentName(name);
    setCurrentPin(pin);
    setDisplayName(displayNameFromAuth);
    localStorage.setItem('hanziwrite_login_name', name);
    localStorage.setItem('hanziwrite_login_pin', pin);
    localStorage.setItem('hanziwrite_display_name', displayNameFromAuth);
  };

  const handleLogout = () => {
    setCurrentName(null);
    setCurrentPin(null);
    setDisplayName(null);
    localStorage.removeItem('hanziwrite_login_name');
    localStorage.removeItem('hanziwrite_login_pin');
    localStorage.removeItem('hanziwrite_display_name');
    setView('HOME');
  };

  const savePacks = (packs: Category[]) => {
    setCustomPacks(packs);
    localStorage.setItem('hanziwrite_all_packs', JSON.stringify(packs));
    // Sync to cloud for all users to see
    saveSharedPacks(packs);
  };

  const allCategories = useMemo(() => [...CATEGORIES, ...customPacks], [customPacks]);

  const charactersToPractice = useMemo(() => {
    if (sessionCharacters) return sessionCharacters;
    return activeCategory?.characters || [];
  }, [activeCategory, sessionCharacters]);

  const activeCharData = charactersToPractice[activeCharIndex] || charactersToPractice[0];

  const playAudio = useCallback(async (text: string, pinyin?: string) => {
    // Service handles errors and fallback internally
    await playMandarinAudio(text, pinyin);
  }, []);

  useEffect(() => {
    if (view === 'QUIZ' && quizType !== 'combined' && activeCharData) {
      const timer = setTimeout(() => playAudio(activeCharData.char, activeCharData.pinyin), 500);
      return () => clearTimeout(timer);
    }
  }, [activeCharData, view, playAudio, quizType]);

  const handleSelectCategory = (
    category: Category,
    type: 'individual' | 'combined',
    sequenceChars?: CharacterData[],
    initialMode: AppMode = AppMode.PRACTICE
  ) => {
    if (category.isSpecial && !sequenceChars) {
      setActiveCategory(category);
      setView('HOMEWORK_MENU');
      return;
    }

    setActiveCategory(category);
    setQuizType(type);

    if (sequenceChars) {
      setSessionCharacters(sequenceChars);
    } else {
      const shuffled = [...category.characters].sort(() => Math.random() - 0.5);
      setSessionCharacters(shuffled);
    }

    setActiveCharIndex(0);
    setCombinedProgress(new Set());
    setView('QUIZ');
    setShowSuccess(false);
    setPracticeStage('GUIDED');
    setRetryCount(prev => prev + 1);
    setMode(initialMode);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await searchMandarin(query);
      if (results && results.length > 0) {
        const searchCategory: Category = {
          id: 'search-results',
          name: `Search: "${query}"`,
          description: 'Characters found based on your search.',
          icon: '🔍',
          characters: results,
          isSpecial: true
        };
        const searchMode = results.length > 1 ? 'combined' : 'individual';
        handleSelectCategory(searchCategory, searchMode, results);
      } else {
        alert("No characters found.");
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const createPack = (name: string) => {
    if (!currentName || !currentPin) return;
    const newPack: Category = {
      id: `pack-${Date.now()}`,
      name,
      author: currentName,
      authorPin: currentPin,
      description: 'Custom classmate collection.',
      icon: '📦',
      characters: [],
      isCustom: true,
      isShared: true
    };
    savePacks([...customPacks, newPack]);
  };

  const deletePack = (id: string) => {
    const pack = customPacks.find(p => p.id === id);
    if (!pack) return;
    if (pack.author === currentName && pack.authorPin === currentPin) {
      savePacks(customPacks.filter(p => p.id !== id));
    } else {
      alert(`Permission denied. Only ${pack.author} can delete this.`);
    }
  };

  const importPack = (jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString);
      if (Array.isArray(imported)) {
        if (confirm("Merge library backup?")) {
          const merged = [...customPacks];
          imported.forEach((p: Category) => {
            if (!merged.some(m => m.id === p.id)) merged.push(p);
          });
          savePacks(merged);
        }
      } else {
        if (!imported.characters || !imported.name) throw new Error();
        imported.id = `imported-${Date.now()}`;
        savePacks([...customPacks, imported]);
      }
    } catch (e) {
      alert("Invalid code.");
    }
  };

  const exportLibrary = () => {
    const json = JSON.stringify(customPacks);
    navigator.clipboard.writeText(json);
    alert("Library backup copied!");
  };

  const toggleCharInPack = (packId: string, charData: CharacterData) => {
    const updated = customPacks.map(p => {
      if (p.id === packId) {
        const exists = p.characters.some(c => c.char === charData.char);
        return {
          ...p,
          characters: exists
            ? p.characters.filter(c => c.char !== charData.char)
            : [...p.characters, charData]
        };
      }
      return p;
    });
    savePacks(updated);
  };

  const handleCanvasMistake = useCallback(() => {
    if (mode === AppMode.PRACTICE && practiceStage === 'MEMORY') {
      setFeedbackMessage("Incorrect! Review the character.");
      setPracticeStage('GUIDED');
      setRetryCount(prev => prev + 1);
      setTimeout(() => setFeedbackMessage(null), 2500);
    }
  }, [mode, practiceStage]);

  const handleCompleteIndividual = useCallback((result: QuizResult) => {
    if (mode === AppMode.PRACTICE) {
      if (practiceStage === 'GUIDED') {
        setFeedbackMessage("Perfect! Now try from memory.");
        setPracticeStage('MEMORY');
        setRetryCount(prev => prev + 1);
        setTimeout(() => setFeedbackMessage(null), 2500);
        return;
      }
    }
    setResults(prev => ({ ...prev, [result.character]: result.score }));
    setShowSuccess(true);
    if (result.completed) playAudio(result.character, activeCharData?.pinyin);
  }, [playAudio, mode, practiceStage, activeCharData]);

  const handleCompleteCombined = useCallback((result: QuizResult) => {
    setResults(prev => ({ ...prev, [result.character]: result.score }));
    setCombinedProgress(prev => {
      const next = new Set(prev);
      next.add(result.character);
      if (next.size === charactersToPractice.length) setShowSuccess(true);
      return next;
    });
  }, [charactersToPractice]);

  const goHome = () => {
    setView('HOME');
    setActiveCategory(null);
    setSessionCharacters(null);
    setIsSidebarOpen(false);
    setTestHintMode(null);
  };

  if (!currentName || !currentPin) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (view === 'HOME') {
    return (
      <div className="min-h-screen w-full bg-[#fcfcfc] dark:bg-[#0d0f12] transition-colors duration-500">
        <HomeScreen
          categories={allCategories}
          onSelectCategory={handleSelectCategory}
          onSearch={handleSearch}
          onSearchForPack={async (query: string) => {
            try {
              const results = await searchMandarin(query);
              return results || [];
            } catch (error) {
              console.error('Search failed:', error);
              return [];
            }
          }}
          isSearching={isSearching}
          onCreatePack={createPack}
          onDeletePack={deletePack}
          onImportPack={importPack}
          onExportLibrary={exportLibrary}
          onAddCharToPack={toggleCharInPack}
          currentName={currentName}
          currentPin={currentPin}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
      </div>
    );
  }

  if (view === 'HOMEWORK_MENU' && activeCategory) {
    return (
      <div className="min-h-screen w-full bg-[#fcfcfc] dark:bg-[#0d0f12] transition-colors duration-500">
        <HomeworkMenu
          category={activeCategory}
          onSelectAssignment={(chars, hintMode) => {
            setTestHintMode(hintMode || null);
            handleSelectCategory(activeCategory, 'individual', chars, hintMode ? AppMode.TEST : AppMode.PRACTICE);
          }}
          onBack={goHome}
        />
      </div>
    );
  }

  const effectiveMode = (mode === AppMode.PRACTICE && practiceStage === 'MEMORY') ? AppMode.TEST : mode;

  return (
    <div className="flex h-screen w-full text-slate-900 dark:text-slate-100 bg-[#fcfcfc] dark:bg-[#0d0f12] overflow-hidden transition-colors duration-500">
      <Sidebar
        characters={charactersToPractice}
        activeChar={activeCharData?.char}
        mode={mode}
        onSelect={(char) => {
          const idx = charactersToPractice.findIndex(c => c.char === char);
          setActiveCharIndex(idx);
          setPracticeStage('GUIDED');
          setRetryCount(prev => prev + 1);
          setShowSuccess(false);
        }}
        onGoHome={goHome}
        results={results}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        customPacks={customPacks}
        onToggleCharInPack={toggleCharInPack}
      />

      <main className="flex-1 overflow-y-auto flex flex-col items-center relative pb-24 lg:pb-0">
        <div className="w-full flex justify-between items-center p-4 bg-white/90 dark:bg-[#16191e]/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-rose-600 uppercase tracking-[0.25em] mb-0.5">{activeCategory?.name}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">{quizType === 'combined' ? 'Flow' : `U${activeCharIndex + 1}/${charactersToPractice.length}`}</span>
            </div>
          </div>

          <button onClick={goHome} className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          </button>
        </div>

        <div className="w-full max-w-6xl px-4 md:px-8 py-4 lg:py-10">
          {quizType !== 'combined' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {feedbackMessage && <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-slate-900 dark:bg-rose-600 text-white px-8 py-3 rounded-2xl shadow-2xl z-50 font-black text-xs uppercase tracking-widest animate-in fade-in slide-in-from-top-6">{feedbackMessage}</div>}

              <div className="flex flex-col items-center">
                <div className="w-full mb-6 md:mb-10 flex flex-col items-center md:items-start">
                  <div className="h-40 md:h-52 flex items-center justify-center">
                    <h1 className="text-8xl md:text-[10rem] font-medium text-slate-900 dark:text-slate-50 brush-font leading-none">
                      {testHintMode || effectiveMode === AppMode.TEST ? '?' : activeCharData?.char}
                    </h1>
                  </div>
                  <div className="flex items-center gap-2.5 mt-4">
                    {/* Show pinyin only if not in test mode OR if audio-pinyin mode selected */}
                    {(!testHintMode || testHintMode === 'audio-pinyin') && (
                      <span className="px-5 py-2 bg-rose-600 text-white rounded-full text-xs font-black tracking-widest uppercase shadow-lg shadow-rose-200 dark:shadow-none">{activeCharData?.pinyin}</span>
                    )}
                    {/* Show zhuyin only if not in test hint mode */}
                    {!testHintMode && (
                      <span className="px-5 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full text-xs font-black tracking-widest uppercase">{activeCharData?.zhuyin}</span>
                    )}
                    <button
                      onClick={() => playAudio(activeCharData?.char, activeCharData?.pinyin)}
                      className="p-2.5 bg-white dark:bg-slate-800 text-rose-600 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-rose-50 dark:hover:bg-rose-900/10 active:scale-90 transition-all ml-1"
                      aria-label="Play pronunciation"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
                    </button>
                    {/* Hide component popup in test mode */}
                    {!testHintMode && activeCharData?.components && activeCharData.components.length > 0 && (
                      <button
                        onClick={() => setShowComponentPopup(true)}
                        className="p-2.5 bg-white dark:bg-slate-800 text-indigo-600 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/10 active:scale-90 transition-all ml-1"
                        aria-label="Show components"
                      >
                        <span className="text-sm">🧩</span>
                      </button>
                    )}
                  </div>
                </div>

                <WritingCanvas
                  key={`${activeCharData?.char}-${effectiveMode}-${retryCount}-${isDarkMode}`}
                  character={activeCharData?.char}
                  mode={effectiveMode}
                  onComplete={handleCompleteIndividual}
                  onMistake={handleCanvasMistake}
                  onSkipTracing={mode === AppMode.PRACTICE && practiceStage === 'GUIDED' ? () => {
                    setPracticeStage('MEMORY');
                    setRetryCount(prev => prev + 1);
                  } : undefined}
                  isDarkMode={isDarkMode}
                />

                {showSuccess && (
                  <div className="fixed inset-0 lg:absolute lg:inset-0 flex items-center justify-center bg-white/95 dark:bg-[#0d0f12]/95 rounded-none lg:rounded-[4rem] z-40 backdrop-blur-md animate-in fade-in zoom-in-95">
                    <div className="text-center p-8">
                      <div className="text-rose-600 font-black text-6xl md:text-7xl mb-10 tracking-tighter brush-font">Mastered</div>
                      <div className="flex flex-col gap-4 max-w-xs mx-auto">
                        <button onClick={() => { setShowSuccess(false); setRetryCount(r => r + 1); setPracticeStage('GUIDED'); }} className="w-full py-5 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all">Redraw</button>
                        <button onClick={() => { setActiveCharIndex(prev => (prev + 1) % charactersToPractice.length); setShowSuccess(false); setPracticeStage('GUIDED'); }} className="w-full py-5 bg-rose-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">Next Target</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full">
                <AIFeedback character={activeCharData?.char} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-16 pt-6">
              <div className="flex flex-wrap justify-center gap-12 md:gap-24">
                {charactersToPractice.map((char) => (
                  <div key={char.char} className="flex flex-col items-center gap-8">
                    <WritingCanvas character={char.char} mode={mode} onComplete={handleCompleteCombined} canvasSize={240} isDarkMode={isDarkMode} />
                    {combinedProgress.has(char.char) && (
                      <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-1.5 rounded-full font-black uppercase text-[10px] tracking-widest">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        Ready
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {showSuccess && (
                <button onClick={goHome} className="px-14 py-6 bg-rose-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                  Sequence Mastered
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Component Breakdown Popup */}
      <ComponentPopup
        character={activeCharData?.char || ''}
        components={activeCharData?.components || []}
        isOpen={showComponentPopup}
        onClose={() => setShowComponentPopup(false)}
      />
    </div>
  );
};

export default App;