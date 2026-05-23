import React from 'react';
import { motion } from 'motion/react';

interface KeyboardVisualizerProps {
  highlightedKeys?: string[];
  activeFinger?: 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky' | 'thumb';
}

const keyboardLayout = [
  ['ذ', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠', '-', '=', 'Backspace'],
  ['Tab', 'ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د', '\\'],
  ['Caps', 'ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط', 'Enter'],
  ['Shift', 'ئ', 'ء', 'ؤ', 'ر', 'لا', 'ى', 'ة', 'و', 'ز', 'ظ', 'Shift'],
  ['Space']
];

export const KeyboardVisualizer: React.FC<KeyboardVisualizerProps> = ({ highlightedKeys = [], activeFinger }) => {
  const isKeyHighlighted = (key: string) => highlightedKeys.includes(key);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#1a1b23] p-4 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="flex flex-col gap-2 md:gap-3">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 md:gap-2">
            {row.map((key) => {
              const highlighted = isKeyHighlighted(key);
              let width = 'w-10 sm:w-12 md:w-14';
              if (key === 'Backspace') width = 'w-20 md:w-28';
              if (key === 'Tab') width = 'w-16 md:w-20';
              if (key === 'Caps') width = 'w-20 md:w-24';
              if (key === 'Enter') width = 'w-24 md:w-32';
              if (key === 'Shift') width = 'w-28 md:w-36';
              if (key === 'Space') width = 'w-[60%] md:w-[70%]';

              return (
                <motion.div
                  key={key}
                  animate={{
                    backgroundColor: highlighted ? '#22d3ee' : '#2a2c38',
                    color: highlighted ? '#000000' : '#8f95b2',
                    scale: highlighted ? 1.05 : 1,
                    y: highlighted ? -2 : 0,
                  }}
                  className={`${width} h-10 sm:h-12 md:h-14 rounded-lg flex items-center justify-center text-sm md:text-lg font-bold border-b-4 border border-white/5 transition-all
                  ${highlighted ? 'border-b-[#0891b2] shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-black/50'}
                  `}
                >
                  {key}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
