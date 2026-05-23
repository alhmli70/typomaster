export function calculateStars(wpm: number, accuracy: number, level: string): number {
  if (accuracy < 80) return 0;

  const thresholds: Record<string, number> = {
    beginner: 25, مبتدئ: 25,
    medium: 35, متوسط: 35,
    advanced: 45, متقدم: 45,
  };
  const threshold = thresholds[level] || 30;

  if (wpm >= threshold * 1.4 && accuracy >= 95) return 3;
  if (wpm >= threshold && accuracy >= 85) return 2;
  return 1;
}
