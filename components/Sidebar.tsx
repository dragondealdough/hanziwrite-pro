
import React, { useState } from 'react';
import { CharacterData, AppMode, Category } from '../types';

interface SidebarProps {
  characters: CharacterData[];
  activeChar: string;
  mode: AppMode;
  onSelect: (char: string) => void;
  onGoHome: () => void;
  results: Record<string, number>;
  isOpen: boolean;
  onClose: () => void;
  customPacks: Category[];
  onToggleCharInPack: (packId: string, charData: CharacterData) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  characters,
  activeChar,
  mode,
  onSelect,
  onGoHome,
  results,
  isOpen,
  onClose,
  customPacks,
  onToggleCharInPack
}) => {
  const [activePackMenu, setActivePackMenu] = useState<string | null>(null);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-md transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-[#0d0f12] border-r border-slate-200/60 dark:border-slate-800 transform transition-transform duration-500 ease-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col shadow-2xl lg:shadow-none`}>
        <div className="p-8 border-b border-slate-100 dark:border-slate-800/50">
          <div className="flex flex-col gap-2 mb-8">
            <button
              onClick={onGoHome}
              className="group flex items-center gap-2 text-slate-400 hover:text-rose-600 transition-colors touch-manipulation"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              <span className="font-black text-[10px] uppercase tracking-[0.2em]">Back to Hub</span>
            </button>
          </div>

          <div className="flex items-center gap-3 select-none">
            <span className="brush-font text-5xl text-rose-600 leading-none pt-1">墨</span>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 dark:text-white leading-tight">HanziWrite</span>
              <span className="text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Mastery Tool</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 space-y-2.5 overflow-y-auto hide-scrollbar">
          <div className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em] px-3 mb-6">Unit Syllabus</div>
          {characters.map((item) => {
            const score = results[item.char];
            const isCompleted = score !== undefined;
            const isMenuOpen = activePackMenu === item.char;

            return (
              <div key={item.char} className="relative">
                <div className={`w-full flex items-center gap-4 p-4 rounded-[1.5rem] transition-all duration-300 ${activeChar === item.char
                  ? 'bg-rose-600 text-white shadow-xl shadow-rose-200 dark:shadow-none'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border-transparent'
                  }`}>
                  <button
                    onClick={() => {
                      onSelect(item.char);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className="flex flex-1 items-center gap-4 touch-manipulation"
                  >
                    <div className={`text-4xl w-10 text-center brush-font pt-1 ${activeChar === item.char ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>
                      {mode === AppMode.TEST ? '?' : item.char}
                    </div>
                    <div className="flex-1 text-left overflow-hidden">
                      <div className={`font-black text-xs uppercase tracking-widest leading-tight ${activeChar === item.char ? 'text-white' : 'text-slate-900 dark:text-slate-100'}`}>{item.pinyin}</div>
                      <div className={`text-[9px] font-bold font-mono mb-1 ${activeChar === item.char ? 'text-rose-200' : 'text-slate-400 dark:text-slate-500'}`}>{item.zhuyin}</div>
                      <div className={`text-[10px] truncate font-bold ${activeChar === item.char ? 'text-rose-100' : 'text-slate-500 dark:text-slate-400'}`}>
                        {mode === AppMode.TEST ? '???' : item.meaning}
                      </div>
                    </div>
                  </button>

                  <div className="flex flex-col items-center gap-1.5">
                    {isCompleted && (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black shrink-0 ${activeChar === item.char
                        ? 'bg-white text-rose-600'
                        : score > 80 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30'
                        }`}>
                        {score}%
                      </div>
                    )}
                    <button
                      onClick={() => setActivePackMenu(isMenuOpen ? null : item.char)}
                      className={`p-2 rounded-xl transition-all ${isMenuOpen ? (activeChar === item.char ? 'bg-white text-rose-600' : 'bg-rose-600 text-white') : (activeChar === item.char ? 'text-rose-100 hover:bg-rose-500' : 'text-slate-300 dark:text-slate-700 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30')}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>
                </div>

                {isMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white dark:bg-[#16191e] border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600 px-3 py-2 mb-1">Add to custom unit</div>
                    {customPacks.length === 0 ? (
                      <div className="text-[9px] font-bold text-slate-300 dark:text-slate-700 px-3 py-3 italic text-center">Create a pack first</div>
                    ) : (
                      customPacks.map(pack => {
                        const isInPack = pack.characters.some(c => c.char === item.char);
                        return (
                          <button
                            key={pack.id}
                            onClick={() => onToggleCharInPack(pack.id, item)}
                            className={`w-full text-left px-3 py-3 rounded-xl text-xs font-bold transition-all flex justify-between items-center ${isInPack ? 'bg-rose-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                          >
                            <span className="truncate flex-1 mr-2">{pack.name}</span>
                            {isInPack && <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-8 bg-slate-50 dark:bg-[#16191e] border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-end mb-4">
            <div className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">Mastery</div>
            <div className="text-xl font-black text-rose-600">
              {Math.round((Object.keys(results).filter(k => characters.some(c => c.char === k)).length / Math.max(1, characters.length)) * 100)}%
            </div>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-rose-600 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(225,29,72,0.4)]"
              style={{ width: `${(Object.keys(results).filter(k => characters.some(c => c.char === k)).length / Math.max(1, characters.length)) * 100}%` }}
            />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
