import React, { useEffect, useRef, useState, useCallback } from 'react';
import HanziWriter from 'hanzi-writer';
import { AppMode, QuizResult } from '../types';

interface WritingCanvasProps {
  character: string;
  mode: AppMode;
  onComplete: (result: QuizResult) => void;
  onMistake?: () => void;
  onSkipTracing?: () => void;
  canvasSize?: number;
  isDarkMode?: boolean;
}

const TIME_LIMIT = 10;

const WritingCanvas: React.FC<WritingCanvasProps> = ({ character, mode, onComplete, onMistake, onSkipTracing, canvasSize: propSize, isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const isLoopingRef = useRef(false);
  const [shake, setShake] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1); // 0.5 to 5x speed
  const animationSpeedRef = useRef(1);
  const lastUsedSpeedRef = useRef(1);

  const [internalSize, setInternalSize] = useState<number | null>(propSize || null);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentStrokeRef = useRef(0);

  const effectiveSize = propSize || internalSize;

  useEffect(() => {
    if (propSize) return;

    const updateSize = () => {
      if (outerRef.current) {
        const width = outerRef.current.offsetWidth;
        const size = Math.max(Math.min(width - 32, 450), 200);
        setInternalSize(size);
      }
    };

    updateSize();
    const observer = new ResizeObserver(() => updateSize());
    if (outerRef.current) observer.observe(outerRef.current);

    return () => observer.disconnect();
  }, [propSize]);

  const startQuiz = useCallback(() => {
    if (!writerRef.current) return;
    writerRef.current.quiz({
      quizStartStrokeNum: currentStrokeRef.current,
      leniency: 0.8, // Strict leniency for Skritter-like precision
      onCorrectStroke: () => {
        const nextIndex = currentStrokeRef.current + 1;
        currentStrokeRef.current = nextIndex;
        setCurrentStrokeIndex(nextIndex);
      },
      onMistake: () => {
        setMistakes(prev => prev + 1);
        setShake(true);
        setTimeout(() => setShake(false), 300);

        if (onMistake) onMistake();
        if (mode === AppMode.TIME_ATTACK) setTimeLeft(prev => Math.max(0, prev - 1.2));
      },
      onComplete: () => {
        if (timerRef.current) clearInterval(timerRef.current);
        const score = Math.max(0, 100 - (mistakes * 5));
        onComplete({ character, mistakes, completed: true, score });
      }
    });
  }, [character, mistakes, onComplete, onMistake, mode]);

  useEffect(() => {
    if (mode === AppMode.TIME_ATTACK) {
      setTimeLeft(TIME_LIMIT);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            if (timerRef.current) clearInterval(timerRef.current);
            if (writerRef.current) writerRef.current.cancelQuiz();
            onComplete({ character, mistakes: 10, completed: false, score: 0 });
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [mode, character, onComplete]);

  useEffect(() => {
    if (!containerRef.current || !effectiveSize) return;

    containerRef.current.innerHTML = '';
    setMistakes(0);
    setCurrentStrokeIndex(0);
    currentStrokeRef.current = 0;
    setTotalStrokes(0);
    setIsLooping(false);
    isLoopingRef.current = false;
    setShake(false);

    const writer = HanziWriter.create(containerRef.current, character, {
      width: effectiveSize,
      height: effectiveSize,
      padding: effectiveSize * 0.1,
      showOutline: mode === AppMode.PRACTICE,
      showCharacter: false,
      strokeAnimationSpeed: 0.6,
      strokeColor: isDarkMode ? '#ff4d6d' : '#e11d48',
      outlineColor: isDarkMode ? '#21262d' : '#f1f5f9',
      drawingColor: isDarkMode ? '#ffffff' : '#1e293b',
      drawingWidth: Math.max(10, effectiveSize * 0.05),
      // Ensure strictly correct stroke with strict leniency in quiz options
    });

    writerRef.current = writer;
    HanziWriter.loadCharacterData(character).then((data) => data && setTotalStrokes(data.strokes.length));
    startQuiz();

    return () => {
      if (writerRef.current) writerRef.current.cancelQuiz();
      isLoopingRef.current = false;
    };
  }, [character, mode, effectiveSize, startQuiz, isDarkMode]);

  const handleReset = () => {
    if (writerRef.current) {
      isLoopingRef.current = false;
      setIsLooping(false);
      writerRef.current.cancelQuiz();
      setMistakes(0);
      setCurrentStrokeIndex(0);
      currentStrokeRef.current = 0;
      setShake(false);
      if (mode === AppMode.TIME_ATTACK) setTimeLeft(TIME_LIMIT);
      startQuiz();
    }
  };

  const handleAnimate = async () => {
    if (!writerRef.current || !containerRef.current || !effectiveSize) return;

    if (isLooping) {
      isLoopingRef.current = false;
      setIsLooping(false);
      // Recreate writer with normal speed for quiz
      containerRef.current.innerHTML = '';
      const writer = HanziWriter.create(containerRef.current, character, {
        width: effectiveSize,
        height: effectiveSize,
        padding: effectiveSize * 0.1,
        showOutline: mode === AppMode.PRACTICE,
        showCharacter: false,
        strokeAnimationSpeed: 0.6,
        strokeColor: isDarkMode ? '#ff4d6d' : '#e11d48',
        outlineColor: isDarkMode ? '#21262d' : '#f1f5f9',
        drawingColor: isDarkMode ? '#ffffff' : '#1e293b',
        drawingWidth: Math.max(10, effectiveSize * 0.05),
        // checkStrokeConflict handled through quiz leniency
      });
      writerRef.current = writer;
      startQuiz();
      return;
    }

    // Cancel current quiz and create a NEW writer with the desired animation speed
    writerRef.current.cancelQuiz();
    containerRef.current.innerHTML = '';

    // Helper to create writer with current speed
    const createAnimWriter = (speed: number) => {
      const calculatedSpeed = 0.6 * speed * speed;
      return HanziWriter.create(containerRef.current!, character, {
        width: effectiveSize,
        height: effectiveSize,
        padding: effectiveSize * 0.1,
        showOutline: false,
        showCharacter: false,
        strokeAnimationSpeed: calculatedSpeed,
        strokeColor: isDarkMode ? '#ff4d6d' : '#e11d48',
        outlineColor: isDarkMode ? '#21262d' : '#f1f5f9',
        drawingColor: isDarkMode ? '#ffffff' : '#1e293b',
        drawingWidth: Math.max(10, effectiveSize * 0.05),
      });
    };

    let animWriter = createAnimWriter(animationSpeed);
    writerRef.current = animWriter;
    setIsLooping(true);
    isLoopingRef.current = true;
    lastUsedSpeedRef.current = animationSpeed;

    // Get stroke count for this character
    const charData = await HanziWriter.loadCharacterData(character);
    const strokeCount = charData?.strokes?.length ?? 0;

    while (isLoopingRef.current) {
      try {
        // Clear canvas and recreate writer at the start of each loop iteration
        // This ensures strokes don't accumulate between repetitions
        lastUsedSpeedRef.current = animationSpeedRef.current;
        containerRef.current!.innerHTML = '';
        animWriter = createAnimWriter(animationSpeedRef.current);
        writerRef.current = animWriter;

        // Animate stroke by stroke so delays respond to speed changes mid-character
        for (let strokeIndex = 0; strokeIndex < strokeCount && isLoopingRef.current; strokeIndex++) {
          // Check if speed changed since we created this writer - if so, recreate with new speed
          // Previous strokes won't be visible but animation continues smoothly from here
          if (animationSpeedRef.current !== lastUsedSpeedRef.current) {
            lastUsedSpeedRef.current = animationSpeedRef.current;
            containerRef.current!.innerHTML = '';
            animWriter = createAnimWriter(animationSpeedRef.current);
            writerRef.current = animWriter;
          }

          // Animate this single stroke
          await writerRef.current.animateStroke(strokeIndex);

          // Delay between strokes uses current speed from ref (responds to slider changes)
          if (strokeIndex < strokeCount - 1 && isLoopingRef.current) {
            await new Promise(resolve => setTimeout(resolve, Math.max(30, 150 / animationSpeedRef.current)));
          }
        }

        // Delay between character loops
        if (isLoopingRef.current) {
          await new Promise(resolve => setTimeout(resolve, Math.max(100, 400 / animationSpeedRef.current)));
        }
      } catch (e) {
        break;
      }
    }

    if (isLoopingRef.current === false) {
      setIsLooping(false);
      startQuiz();
    }
  };

  const handleHint = async () => {
    if (!writerRef.current) return;
    // Pause quiz to show hint
    writerRef.current.cancelQuiz();
    // Animate only the current stroke the user is stuck on
    await writerRef.current.animateStroke(currentStrokeRef.current);
    // Restart quiz from the current position
    startQuiz();
  };

  const isSmall = effectiveSize && effectiveSize < 280;

  return (
    <div ref={outerRef} className={`flex flex-col items-center ${isSmall ? 'gap-4' : 'gap-8'} w-full transition-opacity duration-300 ${!effectiveSize ? 'opacity-0' : 'opacity-100'}`}>
      {mode === AppMode.TIME_ATTACK && (
        <div className="w-full max-w-[400px] h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200/30">
          <div
            className={`h-full transition-all duration-100 ease-linear ${timeLeft < 3 ? 'bg-rose-500 animate-pulse' : 'bg-rose-600'}`}
            style={{ width: `${(timeLeft / TIME_LIMIT) * 100}%` }}
          />
        </div>
      )}

      <div className={`flex items-center ${isSmall ? 'gap-2 px-5 py-2' : 'gap-5 px-8 py-3.5'} bg-slate-900 dark:bg-[#16191e] text-white rounded-3xl shadow-2xl border border-slate-800 dark:border-slate-700/50`}>
        <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-0.5">Strokes</span>
          <div className="flex items-center gap-1.5 font-black">
            <span className={`${isSmall ? 'text-lg' : 'text-2xl'} text-rose-500`}>{currentStrokeIndex}</span>
            <span className="text-slate-600 text-sm">/</span>
            <span className={`${isSmall ? 'text-lg' : 'text-2xl'} text-slate-400`}>{totalStrokes || '--'}</span>
          </div>
        </div>
        <div className="w-px h-8 bg-slate-800 mx-1" />
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-0.5">Accuracy</span>
          <span className={`${isSmall ? 'text-lg' : 'text-2xl'} font-black ${mistakes === 0 ? 'text-emerald-500' : 'text-amber-500'}`}>
            {Math.max(0, 100 - mistakes * 5)}%
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{ width: effectiveSize || 320, height: effectiveSize || 320 }}
        className={`bg-white dark:bg-[#0d0f12] rounded-[3rem] shadow-2xl border-2 ${shake ? 'animate-shake border-rose-500 dark:border-rose-500' : (mode === AppMode.TIME_ATTACK ? 'border-rose-400' : 'border-slate-100 dark:border-slate-800')} relative overflow-hidden active:scale-[0.99] touch-none transition-colors duration-200`}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.1]">
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-900 dark:bg-slate-100" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-slate-900 dark:bg-slate-100" />
          <div className="absolute top-0 left-0 w-full h-full border-t border-l border-slate-900 dark:bg-slate-100 origin-top-left rotate-45 scale-[2]" />
          <div className="absolute top-0 right-0 w-full h-full border-t border-r border-slate-900 dark:bg-slate-100 origin-top-right -rotate-45 scale-[2]" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 w-full">
        <button onClick={handleReset} className="flex-1 max-w-[120px] py-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black text-[10px] uppercase tracking-widest rounded-2xl active:scale-95 transition-all">Reset</button>
        {mode === AppMode.PRACTICE && (
          <>
            <button
              onClick={handleAnimate}
              className={`flex-1 max-w-[160px] py-4 font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl active:scale-95 transition-all ${isLooping ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-900 dark:bg-rose-600 text-white'}`}
            >
              {isLooping ? 'Stop Loop' : 'Play Order'}
            </button>
            <button
              onClick={handleHint}
              className="flex-1 max-w-[120px] py-4 bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-amber-200 dark:border-amber-900/20 active:scale-95 transition-all"
            >
              Hint
            </button>
            {onSkipTracing && (
              <button
                onClick={onSkipTracing}
                className="flex-1 max-w-[120px] py-4 bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-violet-200 dark:border-violet-800/30 active:scale-95 transition-all"
              >
                Skip →
              </button>
            )}
          </>
        )}
      </div>

      {/* Speed Slider - only show in practice mode */}
      {mode === AppMode.PRACTICE && (
        <div className="flex items-center gap-3 w-full max-w-[360px] px-2">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap">Speed</span>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">0.75×</span>
            <input
              type="range"
              min="0.75"
              max="3.5"
              step="0.5"
              value={animationSpeed}
              onChange={(e) => {
                const newSpeed = parseFloat(e.target.value);
                setAnimationSpeed(newSpeed);
                animationSpeedRef.current = newSpeed;
              }}
              className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-rose-500"
            />
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">3.5×</span>
          </div>
          <span className="text-[10px] font-black text-rose-500 min-w-[40px] text-right">{animationSpeed}×</span>
        </div>
      )}
    </div>
  );
};

export default WritingCanvas;