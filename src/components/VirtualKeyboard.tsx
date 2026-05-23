import React from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { motion } from 'motion/react';
import { HandSVG, FingerType } from './HandSVG';

const layouts = {
  en: [
    ['`','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
    ['Tab','q','w','e','r','t','y','u','i','o','p','[',']','\\'],
    ['Caps','a','s','d','f','g','h','j','k','l',';','\'','Enter'],
    ['Shift','z','x','c','v','b','n','m',',','.','/','Shift'],
    ['Ctrl','Win','Alt','Space','Alt','Fn','Menu','Ctrl']
  ],
  ar: [
    ['ذ','1','2','3','4','5','6','7','8','9','0','-','=','Backspace'],
    ['Tab','ض','ص','ث','ق','ف','غ','ع','ه','خ','ح','ج','د','\\'],
    ['Caps','ش','س','ي','ب','ل','ا','ت','ن','م','ك','ط','Enter'],
    ['Shift','ئ','ء','ؤ','ر','لا','ى','ة','و','ز','ظ','Shift'],
    ['Ctrl','Win','Alt','Space','Alt','Fn','Menu','Ctrl']
  ]
};

const fingerZones: Record<string, string> = {
  '1': 'ring-red-500/20', 'q': 'ring-red-500/20', 'a': 'ring-red-500/20', 'z': 'ring-red-500/20', '`': 'ring-red-500/20', 'Tab': 'ring-red-500/20', 'Caps': 'ring-red-500/20', 'Shift': 'ring-red-500/20', 'ذ': 'ring-red-500/20', 'ض': 'ring-red-500/20', 'ش': 'ring-red-500/20', 'ئ': 'ring-red-500/20',
  '2': 'ring-orange-500/20', 'w': 'ring-orange-500/20', 's': 'ring-orange-500/20', 'x': 'ring-orange-500/20', 'ص': 'ring-orange-500/20', 'س': 'ring-orange-500/20', 'ء': 'ring-orange-500/20',
  '3': 'ring-yellow-500/20', 'e': 'ring-yellow-500/20', 'd': 'ring-yellow-500/20', 'c': 'ring-yellow-500/20', 'ث': 'ring-yellow-500/20', 'ي': 'ring-yellow-500/20', 'ؤ': 'ring-yellow-500/20',
  '4': 'ring-green-500/20', '5': 'ring-green-500/20', 'r': 'ring-green-500/20', 't': 'ring-green-500/20', 'f': 'ring-green-500/20', 'g': 'ring-green-500/20', 'v': 'ring-green-500/20', 'b': 'ring-green-500/20', 'ق': 'ring-green-500/20', 'ف': 'ring-green-500/20', 'ب': 'ring-green-500/20', 'ل': 'ring-green-500/20', 'ر': 'ring-green-500/20', 'لا': 'ring-green-500/20',
  '6': 'ring-teal-500/20', '7': 'ring-teal-500/20', 'y': 'ring-teal-500/20', 'u': 'ring-teal-500/20', 'h': 'ring-teal-500/20', 'j': 'ring-teal-500/20', 'n': 'ring-teal-500/20', 'm': 'ring-teal-500/20', 'غ': 'ring-teal-500/20', 'ع': 'ring-teal-500/20', 'ا': 'ring-teal-500/20', 'ت': 'ring-teal-500/20', 'ى': 'ring-teal-500/20', 'ة': 'ring-teal-500/20',
  '8': 'ring-blue-500/20', 'i': 'ring-blue-500/20', 'k': 'ring-blue-500/20', ',': 'ring-blue-500/20', 'ه': 'ring-blue-500/20', 'ن': 'ring-blue-500/20', 'و': 'ring-blue-500/20',
  '9': 'ring-indigo-500/20', 'o': 'ring-indigo-500/20', 'l': 'ring-indigo-500/20', '.': 'ring-indigo-500/20', 'خ': 'ring-indigo-500/20', 'م': 'ring-indigo-500/20', 'ز': 'ring-indigo-500/20',
  '0': 'ring-purple-500/20', '-': 'ring-purple-500/20', '=': 'ring-purple-500/20', 'p': 'ring-purple-500/20', '[': 'ring-purple-500/20', ']': 'ring-purple-500/20', '\\': 'ring-purple-500/20', ';': 'ring-purple-500/20', '\'': 'ring-purple-500/20', '/': 'ring-purple-500/20', 'Enter': 'ring-purple-500/20', 'Backspace': 'ring-purple-500/20', 'ح': 'ring-purple-500/20', 'ج': 'ring-purple-500/20', 'د': 'ring-purple-500/20', 'ك': 'ring-purple-500/20', 'ط': 'ring-purple-500/20', 'ظ': 'ring-purple-500/20',
};

const keyToFinger: Record<string, string> = {
  '1': 'L5', 'q': 'L5', 'a': 'L5', 'z': 'L5', '`': 'L5', 'Tab': 'L5', 'Caps': 'L5', 'Shift': 'L5', 'ذ': 'L5', 'ض': 'L5', 'ش': 'L5', 'ئ': 'L5',
  '2': 'L4', 'w': 'L4', 's': 'L4', 'x': 'L4', 'ص': 'L4', 'س': 'L4', 'ء': 'L4',
  '3': 'L3', 'e': 'L3', 'd': 'L3', 'c': 'L3', 'ث': 'L3', 'ي': 'L3', 'ؤ': 'L3',
  '4': 'L2', '5': 'L2', 'r': 'L2', 't': 'L2', 'f': 'L2', 'g': 'L2', 'v': 'L2', 'b': 'L2', 'ق': 'L2', 'ف': 'L2', 'ب': 'L2', 'ل': 'L2', 'ر': 'L2', 'لا': 'L2',
  '6': 'R2', '7': 'R2', 'y': 'R2', 'u': 'R2', 'h': 'R2', 'j': 'R2', 'n': 'R2', 'm': 'R2', 'غ': 'R2', 'ع': 'R2', 'ا': 'R2', 'ت': 'R2', 'ى': 'R2', 'ة': 'R2',
  '8': 'R3', 'i': 'R3', 'k': 'R3', ',': 'R3', 'ه': 'R3', 'ن': 'R3', 'و': 'R3',
  '9': 'R4', 'o': 'R4', 'l': 'R4', '.': 'R4', 'خ': 'R4', 'م': 'R4', 'ز': 'R4',
  '0': 'R5', '-': 'R5', '=': 'R5', 'p': 'R5', '[': 'R5', ']': 'R5', '\\': 'R5', ';': 'R5', '\'': 'R5', '/': 'R5', 'Enter': 'R5', 'Backspace': 'R5', 'ح': 'R5', 'ج': 'R5', 'د': 'R5', 'ك': 'R5', 'ط': 'R5', 'ظ': 'R5',
};

function fingerCodeToType(code: string | null): FingerType | undefined {
  if (!code || code === 'Thumb') return 'thumb';
  const num = code[1];
  if (num === '1') return 'thumb';
  if (num === '2') return 'index';
  if (num === '3') return 'middle';
  if (num === '4') return 'ring';
  if (num === '5') return 'pinky';
  return undefined;
}

interface VirtualKeyboardProps {
  activeKey: string | null;
  nextKey?: string | null;
  language?: 'ar' | 'en' | 'code';
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ activeKey, nextKey, language = 'en' }) => {
  const { settings } = useSettings();
  const currentLayout = language === 'ar' ? layouts.ar : layouts.en;

  const nextFingerCode = nextKey
    ? nextKey === ' ' ? 'Thumb' : keyToFinger[nextKey.toLowerCase()]
    : null;

  const leftActiveFinger = nextFingerCode?.startsWith('L') ? fingerCodeToType(nextFingerCode) : undefined;
  const rightActiveFinger = nextFingerCode?.startsWith('R') ? fingerCodeToType(nextFingerCode) : undefined;

  const isKeyActive = (key: string) => {
    if (!activeKey) return false;
    const lowerKey = key.toLowerCase();
    const lowerActive = activeKey.toLowerCase();
    if (lowerKey === lowerActive) return true;
    if (key === 'Space' && activeKey === ' ') return true;
    if (key === 'Backspace' && activeKey === 'Backspace') return true;
    if (key === 'Enter' && activeKey === 'Enter') return true;
    return false;
  };

  const isKeyNext = (key: string) => {
    if (!nextKey) return false;
    const lowerKey = key.toLowerCase();
    const lowerNext = nextKey.toLowerCase();
    if (lowerKey === lowerNext) return true;
    if (key === 'Space' && nextKey === ' ') return true;
    if (key === 'Enter' && nextKey === '\n') return true;
    return false;
  };

  const renderKey = (key: string, rowIdx: number, colIdx: number) => {
    let widthClass = 'w-9 md:w-11';
    if (key === 'Backspace' || key === 'Enter' || key === 'Caps' || key === 'Shift') {
      widthClass = 'w-14 md:w-20';
    } else if (key === 'Space') {
      widthClass = 'w-40 md:w-72';
    } else if (key === 'Tab' || key === '\\') {
      widthClass = 'w-12 md:w-14';
    } else if (key === 'Ctrl' || key === 'Alt' || key === 'Win' || key === 'Fn' || key === 'Menu') {
      widthClass = 'w-9 md:w-11 text-[10px] md:text-xs';
    }

    const { keyboardLayout, showFingerHints, keyboardSize, keyClickFeedback, glowEffect, showKeyLetters, highlightNextKey, keyboardTransparency } = settings;
    let baseLayoutStyles = '';
    if (keyboardLayout === 'mechanical') {
      baseLayoutStyles = 'border-b-4 border-r-2 border-l-2 bg-gradient-to-b from-app-surface to-[#111] shadow-[0_4px_6px_rgba(0,0,0,0.5)]';
    } else if (keyboardLayout === 'flat') {
      baseLayoutStyles = 'border bg-[#1f2022] shadow-sm';
    } else {
      baseLayoutStyles = 'bg-app-surface border-b-4 shadow-md';
    }

    const hintStyle = showFingerHints && fingerZones[key.toLowerCase()] ? `ring-2 ring-inset ${fingerZones[key.toLowerCase()]}` : '';
    const active = isKeyActive(key);
    const next = isKeyNext(key);

    let activeStyle = '';
    if (active) {
      activeStyle = `bg-app-accent text-black ${keyboardLayout === 'mechanical' ? 'border-b-0' : ''} border-app-accent ${glowEffect ? 'shadow-[0_0_15px_var(--app-accent)]' : ''} z-10`;
    } else if (next && highlightNextKey) {
      activeStyle = `text-app-accent border-app-accent ${glowEffect ? 'shadow-[0_0_10px_var(--app-accent)]' : ''} ${hintStyle}`;
    } else {
      activeStyle = `text-app-text-muted ${keyboardLayout !== 'flat' ? 'border-black/30' : 'border-white/5'} ${hintStyle}`;
    }

    let activeAnimationScale = 1;
    if (keyClickFeedback === 'scale') activeAnimationScale = 0.9;
    else if (keyClickFeedback === 'ripple') activeAnimationScale = 0.95;

    const sizeClassMap = {
      small: 'h-7 md:h-9 text-[11px] md:text-sm',
      medium: 'h-9 md:h-11 text-xs md:text-base',
      large: 'h-11 md:h-13 text-sm md:text-lg'
    };
    const heightClass = sizeClassMap[keyboardSize] || sizeClassMap['medium'];

    return (
      <motion.div
        key={`${rowIdx}-${colIdx}-${key}`}
        animate={active ? { scale: activeAnimationScale, y: keyClickFeedback !== 'none' ? 4 : 0, filter: glowEffect ? 'brightness(1.3)' : 'brightness(1.1)' } : next && highlightNextKey ? { scale: [1, 1.05, 1], filter: 'brightness(1)' } : { scale: 1, y: 0, filter: 'brightness(1)' }}
        transition={active ? { type: 'spring', stiffness: 900, damping: 15, mass: 0.5 * settings.animationSpeed } : next && highlightNextKey ? { repeat: Infinity, duration: 1.5 / settings.animationSpeed, ease: "easeInOut" } : { type: 'spring', stiffness: 500, damping: 30 }}
        className={`flex ${widthClass} ${heightClass} justify-center items-center rounded-lg transition-colors duration-200 font-bold select-none relative overflow-hidden ${baseLayoutStyles} ${activeStyle} ${key === 'Shift' && colIdx > 5 ? 'text-xs' : ''}`}
      >
        {keyClickFeedback === 'ripple' && active && (
          <motion.span initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 2, opacity: 0 }} transition={{ duration: 0.3 * settings.animationSpeed }} className="absolute w-full h-full bg-white/30 rounded-full" />
        )}
        <span className={!showKeyLetters && key.length === 1 ? 'opacity-0' : 'opacity-100'}>{key}</span>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col gap-4" style={{ opacity: settings.keyboardTransparency / 100 }}>
      <div className="flex items-center justify-center gap-4 md:gap-8" dir="ltr">
        {settings.showFingerHints && (
          <div className="flex flex-col items-center gap-1">
            <HandSVG hand="left" activeFinger={leftActiveFinger} size={200} />
          </div>
        )}

        <div className={`flex flex-col gap-1.5 md:gap-2 p-3 rounded-xl mx-auto w-fit ${settings.keyboardLayout === 'mechanical' ? 'bg-[#0a0a0c] border-2 border-white/5 shadow-2xl' : settings.keyboardLayout === 'flat' ? 'bg-transparent' : 'bg-[#1a1b1e] border border-app-surface'} ${settings.glassmorphism ? 'backdrop-blur-xl bg-opacity-50' : ''}`} dir="ltr">
          <div className="flex justify-center gap-1 md:gap-1.5">{currentLayout[0].map((k, i) => renderKey(k, 0, i))}</div>
          <div className="flex justify-center gap-1 md:gap-1.5">{currentLayout[1].map((k, i) => renderKey(k, 1, i))}</div>
          <div className="flex justify-center gap-1 md:gap-1.5">{currentLayout[2].map((k, i) => renderKey(k, 2, i))}</div>
          <div className="flex justify-center gap-1 md:gap-1.5">{currentLayout[3].map((k, i) => renderKey(k, 3, i))}</div>
          <div className="flex justify-center gap-1 md:gap-1.5">{currentLayout[4].map((k, i) => renderKey(k, 4, i))}</div>
        </div>

        {settings.showFingerHints && (
          <div className="flex flex-col items-center gap-1">
            <HandSVG hand="right" activeFinger={rightActiveFinger} size={200} />
          </div>
        )}
      </div>
    </div>
  );
};
