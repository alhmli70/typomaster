import React, { useState, useRef } from 'react';
import { Exercise } from '../types';
import {
  Play, Lock, CheckCircle, Star, ChevronRight, ChevronDown,
  Keyboard, TerminalSquare, FileText, Upload, Trophy, Target,
  Sparkles, Medal, Zap, Crown, Award,
} from 'lucide-react';
import { TypingInterface } from './TypingInterface';
import { useExercises } from '../contexts/ExerciseContext';
import { useSession } from '../contexts/SessionContext';
import { useSound } from '../contexts/SoundContext';
import { calculateStars } from '../lib/stars';
import { motion, AnimatePresence } from 'motion/react';

interface ExerciseSelectionProps {
  type: 'typing' | 'coding';
  initialCollection?: string | null;
}

const starColors = ['text-red-500', 'text-orange-400', 'text-yellow-400', 'text-yellow-300'];

export const ExerciseSelection: React.FC<ExerciseSelectionProps> = ({ type, initialCollection }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'ar' | 'en' | 'code'>(type === 'typing' ? 'ar' : 'code');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [customFileExercises, setCustomFileExercises] = useState<Exercise[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { exercises, completedExercises } = useExercises();
  const { exerciseSessions } = useSession();
  const { sfx } = useSound();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCustomFileExercises(prev => [...prev, {
          id: `custom-file-${Date.now()}`,
          title: file.name.replace('.txt', ''),
          content: text.trim(),
          language: selectedLanguage === 'code' ? 'code' : selectedLanguage,
          level: 'mixed' as any,
        }]);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (activeExercise) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 w-full pb-8">
        <button onClick={() => { sfx.playNavigate(); setActiveExercise(null); }} className="flex items-center gap-2 text-sm font-bold text-app-text-muted hover:text-white bg-app-surface/40 border border-app-border px-4 py-2 rounded-xl transition-colors w-fit">
          <ChevronRight size={16} /> العودة
        </button>
        <div className="flex items-center gap-3">
          <h2 className="text-xl md:text-2xl font-black text-white">{activeExercise.title}</h2>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-lg font-mono ${activeExercise.level === 'beginner' || activeExercise.level === 'مبتدئ' ? 'bg-green-500/10 text-green-400' : activeExercise.level === 'medium' || activeExercise.level === 'متوسط' ? 'bg-orange-500/10 text-orange-400' : activeExercise.level === 'advanced' || activeExercise.level === 'متقدم' ? 'bg-red-500/10 text-red-400' : 'bg-purple-500/10 text-purple-400'}`}>
            {activeExercise.level === 'beginner' ? 'مبتدئ' : activeExercise.level === 'medium' ? 'متوسط' : activeExercise.level === 'advanced' ? 'متقدم' : 'مخصص'}
          </span>
          <span className="text-xs font-bold bg-app-accent/10 text-app-accent px-2.5 py-1 rounded-lg font-mono">{activeExercise.language.toUpperCase()}</span>
        </div>
        <TypingInterface exercise={activeExercise} />
      </motion.div>
    );
  }

  const baseFiltered = exercises.filter(ex => type === 'coding' ? ex.language === 'code' : ex.language === selectedLanguage);
  const customFiltered = customFileExercises.filter(ex => type === 'coding' ? ex.language === 'code' : ex.language === selectedLanguage);
  const allExercises = [...baseFiltered, ...customFiltered].sort((a, b) => (a.order || 0) - (b.order || 0));
  const groupedExercises = allExercises.reduce((acc, ex) => {
    const col = ex.collection || 'تمارين متنوعة';
    if (!acc[col]) acc[col] = [];
    acc[col].push(ex);
    return acc;
  }, {} as Record<string, Exercise[]>);

  const getBestSession = (id: string) => exerciseSessions[id];

  const getStars = (id: string, level: string) => {
    const session = getBestSession(id);
    if (!session) return 0;
    return calculateStars(session.wpm, session.accuracy, level);
  };

  const getLevelColor = (level: string) => {
    if (level === 'beginner' || level === 'مبتدئ') return 'from-green-500/20 to-green-600/10 border-green-500/20 text-green-400';
    if (level === 'medium' || level === 'متوسط') return 'from-orange-500/20 to-orange-600/10 border-orange-500/20 text-orange-400';
    if (level === 'advanced' || level === 'متقدم') return 'from-red-500/20 to-red-600/10 border-red-500/20 text-red-400';
    return 'from-purple-500/20 to-purple-600/10 border-purple-500/20 text-purple-400';
  };

  const getLevelLabel = (level: string) => {
    if (level === 'beginner') return 'مبتدئ';
    if (level === 'medium') return 'متوسط';
    if (level === 'advanced') return 'متقدم';
    return level;
  };

  // Stats
  let totalStars = 0;
  let totalPossibleStars = 0;
  let totalCompleted = 0;
  const allExerciseIds = allExercises.map(e => e.id);
  allExerciseIds.forEach(id => {
    const ex = allExercises.find(e => e.id === id);
    if (!ex) return;
    if (completedExercises.includes(id)) {
      totalCompleted++;
      totalStars += getStars(id, ex.level);
    }
    totalPossibleStars += 3;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-5 w-full pb-8">

      {/* Hero Header */}
      <div className="bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-5 md:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-app-accent/8 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-app-accent/20 to-app-accent/5 border border-app-accent/20 flex items-center justify-center text-app-accent shrink-0 shadow-lg shadow-app-accent/10">
            {type === 'typing' ? <Keyboard size={28} /> : <TerminalSquare size={28} />}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              {type === 'typing' ? 'تمرين الطباعة السريعة' : 'تمرين الأكواد البرمجية'}
            </h2>
            <p className="text-app-text-muted text-sm mt-0.5">
              {type === 'typing' ? 'اختر المرحلة وابدأ التحدي لتحسين سرعتك ودقتك' : 'تدرب على كتابة الأكواد والرموز البرمجية بسرعة احترافية'}
            </p>
          </div>
          {type === 'typing' && (
            <div className="flex bg-black/40 p-0.5 rounded-xl border border-app-border">
              <button onClick={() => { sfx.playToggle(); setSelectedLanguage('ar'); }} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedLanguage === 'ar' ? 'bg-app-accent text-black shadow-lg shadow-app-accent/30' : 'text-app-text-muted hover:text-white'}`}>العربية</button>
              <button onClick={() => { sfx.playToggle(); setSelectedLanguage('en'); }} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedLanguage === 'en' ? 'bg-app-accent text-black shadow-lg shadow-app-accent/30' : 'text-app-text-muted hover:text-white'}`}>English</button>
            </div>
          )}
        </div>

        {/* Stats row */}
        <div className="relative z-10 flex flex-wrap gap-4 mt-5 pt-4 border-t border-app-border/50">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-yellow-400" />
            <span className="text-sm font-bold text-white">{totalCompleted}/{allExercises.length}</span>
            <span className="text-xs text-app-text-muted">تمارين مكتملة</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={16} className="text-yellow-400" />
            <span className="text-sm font-bold text-white">{totalStars}/{totalPossibleStars}</span>
            <span className="text-xs text-app-text-muted">نجوم</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-app-accent" />
            <span className="text-sm font-bold text-white">{Math.round(totalCompleted / Math.max(1, allExercises.length) * 100)}%</span>
            <span className="text-xs text-app-text-muted">تقدم عام</span>
          </div>
        </div>
      </div>

      {/* Custom upload */}
      <div className="bg-gradient-to-r from-app-accent/5 to-transparent border border-app-accent/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-app-accent/15 flex items-center justify-center">
            <FileText size={20} className="text-app-accent" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">تدريب مخصص</p>
            <p className="text-xs text-app-text-muted">ارفع ملف .txt للتدرب على نصوصك الخاصة</p>
          </div>
        </div>
        <input type="file" accept=".txt" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
        <button onClick={() => { sfx.playClick(); fileInputRef.current?.click(); }} className="flex items-center gap-2 bg-black/30 border border-app-border hover:border-app-accent/40 hover:text-app-accent px-4 py-2.5 rounded-xl transition-all text-sm font-bold">
          <Upload size={15} /> رفع ملف
        </button>
      </div>

      {/* Worlds / Collections */}
      <div className="flex flex-col gap-6">
        {(Object.entries(groupedExercises) as [string, Exercise[]][]).map(([collectionName, exList], worldIdx) => {
          const completedInWorld = exList.filter(e => completedExercises.includes(e.id)).length;
          const starsInWorld = exList.reduce((s, e) => s + (completedExercises.includes(e.id) ? getStars(e.id, e.level) : 0), 0);
          const progress = Math.round(completedInWorld / exList.length * 100);

          return (
            <motion.div
              key={collectionName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: worldIdx * 0.06 }}
              className="bg-app-surface/30 backdrop-blur-xl border border-app-border rounded-2xl overflow-hidden"
            >
              {/* World header */}
              <div className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-app-accent/5 to-transparent rounded-full blur-[40px] pointer-events-none" />
                <div className="relative z-10 p-4 md:p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-app-accent/20 to-app-accent/5 border border-app-accent/15 flex items-center justify-center text-app-accent text-sm font-black shadow-lg">
                        {worldIdx + 1}
                      </div>
                      <div>
                        <h3 className="font-black text-white text-base md:text-lg">{collectionName}</h3>
                        <p className="text-xs text-app-text-muted">
                          {completedInWorld}/{exList.length} تمارين
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map(s => (
                          <Star key={s} size={12} className={starsInWorld >= s ? 'fill-yellow-400 text-yellow-400' : 'text-app-text-muted/30'} />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-app-text-muted ml-1">{starsInWorld}/{exList.length * 3}</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, delay: worldIdx * 0.06 + 0.2 }}
                      className="h-full bg-gradient-to-l from-app-accent to-app-accent-2 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Stage grid */}
              <div className="px-4 pb-4 md:px-5 md:pb-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {exList.map((ex, index) => {
                    const isCompleted = completedExercises.includes(ex.id);
                    const isUnlocked = index === 0 || completedExercises.includes(exList[index - 1].id) || isCompleted;
                    const stars = getStars(ex.id, ex.level);
                    const session = getBestSession(ex.id);

                    return (
                      <motion.div
                        key={ex.id}
                        whileHover={isUnlocked ? { scale: 1.02, y: -2 } : {}}
                        whileTap={isUnlocked ? { scale: 0.98 } : {}}
                        onClick={() => { if (isUnlocked) { sfx.playClick(); setActiveExercise(ex); } }}
                        className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                          isUnlocked
                            ? 'bg-app-surface/40 border-app-border hover:border-app-accent/40 cursor-pointer'
                            : 'bg-app-surface/20 border-app-border/40 opacity-45 cursor-not-allowed'
                        }`}
                      >
                        {/* Glow on hover */}
                        {isUnlocked && (
                          <div className="absolute inset-0 bg-gradient-to-br from-app-accent/0 via-transparent to-app-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        )}

                        {/* Top accent line */}
                        <div className={`absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300 ${
                          isCompleted ? 'bg-gradient-to-r from-green-400 to-green-500 opacity-100'
                            : isUnlocked ? 'bg-gradient-to-r from-app-accent to-transparent opacity-0 group-hover:opacity-60'
                            : 'bg-app-border/30 opacity-30'
                        }`} />

                        <div className="relative z-10 p-4">
                          {/* Row 1: level badge + state icon */}
                          <div className="flex items-center justify-between mb-2.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg bg-gradient-to-r border ${getLevelColor(ex.level)}`}>
                              {getLevelLabel(ex.level)}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {/* Number */}
                              <span className="text-[10px] font-black text-app-text-muted/30">{String(ex.order || index + 1).padStart(2, '0')}</span>
                              {isCompleted ? (
                                <div className="w-7 h-7 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                                  <CheckCircle size={13} className="text-green-400" />
                                </div>
                              ) : !isUnlocked ? (
                                <div className="w-7 h-7 rounded-full bg-black/40 border border-app-border/30 flex items-center justify-center">
                                  <Lock size={12} className="text-app-text-muted/50" />
                                </div>
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-app-accent/10 border border-app-accent/20 flex items-center justify-center group-hover:bg-app-accent/20 group-hover:shadow-lg group-hover:shadow-app-accent/20 transition-all">
                                  <Play size={12} className="text-app-accent ml-0.5" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Row 2: title */}
                          <h3 className={`font-bold text-sm line-clamp-1 ${isUnlocked ? 'text-white group-hover:text-app-accent transition-colors' : 'text-app-text-muted/60'}`}>
                            {ex.title}
                          </h3>
                          <p className="text-xs text-app-text-muted/60 line-clamp-1 mt-0.5 font-mono" dir={ex.language === 'en' ? 'ltr' : 'rtl'}>
                            {ex.content}
                          </p>

                          {/* Row 3: stars + stats */}
                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-app-border/20">
                            <div className="flex gap-0.5">
                              {[1, 2, 3].map(s => (
                                <Star
                                  key={s}
                                  size={11}
                                  className={`transition-all duration-300 ${s <= stars ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]' : 'text-app-text-muted/20'}`}
                                />
                              ))}
                            </div>
                            {session && (
                              <div className="flex items-center gap-2 text-[10px] text-app-text-muted/50 font-bold">
                                <span>{session.wpm} WPM</span>
                                <span>{session.accuracy}%</span>
                              </div>
                            )}
                            {!isCompleted && isUnlocked && !session && (
                              <span className="text-[10px] font-bold text-app-accent/60 flex items-center gap-1">
                                <Zap size={10} /> جديد
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Lock overlay */}
                        {!isUnlocked && (
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                            <div className="flex flex-col items-center gap-1">
                              <Lock size={16} className="text-app-text-muted/40" />
                              <span className="text-[10px] font-bold text-app-text-muted/40">أكمل السابق</span>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
