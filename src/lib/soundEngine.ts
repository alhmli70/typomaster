let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function playTone(type: OscillatorType, freq: number, duration: number, volume = 0.15, rampFreq?: number) {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    if (rampFreq) osc.frequency.exponentialRampToValueAtTime(rampFreq, c.currentTime + duration);
    gain.gain.setValueAtTime(volume, c.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + duration);
  } catch {}
}

export function playClick(vol = 0.1) {
  playTone('sine', 800, 0.06, vol, 1000);
}

export function playHover(vol = 0.05) {
  playTone('sine', 1200, 0.03, vol);
}

export function playNavigate(vol = 0.08) {
  playTone('sine', 600, 0.08, vol, 900);
}

export function playSuccess(vol = 0.12) {
  playTone('sine', 523, 0.1, vol);
  setTimeout(() => playTone('sine', 659, 0.1, vol), 80);
  setTimeout(() => playTone('sine', 784, 0.15, vol), 160);
}

export function playError(vol = 0.1) {
  playTone('sawtooth', 180, 0.15, vol, 120);
}

export function playToggle(vol = 0.06) {
  playTone('sine', 500, 0.05, vol, 700);
}

export function playStarEarn(vol = 0.1) {
  playTone('sine', 880, 0.08, vol);
  setTimeout(() => playTone('sine', 1100, 0.12, vol), 100);
  setTimeout(() => playTone('sine', 1320, 0.15, vol), 200);
}

export function playComplete(vol = 0.15) {
  [523, 587, 659, 784, 880, 1047].forEach((f, i) => {
    setTimeout(() => playTone('sine', f, 0.15, vol), i * 80);
  });
}

export function playLessonComplete(vol = 0.12) {
  [392, 523, 659, 784].forEach((f, i) => {
    setTimeout(() => playTone('triangle', f, 0.2, vol), i * 120);
  });
}
