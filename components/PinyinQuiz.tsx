import React, { useState, useRef, useEffect } from 'react';

interface PinyinQuizProps {
    character: string;
    correctPinyin: string; // e.g. "má" or "ma2"
    onCorrect: () => void;
    onIncorrect: () => void;
    isDarkMode?: boolean;
}

// Convert tone-marked pinyin to numbered format for comparison
const normalizePinyin = (pinyin: string): string => {
    const toneMap: Record<string, [string, number]> = {
        'ā': ['a', 1], 'á': ['a', 2], 'ǎ': ['a', 3], 'à': ['a', 4],
        'ē': ['e', 1], 'é': ['e', 2], 'ě': ['e', 3], 'è': ['e', 4],
        'ī': ['i', 1], 'í': ['i', 2], 'ǐ': ['i', 3], 'ì': ['i', 4],
        'ō': ['o', 1], 'ó': ['o', 2], 'ǒ': ['o', 3], 'ò': ['o', 4],
        'ū': ['u', 1], 'ú': ['u', 2], 'ǔ': ['u', 3], 'ù': ['u', 4],
        'ǖ': ['ü', 1], 'ǘ': ['ü', 2], 'ǚ': ['ü', 3], 'ǜ': ['ü', 4],
    };

    let result = pinyin.toLowerCase();
    let tone = 5; // neutral

    for (const [marked, [base, t]] of Object.entries(toneMap)) {
        if (result.includes(marked)) {
            result = result.replace(marked, base);
            tone = t;
            break;
        }
    }

    return tone === 5 ? result : `${result}${tone}`;
};

const PinyinQuiz: React.FC<PinyinQuizProps> = ({ character, correctPinyin, onCorrect, onIncorrect, isDarkMode }) => {
    const [input, setInput] = useState('');
    const [selectedTone, setSelectedTone] = useState<number | null>(null);
    const [shake, setShake] = useState(false);
    const [showCorrect, setShowCorrect] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = () => {
        if (!input.trim()) return;

        const userAnswer = selectedTone ? `${input.toLowerCase()}${selectedTone}` : input.toLowerCase();
        const normalized = normalizePinyin(correctPinyin);

        if (userAnswer === normalized || input.toLowerCase() === correctPinyin.toLowerCase()) {
            onCorrect();
        } else {
            setShake(true);
            setShowCorrect(true);
            setTimeout(() => {
                setShake(false);
                onIncorrect();
            }, 1500);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <div className={`flex flex-col items-center gap-6 p-8 ${shake ? 'animate-shake' : ''}`}>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">What's the pinyin?</div>

            <div className="text-8xl brush-font text-slate-900 dark:text-white">{character}</div>

            {showCorrect && (
                <div className="text-lg font-bold text-rose-500">Correct: {correctPinyin}</div>
            )}

            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type pinyin..."
                    className="w-full px-6 py-4 bg-white dark:bg-[#0d0f12] border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-center text-2xl font-bold text-slate-900 dark:text-white focus:border-rose-500 focus:outline-none transition-colors"
                    autoComplete="off"
                    autoCapitalize="off"
                />

                {/* Tone Buttons */}
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((tone) => (
                        <button
                            key={tone}
                            onClick={() => setSelectedTone(selectedTone === tone ? null : tone)}
                            className={`w-12 h-12 rounded-xl font-black text-lg transition-all active:scale-95 ${selectedTone === tone
                                    ? 'bg-rose-600 text-white shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                }`}
                        >
                            {tone === 5 ? '·' : tone}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!input.trim()}
                    className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Check
                </button>
            </div>
        </div>
    );
};

export default PinyinQuiz;
