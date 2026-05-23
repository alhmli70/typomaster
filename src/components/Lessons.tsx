import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { lessonsData } from '../data/lessonsData';
import { BookOpen, BookText, CheckCircle, ChevronRight, Lightbulb, Play, Zap, Sparkles, Loader2, Bot, GraduationCap, Star, Trophy, Award, Clock, ArrowLeft } from 'lucide-react';
import { useExercises } from '../contexts/ExerciseContext';
import { useSettings } from '../contexts/SettingsContext';
import { useSound } from '../contexts/SoundContext';
import { markLessonCompleted as dbMarkLessonCompleted, getAllCompletedLessons } from '../database/repositories/exerciseRepository';
import { getOfflineTip } from '../lib/offlineTips';
import { SimpleMarkdown } from '../lib/SimpleMarkdown';
import { motion, AnimatePresence } from 'motion/react';

const AILessonTip = ({ lesson }: { lesson: Lesson }) => {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const fetchTip = async () => {
    if (tip) { setShowTip(!showTip); return; }
    setLoading(true);
    setShowTip(true);
    try {
      if (typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined) {
        const { invoke } = await import('@tauri-apps/api/core');
        const result = await invoke<string>('get_ai_tip', { lessonTitle: lesson.title, lessonContent: lesson.description, language: lesson.language });
        if (result) setTip(result);
        else throw new Error('No tip');
      } else {
        setTip(getOfflineTip(lesson.id, lesson.language));
      }
    } catch {
      setTip(getOfflineTip(lesson.id, lesson.language));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button onClick={fetchTip} className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 hover:border-purple-400/40 px-2.5 py-1.5 rounded-lg transition-all text-xs group">
        <Sparkles size={13} className="text-purple-400 group-hover:animate-pulse" />
        <span className="font-bold text-purple-300">نصيحة</span>
      </button>
      <AnimatePresence>
        {showTip && (
          <motion.div initial={{ opacity: 0, y: 6, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.95 }} className="absolute top-full mt-2 right-0 w-72 bg-app-surface/95 backdrop-blur-2xl border border-purple-500/30 rounded-xl shadow-2xl p-3 z-50">
            {loading ? (
              <div className="flex items-center gap-2 py-1">
                <Loader2 className="animate-spin text-purple-400" size={14} />
                <span className="text-xs text-purple-300/70">جاري التحميل...</span>
              </div>
            ) : (
              <p className="text-xs text-purple-100/90 leading-relaxed">{tip}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface LessonsProps {
  onNavigateToExercise: (collection: string, language: 'ar' | 'en' | 'code') => void;
}

const LessonCard = ({ lesson, idx, isCompleted, orderStart, onClick }: { lesson: Lesson; idx: number; isCompleted: boolean; orderStart: number; onClick: () => void }) => {
  const iconMap: Record<string, React.ReactNode> = {
    book: <BookOpen size={16} />,
    finger: <Zap size={16} />,
    keyboard: <BookText size={16} />,
    star: <Lightbulb size={16} />,
    zap: <Zap size={16} />,
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group relative rounded-2xl border border-app-border bg-app-surface/40 backdrop-blur-xl hover:border-app-accent/30 cursor-pointer transition-all duration-200 overflow-hidden shadow-lg"
    >
      <div className={`absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300 ${isCompleted ? 'bg-gradient-to-r from-green-400 to-green-500 opacity-100' : 'bg-gradient-to-r from-app-accent to-transparent opacity-0 group-hover:opacity-60'}`} />
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isCompleted ? 'bg-green-500/20 border border-green-500/25 text-green-400' : 'bg-black/30 text-app-text-muted group-hover:text-app-accent group-hover:bg-app-accent/10'}`}>
            {iconMap[lesson.iconType] || <BookOpen size={18} />}
          </div>
          <span className="text-[10px] font-black text-app-text-muted/20">{String(orderStart + idx).padStart(2, '0')}</span>
        </div>
        <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-app-accent transition-colors">{lesson.title}</h4>
        <p className="text-xs text-app-text-muted/70 leading-relaxed line-clamp-2 mt-1.5">{lesson.description}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-app-border/20">
          {isCompleted ? (
            <div className="flex items-center gap-1.5">
              <CheckCircle size={12} className="text-green-400" />
              <span className="text-[10px] font-bold text-green-400">مكتمل</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <Play size={11} className="text-app-accent" />
              <span className="text-[10px] font-bold text-app-accent/60">ابدأ</span>
            </div>
          )}
          {isCompleted && <Star size={11} className="fill-yellow-400 text-yellow-400" />}
        </div>
      </div>
    </motion.div>
  );
};

export const Lessons: React.FC<LessonsProps> = ({ onNavigateToExercise }) => {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const { completedExercises } = useExercises();
  const { settings } = useSettings();
  const { sfx } = useSound();
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    getAllCompletedLessons().then(setCompletedLessons).catch(() => {});
  }, []);

  const markComplete = async (id: string) => {
    setCompletedLessons(prev => [...new Set([...prev, id])]);
    await dbMarkLessonCompleted(id);
  };

  if (activeLessonId) {
    const lesson = lessonsData.find(l => l.id === activeLessonId);
    if (lesson) {
      const isCompleted = completedLessons.includes(lesson.id);
      return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 w-full pb-8">
          <button onClick={() => { sfx.playNavigate(); setActiveLessonId(null); }} className="flex items-center gap-1.5 text-xs font-bold text-app-text-muted hover:text-white bg-app-surface/40 border border-app-border px-3 py-1.5 rounded-lg transition-colors w-fit">
            <ArrowLeft size={14} /> العودة للدروس
          </button>

          <div className="rounded-2xl border border-app-border bg-app-surface/40 backdrop-blur-xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-app-accent/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="prose prose-invert prose-sm max-w-none prose-headings:font-black prose-a:text-app-accent text-app-text-muted/90 leading-relaxed relative z-10">
              <div className="[zoom:0.85] sm:[zoom:0.8] md:[zoom:0.75] lg:[zoom:0.7] xl:[zoom:0.65]">
                {lesson.contentNode ? lesson.contentNode : <SimpleMarkdown>{lesson.content}</SimpleMarkdown>}
              </div>
            </div>
            <hr className="border-app-border my-5" />
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 rounded-2xl p-4 border border-app-border">
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isCompleted ? 'bg-green-500/20 border border-green-500/25 text-green-400' : 'bg-app-accent/10 text-app-accent'}`}>
                  {isCompleted ? <CheckCircle size={18} /> : <GraduationCap size={18} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">انتهيت من القراءة؟</p>
                  <p className="text-xs text-app-text-muted">انتقل للتدريب العملي</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {!isCompleted && (
                  <button onClick={() => { sfx.playLessonComplete(); markComplete(lesson.id); }} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-app-surface/50 border border-app-border hover:border-green-500/40 hover:text-green-400 text-white rounded-lg transition-all text-xs font-bold">
                    <CheckCircle size={13} /> إكمال
                  </button>
                )}
                <button onClick={() => { sfx.playLessonComplete(); sfx.playNavigate(); markComplete(lesson.id); onNavigateToExercise(lesson.targetCollection || 'all', lesson.language); }} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-1.5 bg-app-accent text-black rounded-lg font-black hover:shadow-lg hover:shadow-app-accent/20 transition-all text-xs">
                  <Play size={13} className="fill-current" /> تدريب
                </button>
              </div>
            </div>
          </div>
          {settings.showAIQuickTips && (
            <div className="flex justify-end">
              <AILessonTip lesson={lesson} />
            </div>
          )}
        </motion.div>
      );
    }
  }

  const arabicLessons = lessonsData.filter(l => l.language === 'ar').sort((a, b) => a.order - b.order);
  const englishLessons = lessonsData.filter(l => l.language === 'en').sort((a, b) => a.order - b.order);

  const renderSection = (title: string, lessons: Lesson[], icon: React.ReactNode, accent: string) => {
    const completedIn = lessons.filter(l => completedLessons.includes(l.id)).length;
    const progress = lessons.length > 0 ? Math.round((completedIn / lessons.length) * 100) : 0;

    return (
      <div className="rounded-2xl border border-app-border bg-app-surface/40 backdrop-blur-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${accent}`}>{icon}</div>
            <div>
              <h3 className="font-bold text-white text-sm">{title}</h3>
              <p className="text-xs text-app-text-muted">{completedIn}/{lessons.length} دروس</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-app-border px-3 py-1.5 rounded-lg">
            <Trophy size={12} className="text-yellow-400" />
            <span className="text-[10px] font-bold text-app-text-muted">{progress}%</span>
          </div>
        </div>
        <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
            className={`h-full rounded-full ${completedIn === lessons.length ? 'bg-gradient-to-l from-green-400 to-green-500' : 'bg-gradient-to-l from-app-accent to-orange-400'}`}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {lessons.map((lesson, idx) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              idx={idx}
              isCompleted={completedLessons.includes(lesson.id)}
              orderStart={1}
              onClick={() => { sfx.playClick(); setActiveLessonId(lesson.id); }}
            />
          ))}
        </div>
      </div>
    );
  };

  const totalCompleted = completedLessons.length;
  const totalAll = lessonsData.length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 w-full pb-8">
      <div className="rounded-2xl border border-app-border bg-app-surface/40 backdrop-blur-xl p-5 shadow-lg relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-app-accent/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-app-accent/20 bg-app-accent/8 px-3 py-1.5 text-xs font-bold text-app-accent">
              <GraduationCap size={14} /> {totalAll} درس نظري
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">الدروس النظرية</h1>
            <p className="text-sm text-app-text-muted leading-relaxed max-w-xl">تعلم الأساسيات والقواعد السليمة للطباعة باللمس</p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-app-border w-full lg:w-auto">
            <div className="flex gap-4">
              <div>
                <p className="text-xs font-bold text-app-text-muted">المكتملة</p>
                <p className="text-lg font-black text-white">{totalCompleted}<span className="text-sm font-medium text-app-text-muted">/{totalAll}</span></p>
              </div>
              <div className="w-px bg-app-border" />
              <div>
                <p className="text-xs font-bold text-app-text-muted">التقدم</p>
                <p className="text-lg font-black text-white">{totalAll > 0 ? Math.round((totalCompleted / totalAll) * 100) : 0}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderSection('دروس الطباعة العربية', arabicLessons, <span className="text-sm font-black">ع</span>, 'bg-app-accent/20 text-app-accent')}
      {renderSection('دروس الطباعة الإنجليزية', englishLessons, <span className="text-xs font-black">EN</span>, 'bg-blue-500/20 text-blue-400')}
    </motion.div>
  );
};
