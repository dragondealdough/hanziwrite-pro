
import React, { useState } from 'react';
import { Category, CharacterData, AppMode } from '../types';

export type TestHintMode = 'audio-only' | 'audio-pinyin';

interface HomeworkMenuProps {
  category: Category;
  onSelectAssignment: (chars: CharacterData[], testHintMode?: TestHintMode) => void;
  onBack: () => void;
}

const HomeworkMenu: React.FC<HomeworkMenuProps> = ({ category, onSelectAssignment, onBack }) => {
  const [selectedSequence, setSelectedSequence] = useState<{ id: string; chars: CharacterData[] } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const isTestPack = category.id === 'test-group';

  const handleLaunch = (chars: CharacterData[], hintMode?: TestHintMode) => {
    onSelectAssignment(chars, hintMode);
    setSelectedSequence(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-5 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-16">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 mb-8 text-slate-400 hover:text-rose-600 transition-colors touch-manipulation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="font-black text-[10px] uppercase tracking-[0.2em]">Return to Hub</span>
        </button>

        <div className="flex items-center gap-6 mb-4">
          <div className="w-20 h-20 bg-rose-600 text-white rounded-[2rem] flex items-center justify-center text-4xl shadow-xl shadow-rose-200 dark:shadow-none">
            {category.icon}
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              {category.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
              {category.sequences?.length || 0} {isTestPack ? 'Tests' : 'Assignments'} Available
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {category.sequences?.map((seq) => {
          const isExpanded = expandedId === seq.id;
          return (
            <div
              key={seq.id}
              className={`bg-white dark:bg-[#16191e] border border-slate-200/50 dark:border-slate-800 rounded-[2rem] overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-xl ring-2 ring-rose-600/5' : 'hover:shadow-lg'}`}
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : seq.id)}
                className="p-6 flex items-center justify-between cursor-pointer touch-manipulation active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 dark:text-slate-500">
                    {seq.characters.length}
                  </span>
                  <h3 className={`text-xl font-black transition-colors ${isExpanded ? 'text-rose-600' : 'text-slate-900 dark:text-white'}`}>
                    {seq.name}
                  </h3>
                </div>
                <div className={`p-2 rounded-full border transition-all ${isExpanded ? 'bg-rose-600 border-rose-600 text-white rotate-180' : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-400 rotate-0'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2 fade-in duration-200">
                  {/* Character Preview */}
                  <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {(seq.characters || []).slice(0, 12).map((c, idx) => (
                        <span key={`${seq.id}-${c.char}-${idx}`} className="text-2xl brush-font text-slate-600 dark:text-slate-300">{c.char}</span>
                      ))}
                      {(seq.characters || []).length > 12 && <span className="text-xs text-slate-400 self-center font-bold">+{seq.characters.length - 12}</span>}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedSequence({ id: seq.id, chars: seq.characters })}
                      className="flex-1 py-4 bg-rose-600 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {isTestPack ? 'Start Test' : 'Launch Session'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mode Selection Modal - now shown for all pack types */}
      {selectedSequence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={() => setSelectedSequence(null)}>
          <div
            className="bg-white dark:bg-[#16191e] rounded-[3rem] p-10 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Choose Test Mode</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">How much help do you want?</p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleLaunch(selectedSequence.chars, 'audio-only')}
                className="group w-full py-6 px-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between touch-manipulation"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🔊</span>
                  <div className="text-left">
                    <div className="text-white">Audio Only</div>
                    <div className="text-violet-200 text-[10px] font-bold tracking-wider normal-case">Listen and write - no hints!</div>
                  </div>
                </div>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>

              <button
                onClick={() => handleLaunch(selectedSequence.chars, 'audio-pinyin')}
                className="group w-full py-6 px-6 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between touch-manipulation"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🔊📝</span>
                  <div className="text-left">
                    <div className="text-white">Audio + Pinyin</div>
                    <div className="text-rose-200 text-[10px] font-bold tracking-wider normal-case">Hear it and see the pinyin</div>
                  </div>
                </div>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>

              <button
                onClick={() => handleLaunch(selectedSequence.chars)}
                className="group w-full py-5 px-6 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.98] transition-all flex items-center justify-between touch-manipulation"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">👁️</span>
                  <div className="text-left">
                    <div>Practice Mode</div>
                    <div className="text-slate-400 text-[10px] font-bold tracking-wider normal-case">See character while tracing</div>
                  </div>
                </div>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            <button
              onClick={() => setSelectedSequence(null)}
              className="mt-6 w-full py-3 text-slate-400 dark:text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 dark:hover:text-slate-300 transition-colors touch-manipulation"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkMenu;
