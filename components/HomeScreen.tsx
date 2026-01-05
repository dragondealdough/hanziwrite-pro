import React, { useState } from 'react';
import { Category, CharacterData, AppMode } from '../types';

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
  currentName: string;
  currentPin: string;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

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
  currentName,
  onLogout,
  isDarkMode,
  onToggleTheme
}) => {
  const [query, setQuery] = useState('');
  const [newPackName, setNewPackName] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [importCode, setImportCode] = useState('');
  const [showImportForm, setShowImportForm] = useState(false);

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
      if (!results || results.length === 0) {
        console.log('No results found for:', packSearchQuery);
      }
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

  const standardCats = categories.filter(c => !c.isCustom);
  const customCats = categories.filter(c => c.isCustom);
  const filteredCustom = customCats.filter(c => !authorFilter || c.author?.toLowerCase().includes(authorFilter.toLowerCase()));

  return (
    <div className="w-full max-w-6xl mx-auto px-5 py-8 md:py-16 pb-32">
      {/* Top Header Section */}
      <header className="flex flex-col items-center text-center mb-16 md:mb-24">
        <div className="w-full flex justify-between items-center mb-10 md:mb-16">
          <div className="flex items-center gap-3 bg-white dark:bg-[#16191e] border border-slate-200/50 dark:border-slate-800 p-1.5 pr-4 rounded-full shadow-sm">
            <div className="w-9 h-9 bg-rose-600 text-white rounded-full flex items-center justify-center font-black text-sm shadow-md">
              {currentName[0].toUpperCase()}
            </div>
            <div className="text-left">
              <div className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-600 leading-none mb-1 tracking-widest">Studio User</div>
              <div className="text-xs font-black dark:text-slate-200">{currentName}</div>
            </div>
          </div>

          <div className="flex gap-2">
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
        </div>

        <h1 className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-5 mb-8 tracking-tighter select-none">
          <span className="brush-font text-9xl md:text-[11rem] text-slate-900 dark:text-white leading-[0.8] mb-4 md:mb-0 transform hover:scale-105 transition-transform duration-500">墨</span>
          <span className="text-6xl md:text-9xl font-black text-rose-600 italic">HanziWrite</span>
        </h1>

        <div className="h-12" />

        <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl relative group">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isSearching}
            placeholder="Translate or search characters..."
            className="w-full pl-8 pr-16 py-6 bg-white dark:bg-[#16191e] border border-slate-200/60 dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none text-slate-900 dark:text-slate-100 font-bold text-xl focus:ring-4 ring-rose-600/5 focus:outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
          />
          <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2 p-4 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-700 active:scale-90 transition-all">
            {isSearching ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
          </button>
        </form>
      </header>

      {/* Main Grid Section */}
      <section className="mb-24">
        <div className="flex items-center gap-5 mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">Learning Path</span>
          <div className="h-px flex-1 bg-slate-200/50 dark:bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {standardCats.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat, 'individual')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectCategory(cat, 'individual')}
              className="group bg-white dark:bg-[#16191e] rounded-[3rem] border border-slate-200/50 dark:border-slate-800 p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer outline-none focus:ring-4 ring-rose-600/10"
            >
              <div className="w-20 h-20 bg-slate-50 dark:bg-[#0d0f12] rounded-[2rem] flex items-center justify-center text-5xl mb-10 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500 shadow-inner">
                {cat.isSpecial ? (
                  <span className="pt-1">{cat.icon}</span>
                ) : (
                  <span className="brush-font pt-2">{cat.characters[0]?.char || '墨'}</span>
                )}
              </div>
              <h3 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-3 tracking-tight">{cat.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-relaxed mb-8 flex-1">{cat.description}</p>

              <div className="mt-auto flex items-center gap-3">
                <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${cat.isSpecial ? 'bg-indigo-600 text-white' : 'bg-slate-900 dark:bg-rose-600 text-white'}`}>
                  {cat.isSpecial ? 'Enter Assignments' : 'Practice Unit'}
                </span>
                <svg className={`w-5 h-5 ${cat.isSpecial ? 'text-indigo-600' : 'text-rose-600'} transition-transform group-hover:translate-x-1`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social/Shared Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-12">
          <div className="flex items-center gap-5 flex-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600 whitespace-nowrap">Peer Repositories</span>
            <div className="h-px flex-1 bg-slate-200/50 dark:bg-slate-800" />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={() => setShowImportForm(!showImportForm)} className="flex-1 sm:flex-none px-6 py-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">Import</button>
            <button onClick={() => setShowCreateForm(!showCreateForm)} className="flex-1 sm:flex-none px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none">New Pack</button>
          </div>
        </div>

        {/* Pack Forms */}
        {showImportForm && (
          <div className="mb-10 p-8 bg-emerald-500/5 dark:bg-emerald-900/5 border border-emerald-500/10 rounded-[2.5rem] animate-in slide-in-from-top-6">
            <textarea
              placeholder="Paste shared pack code..."
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              className="w-full px-6 py-5 bg-white dark:bg-[#16191e] rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-xs font-bold focus:outline-none mb-6 min-h-[100px] shadow-inner"
            />
            <button onClick={() => { onImportPack(importCode); setImportCode(''); setShowImportForm(false); }} className="w-full py-4 bg-emerald-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg">Integrate Pack</button>
          </div>
        )}

        {showCreateForm && (
          <form onSubmit={(e) => { e.preventDefault(); onCreatePack(newPackName); setNewPackName(''); setShowCreateForm(false); }} className="mb-10 p-10 bg-indigo-50/50 dark:bg-indigo-900/5 border border-indigo-100 dark:border-indigo-900/20 rounded-[3rem] animate-in slide-in-from-top-6 shadow-sm">
            <input
              required
              type="text"
              placeholder="Unit Title (e.g. Shopping List)"
              value={newPackName}
              onChange={(e) => setNewPackName(e.target.value)}
              className="w-full px-8 py-5 bg-white dark:bg-[#16191e] rounded-[1.5rem] border border-indigo-100 dark:border-slate-800 shadow-sm font-bold text-slate-900 dark:text-slate-100 mb-8 focus:ring-4 ring-indigo-500/10 outline-none"
            />
            <div className="flex gap-4">
              <button type="submit" className="flex-1 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest active:scale-95 transition-all shadow-lg">Create Pack</button>
              <button type="button" onClick={() => setShowCreateForm(false)} className="px-10 py-5 bg-white dark:bg-[#16191e] text-slate-400 rounded-[1.5rem] font-black uppercase text-xs tracking-widest transition-all">Cancel</button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredCustom.map((cat) => (
            <div key={cat.id} className="bg-white dark:bg-[#16191e] rounded-[3rem] border border-slate-200/50 dark:border-slate-800 p-8 shadow-sm flex flex-col h-full relative group hover:shadow-xl transition-all duration-300">
              <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {cat.author === currentName && (
                  <button onClick={() => onDeletePack(cat.id)} className="p-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                )}
              </div>
              <div className="w-14 h-14 bg-slate-100 dark:bg-[#0d0f12] rounded-2xl flex items-center justify-center text-2xl mb-8 font-black text-rose-600 shadow-inner">
                {cat.characters?.length || 0}
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2 tracking-tight">{cat.name}</h3>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">@{cat.author}</span>
                <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(cat)); alert('Code Copied!'); }} className="text-[10px] font-black text-slate-400 hover:text-rose-600 uppercase tracking-widest border-b border-dotted border-slate-300 transition-colors">Copy Code</button>
              </div>
              {/* Show character previews */}
              {(cat.characters?.length || 0) > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cat.characters.slice(0, 8).map(c => (
                    <span key={c.char} className="text-lg brush-font text-slate-600 dark:text-slate-400">{c.char}</span>
                  ))}
                  {(cat.characters?.length || 0) > 8 && <span className="text-xs text-slate-400">+{(cat.characters?.length || 0) - 8}</span>}
                </div>
              )}
              <div className="mt-auto flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => onSelectCategory(cat, 'individual')} className="py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-md">Practice</button>
                  <button onClick={() => onSelectCategory(cat, 'individual', undefined, AppMode.TIME_ATTACK)} className="py-4 bg-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all shadow-md">Speed</button>
                </div>
                {cat.author === currentName && (
                  <button onClick={() => openPackSearch(cat.id)} className="w-full py-3 bg-emerald-500/10 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    Add Words
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-32 pt-12 border-t border-slate-200/50 dark:border-slate-800 flex flex-col items-center gap-6">
        <button onClick={onExportLibrary} className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] hover:text-rose-600 transition-all active:scale-95">Full Library Backup</button>
        <p className="text-[10px] text-slate-300 dark:text-slate-700 font-bold uppercase tracking-[0.3em]">Built for Language Mastery · 2024</p>
      </footer>

      {/* Pack Search Modal */}
      {searchingPackId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={closePackSearch}>
          <div
            className="bg-white dark:bg-[#16191e] rounded-[3rem] p-8 max-w-lg w-full mx-4 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Add Words</h2>
              <button onClick={closePackSearch} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handlePackSearch} className="relative mb-6">
              <input
                type="text"
                value={packSearchQuery}
                onChange={(e) => setPackSearchQuery(e.target.value)}
                placeholder="Search characters (e.g. 'apple' or '苹果')"
                className="w-full pl-5 pr-14 py-4 bg-slate-50 dark:bg-[#0d0f12] border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-900 dark:text-slate-100 focus:ring-4 ring-emerald-500/10 outline-none"
              />
              <button type="submit" disabled={isPackSearching} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 active:scale-90 transition-all">
                {isPackSearching ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
              </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-3 mb-6">
              {packSearchResults.length > 0 ? (
                packSearchResults.map((char) => {
                  const currentPack = categories.find(c => c.id === searchingPackId);
                  const alreadyAdded = (currentPack?.characters || []).some(c => c?.char === char.char);
                  return (
                    <div key={char.char} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-[#0d0f12] rounded-2xl border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4">
                        <span className="text-3xl brush-font text-slate-900 dark:text-slate-100">{char.char}</span>
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-slate-100">{char.pinyin}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{char.meaning}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => onAddCharToPack(searchingPackId, char)}
                        disabled={alreadyAdded}
                        className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${alreadyAdded ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'}`}
                      >
                        {alreadyAdded ? 'Added' : 'Add'}
                      </button>
                    </div>
                  );
                })
              ) : packSearchQuery && !isPackSearching ? (
                <div className="text-center text-slate-400 py-8">No results found. Try searching for English words or Chinese characters.</div>
              ) : (
                <div className="text-center text-slate-400 py-8">Search for characters to add to your pack</div>
              )}
            </div>

            <button
              onClick={closePackSearch}
              className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;