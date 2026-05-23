import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from '../contexts/SoundContext';
import { Music, Play, Pause, SkipForward, Volume2 } from 'lucide-react';

export const MusicToggle: React.FC = () => {
  const { musicPlaying, currentTrack, musicVolume, tracks, playMusic, stopMusic, toggleMusic } = useSound();
  const [isOpen, setIsOpen] = useState(false);

  const nextTrack = () => {
    const nextId = currentTrack ? (currentTrack % 10) + 1 : 1;
    playMusic(nextId);
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-2xl bg-app-accent border border-app-accent/30 hover:border-white/20 flex items-center justify-center text-white transition-all shadow-xl hover:shadow-app-accent/20"
        title="الموسيقى"
      >
        <Music size={20} style={{ color: 'white' }} />
        {musicPlaying && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            className="fixed bottom-20 left-6 z-50 bg-app-surface/95 backdrop-blur-2xl border border-app-border rounded-2xl p-4 shadow-2xl w-[280px]"
          >
            <h3 className="text-sm font-black text-white mb-3">الموسيقى الهادئة</h3>

            {/* Now playing */}
            {musicPlaying && currentTrack && (
              <div className="flex items-center gap-2 mb-3 bg-app-accent/10 rounded-xl px-3 py-2 border border-app-accent/15">
                <span className="text-lg">{tracks.find(t => t.id === currentTrack)?.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{tracks.find(t => t.id === currentTrack)?.nameAr}</p>
                  <p className="text-[10px] text-app-text-muted truncate">{tracks.find(t => t.id === currentTrack)?.name}</p>
                </div>
              </div>
            )}

            {!musicPlaying && (
              <p className="text-xs text-app-text-muted mb-3">اختر مقطوعة للاسترخاء أثناء الطباعة</p>
            )}

            {/* Track list */}
            <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto mb-3 scrollbar-thin">
              {tracks.map(track => (
                <button
                  key={track.id}
                  onClick={() => playMusic(track.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-right transition-all text-sm ${
                    currentTrack === track.id && musicPlaying
                      ? 'bg-app-accent/15 text-app-accent border border-app-accent/20'
                      : 'hover:bg-white/5 text-app-text-muted hover:text-white border border-transparent'
                  }`}
                >
                  <span className="text-lg">{track.icon}</span>
                  <div className="flex-1 min-w-0 text-right">
                    <span className="font-bold text-xs block truncate">{track.nameAr}</span>
                    <span className="text-[10px] opacity-60 block truncate">{track.name}</span>
                  </div>
                  {currentTrack === track.id && musicPlaying && (
                    <span className="w-2 h-2 bg-app-accent rounded-full animate-pulse shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-app-border/50">
              <div className="flex items-center gap-1">
                <Volume2 size={14} className="text-app-text-muted" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(musicVolume * 100)}
                  onChange={e => useSound().setMusicVolume(Number(e.target.value) / 100)}
                  className="w-20 h-1 accent-app-accent"
                />
              </div>
              <div className="flex items-center gap-1">
                <button onClick={nextTrack} className="p-1.5 rounded-lg hover:bg-white/5 text-app-text-muted hover:text-white transition-all">
                  <SkipForward size={14} />
                </button>
                <button
                  onClick={toggleMusic}
                  className={`p-2 rounded-xl transition-all ${
                    musicPlaying
                      ? 'bg-app-accent text-black'
                      : 'bg-white/5 text-app-text-muted hover:text-white'
                  }`}
                >
                  {musicPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
