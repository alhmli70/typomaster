import React from 'react';
import { User, Activity, Flame, Trophy, Mail, Sparkles, Gamepad2, Clock, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useSession } from '../contexts/SessionContext';

export const Profile: React.FC = () => {
  const { stats, streak, gameScores, totalXp, achievements, recentSessions } = useSession();

  const level = Math.min(99, Math.floor(totalXp / 250) + 1);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m} دقيقة`;
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 w-full pb-8">

      <div className="flex flex-col md:flex-row items-center gap-6 bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-app-accent/8 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/8 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-app-accent p-1 shadow-[0_0_30px_rgba(var(--app-accent),0.3)] relative">
            <div className="w-full h-full bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-app-accent text-4xl md:text-5xl font-black">
              {stats.totalSessions > 0 ? 'أ' : 'ض'}
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-app-accent text-black font-black text-xs px-3 py-1 rounded-full shadow-[0_0_15px_rgba(var(--app-accent),0.5)] whitespace-nowrap">
            مستوى {level}
          </div>
        </div>

        <div className="flex flex-col gap-2 text-center md:text-right flex-1">
          <h2 className="text-2xl md:text-3xl font-black text-white">
            {stats.totalSessions > 0 ? 'أحمد المبرمج' : 'مستخدم جديد'}
          </h2>
          <div className="flex items-center gap-2 text-app-text-muted justify-center md:justify-start">
            <Mail size={16} />
            <span dir="ltr" className="text-sm">user@typomaster.app</span>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 justify-center md:justify-start">
            <span className="bg-app-accent/10 text-app-accent px-4 py-1.5 rounded-full font-bold text-xs border border-app-accent/30">
              {stats.totalSessions > 0 ? `مستوى ${level}` : 'مبتدئ'}
            </span>
            <span className="bg-white/5 text-white px-4 py-1.5 rounded-full border border-app-border text-xs font-bold">
              {stats.totalSessions > 0 ? `${stats.totalSessions} جلسة تدريب` : 'بداية الرحلة'}
            </span>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-app-border px-6 py-3 rounded-xl font-bold whitespace-nowrap flex items-center gap-2">
          <Target size={18} className="text-app-accent" />
          <span className="text-white">{totalXp} XP</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-6 flex flex-col items-center gap-3 text-center relative overflow-hidden group hover:border-green-400/30 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-400/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-green-400/10 transition-colors" />
          <Activity className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]" size={32} />
          <h3 className="text-3xl font-mono font-black text-white">{stats.bestWpm || '-'}</h3>
          <p className="text-app-text-muted font-bold text-sm">أعلى سرعة (WPM)</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-6 flex flex-col items-center gap-3 text-center relative overflow-hidden group hover:border-orange-400/30 transition-colors">
          <div className="absolute top-0 left-0 w-24 h-24 bg-orange-400/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-orange-400/10 transition-colors" />
          <Flame className="text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]" size={32} />
          <h3 className="text-3xl font-mono font-black text-white">{streak}</h3>
          <p className="text-app-text-muted font-bold text-sm">أيام متتالية (Streak)</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-6 flex flex-col items-center gap-3 text-center relative overflow-hidden group hover:border-app-accent/30 transition-colors">
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-app-accent/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-app-accent/10 transition-colors" />
          <Trophy className="text-app-accent drop-shadow-[0_0_10px_rgba(var(--app-accent),0.5)]" size={32} />
          <h3 className="text-3xl font-mono font-black text-white">{totalXp.toLocaleString()}</h3>
          <p className="text-app-text-muted font-bold text-sm">مجموع النقاط (XP)</p>
        </motion.div>
      </div>

      {stats.totalTimeSeconds > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-app-surface/30 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-app-border flex items-center gap-4">
            <Clock size={24} className="text-blue-400 shrink-0" />
            <div>
              <p className="text-app-text-muted text-xs">إجمالي وقت التدريب</p>
              <p className="text-xl font-black text-white">{formatTime(stats.totalTimeSeconds)}</p>
            </div>
          </div>
          <div className="bg-app-surface/30 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-app-border flex items-center gap-4">
            <Activity size={24} className="text-green-400 shrink-0" />
            <div>
              <p className="text-app-text-muted text-xs">إجمالي الأحرف المطبوعة</p>
              <p className="text-xl font-black text-white">{stats.totalCharsTyped.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-app-surface/30 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-app-border flex items-center gap-4">
            <Gamepad2 size={24} className="text-purple-400 shrink-0" />
            <div>
              <p className="text-app-text-muted text-xs">أفضل نتيجة لعبة</p>
              <p className="text-xl font-black text-white">{gameScores.length > 0 ? gameScores[0].bestScore.toLocaleString() : '-'}</p>
            </div>
          </div>
        </div>
      )}

      {gameScores.length > 0 && (
        <div>
          <h3 className="font-black text-lg text-white flex items-center gap-3 mb-4">
            <Gamepad2 className="text-app-accent" size={22} />
            نتائج الألعاب
            <span className="text-xs font-bold text-app-text-muted bg-white/5 px-2.5 py-1 rounded-lg">{gameScores.length}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {gameScores.map((g, i) => (
              <div key={i} className="bg-app-surface/40 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-app-border flex justify-between items-center">
                <span className="font-bold text-white">{g.game}</span>
                <span className="text-xl font-black font-mono text-app-accent">{g.bestScore}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-black text-lg text-white flex items-center gap-3 mb-4">
          <Sparkles className="text-app-accent" size={22} />
          {achievements.length > 0 ? 'الإنجازات' : 'آخر الإنجازات'}
          <span className="text-xs font-bold text-app-text-muted bg-white/5 px-2.5 py-1 rounded-lg">{achievements.length}</span>
        </h3>
        <div className="grid gap-3">
          {achievements.length > 0 ? (
            achievements.map((item, i) => (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + (i * 0.1) }} key={i} className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-app-surface/40 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-app-border hover:border-white/20 transition-all hover:bg-white/5 group">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-app-accent/10 flex items-center justify-center text-app-accent group-hover:scale-110 transition-transform shrink-0">
                    <Trophy size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-app-accent transition-colors">{item.title}</h4>
                    <p className="text-app-text-muted text-xs mt-0.5">{item.description}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-app-text-muted bg-black/40 px-3 py-1.5 rounded-lg border border-app-border whitespace-nowrap self-start md:self-center">{item.unlockedAt}</span>
              </motion.div>
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-app-text-muted border-2 border-dashed border-app-border rounded-2xl bg-app-surface/20">
              <Trophy size={40} className="opacity-30 mb-3" />
              <p className="text-base font-bold text-white mb-1">لا توجد إنجازات بعد</p>
              <p className="text-sm">قم بجلسات تدريب لفتح الإنجازات!</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
