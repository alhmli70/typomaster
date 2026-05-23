import React, { useState, useEffect, useRef } from 'react';
import { VirtualKeyboard } from './VirtualKeyboard';
import { Activity, Target, AlertCircle, RefreshCcw, HandMetal, Star, Zap, ChevronRight } from 'lucide-react';
import { Exercise } from '../types';
import { useSettings } from '../contexts/SettingsContext';
import { useSound } from '../contexts/SoundContext';
import { useExercises } from '../contexts/ExerciseContext';
import { useSession } from '../contexts/SessionContext';
import { calculateStars } from '../lib/stars';
import { motion, AnimatePresence } from 'motion/react';

interface TypingInterfaceProps {
  exercise: Exercise;
}

export const TypingInterface: React.FC<TypingInterfaceProps> = ({ exercise }) => {
  const { settings, playClickSound, playErrorSound } = useSettings();
  const { sfx } = useSound();
  const { markCompleted } = useExercises();
  const { recordSession } = useSession();
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isFinished, setIsFinished] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const hasRecorded = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setInput(''); setStartTime(null); setErrors(0); setWpm(0); setAccuracy(100);
    setIsFinished(false); hasRecorded.current = false;
    if (inputRef.current) inputRef.current.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFinished) return;
    setActiveKey(e.key);
  };

  const handleKeyUp = () => setActiveKey(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    const val = e.target.value;
    if (!startTime && val.length === 1) setStartTime(Date.now());

    if (val.length > input.length) {
      const charTyped = val[val.length - 1];
      const charExpected = exercise.content[input.length];
      if (charExpected !== undefined) {
        if (charTyped !== charExpected) {
          setErrors(prev => prev + 1);
          playErrorSound();
          if (settings.errorShakeEffect && containerRef.current) {
            containerRef.current.classList.remove('animate-shake');
            void containerRef.current.offsetWidth;
            containerRef.current.classList.add('animate-shake');
          }
          if (settings.strictMode) return;
        } else {
          playClickSound();
        }
      }
    } else if (val.length < input.length) {
      playClickSound();
    }

    setInput(val);
    const totalTyped = val.length;
    let currentAccuracyLocal = accuracy;
    if (totalTyped > 0) {
      currentAccuracyLocal = Math.max(0, Math.round(((totalTyped - errors) / totalTyped) * 100));
      setAccuracy(currentAccuracyLocal);
    }

    if (val.length >= exercise.content.length) {
      setIsFinished(true);
      sfx.playComplete();
      if (currentAccuracyLocal >= 80) markCompleted(exercise.id);
      if (!hasRecorded.current && startTime) {
        const timeSeconds = Math.round((Date.now() - startTime) / 1000);
        recordSession({
          exerciseId: exercise.id, wpm, accuracy: currentAccuracyLocal, errors,
          timeSeconds: Math.max(1, timeSeconds), totalChars: exercise.content.length, language: exercise.language,
        });
        hasRecorded.current = true;
      }
    }
  };

  useEffect(() => {
    if (!isFinished || !startTime) return;
    const starThresholds = [80, 90, 95];
    const starDelays = [0.3, 0.5, 0.7];
    [1, 2, 3].forEach((s) => {
      const earned = accuracy >= starThresholds[s - 1] && (s <= 1 || wpm >= (s === 2 ? 25 : 35));
      if (earned) {
        setTimeout(() => sfx.playStarEarn(), starDelays[s - 1] * 1000);
      }
    });
  }, [isFinished]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (startTime && !isFinished) {
      interval = setInterval(() => {
        const timeElapsedMin = (Date.now() - startTime) / 60000;
        const wordsTyped = input.length / 5;
        setWpm(Math.round(wordsTyped / timeElapsedMin));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [startTime, input, isFinished]);

  const handleContainerClick = () => inputRef.current?.focus();
  const isRTL = exercise.language === 'ar';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap gap-4 items-center justify-between bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-4 md:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-app-accent/5 rounded-full blur-[50px] pointer-events-none" />
        <div className="flex gap-4 items-center relative z-10 flex-wrap">
          {settings.showRealtimeMetrics ? (
            <>
              <div className="flex items-center gap-2 bg-black/40 px-4 py-2.5 rounded-xl border border-app-border">
                <Activity className="text-app-accent" size={18} />
                <span className="text-xl font-black text-white font-mono leading-none">{wpm}</span>
                <span className="text-xs font-bold text-app-text-muted">WPM</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-4 py-2.5 rounded-xl border border-app-border">
                <Target className="text-blue-400" size={18} />
                <span className="text-xl font-black text-white font-mono leading-none">{accuracy}%</span>
                <span className="text-xs font-bold text-app-text-muted">دقة</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2.5 rounded-xl border border-app-border">
              <Activity className="text-app-text-muted" size={18} />
              <span className="text-sm font-bold text-app-text-muted">الإحصائيات مخفية</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-red-500/10 px-4 py-2.5 rounded-xl border border-red-500/20">
            <AlertCircle className="text-red-400" size={18} />
            <span className="text-xl font-black text-white font-mono leading-none">{errors}</span>
            <span className="text-xs font-bold text-red-400">خطأ</span>
          </div>
        </div>
        <button onClick={() => { sfx.playClick(); reset(); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-app-border hover:bg-white/5 text-white font-bold transition-colors text-sm relative z-10">
          <RefreshCcw size={16} /> إعادة
        </button>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-app-accent to-blue-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000" />
        <div
          ref={containerRef}
          onClick={handleContainerClick}
          className={`relative w-full min-h-[220px] p-6 md:p-10 text-xl md:text-3xl font-mono leading-relaxed bg-black/60 backdrop-blur-xl rounded-2xl border-2 shadow-2xl transition-all duration-300 ${isFinished ? 'border-green-500/50 shadow-[0_0_50px_rgba(34,197,94,0.2)]' : 'border-app-border hover:border-app-accent/30'} cursor-text overflow-hidden`}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPjxwYXRoIGQ9Ik0wIDQwaDQwTTAgMHY0MEgwem0wIDBoNDBNMCAwTDQwIDQwem00MCAwdjQwSDBNMCAwbDQwIDQwIi8+PC9nPjwvc3ZnPg==')] opacity-50 pointer-events-none mix-blend-overlay" />
          <input ref={inputRef} type="text" value={input} onChange={handleChange} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} className="absolute opacity-0 pointer-events-none" autoFocus autoComplete="off" spellCheck="false" />
          <div className="whitespace-pre-wrap select-none text-app-text-muted/40 break-words relative z-10 leading-[2.5]">
            {exercise.content.split('').map((char, index) => {
              let colorClass = '';
              let isCurrent = index === input.length;
              if (index < input.length) {
                colorClass = input[index] === char ? 'text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'text-red-400 bg-red-500/20 rounded border border-red-500/30';
              }
              return (
                <span key={index} className="relative inline-block">
                  <span className={`${colorClass} transition-all duration-150 ease-out`}>{char}</span>
                  {isCurrent && !isFinished && (
                    <span className={`absolute ${isRTL ? '-right-[2px]' : '-left-[2px]'} bottom-0 top-1/2 -translate-y-1/2 h-[1.2em] w-[3px] bg-app-accent shadow-[0_0_10px_rgba(var(--app-accent),0.8)] animate-pulse rounded-full`} />
                  )}
                </span>
              );
            })}
          </div>

          <AnimatePresence>
            {isFinished && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-gradient-to-b from-black/85 to-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center z-50 rounded-2xl"
              >
                <div className="w-36 h-36 bg-gradient-to-br from-app-accent/10 to-yellow-500/10 rounded-full blur-[60px] absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 flex flex-col items-center">
                  {/* Stars */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="flex gap-2 mb-4"
                  >
                    {[1, 2, 3].map(s => {
                      const starThresholds = [80, 90, 95];
                      const earned = accuracy >= starThresholds[s - 1] && (s <= 1 || wpm >= (s === 2 ? 25 : 35));
                      return (
                        <motion.div
                          key={s}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + s * 0.2, type: 'spring', stiffness: 400, damping: 15 }}
                        >
                          <Star
                            size={40}
                            className={earned ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]' : 'text-app-text-muted/20'}
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-app-accent via-yellow-400 to-orange-400 mb-2"
                  >
                    اكتمل التحدي!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                    className="text-app-text-muted text-sm mb-6"
                  >
                    {accuracy >= 95 ? 'أداء أسطوري! استمر بهذا المستوى' :
                     accuracy >= 85 ? 'أداء ممتاز! أنت في الطريق الصحيح' :
                     accuracy >= 80 ? 'أداء جيد! حاول تحسين الدقة أكثر' :
                     'حاول مرة أخرى لتحسين أدائك'}
                  </motion.p>

                  {/* Stats cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="flex gap-4 mb-6"
                  >
                    <div className="flex flex-col gap-1 bg-white/[0.03] border border-app-border/50 px-5 py-3.5 rounded-xl min-w-[100px]">
                      <span className="text-app-text-muted/60 text-xs font-bold">السرعة</span>
                      <span className="text-2xl text-white font-black font-mono">{wpm} <span className="text-xs text-app-text-muted">WPM</span></span>
                    </div>
                    <div className="flex flex-col gap-1 bg-white/[0.03] border border-app-border/50 px-5 py-3.5 rounded-xl min-w-[100px]">
                      <span className="text-app-text-muted/60 text-xs font-bold">الدقة</span>
                      <span className="text-2xl text-white font-black font-mono">{accuracy}%</span>
                    </div>
                    <div className="flex flex-col gap-1 bg-white/[0.03] border border-app-border/50 px-5 py-3.5 rounded-xl min-w-[100px]">
                      <span className="text-app-text-muted/60 text-xs font-bold">الأخطاء</span>
                      <span className="text-2xl text-white font-black font-mono">{errors}</span>
                    </div>
                  </motion.div>

                  {/* XP earned */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6 flex items-center gap-2 bg-app-accent/10 border border-app-accent/20 px-4 py-2 rounded-xl"
                  >
                    <Zap size={16} className="text-app-accent" />
                    <span className="text-sm font-bold text-app-accent">+{wpm} XP</span>
                  </motion.div>

                  {/* Action buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-3"
                  >
                    <button onClick={() => { sfx.playClick(); reset(); }} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-l from-app-accent to-yellow-500 text-black font-black rounded-xl hover:scale-105 transition-all shadow-[0_8px_25px_rgba(250,204,21,0.3)] text-sm">
                      <RefreshCcw size={16} /> تدرب مرة أخرى
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {settings.showKeyboard && (
        <VirtualKeyboard activeKey={activeKey} nextKey={!isFinished ? exercise.content[input.length] : null} language={exercise.language} />
      )}
    </motion.div>
  );
};
