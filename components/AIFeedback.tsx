
import React, { useEffect, useState } from 'react';
import { AIInsight } from '../types';
import { getCharacterInsights } from '../services/geminiService';

interface AIFeedbackProps {
  character: string;
}

const AIFeedback: React.FC<AIFeedbackProps> = ({ character }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCharacterInsights(character);
        setInsight(data);
      } catch (err) {
        setError("AI Offline.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [character]);

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-[2rem]" />
        <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-[2rem]" />
      </div>
    );
  }

  if (error) return <div className="text-[10px] font-black uppercase text-rose-500 dark:text-rose-400 p-8 text-center bg-rose-50 dark:bg-rose-900/10 rounded-[2rem] border border-rose-100 dark:border-rose-900/20">{error}</div>;

  const FeedbackCard = ({ title, content, iconColor, icon }: { title: string, content: string | undefined, iconColor: string, icon: React.ReactNode }) => (
    <div className="bg-white dark:bg-[#1a1d23] rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-xl bg-opacity-10 ${iconColor.replace('text-', 'bg-')}`}>
          {icon}
        </div>
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200">{title}</h3>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
        {content}
      </p>
    </div>
  );

  return (
    <div className="space-y-4">
      <FeedbackCard
        title="Visual Mnemonic"
        content={insight?.mnemonic}
        iconColor="text-rose-500"
        icon={<svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
      />

      <FeedbackCard
        title="Modern Usage"
        content={insight?.usage}
        iconColor="text-emerald-500"
        icon={<svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>}
      />
    </div>
  );
};

export default AIFeedback;
