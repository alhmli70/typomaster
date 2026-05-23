import React from 'react';

export type ViewState = 'dashboard' | 'lessons' | 'typing' | 'coding' | 'games' | 'settings' | 'profile' | 'manager';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  contentNode?: React.ReactNode;
  language: 'ar' | 'en';
  order: number;
  iconType: string;
  targetCollection?: string;
}

export interface Exercise {
  id: string;
  title: string;
  content: string;
  language: 'ar' | 'en' | 'code';
  level: string;
  collection?: string;
  order?: number;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  errors: number;
  totalTime: number; // in seconds
}
