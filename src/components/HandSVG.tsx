import React from 'react';
import { motion } from 'motion/react';

export type FingerType = 'thumb' | 'index' | 'middle' | 'ring' | 'pinky';
export type HandType = 'left' | 'right';

interface HandSVGProps {
  hand: HandType;
  activeFinger?: FingerType;
  className?: string;
  size?: number;
}

const handColors = {
  left: {
    thumb:  { color: '#fbbf24', label: 'إبهام' },
    index:  { color: '#22c55e', label: 'سبابة' },
    middle: { color: '#eab308', label: 'وسطى' },
    ring:   { color: '#f97316', label: 'بنصر' },
    pinky:  { color: '#ef4444', label: 'خنصر' },
  },
  right: {
    thumb:  { color: '#fbbf24', label: 'إبهام' },
    index:  { color: '#14b8a6', label: 'سبابة' },
    middle: { color: '#3b82f6', label: 'وسطى' },
    ring:   { color: '#6366f1', label: 'بنصر' },
    pinky:  { color: '#a855f7', label: 'خنصر' },
  },
};

const ratios = {
  h: { thumb: 0.48, index: 0.82, middle: 1.00, ring: 0.82, pinky: 0.62 },
  w: { thumb: 0.22, index: 0.13, middle: 0.13, ring: 0.13, pinky: 0.10 },
};

const order: Record<HandType, FingerType[]> = {
  left:  ['pinky', 'ring', 'middle', 'index', 'thumb'],
  right: ['thumb', 'index', 'middle', 'ring', 'pinky'],
};

export const HandSVG: React.FC<HandSVGProps> = ({ hand, activeFinger, className = "", size = 200 }) => {
  const isLeft = hand === 'left';
  const cfg = handColors[hand];
  const fingerOrder = order[hand];

  const s = size;
  const maxH = s * 0.50;
  const gap = s * 0.025;
  const palmH = s * 0.16;
  const wristH = s * 0.05;
  const pad = (s - fingerOrder.reduce((t, f) => t + s * ratios.w[f], 0) - gap * 4) / 2;

  const leftHandL = { thumb: '9999px 9999px 9999px 8px' as const, index: '9999px' as const, middle: '9999px' as const, ring: '9999px' as const, pinky: '9999px' as const };
  const rightHandL = { thumb: '9999px 9999px 8px 9999px' as const, index: '9999px' as const, middle: '9999px' as const, ring: '9999px' as const, pinky: '9999px' as const };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-end select-none ${className}`}
      style={{ width: s, height: s }}
    >
      {/* Wrist */}
      <div style={{
        width: s * 0.45,
        height: wristH,
        borderRadius: '0 0 40% 40%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.03)',
        borderTop: 'none',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
      }} />

      {/* Palm */}
      <div className="relative" style={{
        width: s * 0.82,
        height: palmH,
        borderRadius: '50% 50% 35% 35% / 60% 60% 25% 25%',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.02)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06)',
        marginBottom: -1,
      }}>
        {[0.30, 0.50].map((p, i) => (
          <div key={i} style={{
            position: 'absolute', width: `${55 - i * 10}%`, height: 1,
            background: 'rgba(255,255,255,0.04)',
            borderRadius: '50%',
            top: `${p * 100}%`, left: `${22 + i * 5}%`,
          }} />
        ))}
      </div>

      {/* Fingers */}
      <div className="flex items-end" style={{ gap, paddingLeft: pad, paddingRight: pad }}>
        {fingerOrder.map((finger) => {
          const f = cfg[finger];
          const active = activeFinger === finger;
          const h = Math.round(maxH * ratios.h[finger]);
          const w = Math.round(s * ratios.w[finger]);
          const br = (isLeft ? leftHandL : rightHandL)[finger];

          return (
            <motion.div
              key={finger}
              animate={active ? { y: -12 } : { y: 0 }}
              transition={{ type: 'spring', stiffness: 700, damping: 24, mass: 0.5 }}
              className="relative flex flex-col items-center"
              style={{ width: w }}
            >
              {/* Ambient glow */}
              {active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute pointer-events-none"
                  style={{
                    width: w * 3,
                    height: h * 1.4,
                    left: -w,
                    top: -h * 0.15,
                    background: `radial-gradient(ellipse, ${f.color}44 0%, transparent 70%)`,
                    borderRadius: '50%',
                  }}
                />
              )}

              {/* Finger */}
              <motion.div
                animate={{ height: h }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="relative overflow-hidden"
                style={{
                  width: '100%',
                  borderRadius: br,
                  background: active
                    ? `linear-gradient(160deg, ${f.color}dd 0%, ${f.color} 40%, ${f.color}cc 100%)`
                    : 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.01) 100%)',
                  border: active
                    ? `1px solid ${f.color}88`
                    : '1px solid rgba(255,255,255,0.06)',
                  boxShadow: active
                    ? `0 0 40px ${f.color}55, 0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.35)`
                    : '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                {/* Sheen */}
                {active && (
                  <div className="absolute inset-0 pointer-events-none" style={{
                    borderRadius: 'inherit',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.30) 0%, transparent 45%, rgba(0,0,0,0.08) 100%)',
                  }} />
                )}
                {/* Inactive subtle inner highlight */}
                {!active && (
                  <div className="absolute inset-0 pointer-events-none" style={{
                    borderRadius: 'inherit',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(0,0,0,0.04) 100%)',
                  }} />
                )}
              </motion.div>

              {/* Knuckle */}
              {finger !== 'thumb' && (
                <div style={{
                  width: '55%', height: 3, borderRadius: '50%',
                  background: active ? `${f.color}55` : 'rgba(255,255,255,0.04)',
                  marginTop: 2,
                  opacity: 0.3,
                }} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Active badge */}
      {activeFinger && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 10 }}
          className="mt-3"
        >
          <span
            className="text-[10px] md:text-sm font-black px-3 py-1 rounded-full tracking-wide"
            style={{
              backgroundColor: `${cfg[activeFinger].color}22`,
              color: cfg[activeFinger].color,
              border: `1px solid ${cfg[activeFinger].color}44`,
              boxShadow: `0 0 16px ${cfg[activeFinger].color}22`,
            }}
          >
            {cfg[activeFinger].label}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
};
