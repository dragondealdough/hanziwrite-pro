
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.sequences?.map((seq) => (
          <div
            key={seq.id}
            onClick={() => setSelectedSequence({ id: seq.id, chars: seq.characters })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedSequence({ id: seq.id, chars: seq.characters })}
            className="group bg-white dark:bg-[#16191e] border border-slate-200/50 dark:border-slate-800 rounded-[3rem] p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer outline-none focus:ring-4 ring-rose-600/10 touch-manipulation"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-rose-600 transition-colors">
                {seq.name}
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {seq.characters.length} Targets
                </span>
              </div>

              {/* Character Preview */}
              <div className="flex flex-wrap gap-1 mb-4">
                {(seq.characters || []).slice(0, 8).map((c, idx) => (
                  <span key={`${seq.id}-${c.char}-${idx}`} className="text-sm brush-font text-slate-500 dark:text-slate-400 opacity-80">{c.char}</span>
                ))}
                {(seq.characters || []).length > 8 && <span className="text-[9px] text-slate-400 self-center">...</span>}
              </div>
            </div>



            <div className="mt-auto flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600">
                {isTestPack ? 'Start Test' : 'Launch Session'}
              </span>
              <svg className="w-6 h-6 text-rose-600 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        ))}
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
