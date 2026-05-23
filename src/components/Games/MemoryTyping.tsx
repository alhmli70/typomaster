import React, { useState, useEffect, useRef } from 'react';
import { GameProps } from './GameTypes';
import { Play, RotateCcw, XCircle, BrainCircuit, EyeOff, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WinAnimation } from './WinAnimation';

export const MemoryTyping: React.FC<GameProps> = ({ exercise, onFinish, onBack }) => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wordState, setWordState] = useState<'showing' | 'hidden'>('showing');
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Generate words, shuffle them
    const allWords = exercise.content.split(/[\\s\\n]+/).filter(w => w.trim() !== '');
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    setWords(shuffled);
  }, [exercise]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setInput('');
    setCurrentWordIndex(0);
    showNextWord();
  };

  const showNextWord = () => {
    setWordState('showing');
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Hide word after 1.5 seconds
    timerRef.current = setTimeout(() => {
      setWordState('hidden');
    }, 1500);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isPlaying || gameOver || wordState === 'showing') return;
    
    setInput(e.target.value);
  };

  const submitWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPlaying || gameOver || wordState === 'showing' || !input) return;

    if (input.trim() === words[currentWordIndex]) {
      setScore(s => s + words[currentWordIndex].length * 10);
    } else {
      setLives(l => {
        const newL = l - 1;
        if (newL <= 0) setGameOver(true);
        return newL;
      });
    }

    setInput('');
    if (!gameOver) {
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(i => i + 1);
        showNextWord();
      } else {
        // Won the game
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-[70vh] bg-app-surface/50 border border-white/10 rounded-2xl p-6 relative overflow-hidden" dir={exercise.language === 'en' ? 'ltr' : 'rtl'}>
      <div className="flex justify-between items-center mb-4 z-10 block">
        <button onClick={onBack} className="text-app-text-muted hover:text-white transition-colors bg-black/40 p-2 rounded-lg">
          العودة
        </button>
        <div className="flex gap-6 text-xl font-bold">
          <div className="text-purple-400">النقاط: {score}</div>
          <div className="text-red-400">الفرص: {Array(Math.max(0, lives)).fill('❤️').join('')}</div>
        </div>
      </div>

      <div className="flex-1 relative bg-[#0a0a0c] rounded-xl overflow-hidden border border-purple-500/20 shadow-inner flex flex-col items-center justify-center">
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20">
            <BrainCircuit size={64} className="text-purple-500 mb-6" />
            <h2 className="text-3xl font-black text-white mb-2">ذاكرة الطباعة</h2>
            <p className="text-app-text-muted mb-8 text-center max-w-sm">
              ستظهر الكلمة للحظات ثم تختفي. عليك تذكرها وطباعتها بشكل صحيح.
            </p>
            <button onClick={startGame} className="flex items-center gap-2 bg-purple-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform">
              <Play fill="currentColor" /> اختبار الذاكرة
            </button>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-20">
            {lives > 0 && <WinAnimation score={score} message="ذاكرة قوية!" />}
            
            {lives <= 0 && (
              <>
                <XCircle size={64} className="text-purple-500 mb-6 z-10" />
                <h2 className="text-4xl font-black text-white mb-2 z-10">انتهت الفرص!</h2>
                <p className="text-2xl text-purple-400 mb-8 z-10">النقاط النهائية: {score}</p>
              </>
            )}

            <div className="flex gap-4 z-20 relative mt-8">
              <button onClick={startGame} className="flex items-center gap-2 bg-app-surface border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
                <RotateCcw /> إعادة التحدي
              </button>
              <button onClick={() => onFinish(score)} className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity">
                إنهاء وتسجيل
              </button>
            </div>
          </div>
        )}

        {isPlaying && !gameOver && (
          <AnimatePresence mode="wait">
            {wordState === 'showing' ? (
              <motion.div
                key="showing"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="text-6xl font-black text-white tracking-widest"
              >
                {words[currentWordIndex]}
              </motion.div>
            ) : (
              <motion.div
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <EyeOff size={48} className="text-purple-500/50" />
                <div className="text-2xl text-app-text-muted">
                  اكتب الكلمة الآن... ({words[currentWordIndex].length} أحرف)
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <div className="mt-6 z-10">
        <form onSubmit={submitWord} className="w-full">
          <input
            type="text"
            value={input}
            onChange={handleInput}
            disabled={!isPlaying || gameOver || wordState === 'showing'}
            placeholder={wordState === 'showing' ? "تذكر الكلمة..." : "اكتب هنا واضغط Enter..."}
            className="w-full bg-black/80 border-2 border-purple-500/50 text-white text-center text-3xl p-6 rounded-xl outline-none focus:border-purple-500 focus:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all placeholder:text-white/20"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};
