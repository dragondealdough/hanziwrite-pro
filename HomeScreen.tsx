
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category, CharacterData } from './types';

interface HomeScreenProps {
  onSelectCategory: (category: Category, mode: 'individual' | 'combined', sequenceChars?: CharacterData[]) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full max-w-6xl px-6 py-12 md:py-20">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-6 brush-font tracking-tight">
          墨 <span className="text-rose-600">HanziWrite</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
          The art of calligraphy meets digital precision. Master your Mandarin writing with AI-guided stroke detection.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            className="group bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-2xl hover:border-rose-200 transition-all duration-500 flex flex-col h-full relative overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-rose-50 transition-colors duration-500 -z-0" />
            
            <div className="text-6xl mb-6 relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              {cat.icon}
            </div>
            
            <div className="relative z-10 mb-2">
              <h3 className="text-2xl font-black text-slate-800">{cat.name}</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">
                {cat.isSpecial ? `${cat.sequences?.length} Sequences` : `${cat.characters.length} Characters`}
              </span>
            </div>

            <p className="text-slate-500 text-sm mb-10 flex-1 relative z-10 leading-relaxed font-medium">
              {cat.description}
            </p>
            
            <div className="flex flex-col gap-3 relative z-10">
              {!cat.isSpecial && (
                <button 
                  onClick={() => onSelectCategory(cat, 'individual')}
                  className="w-full py-4 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-2xl font-black text-slate-700 transition-all flex justify-between items-center px-6 text-[10px] uppercase tracking-widest shadow-sm"
                >
                  <span>Browse & Practice</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
              
              {cat.isSpecial && cat.sequences && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 mb-1">Select Name to Practice</span>
                  {cat.sequences.map((seq) => (
                    <button 
                      key={seq.id}
                      onClick={() => onSelectCategory(cat, 'combined', seq.characters)}
                      className="w-full py-4 bg-white border border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white rounded-2xl font-black shadow-sm transition-all transform hover:-translate-y-1 flex justify-between items-center px-6 text-[14px] uppercase tracking-widest"
                    >
                      <span>{seq.name}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-24 pt-12 border-t border-slate-200 flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{CATEGORIES.reduce((acc, cat) => acc + (cat.characters.length || cat.sequences?.reduce((s, seq) => s + seq.characters.length, 0) || 0), 0)} Total Characters</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Real-time Feedback</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>HSK 1 Certified</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeScreen;
