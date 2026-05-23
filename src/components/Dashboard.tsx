import React from 'react';
import { Activity, Zap, Trophy, Flame, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useSession } from '../contexts/SessionContext';

export const Dashboard: React.FC = () => {
  const { stats, streak, recentSessions, totalXp, achievements } = useSession();

  const level = Math.min(99, Math.floor(totalXp / 250) + 1);
  const xpIntoLevel = totalXp - (level - 1) * 250;
  const xpProgress = Math.min(1, Math.max(0, xpIntoLevel / 250));

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-2xl border border-app-border bg-app-surface/40 backdrop-blur-xl p-5 shadow-lg ${className}`}>
      {children}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
      {/* Hero */}
      <Card className="relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-app-accent/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-app-accent/20 bg-app-accent/8 px-3 py-1.5 text-xs font-bold text-app-accent">
              <Trophy size={14} /> مستوى {level}
            </div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
              {stats.totalSessions > 0 ? 'مرحباً بعودتك' : 'أهلاً بك في TypoMaster'}
            </h1>
            <p className="text-sm text-app-text-muted leading-relaxed max-w-xl">
              {stats.totalSessions > 0
                ? `${stats.totalSessions} جلسة تدريبية · ${stats.bestWpm} WPM أقصى سرعة`
                : 'ابدأ رحلة تعلم الطباعة السريعة'}
            </p>
          </div>
          {/* XP Ring */}
          <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-app-border w-full lg:w-auto">
            <div className="relative w-20 h-20 rounded-full" style={{ background: `conic-gradient(var(--app-accent) ${xpProgress * 360}deg, rgba(255,255,255,0.06) ${xpProgress * 360}deg)` }}>
              <div className="absolute inset-[5px] rounded-full bg-app-bg flex items-center justify-center">
                <span className="text-lg font-black text-white">{Math.round(xpProgress * 100)}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-app-text-muted uppercase tracking-wider">الخبرة</p>
              <p className="text-lg font-black text-white">{xpIntoLevel} <span className="text-sm font-medium text-app-text-muted">/ 250 XP</span></p>
              <p className="text-xs text-app-text-muted mt-0.5">المستوى {level + 1} في {250 - xpIntoLevel} XP</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'الجلسات', value: stats.totalSessions, icon: Activity, color: 'text-green-400 bg-green-500/10' },
          { label: 'السرعة', value: `${stats.avgWpm || 0} WPM`, icon: Zap, color: 'text-blue-400 bg-blue-500/10' },
          { label: 'التسلسل', value: streak, icon: Flame, color: 'text-orange-400 bg-orange-500/10' },
          { label: 'نقاط الخبرة', value: totalXp, icon: Trophy, color: 'text-purple-400 bg-purple-500/10' },
        ].map((item, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                <item.icon size={18} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{item.value}</p>
            <p className="text-xs text-app-text-muted mt-0.5">{item.label}</p>
          </Card>
        ))}
      </div>

      {/* Sessions & Achievements */}
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">آخر الجلسات</h2>
            <span className="text-xs font-bold text-app-text-muted bg-white/5 px-3 py-1.5 rounded-lg">{recentSessions.length} جلسات</span>
          </div>
          <div className="space-y-2">
            {recentSessions.slice(0, 5).map((s, i) => (
              <div key={i} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] border border-app-border px-4 py-3 hover:bg-white/[0.06] transition-colors">
                <div>
                  <p className="text-sm font-bold text-white">{s.wpm} WPM · {s.accuracy}%</p>
                  <p className="text-xs text-app-text-muted mt-0.5">{s.createdAt}</p>
                </div>
                <span className="text-xs font-bold text-app-text-muted bg-white/5 px-2.5 py-1 rounded-lg">{formatDuration(s.timeSeconds)}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="flex-1">
            <h2 className="text-base font-bold text-white mb-4">الإنجازات</h2>
            <div className="flex flex-wrap gap-2">
              {achievements.slice(0, 6).map((a, i) => (
                <span key={i} className="text-xs font-bold bg-white/5 border border-app-border px-3 py-2 rounded-xl text-white">{a.title}</span>
              ))}
              {achievements.length === 0 && <p className="text-xs text-app-text-muted">لا توجد إنجازات بعد</p>}
            </div>
          </Card>
          <Card>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-app-text-muted">أعلى سرعة</p>
                <p className="text-lg font-black text-white">{stats.bestWpm || 0} WPM</p>
              </div>
              <div>
                <p className="text-xs text-app-text-muted">الدقة القصوى</p>
                <p className="text-lg font-black text-white">{stats.bestAccuracy || 0}%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
