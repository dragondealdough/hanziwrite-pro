
import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: (name: string, pin: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [pin, setPin] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && pin.length >= 4) {
      onLogin(name.trim(), pin);
    } else {
      alert("Enter your name and a 4-digit PIN.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfcfc] dark:bg-[#0d0f12] flex flex-col items-center justify-center px-6 transition-colors duration-500">
      <div className="w-full max-sm text-center">
        <div className="mb-12 inline-flex flex-col items-center justify-center p-10 bg-white dark:bg-[#16191e] rounded-[5rem] shadow-2xl shadow-rose-600/10 dark:shadow-none border border-slate-200/50 dark:border-slate-800 animate-in zoom-in duration-700 select-none">
           <div className="brush-font text-[10rem] text-slate-900 dark:text-white leading-[0.7] transform hover:rotate-6 transition-transform cursor-pointer">墨</div>
           <div className="text-rose-600 font-black text-4xl mt-6 italic tracking-tighter">HanziWrite</div>
        </div>
        
        <div className="space-y-2 mb-12">
          <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 uppercase tracking-[0.6em]">Login</h2>
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest leading-relaxed">no registration needed</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase ml-5 tracking-[0.3em]">Username</label>
            <input 
              required
              type="text" 
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-8 py-5 bg-white dark:bg-[#16191e] rounded-[2rem] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold focus:ring-4 ring-rose-600/10 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>
          
          <div className="space-y-2.5">
            <label className="text-[10px] font-black text-slate-400 dark:text-slate-700 uppercase ml-5 tracking-[0.3em]">Access PIN (4 Digits)</label>
            <input 
              required
              type="password" 
              placeholder="••••"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-8 py-5 bg-white dark:bg-[#16191e] rounded-[2rem] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-black tracking-[1.5em] focus:ring-4 ring-rose-600/10 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-5 bg-slate-900 dark:bg-rose-600 text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] shadow-2xl hover:bg-rose-600 dark:hover:bg-rose-700 active:scale-95 transition-all duration-300 mt-6"
          >
            Authenticate
          </button>
        </form>

        <div className="mt-16 flex flex-col items-center gap-2">
          <p className="text-slate-300 dark:text-slate-800 text-[10px] font-bold uppercase tracking-[0.2em]">Private & Local Storage</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
