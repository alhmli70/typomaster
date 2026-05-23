import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllSettings, setSetting } from '../database/repositories/settingsRepository';

export type UiScale = 'small' | 'medium' | 'large' | 'xlarge';
export type SidebarMode = 'full' | 'compact' | 'auto';

export interface SettingsState {
  appLanguage: 'ar' | 'en';
  showKeyboard: boolean;
  showFingerHints: boolean;
  keyboardLayout: 'modern' | 'mechanical' | 'flat';
  enableSounds: boolean;
  theme: string;
  showAIQuickTips: boolean;
  animationSpeed: number;
  fontFamily: string;
  fontSizeOffset: number;
  layoutWidth: 'narrow' | 'normal' | 'wide' | 'full';
  uiScale: UiScale;
  sidebarMode: SidebarMode;
  glowEffect: boolean;
  glassmorphism: boolean;
  keyboardSize: 'small' | 'medium' | 'large';
  keyClickFeedback: 'none' | 'ripple' | 'scale';
  showKeyLetters: boolean;
  highlightNextKey: boolean;
  keyboardTransparency: number;
  soundVolume: number;
  soundType: 'modern' | 'typewriter' | 'mechanical';
  errorShakeEffect: boolean;
  showRealtimeMetrics: boolean;
  strictMode: boolean;
}

interface SettingsContextType {
  settings: SettingsState;
  updateSettings: (newSettings: Partial<SettingsState>) => void;
  playClickSound: () => void;
  playErrorSound: () => void;
}

const defaultSettings: SettingsState = {
  appLanguage: 'ar',
  showKeyboard: true,
  showFingerHints: true,
  keyboardLayout: 'mechanical',
  enableSounds: true,
  theme: 'dark',
  showAIQuickTips: true,
  animationSpeed: 1,
  fontFamily: 'cairo',
  fontSizeOffset: 0,
  layoutWidth: 'normal',
  uiScale: 'medium',
  sidebarMode: 'full',
  glowEffect: true,
  glassmorphism: true,
  keyboardSize: 'medium',
  keyClickFeedback: 'scale',
  showKeyLetters: true,
  highlightNextKey: true,
  keyboardTransparency: 100,
  soundVolume: 50,
  soundType: 'modern',
  errorShakeEffect: true,
  showRealtimeMetrics: true,
  strictMode: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function getScaleFactor(scale: string, windowWidth: number): number {
  if (windowWidth < 640) {
    if (scale === 'small') return 0.78;
    if (scale === 'large') return 0.92;
    if (scale === 'xlarge') return 1.0;
    return 0.85;
  }
  if (windowWidth < 1024) {
    if (scale === 'small') return 0.85;
    if (scale === 'large') return 1.1;
    if (scale === 'xlarge') return 1.2;
    return 1.0;
  }
  if (scale === 'small') return 0.85;
  if (scale === 'large') return 1.15;
  if (scale === 'xlarge') return 1.3;
  return 1.0;
}

function applySettings(settings: SettingsState) {
  document.documentElement.setAttribute('data-theme', settings.theme);
  document.documentElement.style.setProperty('--app-dir', settings.appLanguage === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.style.setProperty('--font-primary', settings.fontFamily === 'cairo' ? '"Cairo", sans-serif' : 'system-ui, sans-serif');

  // Compute root font-size from uiScale + fontSizeOffset
  const scaleMap: Record<string, number> = { small: 0.85, medium: 1.0, large: 1.15, xlarge: 1.3 };
  const baseScale = getScaleFactor(settings.uiScale, window.innerWidth);
  const offsetPct = settings.fontSizeOffset * 5;
  const finalPct = Math.round(baseScale * 100 + offsetPct);
  document.documentElement.style.fontSize = `${finalPct}%`;
}

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await getAllSettings();
        if (Object.keys(saved).length > 0) {
          const merged = { ...defaultSettings };
          for (const [key, val] of Object.entries(saved)) {
            if (key in merged) {
              const defaultVal = (merged as any)[key];
              if (typeof defaultVal === 'boolean') (merged as any)[key] = val === 'true';
              else if (typeof defaultVal === 'number') (merged as any)[key] = Number(val);
              else (merged as any)[key] = val;
            }
          }
          setSettings(merged);
        }
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (loaded) {
      applySettings(settings);
    }
  }, [settings, loaded]);

  useEffect(() => {
    if (!loaded) return;
    const onResize = () => applySettings(settings);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [loaded, settings]);

  const updateSettings = (newSettings: Partial<SettingsState>) => {
    setSettings(prev => {
      const next = { ...prev, ...newSettings };
      const asRecord: Record<string, string> = {};
      for (const [key, val] of Object.entries(next)) {
        asRecord[key] = String(val);
      }
      for (const [key, val] of Object.entries(asRecord)) {
        setSetting(key, val);
      }
      return next;
    });
  };

  const playClickSound = () => {
    if (!settings.enableSounds) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const vol = settings.soundVolume / 100;

      if (settings.soundType === 'typewriter') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
      } else if (settings.soundType === 'mechanical') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.06);
      } else {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.05);
      }

      gainNode.gain.setValueAtTime(0.3 * vol, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) { }
  };

  const playErrorSound = () => {
    if (!settings.enableSounds) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const vol = settings.soundVolume / 100;
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.3 * vol, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.2);
    } catch (e) { }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, playClickSound, playErrorSound }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
