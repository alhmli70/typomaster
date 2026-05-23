import React, { useState, useEffect, useRef } from 'react';
import { GameProps } from './GameTypes';
import { Play, RotateCcw, XCircle, Flag, Bot, User } from 'lucide-react';
import { motion } from 'motion/react';
import { WinAnimation } from './WinAnimation';

export const SpeedRace: React.FC<GameProps> = ({ exercise, onFinish, onBack }) => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  
  const [playerProgress, setPlayerProgress] = useState(0); // 0 to 100
  const [botProgress, setBotProgress] = useState(0); // 0 to 100

  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState<'win' | 'loss' | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const allWords = exercise.content.split(/[\\s\\n]+/).filter(w => w.trim() !== '');
    setWords(allWords.slice(0, 30)); // Max 30 words for race
  }, [exercise]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setResult(null);
    setPlayerProgress(0);
    setBotProgress(0);
    setInput('');
    setCurrentWordIndex(0);

    // Bot progress simulation
    const targetWPM = 40; // bot types at 40 WPM
    const totalChars = words.join(' ').length;
    let botCharsTyped = 0;

    const botInterval = setInterval(() => {
      botCharsTyped += targetWPM / 60 / 10; // chars per 100ms approx
      botCharsTyped += 0.5; // magic number based on loop timing
      
      const newProgress = Math.min((botCharsTyped / totalChars) * 100, 100);
      setBotProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(botInterval);
        setGameOver(true);
        setResult('loss');
      }
    }, 200);

    timerRef.current = botInterval;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying || gameOver) return;
    
    const val = e.target.value;
    const targetWord = words[currentWordIndex];

    if (val.trim() === targetWord && val.endsWith(' ')) {
      // Completed word
      setInput('');
      const nextIndex = currentWordIndex + 1;
      
      const progress = (nextIndex / words.length) * 100;
      setPlayerProgress(progress);
      
      if (nextIndex >= words.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setCurrentWordIndex(nextIndex); // advance to end
        setGameOver(true);
        setResult('win');
      } else {
        setCurrentWordIndex(nextIndex);
      }
    } else {
      setInput(val);
    }
  };

  return (
    <div className="flex flex-col h-[70vh] bg-app-surface/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden" dir={exercise.language === 'en' ? 'ltr' : 'rtl'}>
      <div className="flex justify-between items-center mb-4 z-10 block">
        <button onClick={onBack} className="text-app-text-muted hover:text-white transition-colors bg-black/40 p-2 rounded-lg">
          العودة
        </button>
      </div>

      <div className="flex-1 relative bg-black/50 rounded-xl overflow-hidden border border-white/5 shadow-inner p-8 flex flex-col justify-center gap-10">
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
            <Flag size={64} className="text-yellow-500 mb-6" />
            <h2 className="text-3xl font-black text-white mb-2">سباق السرعة</h2>
            <p className="text-app-text-muted mb-8 text-center max-w-sm">
              سابق الروبوت للوصول إلى خط النهاية. اكتب الكلمات مع ترك مسافة (Space) بعد كل كلمة.
            </p>
            <button onClick={startGame} className="flex items-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform">
              <Play fill="currentColor" /> ابدأ السباق
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-20">
            {result === 'win' && <WinAnimation score={100} message="فزت بالسباق!" />}
            
            {result !== 'win' && (
              <>
                <XCircle size={64} className="text-red-500 mb-6 z-10" />
                <h2 className="text-4xl font-black text-white mb-2 z-10">خسرت السباق!</h2>
              </>
            )}
            
            <div className="flex gap-4 mt-8 z-20 relative">
              <button onClick={startGame} className="flex items-center gap-2 bg-app-surface border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
                <RotateCcw /> إعادة السباق
              </button>
              <button onClick={() => onFinish(result === 'win' ? 100 : 0)} className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                إنهاء
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
           {/* Bot track */}
           <div className="relative h-16 bg-[#1a1c23] rounded-full border border-white/5 flex items-center px-4">
             <div className="text-white/20 text-xs font-mono absolute left-4">START</div>
             <div className="text-white/20 text-xs font-mono absolute right-4">FINISH</div>
             
             <motion.div 
               className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
               animate={{ left: `${Math.max(0, Math.min(95, botProgress))}%` }}
               transition={{ ease: "linear", duration: 0.2 }}
             >
               <div className="w-10 h-10 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                 <Bot size={20} />
               </div>
             </motion.div>
           </div>

           {/* Player track */}
           <div className="relative h-16 bg-[#1a1c23] rounded-full border border-white/5 flex items-center px-4">
             <div className="text-white/20 text-xs font-mono absolute left-4">START</div>
             <div className="text-white/20 text-xs font-mono absolute right-4">FINISH</div>
             
             <motion.div 
               className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10"
               animate={{ left: `${Math.max(0, Math.min(95, playerProgress))}%` }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
             >
               <div className="w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                 <User size={20} />
               </div>
             </motion.div>
           </div>
        </div>

        {isPlaying && !gameOver && (
          <div className="flex flex-col items-center text-center mt-10">
            <div className="text-3xl text-app-text-muted font-mono leading-relaxed max-w-3xl flex flex-wrap justify-center gap-x-3 gap-y-2">
              {words.map((w, idx) => (
                <span key={idx} className={
                  idx < currentWordIndex ? 'text-app-accent/40 line-through' :
                  idx === currentWordIndex ? 'text-white font-black bg-white/10 px-2 rounded' : 'text-app-text-muted/50'
                }>{w}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 z-10 w-full max-w-2xl mx-auto">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          disabled={!isPlaying || gameOver}
          placeholder="اكتب الكلمة متبوعة بمسافة (Space)"
          className="w-full bg-black/80 border-2 border-yellow-500/50 text-white text-center text-3xl p-6 rounded-xl outline-none focus:border-yellow-500 focus:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all placeholder:text-white/20"
          autoFocus
        />
      </div>
    </div>
  );
};
