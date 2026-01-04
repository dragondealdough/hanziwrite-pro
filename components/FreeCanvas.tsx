
import React, { useRef, useState, useEffect } from 'react';

interface FreeCanvasProps {
  character: string;
}

interface Point {
  x: number;
  y: number;
}

const FreeCanvas: React.FC<FreeCanvasProps> = ({ character }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showReference, setShowReference] = useState(false);
  
  // History is an array of strokes. Each stroke is an array of Points.
  const [history, setHistory] = useState<Point[][]>([]);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);

  // Canvas setup and resize handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { offsetWidth } = containerRef.current;
        // Cap size for desktop, but fill container on mobile
        const size = Math.min(offsetWidth - 40, 400);
        
        // Handle High DPI screens
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = size * dpr;
        canvasRef.current.height = size * dpr;
        canvasRef.current.style.width = `${size}px`;
        canvasRef.current.style.height = `${size}px`;
        
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = '#1e293b'; // slate-800
          ctx.lineWidth = 4;
          redraw(ctx, history);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [history]); // Re-bind if history changes to ensure we can redraw on resize

  const redraw = (ctx: CanvasRenderingContext2D, strokes: Point[][]) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    strokes.forEach(stroke => {
      if (stroke.length < 1) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent): Point | null => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    
    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    const coords = getCoordinates(e);
    if (coords) {
      setIsDrawing(true);
      setCurrentStroke([coords]);
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing || !canvasRef.current) return;
    
    const coords = getCoordinates(e);
    if (coords) {
      setCurrentStroke(prev => [...prev, coords]);
      
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        // Draw just the new segment for performance
        const lastPoint = currentStroke[currentStroke.length - 1] || coords;
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      if (currentStroke.length > 0) {
        setHistory(prev => [...prev, currentStroke]);
      }
      setCurrentStroke([]);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        redraw(ctx, newHistory);
      }
    }
  };

  const handleClear = () => {
    setHistory([]);
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
    }
  };

  // Whenever character changes, clear the canvas
  useEffect(() => {
    handleClear();
    setShowReference(false);
  }, [character]);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 w-full">
      <div className="flex items-center gap-3 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg border border-indigo-500">
        <span className="text-xs font-bold uppercase tracking-widest">Free Canvas Mode</span>
      </div>

      <div className="relative group">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          style={{ 
            touchAction: 'none',
            cursor: 'crosshair',
          }}
          className="bg-white rounded-xl shadow-2xl border-4 border-slate-100 cursor-crosshair active:cursor-crosshair"
        />
        
        {/* Reference Box */}
        {showReference && (
          <div className="absolute top-4 right-4 w-20 h-20 bg-white border border-slate-200 shadow-xl rounded-lg flex items-center justify-center pointer-events-none animate-in fade-in zoom-in-95 duration-200">
            <span className="text-5xl font-medium text-slate-800">{character}</span>
            <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[10px] px-1.5 py-0.5 rounded shadow">Ref</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setShowReference(!showReference)}
          className={`px-4 py-2 ${showReference ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-white border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50'} font-bold rounded-xl transition-all flex items-center gap-2 text-sm shadow-sm`}
        >
          {showReference ? (
             <>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
               Hide Ref
             </>
          ) : (
            <>
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
               Reveal Ref
            </>
          )}
        </button>

        <button 
          onClick={handleUndo}
          disabled={history.length === 0}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-bold rounded-xl transition-all flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
          Undo
        </button>

        <button 
          onClick={handleClear}
          className="px-4 py-2 bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-600 font-bold rounded-xl transition-all flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          Clear
        </button>
      </div>

      <div className="text-center max-w-xs">
        <p className="text-slate-400 text-xs italic">
           Freestyle mode: Practice muscle memory without automatic grading.
        </p>
      </div>
    </div>
  );
};

export default FreeCanvas;
