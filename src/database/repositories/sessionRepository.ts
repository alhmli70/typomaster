import { invoke } from '@tauri-apps/api/core';

export interface TypingSessionRecord {
  exerciseId?: string;
  wpm: number;
  accuracy: number;
  errors: number;
  timeSeconds: number;
  totalChars: number;
  language: string;
}

export interface Stats {
  avgWpm: number;
  avgAccuracy: number;
  bestWpm: number;
  bestAccuracy: number;
  totalSessions: number;
  totalTimeSeconds: number;
  totalCharsTyped: number;
}

export interface WeeklyStat {
  day: string;
  avgWpm: number;
  avgAccuracy: number;
  sessions: number;
  totalTime: number;
}

export interface GameScoreEntry {
  game: string;
  bestScore: number;
}

export interface Achievement {
  title: string;
  description: string;
  unlockedAt: string;
}

function round(v: unknown): number {
  return Math.round(Number(v) || 0);
}

export async function recordTypingSession(session: TypingSessionRecord) {
  await invoke('record_typing_session', {
    session: {
      exercise_id: session.exerciseId ?? null,
      wpm: session.wpm,
      accuracy: session.accuracy,
      errors: session.errors,
      time_seconds: session.timeSeconds,
      total_chars: session.totalChars,
      language: session.language,
    },
  });
}

export async function getTypingStats(): Promise<Stats> {
  const row = await invoke<{
    avg_wpm: number;
    avg_accuracy: number;
    best_wpm: number;
    best_accuracy: number;
    total_sessions: number;
    total_time_seconds: number;
    total_chars_typed: number;
  }>('get_typing_stats');

  return {
    avgWpm: round(row.avg_wpm),
    avgAccuracy: round(row.avg_accuracy),
    bestWpm: round(row.best_wpm),
    bestAccuracy: round(row.best_accuracy),
    totalSessions: round(row.total_sessions),
    totalTimeSeconds: round(row.total_time_seconds),
    totalCharsTyped: round(row.total_chars_typed),
  };
}

export async function getRecentSessions(limit = 10) {
  const rows = await invoke<
    {
      wpm: number;
      accuracy: number;
      errors: number;
      time_seconds: number;
      total_chars: number;
      language: string;
      created_at: string;
    }[]
  >('get_recent_sessions', { limit });

  return rows.map((r) => ({
    wpm: r.wpm,
    accuracy: r.accuracy,
    errors: r.errors,
    timeSeconds: r.time_seconds,
    totalChars: r.total_chars,
    language: r.language,
    createdAt: r.created_at,
  }));
}

export async function getWeeklyStats(): Promise<WeeklyStat[]> {
  const rows = await invoke<
    { day: string; avg_wpm: number; avg_accuracy: number; sessions: number; total_time: number }[]
  >('get_weekly_stats_cmd');

  return rows.map((r) => ({
    day: r.day,
    avgWpm: round(r.avg_wpm),
    avgAccuracy: round(r.avg_accuracy),
    sessions: r.sessions,
    totalTime: r.total_time,
  }));
}

export async function getStreak(): Promise<number> {
  return invoke<number>('get_streak');
}

export async function saveGameScore(gameName: string, score: number, language = 'ar') {
  await invoke('save_game_score_cmd', {
    score: {
      game_name: gameName,
      score,
      language,
    },
  });
}

export async function getBestGameScores(): Promise<GameScoreEntry[]> {
  const rows = await invoke<{ game: string; best_score: number }[]>('get_best_game_scores');
  return rows.map((r) => ({
    game: r.game,
    bestScore: r.best_score,
  }));
}

export async function getBestExerciseSessions(): Promise<Record<string, { wpm: number; accuracy: number }>> {
  const rows = await invoke<{ exercise_id: string; wpm: number; accuracy: number }[]>(
    'get_best_exercise_sessions'
  );
  const map: Record<string, { wpm: number; accuracy: number }> = {};
  for (const row of rows) {
    if (row.exercise_id) {
      map[row.exercise_id] = { wpm: round(row.wpm), accuracy: round(row.accuracy) };
    }
  }
  return map;
}

export async function getTotalXp(): Promise<number> {
  return round(await invoke<number>('get_total_xp_cmd'));
}

export async function addAchievement(title: string, description: string) {
  await invoke('add_achievement_cmd', { title, description });
}

export async function getAchievements(): Promise<Achievement[]> {
  const rows = await invoke<{ title: string; description: string; unlocked_at: string }[]>(
    'get_achievements_cmd'
  );
  return rows.map((r) => ({
    title: r.title,
    description: r.description,
    unlockedAt: r.unlocked_at,
  }));
}

export async function checkAndUnlockAchievements(stats: {
  totalSessions: number;
  bestWpm: number;
  streak: number;
  totalXp: number;
}) {
  if (stats.totalSessions >= 1) await addAchievement('البداية', 'أول جلسة طباعة');
  if (stats.totalSessions >= 10) await addAchievement('عشرة جلسات', 'أتممت 10 جلسات تدريب');
  if (stats.totalSessions >= 50) await addAchievement('خمسون جلسة', 'أتممت 50 جلسة تدريب');
  if (stats.bestWpm >= 40) await addAchievement('سرعة 40 WPM', 'تجاوزت حاجز 40 كلمة في الدقيقة');
  if (stats.bestWpm >= 60) await addAchievement('سرعة 60 WPM', 'تجاوزت حاجز 60 كلمة في الدقيقة');
  if (stats.bestWpm >= 80) await addAchievement('سرعة 80 WPM', 'تجاوزت حاجز 80 كلمة في الدقيقة');
  if (stats.bestWpm >= 100) await addAchievement('سرعة 100 WPM', 'تجاوزت حاجز 100 كلمة في الدقيقة');
  if (stats.streak >= 3) await addAchievement('3 أيام متتالية', 'تدربت 3 أيام متتالية');
  if (stats.streak >= 7) await addAchievement('أسبوع متتالي', 'تدربت 7 أيام متتالية');
  if (stats.streak >= 30) await addAchievement('تحدي 30 يوم', 'تدربت 30 يوم متتالي');
  if (stats.totalXp >= 1000) await addAchievement('1000 XP', 'وصلت إلى 1000 نقطة خبرة');
  if (stats.totalXp >= 10000) await addAchievement('10000 XP', 'وصلت إلى 10000 نقطة خبرة');
}

export async function resetAllData() {
  await invoke('reset_all_data_cmd');
}
