import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { CATEGORIES } from './constants';
import { AppMode, QuizResult, ViewState, Category, CharacterData, UserStats, Achievement } from './types';
import Sidebar from './components/Sidebar';
import WritingCanvas from './components/WritingCanvas';
import FreeCanvas from './components/FreeCanvas';
import AIFeedback from './components/AIFeedback';
import HomeScreen from './components/HomeScreen';
import HomeworkMenu, { TestHintMode } from './components/HomeworkMenu';
import LoginScreen from './components/LoginScreen';
import ComponentPopup from './components/ComponentPopup';
import PinyinQuiz from './components/PinyinQuiz';
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
  const [practiceStage, setPracticeStage] = useState<'GUIDED' | 'MEMORY' | 'PINYIN'>('GUIDED');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const [currentName, setCurrentName] = useState<string | null>(localStorage.getItem('hanziwrite_login_name'));
  const [currentPin, setCurrentPin] = useState<string | null>(localStorage.getItem('hanziwrite_login_pin'));
  const [displayName, setDisplayName] = useState<string | null>(localStorage.getItem('hanziwrite_display_name'));

  const [customPacks, setCustomPacks] = useState<Category[]>([]);
  const [sessionCharacters, setSessionCharacters] = useState<CharacterData[] | null>(null);
  const [combinedProgress, setCombinedProgress] = useState<Set<string>>(new Set());
  const [showComponentPopup, setShowComponentPopup] = useState(false);
  const [testHintMode, setTestHintMode] = useState<TestHintMode | null>(null);

  const [showAddToPackPopup, setShowAddToPackPopup] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [strokeLeniency, setStrokeLeniency] = useState<number>(() => {
    const saved = localStorage.getItem('hanziwrite_stroke_leniency');
    return saved ? parseFloat(saved) : 1.5;
  });

  // Smart Learning State
  interface CharProgress {
    char: string;
    mistakesThisRound: number;
    perfectRounds: number;
    mastered: boolean;
  }
  const [charProgress, setCharProgress] = useState<CharProgress[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [roundQueue, setRoundQueue] = useState<string[]>([]);
  const [showSessionSummary, setShowSessionSummary] = useState(false);

  // Achievement System
  const ACHIEVEMENT_DEFS: Achievement[] = [
    { id: 'streak_10', name: 'Perfect 10', description: '10 chars without mistakes', icon: '🔥' },
    { id: 'streak_25', name: 'Quarter Century', description: '25 chars without mistakes', icon: '💪' },
    { id: 'streak_50', name: 'Half Century', description: '50 chars without mistakes', icon: '🏆' },
    { id: 'test_streak_10', name: 'Test Ace', description: '10 test chars perfect', icon: '📝' },
    { id: 'test_streak_25', name: 'Test Master', description: '25 test chars perfect', icon: '🎓' },
    { id: 'total_10', name: 'First Steps', description: '10 characters written', icon: '👶' },
    { id: 'total_100', name: 'Century', description: '100 characters written', icon: '💯' },
    { id: 'total_500', name: 'Dedicated', description: '500 characters written', icon: '⭐' },
    { id: 'pack_created', name: 'Creator', description: 'Created first pack', icon: '📦' },
    { id: 'pack_5', name: 'Curator', description: '5 packs created', icon: '🗂️' },
  ];

  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('hanziwrite_stats');
      return saved ? JSON.parse(saved) : {
        totalCharsWritten: 0, perfectStreak: 0, bestPerfectStreak: 0,
        testPerfectStreak: 0, bestTestStreak: 0, packsCreated: 0
      };
    } catch { return { totalCharsWritten: 0, perfectStreak: 0, bestPerfectStreak: 0, testPerfectStreak: 0, bestTestStreak: 0, packsCreated: 0 }; }
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem('hanziwrite_achievements');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    localStorage.setItem('hanziwrite_results', JSON.stringify(results));
    // Sync to cloud if logged in
    if (currentName) {
      saveUserProgress(currentName, results);
    }
  }, [results, currentName]);

  // Persist stats and achievements
  useEffect(() => {
    localStorage.setItem('hanziwrite_stats', JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem('hanziwrite_achievements', JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  const checkAchievements = useCallback((stats: UserStats) => {
    const checks: { id: string; condition: boolean }[] = [
      { id: 'streak_10', condition: stats.bestPerfectStreak >= 10 },
      { id: 'streak_25', condition: stats.bestPerfectStreak >= 25 },
      { id: 'streak_50', condition: stats.bestPerfectStreak >= 50 },
      { id: 'test_streak_10', condition: stats.bestTestStreak >= 10 },
      { id: 'test_streak_25', condition: stats.bestTestStreak >= 25 },
      { id: 'total_10', condition: stats.totalCharsWritten >= 10 },
      { id: 'total_100', condition: stats.totalCharsWritten >= 100 },
      { id: 'total_500', condition: stats.totalCharsWritten >= 500 },
      { id: 'pack_created', condition: stats.packsCreated >= 1 },
      { id: 'pack_5', condition: stats.packsCreated >= 5 },
    ];

    for (const { id, condition } of checks) {
      if (condition && !unlockedAchievements.some(a => a.id === id)) {
        const def = ACHIEVEMENT_DEFS.find(d => d.id === id);
        if (def) {
          const unlocked = { ...def, unlockedAt: Date.now() };
          setUnlockedAchievements(prev => [...prev, unlocked]);
          setNewAchievement(unlocked);
          setTimeout(() => setNewAchievement(null), 4000);
          break; // Show one at a time
        }
      }
    }
  }, [unlockedAchievements, ACHIEVEMENT_DEFS]);

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

    const chars = sequenceChars || category.characters;
    // Round 1: Sequential order
    setSessionCharacters([...chars]);

    // Initialize smart learning for practice mode
    if (initialMode === AppMode.PRACTICE) {
      setCharProgress(chars.map(c => ({
        char: c.char,
        mistakesThisRound: 0,
        perfectRounds: 0,
        mastered: false
      })));
      setCurrentRound(1);
      setRoundQueue(chars.map(c => c.char));
      setShowSessionSummary(false);
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
      isPrivate: true // Default to private
    };
    savePacks([...customPacks, newPack]);
    // Track pack creation for achievements
    setUserStats(prev => {
      const newStats = { ...prev, packsCreated: prev.packsCreated + 1 };
      checkAchievements(newStats);
      return newStats;
    });
  };

  const deletePack = (id: string) => {
    const pack = customPacks.find(p => p.id === id);
    if (!pack) return;
    const isAdmin = currentName.toLowerCase() === 'dale';
    const isOwner = pack.author === currentName && pack.authorPin === currentPin;
    if (isAdmin || isOwner) {
      savePacks(customPacks.filter(p => p.id !== id));
    } else {
      alert(`Permission denied. Only ${pack.author} can delete this.`);
    }
  };

  const togglePackPrivacy = (id: string) => {
    const pack = customPacks.find(p => p.id === id);
    if (!pack) return;
    if (pack.author === currentName && pack.authorPin === currentPin) {
      const updated = customPacks.map(p =>
        p.id === id ? { ...p, isPrivate: !p.isPrivate } : p
      );
      savePacks(updated);
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
        const chars = p.characters || [];
        const exists = chars.some(c => c?.char === charData.char);
        return {
          ...p,
          characters: exists
            ? chars.filter(c => c?.char !== charData.char)
            : [...chars, charData]
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

      // Track mistake for smart learning
      if (activeCharData) {
        setCharProgress(prev => prev.map(cp =>
          cp.char === activeCharData.char
            ? { ...cp, mistakesThisRound: cp.mistakesThisRound + 1 }
            : cp
        ));
      }
    }
    // Reset streaks on mistake
    setUserStats(prev => ({
      ...prev,
      perfectStreak: 0,
      testPerfectStreak: testHintMode ? 0 : prev.testPerfectStreak
    }));
  }, [mode, practiceStage, testHintMode, activeCharData]);

  const handleCompleteIndividual = useCallback((result: QuizResult) => {
    if (mode === AppMode.PRACTICE) {
      if (practiceStage === 'GUIDED') {
        setFeedbackMessage("Perfect! Now try from memory.");
        setPracticeStage('MEMORY');
        // Do NOT increment retryCount here - this prevents canvas from resetting
        setTimeout(() => setFeedbackMessage(null), 2500);
        return;
      }
      if (practiceStage === 'MEMORY') {
        // Adaptive pinyin quiz: only test ~30% of time OR if character had mistakes
        const charData = charProgress.find(cp => cp.char === result.character);
        const hadMistakes = charData && charData.mistakesThisRound > 0;
        const shouldQuizPinyin = hadMistakes || Math.random() < 0.3;

        if (shouldQuizPinyin) {
          setFeedbackMessage("Great! Now test your pinyin.");
          setPracticeStage('PINYIN');
          setTimeout(() => setFeedbackMessage(null), 2500);
          return;
        }
        // Skip pinyin quiz - go straight to success
        setShowSuccess(true);
        playAudio(result.character, activeCharData?.pinyin);
        return;
      }
    }
    setResults(prev => ({ ...prev, [result.character]: result.score }));
    setShowSuccess(true);
    if (result.completed) playAudio(result.character, activeCharData?.pinyin);

    // Track stats for achievements
    if (result.completed && result.mistakes === 0) {
      setUserStats(prev => {
        const newStats = {
          ...prev,
          totalCharsWritten: prev.totalCharsWritten + 1,
          perfectStreak: prev.perfectStreak + 1,
          bestPerfectStreak: Math.max(prev.bestPerfectStreak, prev.perfectStreak + 1),
          testPerfectStreak: testHintMode ? prev.testPerfectStreak + 1 : prev.testPerfectStreak,
          bestTestStreak: testHintMode ? Math.max(prev.bestTestStreak, prev.testPerfectStreak + 1) : prev.bestTestStreak,
        };
        checkAchievements(newStats);
        return newStats;
      });
    } else if (result.completed) {
      setUserStats(prev => {
        const newStats = { ...prev, totalCharsWritten: prev.totalCharsWritten + 1, perfectStreak: 0 };
        checkAchievements(newStats);
        return newStats;
      });
    }
  }, [playAudio, mode, practiceStage, activeCharData, testHintMode, checkAchievements]);

  // Smart Learning: Start next round
  const startNextRound = useCallback(() => {
    const remaining = charProgress.filter(cp => !cp.mastered);
    if (remaining.length === 0) {
      setShowSessionSummary(true);
      return;
    }

    // Update progress: chars with 0 mistakes get perfectRounds++, reset mistakesThisRound
    const updatedProgress = charProgress.map(cp => {
      if (cp.mastered) return cp;
      const wasPerfect = cp.mistakesThisRound === 0;
      const newPerfectRounds = wasPerfect ? cp.perfectRounds + 1 : 0;
      const nowMastered = newPerfectRounds >= 2;
      return { ...cp, mistakesThisRound: 0, perfectRounds: newPerfectRounds, mastered: nowMastered };
    });
    setCharProgress(updatedProgress);

    // Get chars that aren't mastered yet
    const nextChars = updatedProgress.filter(cp => !cp.mastered).map(cp => cp.char);
    if (nextChars.length === 0) {
      setShowSessionSummary(true);
      return;
    }

    // Shuffle for round 2+
    const shuffled = [...nextChars].sort(() => Math.random() - 0.5);
    setRoundQueue(shuffled);
    setCurrentRound(prev => prev + 1);
    setActiveCharIndex(0);

    // Update sessionCharacters to match queue
    const allChars = sessionCharacters || [];
    const orderedChars = shuffled.map(c => allChars.find(ch => ch.char === c)!).filter(Boolean);
    setSessionCharacters(orderedChars);

    setShowSuccess(false);
    setRetryCount(prev => prev + 1);
  }, [charProgress, sessionCharacters]);

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

  const handleSwitchMode = (newHintMode: TestHintMode | null) => {
    setTestHintMode(newHintMode);
    setMode(newHintMode ? AppMode.TEST : AppMode.PRACTICE);
    if (!newHintMode) setPracticeStage('GUIDED');
    setShowModeMenu(false);
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
              // Normalize pinyin by removing tone marks
              const normalizePinyin = (s: string | undefined | null) => (s || '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();

              // Helper to check if a character matches the query
              const matchChar = (char: CharacterData | null | undefined, queryNorm: string, originalQuery: string) => {
                if (!char || !char.char) return false;
                const pinyinNorm = normalizePinyin(char.pinyin);
                return (
                  char.char === originalQuery ||
                  pinyinNorm.includes(queryNorm) ||
                  (char.meaning?.toLowerCase() || '').includes(queryNorm) ||
                  (char.zhuyin || '').includes(originalQuery)
                );
              };

              // First search local categories for matching characters
              const localResults: CharacterData[] = [];
              const queryNorm = normalizePinyin(query);

              for (const cat of [...CATEGORIES, ...customPacks]) {
                if (!cat) continue;
                // Search in direct characters
                for (const char of (cat.characters || [])) {
                  if (char && matchChar(char, queryNorm, query)) {
                    if (!localResults.some(r => r.char === char.char)) {
                      localResults.push(char);
                    }
                  }
                }
                // Also search in sequences (for special categories like Homework)
                for (const seq of (cat.sequences || [])) {
                  if (!seq) continue;
                  for (const char of (seq.characters || [])) {
                    if (char && matchChar(char, queryNorm, query)) {
                      if (!localResults.some(r => r.char === char.char)) {
                        localResults.push(char);
                      }
                    }
                  }
                }
              }

              // If we found local results, return them
              if (localResults.length > 0) {
                return localResults;
              }

              // Otherwise, try Gemini API search
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
          onTogglePackPrivacy={togglePackPrivacy}
          currentName={currentName}
          currentPin={currentPin}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          strokeLeniency={strokeLeniency}
          onSetStrokeLeniency={(value) => {
            setStrokeLeniency(value);
            localStorage.setItem('hanziwrite_stroke_leniency', value.toString());
          }}
          achievements={unlockedAchievements}
          allAchievements={ACHIEVEMENT_DEFS}
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

          <div className="flex items-center gap-2">
            <button onClick={() => setShowModeMenu(true)} className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
            </button>
            <button onClick={goHome} className="p-2 text-slate-400 dark:text-slate-500 hover:text-rose-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </button>
          </div>
        </div>

        {/* Mode Switching Modal */}
        {showModeMenu && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setShowModeMenu(false)}>
            <div
              className="bg-white dark:bg-[#16191e] rounded-[3rem] p-10 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Switch Mode</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Change how you practice right now.</p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleSwitchMode('audio-only')}
                  className={`group w-full py-5 px-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-between ${testHintMode === 'audio-only' ? 'bg-rose-600 text-white shadow-rose-200' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-rose-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🔊</span>
                    <div className="text-left">
                      <div className={testHintMode === 'audio-only' ? 'text-white' : 'text-slate-900 dark:text-white'}>Audio Only</div>
                      <div className={testHintMode === 'audio-only' ? 'text-rose-100' : 'text-slate-400'}>Hardcore mode</div>
                    </div>
                  </div>
                  {testHintMode === 'audio-only' && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </button>

                <button
                  onClick={() => handleSwitchMode('audio-pinyin')}
                  className={`group w-full py-5 px-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-between ${testHintMode === 'audio-pinyin' ? 'bg-rose-600 text-white shadow-rose-200' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-rose-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🔊📝</span>
                    <div className="text-left">
                      <div className={testHintMode === 'audio-pinyin' ? 'text-white' : 'text-slate-900 dark:text-white'}>Audio + Pinyin</div>
                      <div className={testHintMode === 'audio-pinyin' ? 'text-rose-100' : 'text-slate-400'}>Standard test</div>
                    </div>
                  </div>
                  {testHintMode === 'audio-pinyin' && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </button>

                <button
                  onClick={() => handleSwitchMode(null)}
                  className={`group w-full py-5 px-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all flex items-center justify-between ${!testHintMode ? 'bg-rose-600 text-white shadow-rose-200' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700 hover:border-rose-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">👁️</span>
                    <div className="text-left">
                      <div className={!testHintMode ? 'text-white' : 'text-slate-900 dark:text-white'}>Practice</div>
                      <div className={!testHintMode ? 'text-rose-100' : 'text-slate-400'}>See everything</div>
                    </div>
                  </div>
                  {!testHintMode && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </button>
              </div>

              <button
                onClick={() => setShowModeMenu(false)}
                className="mt-8 w-full py-3 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

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
                  <div className="flex items-center gap-2.5 mt-4 relative">
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
                    {/* Add to Custom Pack Button */}
                    {/* Add to Custom Pack Button */}
                    <button
                      onClick={() => setShowAddToPackPopup(!showAddToPackPopup)}
                      className={`p-2.5 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm active:scale-90 transition-all ml-1 ${showAddToPackPopup ? 'bg-rose-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80'}`}
                      aria-label="Add to custom pack"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
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
                    {/* Next Character Button - visible in test modes */}
                    {testHintMode && (
                      <button
                        onClick={() => {
                          setActiveCharIndex(prev => (prev + 1) % charactersToPractice.length);
                          setPracticeStage('GUIDED');
                          setRetryCount(prev => prev + 1);
                          setShowSuccess(false);
                        }}
                        className="p-2.5 bg-white dark:bg-slate-800 text-amber-600 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-amber-50 dark:hover:bg-amber-900/10 active:scale-90 transition-all ml-1"
                        aria-label="Next character"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    )}

                    {/* Skip Character Button */}
                    <button
                      onClick={() => {
                        if (activeCharIndex < charactersToPractice.length - 1) {
                          setActiveCharIndex(prev => prev + 1);
                          setPracticeStage('GUIDED');
                          setRetryCount(prev => prev + 1);
                        } else if (mode === AppMode.PRACTICE && charProgress.length > 0) {
                          startNextRound();
                        } else {
                          setView('HOME');
                        }
                      }}
                      className="p-2.5 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800/80 active:scale-90 transition-all ml-1 touch-manipulation"
                      aria-label="Skip character"
                      title="Skip to next"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                    </button>
                  </div>

                  {/* English Meaning Display */}
                  {!testHintMode && activeCharData?.meaning && (
                    <div className="mt-4 text-center">
                      <span className="text-slate-600 dark:text-slate-300 text-sm font-bold">{activeCharData.meaning}</span>
                    </div>
                  )}

                  {/* Example Sentence */}
                  {!testHintMode && activeCharData?.exampleSentence && (
                    <div className="mt-3 text-center px-4">
                      <div className="text-slate-700 dark:text-slate-200 text-sm font-medium">{activeCharData.exampleSentence}</div>
                      {activeCharData.exampleTranslation && (
                        <div className="text-slate-400 dark:text-slate-500 text-xs mt-1 italic">{activeCharData.exampleTranslation}</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Add to Pack Popup - Modal Overlay */}
                {showAddToPackPopup && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowAddToPackPopup(false)}>
                    <div className="bg-white dark:bg-[#16191e] border border-slate-200/60 dark:border-slate-800 rounded-3xl shadow-2xl w-72 max-w-[90vw] p-4 animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-between items-center px-2 py-2 mb-2">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">Add to pack</div>
                        <button onClick={() => setShowAddToPackPopup(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                      {/* Quick Create New Pack */}
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const input = e.currentTarget.querySelector('input') as HTMLInputElement;
                        if (input.value.trim() && currentName && currentPin) {
                          const newPackId = `pack-${Date.now()}`;
                          const newPack: Category = {
                            id: newPackId,
                            name: input.value.trim(),
                            author: currentName,
                            authorPin: currentPin,
                            description: 'Custom classmate collection.',
                            icon: '📦',
                            characters: [activeCharData!],
                            isCustom: true,
                            isPrivate: true // Default to private
                          };
                          savePacks([...customPacks, newPack]);
                          input.value = '';
                        }
                      }} className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="New pack name..."
                          className="flex-1 min-w-0 px-3 py-2.5 text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 ring-emerald-500/20 outline-none"
                        />
                        <button type="submit" className="px-3 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase hover:bg-emerald-700 active:scale-95 transition-all shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </form>
                      <div className="max-h-48 overflow-y-auto">
                        {customPacks.filter(p => p.isCustom).length === 0 ? (
                          <div className="text-[10px] font-bold text-slate-300 dark:text-slate-700 px-3 py-3 text-center italic">
                            No packs yet. Create one above!
                          </div>
                        ) : (
                          customPacks.filter(p => p.isCustom).map(pack => {
                            const isInPack = pack.characters.some(c => c.char === activeCharData?.char);
                            return (
                              <button
                                key={pack.id}
                                onClick={() => toggleCharInPack(pack.id, activeCharData!)}
                                className={`w-full text-left px-3 py-3 rounded-xl text-xs font-bold transition-all flex justify-between items-center mb-1 last:mb-0 ${isInPack ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                              >
                                <span className="truncate flex-1 mr-2">{pack.name}</span>
                                {isInPack && <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

                {practiceStage !== 'PINYIN' ? (
            <WritingCanvas
              key={`${activeCharData?.char}-${effectiveMode}-${retryCount}-${isDarkMode}-${strokeLeniency}`}
              character={activeCharData?.char}
              mode={effectiveMode}
              onComplete={handleCompleteIndividual}
              onMistake={handleCanvasMistake}
              leniency={strokeLeniency}
              onSkipTracing={mode === AppMode.PRACTICE && practiceStage === 'GUIDED' ? () => {
                setPracticeStage('MEMORY');
                setRetryCount(prev => prev + 1);
              } : undefined}
              isDarkMode={isDarkMode}
              roundAccuracy={mode === AppMode.PRACTICE && charProgress.length > 0
                ? Math.round((charProgress.filter(cp => cp.mistakesThisRound === 0).length / charProgress.length) * 100)
                : undefined}
            />
          ) : (
            <div className="bg-white dark:bg-[#16191e] rounded-[4rem] shadow-2xl overflow-hidden">
              <PinyinQuiz
                character={activeCharData?.char || ''}
                correctPinyin={activeCharData?.pinyin || ''}
                onCorrect={() => {
                  setShowSuccess(true);
                  playAudio(activeCharData?.char || '', activeCharData?.pinyin);
                }}
                onIncorrect={() => {
                  // Track mistake for smart learning
                  if (activeCharData) {
                    setCharProgress(prev => prev.map(cp =>
                      cp.char === activeCharData.char
                        ? { ...cp, mistakesThisRound: cp.mistakesThisRound + 1 }
                        : cp
                    ));
                  }
                  setShowSuccess(true);
                }}
                isDarkMode={isDarkMode}
              />
            </div>
          )}

          {showSuccess && (
            <div className="fixed inset-0 lg:absolute lg:inset-0 flex items-center justify-center bg-white/95 dark:bg-[#0d0f12]/95 rounded-none lg:rounded-[4rem] z-40 backdrop-blur-md animate-in fade-in zoom-in-95">
              <div className="text-center p-8">
                <div className="text-rose-600 font-black text-6xl md:text-7xl mb-6 tracking-tighter brush-font">
                  {charProgress.find(cp => cp.char === activeCharData?.char)?.perfectRounds === 1 ? '🏆 Mastered!' : 'Great!'}
                </div>
                {mode === AppMode.PRACTICE && (
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                    Round {currentRound} • {charProgress.filter(cp => !cp.mastered).length} remaining
                  </div>
                )}
                <div className="flex flex-col gap-4 max-w-xs mx-auto">
                  <button onClick={() => { setShowSuccess(false); setRetryCount(r => r + 1); setPracticeStage('GUIDED'); }} className="w-full py-5 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all">Redraw</button>
                  <button onClick={() => {
                    const nextIdx = activeCharIndex + 1;
                    if (mode === AppMode.PRACTICE && nextIdx >= charactersToPractice.length) {
                      // End of round - start next round
                      startNextRound();
                    } else {
                      // Check if next char was perfect last round (skip guided)
                      const nextChar = charactersToPractice[nextIdx % charactersToPractice.length];
                      const nextProgress = charProgress.find(cp => cp.char === nextChar?.char);
                      const skipGuided = mode === AppMode.PRACTICE && currentRound > 1 && nextProgress?.perfectRounds > 0;
                      setActiveCharIndex(nextIdx % charactersToPractice.length);
                      setShowSuccess(false);
                      setPracticeStage(skipGuided ? 'MEMORY' : 'GUIDED');
                    }
                  }} className="w-full py-5 bg-rose-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">
                    {mode === AppMode.PRACTICE && activeCharIndex + 1 >= charactersToPractice.length ? 'Next Round →' : 'Next Target'}
                  </button>
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
  )
}
        </div >
      </main >

  {/* Smart Learning Session Summary */ }
{
  showSessionSummary && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#16191e] rounded-[2rem] p-8 max-w-sm w-full mx-4 shadow-2xl animate-in zoom-in-95 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Session Complete!</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          All {charProgress.length} characters mastered in {currentRound} rounds
        </p>
        <div className="grid grid-cols-6 gap-2 mb-6">
          {charProgress.map(cp => (
            <div key={cp.char} className="aspect-square flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-lg brush-font text-emerald-700 dark:text-emerald-400">
              {cp.char}
            </div>
          ))}
        </div>
        <button onClick={() => { setShowSessionSummary(false); goHome(); }} className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">
          Done
        </button>
      </div>
    </div>
  )
}

{/* Achievement Unlock Toast */ }
{
  newAchievement && (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
        <span className="text-3xl">{newAchievement.icon}</span>
        <div>
          <div className="text-xs font-black uppercase tracking-widest opacity-80">Achievement Unlocked!</div>
          <div className="text-lg font-black">{newAchievement.name}</div>
          <div className="text-xs opacity-90">{newAchievement.description}</div>
        </div>
      </div>
    </div>
  )
}

{/* Component Breakdown Popup */ }
<ComponentPopup
  character={activeCharData?.char || ''}
  components={activeCharData?.components || []}
  isOpen={showComponentPopup}
  onClose={() => setShowComponentPopup(false)}
/>
    </div >
  );
};

export default App;