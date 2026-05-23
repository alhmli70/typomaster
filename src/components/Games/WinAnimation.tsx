import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Trophy, Star } from 'lucide-react';

interface WinAnimationProps {
  score?: number;
  message?: string;
}

export const WinAnimation: React.FC<WinAnimationProps> = ({ score, message = 'أداء رائع!' }) => {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, color: string, scale: number}[]>([]);

  useEffect(() => {
    // Generate particles
    const colors = ['#FFC800', '#FFA000', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0', '#00BCD4'];
    const newParticles = [...Array(40)].map((_, i) => {
      // random angle and radius
      const angle = Math.random() * Math.PI * 2;
      const radius = 100 + Math.random() * 300;
      return {
        id: i,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 1.5 + 0.5,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, scale: p.scale, opacity: 0 }}
          transition={{ duration: 1.2 + Math.random() * 0.8, ease: 'easeOut' }}
          className="absolute w-4 h-4 rounded-full"
          style={{ backgroundColor: p.color }}
        />
      ))}
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.6, duration: 1 }}
        className="bg-app-surface border-4 border-yellow-400 rounded-full p-6 shadow-[0_0_60px_rgba(255,200,0,0.6)] mb-6 z-10 flex items-center justify-center"
      >
        <Trophy size={80} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(255,200,0,0.8)]" />
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', bounce: 0.5 }}
        className="flex flex-col items-center bg-black/40 backdrop-blur-md px-10 py-6 rounded-3xl border border-yellow-500/30"
      >
        <div className="flex gap-2 mb-2">
          <Star className="text-yellow-400 fill-yellow-400 w-6 h-6" />
          <Star className="text-yellow-400 fill-yellow-400 w-8 h-8 -mt-2" />
          <Star className="text-yellow-400 fill-yellow-400 w-6 h-6" />
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 text-center drop-shadow-lg">
          {message}
        </h2>
        {score !== undefined && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-2xl text-white mt-4 font-bold"
          >
            النقاط النهائية: <span className="text-yellow-400 text-3xl">{score}</span>
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};
