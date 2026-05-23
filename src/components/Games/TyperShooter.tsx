import React, { useState, useEffect, useRef } from 'react';
import { GameProps } from './GameTypes';
import { Play, RotateCcw, XCircle, Crosshair, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WinAnimation } from './WinAnimation';

interface ShooterWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

export const TyperShooter: React.FC<GameProps> = ({ exercise, onFinish, onBack }) => {
  const [words, setWords] = useState<string[]>([]);
  const [activeWords, setActiveWords] = useState<ShooterWord[]>([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shots, setShots] = useState<{id: number, x: number, y: number}[]>([]);
  
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
    setLives(3);
    setInput('');
    setActiveWords([]);
    setShots([]);
    idCounter.current = 0;
    lastSpawnTime.current = Date.now();
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = () => {
      const now = Date.now();
      
      // Spawn new word from top, moving towards bottom
      if (now - lastSpawnTime.current > 1500 && activeWords.length < 4) {
        if (words.length > 0) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          const newWord: ShooterWord = {
            id: idCounter.current++,
            text: randomWord,
            x: Math.random() * 80 + 10,
            y: -10,
            speed: 0.1 + Math.random() * 0.1
          };
          setActiveWords(prev => [...prev, newWord]);
          lastSpawnTime.current = now;
        }
      }

      // Update positions
      setActiveWords(prev => {
        const next = prev.map(w => ({ ...w, y: w.y + w.speed }));
        const missed = next.filter(w => w.y > 100);
        if (missed.length > 0) {
          setLives(l => {
            const newLives = l - missed.length;
            if (newLives <= 0) setGameOver(true);
            return newLives;
          });
        }
        return next.filter(w => w.y <= 100);
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

    const matchedIndex = activeWords.findIndex(w => w.text === val.trim());
    if (matchedIndex !== -1) {
      const match = activeWords[matchedIndex];
      // Add a visual shot
      setShots(prev => [...prev, { id: Date.now(), x: match.x, y: match.y }]);
      
      setActiveWords(prev => prev.filter((_, i) => i !== matchedIndex));
      setScore(s => s + match.text.length * 15);
      setInput('');

      setTimeout(() => {
        setShots(prev => prev.slice(1));
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
          <div className="text-red-400">النقاط: {score}</div>
          <div className="text-app-accent">الدروع: {Array(Math.max(0, lives)).fill('🛡️').join('')}</div>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 relative bg-[#0a0a0c] rounded-xl overflow-hidden border border-red-500/20 shadow-inner">
        {/* Base / Turret UI */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-10 bg-red-500/20 rounded-t-full border-t-2 border-red-500 flex justify-center items-end pb-1">
          <Crosshair size={24} className="text-red-500" />
        </div>

        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <Crosshair size={64} className="text-red-500 mb-6" />
            <h2 className="text-3xl font-black text-white mb-8">قناص الكلمات</h2>
            <button onClick={startGame} className="flex items-center gap-2 bg-red-500 text-black px-8 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform">
              <Play fill="currentColor" /> ابدأ القنص
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20">
            {score >= 200 && <WinAnimation score={score} message="قناص محترف!" />}
            
            {score < 200 && (
              <>
                <XCircle size={64} className="text-red-500 mb-6 z-10" />
                <h2 className="text-4xl font-black text-white mb-2 z-10">تم تدمير القاعدة!</h2>
                <p className="text-2xl text-red-400 mb-8 z-10">النقاط: {score}</p>
              </>
            )}
            
            <div className="flex gap-4 z-20 relative mt-8">
              <button onClick={startGame} className="flex items-center gap-2 bg-app-surface border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
                <RotateCcw /> العودة للعب
              </button>
              <button onClick={() => onFinish(score)} className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                إنهاء وتسجيل
              </button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {shots.map(shot => (
            <motion.div
              key={shot.id}
              initial={{ scale: 0, opacity: 1, left: '50%', top: '100%' }}
              animate={{ scale: 2, opacity: 0, left: `${shot.x}%`, top: `${shot.y}%` }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute w-4 h-4 bg-red-500 rounded-full z-10 shadow-[0_0_20px_rgba(239,68,68,1)]"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          ))}
        </AnimatePresence>

        {activeWords.map(word => (
          <div
            key={word.id}
            className="absolute font-mono font-bold text-lg px-4 py-2 bg-red-500/10 border border-red-500/40 text-red-100 rounded bg-black/50 backdrop-blur shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            style={{ 
              left: `${word.x}%`, 
              top: `${word.y}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {word.text}
          </div>
        ))}
      </div>

      <div className="mt-6 z-10">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          disabled={!isPlaying || gameOver}
          placeholder="اكتب لتدمير الأهداف..."
          className="w-full bg-black/80 border-2 border-red-500/50 text-white text-center text-2xl p-4 rounded-xl outline-none focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all placeholder:text-white/20"
          autoFocus
        />
      </div>
    </div>
  );
};
