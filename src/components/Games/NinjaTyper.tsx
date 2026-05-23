import React, { useState, useEffect, useRef } from 'react';
import { GameProps } from './GameTypes';
import { Play, RotateCcw, XCircle, Swords, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WinAnimation } from './WinAnimation';

interface NinjaWord {
  id: number;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  sliced: boolean;
}

export const NinjaTyper: React.FC<GameProps> = ({ exercise, onFinish, onBack }) => {
  const [words, setWords] = useState<string[]>([]);
  const [activeWords, setActiveWords] = useState<NinjaWord[]>([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [slashSparks, setSlashSparks] = useState<{id: number, x: number, y: number}[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const idCounter = useRef(0);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    const allWords = exercise.content.split(/[\\s\\n]+/).filter(w => w.trim() !== '');
    setWords(allWords);
  }, [exercise]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setLives(5);
    setInput('');
    setActiveWords([]);
    setSlashSparks([]);
    idCounter.current = 0;
    lastSpawnTime.current = Date.now();
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    let lastTime = performance.now();

    const gameLoop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;
      const now = Date.now();
      
      // Spawn new word
      if (now - lastSpawnTime.current > 1200 && activeWords.length < 6) {
        if (words.length > 0) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          const startX = Math.random() * 60 + 20; // 20% to 80%
          
          const newWord: NinjaWord = {
            id: idCounter.current++,
            text: randomWord,
            x: startX,
            y: 110, // starts below screen
            vx: (Math.random() - 0.5) * 15, // horizontal drift
            vy: - (80 + Math.random() * 30), // upward velocity
            sliced: false
          };
          setActiveWords(prev => [...prev, newWord]);
          lastSpawnTime.current = now;
        }
      }

      // Physics update
      setActiveWords(prev => {
        let missedCount = 0;
        const next = prev.map(w => {
          if (w.sliced) return w; // don't apply normal physics if dying
          const newVy = w.vy + 40 * dt; // gravity
          const newY = w.y + newVy * dt;
          const newX = w.x + w.vx * dt;
          return { ...w, x: newX, y: newY, vy: newVy };
        });

        // Filter out words that fell back down completely
        const filtered = next.filter(w => {
          if (w.y > 120 && w.vy > 0) {
            if (!w.sliced) missedCount++;
            return false;
          }
          return true;
        });

        if (missedCount > 0) {
          setLives(l => {
            const newLives = l - missedCount;
            if (newLives <= 0) setGameOver(true);
            return newLives;
          });
        }
        return filtered;
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, gameOver, words, activeWords.length]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    const matches = activeWords.filter(w => !w.sliced && w.text === val.trim());
    if (matches.length > 0) {
      // Find the one closest to falling
      const match = matches.reduce((prev, current) => (prev.vy > current.vy) ? prev : current);
      
      // Mark as sliced
      setActiveWords(prev => prev.map(w => w.id === match.id ? { ...w, sliced: true } : w));
      setSlashSparks(prev => [...prev, { id: Date.now(), x: match.x, y: match.y }]);
      setScore(s => s + match.text.length * 20);
      setInput('');

      // Remove after slice animation
      setTimeout(() => {
        setActiveWords(prev => prev.filter(w => w.id !== match.id));
      }, 400);

      setTimeout(() => {
        setSlashSparks(prev => prev.filter(s => s.id !== match.id)); // approx
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-app-surface/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden" dir={exercise.language === 'en' ? 'ltr' : 'rtl'}>
      <div className="flex justify-between items-center mb-4 z-10 block">
        <button onClick={onBack} className="text-app-text-muted hover:text-white transition-colors bg-black/40 p-2 rounded-lg">
          العودة
        </button>
        <div className="flex gap-6 text-xl font-bold">
          <div className="text-emerald-400">النقاط: {score}</div>
          <div className="text-red-400">القلوب: {Array(Math.max(0, lives)).fill('❤️').join('')}</div>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 relative bg-gradient-to-b from-[#0a0a0c] to-[#1a1c23] rounded-xl overflow-hidden border border-emerald-500/20 shadow-inner">
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <Swords size={64} className="text-emerald-500 mb-6" />
            <h2 className="text-3xl font-black text-white mb-8">نينجا الطباعة</h2>
            <button onClick={startGame} className="flex items-center gap-2 bg-emerald-500 text-black px-8 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform">
              <Play fill="currentColor" /> اقطع الكلمات
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20">
            {score >= 200 && <WinAnimation score={score} message="نينجا حقيقي!" />}
            
            {score < 200 && (
              <>
                <XCircle size={64} className="text-red-500 mb-6 z-10" />
                <h2 className="text-4xl font-black text-white mb-2 z-10">انتهت اللعبة!</h2>
                <p className="text-2xl text-emerald-400 mb-8 z-10">النقاط: {score}</p>
              </>
            )}
            
            <div className="flex gap-4 z-20 relative mt-8">
              <button onClick={startGame} className="flex items-center gap-2 bg-app-surface border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
                <RotateCcw /> العودة للعب
              </button>
              <button onClick={() => onFinish(score)} className="flex items-center gap-2 bg-emerald-500 text-black px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                إنهاء وتسجيل
              </button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {slashSparks.map(spark => (
            <motion.div
              key={spark.id}
              initial={{ scale: 0.5, opacity: 1, rotate: -45 }}
              animate={{ scale: 2.5, opacity: 0, rotate: 45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-24 h-1 bg-white rounded-full z-10 shadow-[0_0_20px_rgba(255,255,255,1)]"
              style={{ left: `${spark.x}%`, top: `${spark.y}%`, transformOrigin: 'center' }}
            />
          ))}
        </AnimatePresence>

        {activeWords.map(word => (
          <motion.div
            key={word.id}
            initial={{ scale: 1, opacity: 1 }}
            animate={word.sliced ? { scale: 1.5, opacity: 0, filter: 'blur(10px)' } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`absolute font-bold text-xl px-4 py-2 border rounded shadow-xl whitespace-nowrap ${
              word.sliced 
                ? 'bg-red-500 text-white border-red-400' 
                : 'bg-[#2a2c33] text-emerald-100 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
            }`}
            style={{ 
              left: `${word.x}%`, 
              top: `${word.y}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 z-10">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          disabled={!isPlaying || gameOver}
          placeholder="اكتب بأقصى سرعة لتقطيع الكلمات..."
          className="w-full bg-black/80 border-2 border-emerald-500/50 text-white text-center text-2xl p-4 rounded-xl outline-none focus:border-emerald-500 focus:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all placeholder:text-white/20"
          autoFocus
        />
      </div>
    </div>
  );
};
