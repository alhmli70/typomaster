import React, { useState } from 'react';
import { Exercise } from '../types';
import { useExercises } from '../contexts/ExerciseContext';
import { useSession } from '../contexts/SessionContext';
import { useSound } from '../contexts/SoundContext';
import { Gamepad2, Play, Trophy, Crosshair, Zap, Type, Swords, Sparkles, Search, Filter } from 'lucide-react';
import { FallingWords } from './Games/FallingWords';
import { motion, AnimatePresence } from 'motion/react';
import { TyperShooter } from './Games/TyperShooter';
import { NinjaTyper } from './Games/NinjaTyper';
import { MemoryTyping } from './Games/MemoryTyping';
import { SpeedRace } from './Games/SpeedRace';

export const GamesMenu: React.FC = () => {
  const { exercises } = useExercises();
  const { recordGameScore } = useSession();
  const { sfx } = useSound();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLang, setFilterLang] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredExercises = exercises.filter(ex => {
    const matchSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || ex.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchLang = filterLang === 'all' || ex.language === filterLang;
    const matchLevel = filterLevel === 'all' || ex.level === filterLevel;
    return matchSearch && matchLang && matchLevel;
  });

  const games = [
    { id: 'falling', name: 'الكلمات المتساقطة', icon: <Type size={28} />, color: 'text-blue-400', bg: 'bg-blue-400/20', desc: 'اكتب الكلمات قبل أن تصل إلى القاع.' },
    { id: 'shooter', name: 'قناص مسافة', icon: <Crosshair size={28} />, color: 'text-red-400', bg: 'bg-red-400/20', desc: 'دمر الكلمات عبر الطباعة السريعة.' },
    { id: 'memory', name: 'ذاكرة الطباعة', icon: <Sparkles size={28} />, color: 'text-purple-400', bg: 'bg-purple-400/20', desc: 'تذكر الكلمة واطبعها بعد اختفائها.' },
    { id: 'race', name: 'سباق السرعة', icon: <Zap size={28} />, color: 'text-yellow-400', bg: 'bg-yellow-400/20', desc: 'سابق الزمن واكتب أسرع من الخصم.' },
    { id: 'ninja', name: 'نينجا الحروف', icon: <Swords size={28} />, color: 'text-emerald-400', bg: 'bg-emerald-400/20', desc: 'اقطع الكلمات فور ظهورها.' },
  ];

  const handleGameFinish = (gameName: string, score: number) => {
    recordGameScore(gameName, score, selectedExercise?.language || 'ar');
    setActiveGame(null);
  };

  if (selectedExercise && activeGame === 'falling') {
    return <FallingWords exercise={selectedExercise} onBack={() => setActiveGame(null)} onFinish={(score) => handleGameFinish('الكلمات المتساقطة', score)} />;
  }
  if (selectedExercise && activeGame === 'shooter') {
    return <TyperShooter exercise={selectedExercise} onBack={() => setActiveGame(null)} onFinish={(score) => handleGameFinish('قناص مسافة', score)} />;
  }
  if (selectedExercise && activeGame === 'ninja') {
    return <NinjaTyper exercise={selectedExercise} onBack={() => setActiveGame(null)} onFinish={(score) => handleGameFinish('نينجا الحروف', score)} />;
  }
  if (selectedExercise && activeGame === 'memory') {
    return <MemoryTyping exercise={selectedExercise} onBack={() => setActiveGame(null)} onFinish={(score) => handleGameFinish('ذاكرة الطباعة', score)} />;
  }
  if (selectedExercise && activeGame === 'race') {
    return <SpeedRace exercise={selectedExercise} onBack={() => setActiveGame(null)} onFinish={(score) => handleGameFinish('سباق السرعة', score)} />;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 w-full pb-8">

      <div className="bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-5 md:p-7 relative overflow-hidden flex items-center gap-5">
        <div className="absolute top-0 right-0 w-48 h-48 bg-app-accent/8 blur-[80px] rounded-full pointer-events-none" />
        <div className="bg-gradient-to-br from-app-accent/30 to-purple-500/20 p-4 rounded-xl border border-white/10 shrink-0">
          <Gamepad2 size={28} className="text-app-accent" />
        </div>
        <div className="relative z-10">
          <h2 className="text-xl md:text-2xl font-black text-white">الألعاب</h2>
          <p className="text-app-text-muted text-sm mt-0.5">اختر لعبة وابدأ التدريب بطريقة مسلية</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((game) => (
          <motion.div key={game.id} whileHover={{ y: -2 }} className="group bg-app-surface/40 backdrop-blur-xl border border-app-border hover:border-app-accent/40 rounded-2xl p-5 cursor-pointer transition-all duration-200 relative overflow-hidden" onClick={() => { sfx.playClick(); setActiveGame(game.id); }}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${game.bg} ${game.color} mb-4`}>
              {game.icon}
            </div>
            <h3 className="font-black text-white text-base mb-1">{game.name}</h3>
            <p className="text-xs text-app-text-muted/80 leading-relaxed">{game.desc}</p>
            <div className="flex items-center gap-2 mt-4 text-xs font-bold text-app-text-muted group-hover:text-app-accent transition-colors">
              <Play size={12} className="fill-current" /> ابدأ اللعب
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeGame && !selectedExercise && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-5 md:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-app-accent/5 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-white text-lg">اختر تمرين للعبة</h3>
                <button onClick={() => { sfx.playNavigate(); setActiveGame(null); }} className="text-sm font-bold text-app-text-muted hover:text-white bg-black/30 border border-app-border px-3 py-1.5 rounded-lg transition-colors">إلغاء</button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-muted" />
                  <input type="text" placeholder="ابحث عن تمرين..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-black/30 border border-app-border rounded-xl pl-9 pr-3 py-2 text-white text-sm outline-none focus:border-app-accent transition-all placeholder:text-app-text-muted/50" />
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-1.5 bg-black/30 border border-app-border rounded-xl px-3 py-2">
                    <Filter size={13} className="text-app-text-muted shrink-0" />
                    <select value={filterLang} onChange={e => setFilterLang(e.target.value)} className="bg-transparent text-xs font-bold outline-none text-white appearance-none cursor-pointer">
                      <option value="all">الكل</option>
                      <option value="ar">عربي</option>
                      <option value="en">English</option>
                      <option value="code">Code</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/30 border border-app-border rounded-xl px-3 py-2">
                    <Filter size={13} className="text-app-text-muted shrink-0" />
                    <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} className="bg-transparent text-xs font-bold outline-none text-white appearance-none cursor-pointer">
                      <option value="all">كل المستويات</option>
                      <option value="beginner">مبتدئ</option>
                      <option value="medium">متوسط</option>
                      <option value="advanced">متقدم</option>
                    </select>
                  </div>
                </div>
              </div>

              {filteredExercises.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-app-text-muted">
                  <Search size={32} className="opacity-30 mb-2" />
                  <p className="text-sm font-bold text-white mb-1">لا توجد تمارين مطابقة</p>
                  <p className="text-xs">جرب تغيير معايير البحث</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredExercises.map((ex) => (
                  <div key={ex.id} onClick={() => { sfx.playClick(); setSelectedExercise(ex); }} className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-app-border hover:border-app-accent/40 cursor-pointer transition-all group/ex">
                    <div className="p-2 bg-black/40 rounded-lg border border-app-border">
                      {ex.language === 'code' ? <span className="text-xs font-bold text-app-accent-2">{'</>'}</span> : <span className="text-xs font-bold text-app-accent">{ex.language === 'en' ? 'EN' : 'ع'}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{ex.title}</p>
                      <p className="text-xs text-app-text-muted truncate">{ex.content.slice(0, 40)}...</p>
                    </div>
                    <Play size={14} className="text-app-text-muted group-hover/ex:text-app-accent transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
