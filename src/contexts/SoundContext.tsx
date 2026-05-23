import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { playTrack, stop, setVolume, tracks, isPlaying, getCurrentTrackId } from '../lib/musicEngine';
import * as sfx from '../lib/soundEngine';

interface SoundContextType {
  musicPlaying: boolean;
  currentTrack: number | null;
  musicVolume: number;
  sfxVolume: number;
  playMusic: (trackId: number) => void;
  stopMusic: () => void;
  toggleMusic: () => void;
  setMusicVolume: (v: number) => void;
  setSfxVolume: (v: number) => void;
  tracks: typeof tracks;
  sfx: {
    playClick: () => void;
    playHover: () => void;
    playNavigate: () => void;
    playSuccess: () => void;
    playError: () => void;
    playToggle: () => void;
    playStarEarn: () => void;
    playComplete: () => void;
    playLessonComplete: () => void;
  };
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [musicVolume, setMusicVol] = useState(0.25);
  const [sfxVolume, setSfxVol] = useState(0.15);

  const playMusicCb = useCallback((trackId: number) => {
    const ok = playTrack(trackId, musicVolume);
    if (ok) {
      setMusicPlaying(true);
      setCurrentTrack(trackId);
    }
  }, [musicVolume]);

  const stopMusicCb = useCallback(() => {
    stop();
    setMusicPlaying(false);
    setCurrentTrack(null);
  }, []);

  const toggleMusicCb = useCallback(() => {
    if (musicPlaying) {
      stopMusicCb();
    } else {
      playMusicCb(currentTrack || 1);
    }
  }, [musicPlaying, currentTrack, playMusicCb, stopMusicCb]);

  const setMusicVolumeCb = useCallback((v: number) => {
    setMusicVol(v);
    setVolume(v);
  }, []);

  const setSfxVolumeCb = useCallback((v: number) => {
    setSfxVol(v);
  }, []);

  useEffect(() => {
    setVolume(musicVolume);
  }, [musicVolume]);

  const wrappedSfx = {
    playClick: () => sfx.playClick(sfxVolume),
    playHover: () => sfx.playHover(sfxVolume),
    playNavigate: () => sfx.playNavigate(sfxVolume),
    playSuccess: () => sfx.playSuccess(sfxVolume),
    playError: () => sfx.playError(sfxVolume),
    playToggle: () => sfx.playToggle(sfxVolume),
    playStarEarn: () => sfx.playStarEarn(sfxVolume),
    playComplete: () => sfx.playComplete(sfxVolume),
    playLessonComplete: () => sfx.playLessonComplete(sfxVolume),
  };

  return (
    <SoundContext.Provider value={{
      musicPlaying,
      currentTrack,
      musicVolume,
      sfxVolume,
      playMusic: playMusicCb,
      stopMusic: stopMusicCb,
      toggleMusic: toggleMusicCb,
      setMusicVolume: setMusicVolumeCb,
      setSfxVolume: setSfxVolumeCb,
      tracks,
      sfx: wrappedSfx,
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error('useSound must be used within SoundProvider');
  return context;
};
