import React, { useState } from 'react';
import { CharacterData, NameSequence, Category } from '../types';
import { CATEGORIES } from '../constants';

interface AdminPanelProps {
    onClose: () => void;
    onSave: (sequence: NameSequence) => void;
    existingSequences: NameSequence[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onSave, existingSequences }) => {
    const [packName, setPackName] = useState('');
    const [inputChars, setInputChars] = useState('');
    const [preview, setPreview] = useState<CharacterData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handlePreview = () => {
        const chars = inputChars.trim().split('');
        const foundChars: CharacterData[] = [];
        const missingChars: string[] = [];

        chars.forEach(char => {
            // Find character data from local categories
            let found: CharacterData | undefined;

            // Search in all categories
            for (const cat of CATEGORIES) {
                // Search in direct characters
                found = cat.characters?.find(c => c.char === char);
                if (found) break;

                // Search in sequences
                if (cat.sequences) {
                    for (const seq of cat.sequences) {
                        found = seq.characters.find(c => c.char === char);
                        if (found) break;
                    }
                }
                if (found) break;
            }

            if (found) {
                // Avoid duplicates in the preview
                if (!foundChars.some(c => c.char === found!.char)) {
                    foundChars.push(found);
                }
            } else {
                // If not found, create a minimal placeholder or error
                // For now, we'll just skip or add a placeholder? 
                // Better to list missing chars
                // But for "Test" packs, maybe we assume they exist in the DB?
                // Let's create a minimal object for missing ones so the admin can see they are unsupported
                missingChars.push(char);
            }
        });

        if (missingChars.length > 0) {
            setError(`Characters not found in database: ${missingChars.join(', ')}`);
        } else {
            setError(null);
        }

        setPreview(foundChars);
    };

    const handleSave = () => {
        if (!packName.trim()) {
            setError("Please enter a pack name");
            return;
        }
        if (preview.length === 0) {
            setError("Please add at least one valid character");
            return;
        }

        const newSequence: NameSequence = {
            id: `test-pack-${Date.now()}`,
            name: packName.trim(),
            characters: preview
        };

        onSave(newSequence);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div
                className="bg-white dark:bg-[#16191e] rounded-[2rem] p-8 max-w-2xl w-full mx-4 shadow-2xl animate-in zoom-in-95 border-2 border-slate-100 dark:border-slate-800 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Admin: Create Test Pack</h2>
                        <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mt-1">Authorized Access Only</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                        <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="space-y-6 overflow-y-auto flex-1 px-1">
                    <div>
                        <label className="block text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2">Pack Name</label>
                        <input
                            type="text"
                            value={packName}
                            onChange={(e) => setPackName(e.target.value)}
                            placeholder="e.g. HSK 1 Review B"
                            className="w-full px-6 py-4 bg-slate-50 dark:bg-[#0d0f12] rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white focus:ring-2 ring-rose-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2">Input Characters</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputChars}
                                onChange={(e) => setInputChars(e.target.value)}
                                placeholder="Paste characters here (e.g. 你好我是)"
                                className="flex-1 px-6 py-4 bg-slate-50 dark:bg-[#0d0f12] rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-900 dark:text-white focus:ring-2 ring-rose-500 outline-none"
                            />
                            <button
                                onClick={handlePreview}
                                className="px-6 py-2 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                            >
                                Check
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900 rounded-xl text-rose-600 dark:text-rose-400 text-sm font-bold">
                            {error}
                        </div>
                    )}

                    {preview.length > 0 && (
                        <div>
                            <label className="block text-xs font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest mb-2">Preview ({preview.length})</label>
                            <div className="flex flex-wrap gap-2 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                {preview.map((c, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                        <span className="text-2xl brush-font text-slate-800 dark:text-slate-200">{c.char}</span>
                                        <span className="text-[10px] text-slate-400">{c.pinyin}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={preview.length === 0}
                        className="px-8 py-3 bg-rose-600 text-white font-black rounded-xl shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Publish Pack
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
