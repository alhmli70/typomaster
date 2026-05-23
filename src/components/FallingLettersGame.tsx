import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Heart } from 'lucide-react';

const WORDS = [
  'const', 'let', 'function', 'return', 'async', 'await', 
  'React', 'useState', 'useEffect', 'map', 'filter', 'reduce',
  'interface', 'type', 'boolean', 'string', 'number', 'array'
];

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

export const FallingLettersGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [words, setWords] = useState<FallingWord[]>([]);
  const [input, setInput] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const wordIdCounter = useRef(0);

  const spawnWord = (timestamp: number) => {
    if (timestamp - lastSpawnRef.current > 2000) {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth - 100;
        const x = Math.random() * width;
        const newWord: FallingWord = {
          id: wordIdCounter.current++,
          text: WORDS[Math.floor(Math.random() * WORDS.length)],
          x: x,
          y: -50,
          speed: 1 + Math.random() * 1.5 + (score / 100), // Speed increases with score
        };
        setWords(prev => [...prev, newWord]);
      }
      lastSpawnRef.current = timestamp;
    }
  };

  const updateWords = (timestamp: number) => {
    if (!isPlaying || isGameOver) return;

    setWords(prev => {
      const next = prev.map(w => ({ ...w, y: w.y + w.speed }));
      
      if (containerRef.current) {
        const height = containerRef.current.clientHeight;
        const reachedBottom = next.filter(w => w.y > height);
        
        if (reachedBottom.length > 0) {
          setLives(l => {
            const newLives = l - reachedBottom.length;
            if (newLives <= 0) {
              setIsGameOver(true);
              setIsPlaying(false);
            }
            return newLives;
          });
        }
        
        return next.filter(w => w.y <= height);
      }
      return next;
    });

    spawnWord(timestamp);
    animationRef.current = requestAnimationFrame(updateWords);
  };

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      animationRef.current = requestAnimationFrame(updateWords);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, isGameOver, score]);

  useEffect(() => {
    if (isPlaying) {
      const match = words.find(w => w.text === input);
      if (match) {
        setWords(prev => prev.filter(w => w.id !== match.id));
        setScore(s => s + match.text.length * 10);
        setInput('');
      } else {
        // If they type completely wrong? Here they have to press backspace or it just matches substrings.
        // Actually, if input is fully wrong and no word starts with input, clear it?
        const partialMatch = words.some(w => w.text.startsWith(input));
        if (!partialMatch && input.length > 0) {
          // Play error sound or flash red, let's just clear for now if it's completely off track.
          // Optional: clear input if it's 100% wrong
        }
      }
    }
  }, [input, isPlaying, words]);

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setLives(3);
    setWords([]);
    setInput('');
    lastSpawnRef.current = performance.now();
  };

  return (
    <div className="flex flex-col gap-6 w-full h-[600px] bg-app-surface border border-app-text-muted/20 rounded-2xl relative overflow-hidden select-none">
      
      {/* Header Stats */}
      <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-10 bg-gradient-to-b from-app-surface to-transparent">
        <div className="flex gap-2 text-app-accent font-bold text-xl items-center">
          <Trophy size={20} />
          {score}
        </div>
        <div className="flex gap-1" dir="ltr">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} size={24} className={i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'} />
          ))}
        </div>
      </div>

      {/* Game Area */}
      <div 
        ref={containerRef} 
        className="flex-1 relative overflow-hidden z-0"
        onClick={() => {
           document.getElementById('game-input')?.focus();
        }}
      >
        {words.map(w => (
          <div 
            key={w.id} 
            className="absolute text-xl font-mono px-3 py-1 bg-app-bg/80 border border-app-accent/30 text-white rounded-md shadow-[0_0_10px_rgba(255,200,0,0.1)] whitespace-nowrap"
            style={{ 
              transform: `translate(${w.x}px, ${w.y}px)`, 
              transition: 'transform 0.05s linear' 
            }}
          >
            {/* Highlight matched part */}
            {w.text.startsWith(input) && input.length > 0 ? (
              <>
                <span className="text-app-accent">{input}</span>
                <span className="text-white">{w.text.slice(input.length)}</span>
              </>
            ) : w.text}
          </div>
        ))}
      </div>

      {/* Input / Control Area */}
      <div className="p-4 border-t border-app-text-muted/10 bg-app-bg/50 flex justify-center z-10">
        {!isPlaying && !isGameOver ? (
          <button 
            onClick={startGame}
            className="px-8 py-3 bg-app-accent text-black font-bold rounded-lg flex items-center gap-2 hover:bg-yellow-400 transition-colors shadow-[0_0_15px_rgba(255,200,0,0.3)]"
          >
            <Play size={20} />
            ابدأ اللعب
          </button>
        ) : isGameOver ? (
          <div className="flex flex-col items-center gap-4">
             <div className="text-2xl font-black text-red-400">انتهت اللعبة! الأرواح نفدت.</div>
             <button 
                onClick={startGame}
                className="px-8 py-3 bg-app-surface border border-app-text-muted/30 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-app-text-muted/10 transition-colors"
              >
                <RotateCcw size={20} />
                حاول مرة أخرى
              </button>
          </div>
        ) : (
          <input 
            id="game-input"
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value.trim().toLowerCase())}
            className="w-full max-w-md bg-app-surface border-2 border-app-accent/50 rounded-xl px-6 py-3 text-2xl font-mono text-center outline-none focus:border-app-accent shadow-[0_0_15px_rgba(255,200,0,0.15)] transition-all"
            placeholder="اكتب لتدمير الكلمات..."
            autoFocus
            autoComplete="off"
            spellCheck="false"
            dir="ltr"
          />
        )}
      </div>

    </div>
  );
};
