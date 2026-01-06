import React from 'react';

interface ComponentPopupProps {
    character: string;
    components: string[];
    isOpen: boolean;
    onClose: () => void;
}

const ComponentPopup: React.FC<ComponentPopupProps> = ({ character, components, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200"
                onClick={onClose}
            />

            {/* Popup */}
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                <div
                    className="bg-white dark:bg-[#1a1d23] rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-w-sm w-full mx-4 pointer-events-auto animate-in zoom-in-95 fade-in duration-300"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🧩</span>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">
                                Components
                            </h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all touch-manipulation"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Character Display */}
                    <div className="text-center mb-6">
                        <div className="text-6xl font-medium text-slate-900 dark:text-slate-50 brush-font mb-2">
                            {character}
                        </div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                            is made of
                        </div>
                    </div>

                    {/* Components Grid */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {components.map((comp, index) => (
                            <React.Fragment key={index}>
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-900/10 rounded-2xl flex items-center justify-center border border-rose-200 dark:border-rose-800/30 shadow-sm">
                                        <span className="text-3xl font-medium text-rose-700 dark:text-rose-300 brush-font">
                                            {comp}
                                        </span>
                                    </div>
                                </div>
                                {index < components.length - 1 && (
                                    <div className="flex items-center text-slate-300 dark:text-slate-600 text-2xl font-light">
                                        +
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Footer hint */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                            Tap outside to close
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComponentPopup;
