import React from 'react';
import { Exercise } from '../../types';

export interface GameProps {
  exercise: Exercise;
  onFinish: (score: number) => void;
  onBack: () => void;
}
