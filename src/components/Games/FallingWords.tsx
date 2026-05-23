import React, { useState, useEffect, useRef } from 'react';
import { GameProps } from './GameTypes';
import { Play, RotateCcw, XCircle, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WinAnimation } from './WinAnimation';

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

export const FallingWords: React.FC<GameProps> = ({ exercise, onFinish, onBack }) => {
  const [words, setWords] = useState<string[]>([]);
  const [activeWords, setActiveWords] = useState<FallingWord[]>([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const idCounter = useRef(0);
  const lastSpawnTime = useRef(0);

  useEffect(() => {
    // Generate words from exercise content
    const allWords = exercise.content.split(/[\s\n]+/).filter(w => w.trim() !== '');
    setWords(allWords);
  }, [exercise]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setInput('');
    setActiveWords([]);
    idCounter.current = 0;
    lastSpawnTime.current = Date.now();
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameLoop = () => {
      const now = Date.now();
      
      // Spawn new word
      if (now - lastSpawnTime.current > 2000 && activeWords.length < 5) {
        if (words.length > 0) {
          const randomWord = words[Math.floor(Math.random() * words.length)];
          const newWord: FallingWord = {
            id: idCounter.current++,
            text: randomWord,
            x: Math.random() * 80 + 10, // 10% to 90%
            y: -10,
            speed: 0.05 + Math.random() * 0.05
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

    // Check if typed word matches any active word
    const matchedIndex = activeWords.findIndex(w => w.text === val.trim());
    if (matchedIndex !== -1) {
      const wordText = activeWords[matchedIndex].text;
      setActiveWords(prev => prev.filter((_, i) => i !== matchedIndex));
      setScore(s => s + wordText.length * 10);
      setInput('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-[80vh] bg-app-surface/60 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 relative overflow-hidden shadow-2xl max-w-5xl mx-auto w-full" 
      dir={exercise.language === 'en' ? 'ltr' : 'rtl'}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-app-accent/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex justify-between items-center mb-6 z-10 relative">
        <button onClick={onBack} className="text-white hover:text-black hover:bg-white transition-all bg-white/10 border border-white/20 px-6 py-3 rounded-2xl font-bold shadow-sm">
          العودة
        </button>
        <div className="flex gap-8 text-xl md:text-2xl font-black bg-black/40 px-8 py-3 rounded-2xl border border-white/5 shadow-inner">
          <div className="text-white flex items-center gap-2"><Trophy size={24} className="text-app-accent"/> النقاط: {score}</div>
          <div className="text-red-400 border-r border-white/10 pr-6 mr-2">القلوب: {Array(Math.max(0, lives)).fill('❤️').join('')}</div>
        </div>
      </div>

      <div ref={containerRef} className="flex-1 relative bg-black/40 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-inner z-10">
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-20">
            <div className="w-24 h-24 bg-gradient-to-br from-app-accent to-purple-500 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(var(--app-accent),0.4)]">
              <GamepadIcon size={48} className="text-black" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-wide">الكلمات المتساقطة</h2>
            <button onClick={startGame} className="flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-app-accent hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
              <Play fill="currentColor" size={24} /> ابدأ اللعب
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl z-30">
            {score >= 200 && <WinAnimation score={score} message="بطل الطباعة!" />}
            
            {score < 200 && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center">
                <XCircle size={80} className="text-red-500 mb-6 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]" />
                <h2 className="text-5xl font-black text-white mb-4">انتهت اللعبة!</h2>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-app-accent to-orange-400 mb-10">النقاط: {score}</p>
              </motion.div>
            )}
            
            <div className="flex gap-6 z-20 relative mt-4">
              <button onClick={startGame} className="flex items-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-colors text-lg">
                <RotateCcw size={20} /> العودة للعب
              </button>
              <button onClick={() => onFinish(score)} className="flex items-center gap-3 bg-gradient-to-l from-app-accent to-orange-400 text-black px-8 py-4 rounded-2xl font-black hover:opacity-90 transition-opacity text-lg shadow-[0_0_30px_rgba(var(--app-accent),0.3)]">
                إنهاء وتسجيل <Trophy size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Game Area */}
        {activeWords.map(word => (
          <div
            key={word.id}
            className="absolute font-black text-xl md:text-2xl px-6 py-3 bg-app-surface/90 backdrop-blur-md border border-app-accent/30 rounded-2xl whitespace-nowrap shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-white"
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

      <div className="mt-8 z-10 w-full max-w-2xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          disabled={!isPlaying || gameOver}
          placeholder="اكتب الكلمة المتساقطة هنا..."
          className="w-full bg-black/60 border-2 border-white/10 text-white text-center text-3xl p-6 rounded-2xl outline-none focus:border-app-accent focus:bg-black/80 transition-all placeholder:text-white/20 font-mono shadow-inner tracking-widest"
          autoFocus
        />
      </div>
    </motion.div>
  );
};

const GamepadIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="3"></rect>
  </svg>
);
