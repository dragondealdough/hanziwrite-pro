import React, { useState } from 'react';
import { Category, CharacterData, AppMode, Achievement } from '../types';
import { APP_VERSION } from '../constants';

interface HomeScreenProps {
  categories: Category[];
  onSelectCategory: (category: Category, mode: 'individual' | 'combined', sequenceChars?: CharacterData[], initialMode?: AppMode) => void;
  onSearch: (query: string) => Promise<void>;
  onSearchForPack: (query: string) => Promise<CharacterData[]>;
  isSearching: boolean;
  onCreatePack: (name: string) => void;
  onDeletePack: (id: string) => void;
  onImportPack: (json: string) => void;
  onExportLibrary: () => void;
  onAddCharToPack: (packId: string, char: CharacterData) => void;
  onTogglePackPrivacy: (packId: string) => void;
  currentName: string;
  currentPin: string;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  strokeLeniency: number;
  onSetStrokeLeniency: (value: number) => void;
  achievements: Achievement[];
  allAchievements: Achievement[];
}

type SubView = 'main' | 'personal' | 'community';

const HomeScreen: React.FC<HomeScreenProps> = ({
  categories,
  onSelectCategory,
  onSearch,
  onSearchForPack,
  isSearching,
  onCreatePack,
  onDeletePack,
  onImportPack,
  onExportLibrary,
  onAddCharToPack,
  onTogglePackPrivacy,
  currentName,
  onLogout,
  isDarkMode,
  onToggleTheme,
  strokeLeniency,
  onSetStrokeLeniency,
  achievements,
  allAchievements
}) => {
  const [query, setQuery] = useState('');
  const [newPackName, setNewPackName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [showImportForm, setShowImportForm] = useState(false);
  const [subView, setSubView] = useState<SubView>('main');
  const [showSettings, setShowSettings] = useState(false);

  // Pack search modal state
  const [searchingPackId, setSearchingPackId] = useState<string | null>(null);
  const [packSearchQuery, setPackSearchQuery] = useState('');
  const [packSearchResults, setPackSearchResults] = useState<CharacterData[]>([]);
  const [isPackSearching, setIsPackSearching] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const handlePackSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packSearchQuery.trim() || !searchingPackId) return;
    setIsPackSearching(true);
    setPackSearchResults([]);
    try {
      const results = await onSearchForPack(packSearchQuery.trim());
      setPackSearchResults(results || []);
    } catch (err) {
      console.error('Pack search failed:', err);
      alert('Search failed. Please try again.');
    } finally {
      setIsPackSearching(false);
    }
  };

  const openPackSearch = (packId: string) => {
    setSearchingPackId(packId);
    setPackSearchQuery('');
    setPackSearchResults([]);
  };

  const closePackSearch = () => {
    setSearchingPackId(null);
    setPackSearchQuery('');
    setPackSearchResults([]);
  };

  // Find special categories
  const homeworkCategory = categories.find(c => c.id === 'homework-group');
  const testCategory = categories.find(c => c.id === 'test-group');
  const hsk1Category = categories.find(c => c.id === 'hsk1');
  const customCats = categories.filter(c => c.isCustom);
  const personalPacks = customCats.filter(c => c.isPrivate && c.author === currentName);
  const communityPacks = customCats.filter(c => !c.isPrivate);

  // Render pack card (reusable)
  const renderPackCard = (cat: Category, isPersonal: boolean) => (
    <div key={cat.id} className="bg-white dark:bg-[#16191e] rounded-[2rem] border border-slate-200/50 dark:border-slate-800 p-6 shadow-sm flex flex-col relative group hover:shadow-xl transition-all duration-300 touch-manipulation">
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        {cat.author === currentName && (
          <button onClick={() => onTogglePackPrivacy(cat.id)} className={`p-2 ${isPersonal ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'bg-violet-50 dark:bg-violet-900/20 text-violet-600'} rounded-lg hover:opacity-80 transition-all touch-manipulation`} title={isPersonal ? 'Share with community' : 'Make private'}>
            {isPersonal ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            )}
          </button>
        )}
        {(cat.author === currentName || currentName.toLowerCase() === 'dale') && (
          <button onClick={() => onDeletePack(cat.id)} className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-lg hover:bg-rose-600 hover:text-white transition-all touch-manipulation">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        )}
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-slate-100 dark:bg-[#0d0f12] rounded-xl flex items-center justify-center text-lg font-black text-rose-600">{cat.characters?.length || 0}</div>
        <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 tracking-tight flex-1 truncate">{cat.name}</h3>
      </div>
      {!isPersonal && <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 mb-3">@{cat.author}</span>}
      {(cat.characters?.length || 0) > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {cat.characters.slice(0, 6).map(c => (
            <span key={c.char} className="text-base brush-font text-slate-500 dark:text-slate-400">{c.char}</span>
          ))}
          {(cat.characters?.length || 0) > 6 && <span className="text-[10px] text-slate-400">+{(cat.characters?.length || 0) - 6}</span>}
        </div>
      )}
      <div className="mt-auto flex gap-2 relative z-10">
        <button onTouchStart={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onSelectCategory(cat, 'individual'); }} className="flex-1 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-xl font-black text-[9px] uppercase tracking-widest active:scale-95 transition-all touch-manipulation">Practice</button>
        <button onTouchStart={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onSelectCategory(cat, 'individual', undefined, AppMode.TIME_ATTACK); }} className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest active:scale-95 transition-all touch-manipulation">Speed</button>
      </div>
      {cat.author === currentName && (
        <button onClick={() => openPackSearch(cat.id)} className="mt-2 w-full py-2 bg-emerald-500/10 text-emerald-600 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-1.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
          Add Words
        </button>
      )}
    </div>
  );

  // Sub-view header with back button
  const renderSubHeader = (title: string, subtitle: string) => (
    <div className="flex items-center gap-4 mb-8">
      <button onClick={() => setSubView('main')} className="p-3 bg-white dark:bg-[#16191e] rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all active:scale-95">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-5 py-8 md:py-16 pb-32">
      {/* Top Header */}
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-3 bg-white dark:bg-[#16191e] border border-slate-200/50 dark:border-slate-800 p-1.5 pr-4 rounded-full shadow-sm">
          <div className="w-9 h-9 bg-rose-600 text-white rounded-full flex items-center justify-center font-black text-sm shadow-md">{currentName[0].toUpperCase()}</div>
          <div className="text-left">
            <div className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-600 leading-none mb-1 tracking-widest">Studio User</div>
            <div className="text-xs font-black dark:text-slate-200">{currentName}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowSettings(true)} className="p-3.5 bg-white dark:bg-[#16191e] text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800 rounded-full hover:text-rose-600 transition-all shadow-sm active:scale-90">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          <button onClick={onToggleTheme} className="p-3.5 bg-white dark:bg-[#16191e] text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800 rounded-full hover:text-rose-600 transition-all shadow-sm active:scale-90">
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            )}
          </button>
          <button onClick={onLogout} className="p-3.5 bg-white dark:bg-[#16191e] text-slate-400 border border-slate-200/50 dark:border-slate-800 rounded-full hover:text-rose-600 transition-all shadow-sm active:scale-90">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </button>
        </div>
      </header>

      {subView === 'main' && (
        <>
          {/* Logo */}
          <div className="text-center mb-12">
            <h1 className="flex flex-col items-center gap-2 mb-4">
              <span className="brush-font text-7xl md:text-8xl text-slate-900 dark:text-white leading-none">墨</span>
              <span className="text-3xl md:text-4xl font-black text-rose-600 italic tracking-tighter">HanziWrite</span>
            </h1>
          </div>

          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-lg mx-auto relative mb-16">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isSearching}
              placeholder="Translate or search characters..."
              className="w-full pl-6 pr-14 py-4 bg-white dark:bg-[#16191e] border border-slate-200/60 dark:border-slate-800 rounded-full shadow-lg text-slate-900 dark:text-slate-100 font-bold focus:ring-4 ring-rose-600/5 focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 active:scale-90 transition-all">
              {isSearching ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            </button>
          </form>

          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mb-16">
            {/* Homework Packs */}
            {homeworkCategory && (
              <button onClick={() => onSelectCategory(homeworkCategory, 'individual')} className="group bg-white dark:bg-[#16191e] rounded-[2rem] border border-slate-200/50 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left touch-manipulation">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">📚</div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Homework</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Class assignments</p>
              </button>
            )}

            {/* Test Packs */}
            {testCategory && (
              <button onClick={() => onSelectCategory(testCategory, 'individual')} className="group bg-white dark:bg-[#16191e] rounded-[2rem] border border-slate-200/50 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left touch-manipulation">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">📋</div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Test Packs</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exam preparation</p>
              </button>
            )}

            {/* Personal Packs */}
            <button onClick={() => setSubView('personal')} className="group bg-white dark:bg-[#16191e] rounded-[2rem] border border-slate-200/50 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left touch-manipulation">
              <div className="w-14 h-14 bg-violet-100 dark:bg-violet-900/30 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🔒</div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Personal</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{personalPacks.length} packs · Private</p>
            </button>

            {/* Community Packs */}
            <button onClick={() => setSubView('community')} className="group bg-white dark:bg-[#16191e] rounded-[2rem] border border-slate-200/50 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left touch-manipulation">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">🌐</div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">Community</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{communityPacks.length} packs · Shared</p>
            </button>

            {/* HSK 1 */}
            {hsk1Category && (
              <button onClick={() => onSelectCategory(hsk1Category, 'individual')} className="group bg-white dark:bg-[#16191e] rounded-[2rem] border border-slate-200/50 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left touch-manipulation">
                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-2xl font-black text-rose-600 mb-4 group-hover:scale-110 transition-transform">1</div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">HSK 1</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{hsk1Category.characters?.length || 0} characters</p>
              </button>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center gap-3 mb-16">
            <button onClick={() => setShowCreateForm(!showCreateForm)} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg">+ New Pack</button>
            <button onClick={() => setShowImportForm(!showImportForm)} className="px-6 py-3 bg-white dark:bg-[#16191e] text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-600 transition-all">Import</button>
          </div>

          {/* Create Form */}
          {showCreateForm && (
            <form onSubmit={(e) => { e.preventDefault(); onCreatePack(newPackName); setNewPackName(''); setShowCreateForm(false); }} className="max-w-md mx-auto mb-10 p-8 bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20 rounded-[2rem] animate-in slide-in-from-top-4">
              <input required type="text" placeholder="Pack name..." value={newPackName} onChange={(e) => setNewPackName(e.target.value)} className="w-full px-6 py-4 bg-white dark:bg-[#16191e] rounded-xl border border-indigo-100 dark:border-slate-800 font-bold text-slate-900 dark:text-slate-100 mb-4 focus:ring-4 ring-indigo-500/10 outline-none" />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all">Create</button>
                <button type="button" onClick={() => setShowCreateForm(false)} className="px-6 py-4 bg-white dark:bg-[#16191e] text-slate-400 rounded-xl font-black uppercase text-xs tracking-widest">Cancel</button>
              </div>
            </form>
          )}

          {/* Import Form */}
          {showImportForm && (
            <div className="max-w-md mx-auto mb-10 p-8 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 rounded-[2rem] animate-in slide-in-from-top-4">
              <textarea placeholder="Paste pack code..." value={importCode} onChange={(e) => setImportCode(e.target.value)} className="w-full px-6 py-4 bg-white dark:bg-[#16191e] rounded-xl border border-emerald-100 dark:border-slate-800 text-xs font-bold focus:outline-none mb-4 min-h-[80px]" />
              <button onClick={() => { onImportPack(importCode); setImportCode(''); setShowImportForm(false); }} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest">Import Pack</button>
            </div>
          )}
        </>
      )}

      {/* Personal Packs Sub-View */}
      {subView === 'personal' && (
        <>
          {renderSubHeader('Personal Packs', 'Visible only to you')}
          {personalPacks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔒</div>
              <p className="text-slate-400 font-bold mb-6">No personal packs yet</p>
              <button onClick={() => { setSubView('main'); setShowCreateForm(true); }} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest">Create Your First Pack</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {personalPacks.map(cat => renderPackCard(cat, true))}
            </div>
          )}
        </>
      )}

      {/* Community Packs Sub-View */}
      {subView === 'community' && (
        <>
          {renderSubHeader('Community Packs', 'Visible to everyone')}
          {communityPacks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌐</div>
              <p className="text-slate-400 font-bold">No community packs yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {communityPacks.map(cat => renderPackCard(cat, false))}
            </div>
          )}
        </>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setShowSettings(false)}>
          <div className="bg-white dark:bg-[#16191e] rounded-[2rem] p-6 max-w-sm w-full mx-4 shadow-2xl animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Stroke Leniency */}
            <div className="mb-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 block">Stroke Leniency</label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">How forgiving should stroke detection be?</p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onSetStrokeLeniency(1.0)}
                  className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${strokeLeniency === 1.0 ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >Strict</button>
                <button
                  onClick={() => onSetStrokeLeniency(1.5)}
                  className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${strokeLeniency === 1.5 ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >Normal</button>
                <button
                  onClick={() => onSetStrokeLeniency(2.0)}
                  className={`py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${strokeLeniency === 2.0 ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >Lenient</button>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3 block">Achievements ({achievements.length}/{allAchievements.length})</label>
              <div className="grid grid-cols-5 gap-2">
                {allAchievements.map(ach => {
                  const unlocked = achievements.some(a => a.id === ach.id);
                  return (
                    <div key={ach.id} className={`aspect-square flex items-center justify-center rounded-xl text-2xl ${unlocked ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-slate-100 dark:bg-slate-800 grayscale opacity-40'}`} title={unlocked ? `${ach.name}: ${ach.description}` : '???'}>
                      {unlocked ? ach.icon : '🔒'}
                    </div>
                  );
                })}
              </div>
            </div>

            <button onClick={() => setShowSettings(false)} className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-black text-xs uppercase tracking-widest">Done</button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-32 pt-12 border-t border-slate-200/50 dark:border-slate-800 flex flex-col items-center gap-6">
        <button onClick={onExportLibrary} className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] hover:text-rose-600 transition-all active:scale-95">Full Library Backup</button>
        <p className="text-[10px] text-slate-300 dark:text-slate-700 font-bold uppercase tracking-[0.3em]">Built for Language Mastery · v{APP_VERSION} · 2024</p>
      </footer>

      {/* Pack Search Modal */}
      {searchingPackId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={closePackSearch}>
          <div className="bg-white dark:bg-[#16191e] rounded-[2rem] p-6 max-w-lg w-full mx-4 shadow-2xl animate-in zoom-in-95 max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Add Words</h2>
              <button onClick={closePackSearch} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <form onSubmit={handlePackSearch} className="relative mb-4">
              <input type="text" value={packSearchQuery} onChange={(e) => setPackSearchQuery(e.target.value)} placeholder="Search characters..." className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-[#0d0f12] border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm focus:ring-4 ring-emerald-500/10 outline-none" />
              <button type="submit" disabled={isPackSearching} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-lg">{isPackSearching ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}</button>
            </form>
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {packSearchResults.length > 0 ? packSearchResults.map((char) => {
                const currentPack = categories.find(c => c.id === searchingPackId);
                const alreadyAdded = (currentPack?.characters || []).some(c => c?.char === char.char);
                return (
                  <div key={char.char} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#0d0f12] rounded-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl brush-font">{char.char}</span>
                      <div><div className="text-sm font-bold">{char.pinyin}</div><div className="text-xs text-slate-400">{char.meaning}</div></div>
                    </div>
                    <button onClick={() => onAddCharToPack(searchingPackId, char)} disabled={alreadyAdded} className={`px-3 py-1.5 rounded-lg font-black text-[9px] uppercase ${alreadyAdded ? 'bg-slate-200 dark:bg-slate-800 text-slate-400' : 'bg-emerald-600 text-white active:scale-95'}`}>{alreadyAdded ? 'Added' : 'Add'}</button>
                  </div>
                );
              }) : <div className="text-center text-slate-400 py-6 text-sm">Search for characters to add</div>}
            </div>
            <button onClick={closePackSearch} className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-black text-xs uppercase tracking-widest">Done</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;