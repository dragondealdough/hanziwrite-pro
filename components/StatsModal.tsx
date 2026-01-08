import React, { useState } from 'react';

interface CharProgress {
    char: string;
    mistakesThisRound: number;
    perfectRounds: number;
    mastered: boolean;
    totalAttempts: number;
    totalMistakes: number;
    lastPracticed: number;
}

interface StatsModalProps {
    charProgress: CharProgress[];
    onClose: () => void;
}

const StatsModal: React.FC<StatsModalProps> = ({ charProgress, onClose }) => {
    const [activeTab, setActiveTab] = useState<'perfected' | 'hardest'>('perfected');

    // Calculate Most Perfected
    const perfectedChars = charProgress
        .filter(c => c.mastered || c.perfectRounds > 0)
        .sort((a, b) => {
            // Sort by mastery first, then perfect rounds
            if (a.mastered && !b.mastered) return -1;
            if (!a.mastered && b.mastered) return 1;
            return b.perfectRounds - a.perfectRounds;
        })
        .slice(0, 10);

    // Calculate Hardest
    const hardestChars = charProgress
        .filter(c => c.totalMistakes > 0)
        .sort((a, b) => {
            // Sort by error rate: totalMistakes / totalAttempts
            const rateA = a.totalAttempts > 0 ? a.totalMistakes / a.totalAttempts : 0;
            const rateB = b.totalAttempts > 0 ? b.totalMistakes / b.totalAttempts : 0;
            return rateB - rateA;
        })
        .slice(0, 10);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
            <div className="bg-white dark:bg-[#16191e] rounded-[2rem] p-6 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in-95 max-h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        📊 Statistics
                    </h2>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-slate-100 dark:bg-[#0d0f12] rounded-xl mb-6">
                    <button
                        onClick={() => setActiveTab('perfected')}
                        className={`flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'perfected' ? 'bg-white dark:bg-[#16191e] text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                    >
                        🏆 Perfected
                    </button>
                    <button
                        onClick={() => setActiveTab('hardest')}
                        className={`flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'hardest' ? 'bg-white dark:bg-[#16191e] text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                    >
                        🧗 Hardest
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto min-h-[300px]">
                    {activeTab === 'perfected' ? (
                        <div className="space-y-3">
                            {perfectedChars.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 font-bold">No perfected characters yet.<br /><span className="text-xs font-normal">Keep practicing!</span></div>
                            ) : (
                                perfectedChars.map((char, index) => (
                                    <div key={char.char} className="flex items-center bg-slate-50 dark:bg-[#0d0f12] p-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors">
                                        <div className="w-8 font-black text-slate-300 italic">#{index + 1}</div>
                                        <div className="text-3xl brush-font text-slate-900 dark:text-white mr-4">{char.char}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                {char.mastered ? (
                                                    <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-[9px] font-black uppercase px-2 py-1 rounded-md tracking-wider">Mastered</span>
                                                ) : (
                                                    <span className="text-xs font-bold text-slate-500">In Progress</span>
                                                )}
                                            </div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                {char.perfectRounds} perfect rounds
                                            </div>
                                        </div>
                                        {index === 0 && <div className="text-2xl">👑</div>}
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {hardestChars.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 font-bold">No mistakes recorded!<br /><span className="text-xs font-normal">You're doing great!</span></div>
                            ) : (
                                hardestChars.map((char, index) => {
                                    const errorRate = Math.round((char.totalMistakes / char.totalAttempts) * 100);
                                    return (
                                        <div key={char.char} className="flex items-center bg-slate-50 dark:bg-[#0d0f12] p-4 rounded-2xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors">
                                            <div className="w-8 font-black text-slate-300 italic">#{index + 1}</div>
                                            <div className="text-3xl brush-font text-slate-900 dark:text-white mr-4">{char.char}</div>
                                            <div className="flex-1">
                                                <div className="text-rose-500 font-bold text-sm">{errorRate}% Error Rate</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                    {char.totalMistakes} mistakes / {char.totalAttempts} tries
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    )}
                </div>

                <button onClick={onClose} className="mt-6 w-full py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
};

export default StatsModal;
