export interface Track {
  id: number;
  name: string;
  nameAr: string;
  icon: string;
}

export const tracks: Track[] = [
  { id: 1, name: 'Deep Calm', nameAr: 'هدوء عميق', icon: '🌊' },
  { id: 2, name: 'Star Light', nameAr: 'ضوء النجوم', icon: '✨' },
  { id: 3, name: 'Warm Glow', nameAr: 'وهج دافئ', icon: '☀️' },
  { id: 4, name: 'Night Sky', nameAr: 'سماء الليل', icon: '🌙' },
  { id: 5, name: 'Gentle Stream', nameAr: 'جدول هادئ', icon: '🏞️' },
  { id: 6, name: 'Mountain Air', nameAr: 'نسيم الجبل', icon: '🏔️' },
  { id: 7, name: 'Silk Road', nameAr: 'طريق الحرير', icon: '🧣' },
  { id: 8, name: 'Deep Space', nameAr: 'الفضاء السحيق', icon: '🌌' },
  { id: 9, name: 'Forest Rain', nameAr: 'مطر الغابة', icon: '🌲' },
  { id: 10, name: 'Ocean Waves', nameAr: 'أمواج المحيط', icon: '🌊' },
];

let audio: HTMLAudioElement | null = null;
let currentTrackId: number | null = null;

export function getCurrentTrackId(): number | null {
  return currentTrackId;
}

export function playTrack(trackId: number, volume = 0.3): boolean {
  stop();

  try {
    const src = `/music/track-${trackId}.mp3`;
    audio = new Audio(src);
    audio.volume = Math.max(0, Math.min(1, volume));
    audio.loop = true;
    audio.play().catch(() => {});
    currentTrackId = trackId;
    return true;
  } catch (e) {
    console.error('Failed to play track:', e);
    return false;
  }
}

export function stop() {
  if (audio) {
    try { audio.pause(); } catch {}
    audio.src = '';
    audio = null;
  }
  currentTrackId = null;
}

export function setVolume(vol: number) {
  if (audio) {
    audio.volume = Math.max(0, Math.min(1, vol));
  }
}

export function isPlaying(): boolean {
  return audio !== null && !audio.paused;
}
