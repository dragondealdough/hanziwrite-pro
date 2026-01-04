
import React from 'react';
import { Category, CharacterData, AppMode } from '../types';

interface HomeworkMenuProps {
  category: Category;
  onSelectAssignment: (chars: CharacterData[]) => void;
  onBack: () => void;
}

const HomeworkMenu: React.FC<HomeworkMenuProps> = ({ category, onSelectAssignment, onBack }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-5 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-16">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 mb-8 text-slate-400 hover:text-rose-600 transition-colors"
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
              {category.sequences?.length || 0} Assignments Available
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {category.sequences?.map((seq) => (
          <div 
            key={seq.id} 
            onClick={() => onSelectAssignment(seq.characters)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelectAssignment(seq.characters)}
            className="group bg-white dark:bg-[#16191e] border border-slate-200/50 dark:border-slate-800 rounded-[3rem] p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer outline-none focus:ring-4 ring-rose-600/10"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight group-hover:text-rose-600 transition-colors">
                {seq.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {seq.characters.length} Targets
                </span>
              </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-10 flex-1 leading-relaxed">
              Targeted practice for characters found in {seq.name}. Focus on correct stroke order and radical structure.
            </p>

            <div className="mt-auto flex items-center justify-between">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600">Launch Session</span>
               <svg className="w-6 h-6 text-rose-600 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeworkMenu;
