import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  recordTypingSession,
  getTypingStats,
  getRecentSessions,
  getWeeklyStats,
  getStreak,
  saveGameScore,
  getBestGameScores,
  getTotalXp,
  getAchievements,
  checkAndUnlockAchievements,
  getBestExerciseSessions,
} from '../database/repositories/sessionRepository';

interface TypingSession {
  wpm: number;
  accuracy: number;
  errors: number;
  timeSeconds: number;
  totalChars: number;
  language: string;
  createdAt?: string;
}

interface GameScoreEntry {
  game: string;
  bestScore: number;
}

interface Achievement {
  title: string;
  description: string;
  unlockedAt: string;
}

interface Stats {
  avgWpm: number;
  avgAccuracy: number;
  bestWpm: number;
  bestAccuracy: number;
  totalSessions: number;
  totalTimeSeconds: number;
  totalCharsTyped: number;
}

interface SessionContextType {
  stats: Stats;
  recentSessions: TypingSession[];
  weeklyStats: { day: string; avgWpm: number; avgAccuracy: number; sessions: number; totalTime: number }[];
  streak: number;
  totalXp: number;
  gameScores: GameScoreEntry[];
  achievements: Achievement[];
  exerciseSessions: Record<string, { wpm: number; accuracy: number }>;
  recordSession: (session: TypingSession & { exerciseId?: string }) => Promise<void>;
  recordGameScore: (gameName: string, score: number, language?: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const emptyStats: Stats = {
  avgWpm: 0, avgAccuracy: 0, bestWpm: 0, bestAccuracy: 0,
  totalSessions: 0, totalTimeSeconds: 0, totalCharsTyped: 0,
};

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [recentSessions, setRecentSessions] = useState<TypingSession[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [gameScores, setGameScores] = useState<GameScoreEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [exerciseSessions, setExerciseSessions] = useState<Record<string, { wpm: number; accuracy: number }>>({});

  const refresh = useCallback(async () => {
    try {
      const [s, r, w, str, xp, g, a, es] = await Promise.all([
        getTypingStats(),
        getRecentSessions(),
        getWeeklyStats(),
        getStreak(),
        getTotalXp(),
        getBestGameScores(),
        getAchievements(),
        getBestExerciseSessions(),
      ]);
      setStats(s);
      setRecentSessions(r as unknown as TypingSession[]);
      setWeeklyStats(w);
      setStreak(str);
      setTotalXp(xp);
      setGameScores(g as unknown as GameScoreEntry[]);
      setAchievements(a as unknown as Achievement[]);
      setExerciseSessions(es);

      await checkAndUnlockAchievements({
        totalSessions: s.totalSessions,
        bestWpm: s.bestWpm,
        streak: str,
        totalXp: xp,
      });
    } catch (e) {
      console.error('Failed to refresh session data:', e);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const recordSession = async (session: TypingSession & { exerciseId?: string }) => {
    await recordTypingSession({
      exerciseId: session.exerciseId,
      wpm: session.wpm,
      accuracy: session.accuracy,
      errors: session.errors,
      timeSeconds: session.timeSeconds,
      totalChars: session.totalChars,
      language: session.language,
    });
    await refresh();
  };

  const recordGameScore = async (gameName: string, score: number, language = 'ar') => {
    await saveGameScore(gameName, score, language);
    await refresh();
  };

  return (
    <SessionContext.Provider value={{
      stats, recentSessions, weeklyStats, streak, totalXp, gameScores, achievements, exerciseSessions,
      recordSession, recordGameScore, refresh,
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
