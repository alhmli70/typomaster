import React, { createContext, useContext, useState, useEffect } from 'react';
import { Exercise } from '../types';
import { generateMoreExercises } from '../data';
import {
  getAllExercises,
  addExercise as dbAddExercise,
  updateExercise as dbUpdateExercise,
  deleteExercise as dbDeleteExercise,
  markExerciseCompleted as dbMarkCompleted,
  getAllCompletedExercises,
  seedExercises,
} from '../database/repositories/exerciseRepository';

interface ExerciseContextType {
  exercises: Exercise[];
  addExercise: (exercise: Omit<Exercise, 'id'>) => void;
  updateExercise: (id: string, updated: Omit<Exercise, 'id'>) => void;
  deleteExercise: (id: string) => void;
  resetToDefaults: () => void;
  completedExercises: string[];
  markCompleted: (id: string) => void;
}

const ExerciseContext = createContext<ExerciseContextType | undefined>(undefined);

export const ExerciseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const defaults = generateMoreExercises();
        await seedExercises(defaults);
        const exList = await getAllExercises();
        setExercises(exList as Exercise[]);
        const compList = await getAllCompletedExercises();
        setCompletedExercises(compList);
      } catch (e) {
        console.error('Failed to load exercises:', e);
        const defaults = generateMoreExercises();
        setExercises(defaults);
      }
      setLoaded(true);
    })();
  }, []);

  const markCompleted = async (id: string) => {
    setCompletedExercises(prev => prev.includes(id) ? prev : [...prev, id]);
    await dbMarkCompleted(id);
  };

  const addExercise = async (exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: `custom-${Date.now()}`,
    };
    await dbAddExercise(newExercise);
    setExercises(prev => [newExercise, ...prev]);
  };

  const updateExercise = async (id: string, updated: Omit<Exercise, 'id'>) => {
    await dbUpdateExercise(id, updated);
    setExercises(prev => prev.map(ex => ex.id === id ? { ...updated, id } as Exercise : ex));
  };

  const deleteExercise = async (id: string) => {
    await dbDeleteExercise(id);
    setExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const resetToDefaults = async () => {
    if (confirm('هل أنت متأكد من استعادة التمارين الافتراضية؟ سيتم حذف جميع التمارين المضافة.')) {
      const defaults = generateMoreExercises();
      for (const ex of exercises) {
        await dbDeleteExercise(ex.id);
      }
      for (const ex of defaults) {
        await dbAddExercise(ex);
      }
      setExercises(defaults);
    }
  };

  return (
    <ExerciseContext.Provider value={{ exercises, addExercise, updateExercise, deleteExercise, resetToDefaults, completedExercises, markCompleted }}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => {
  const context = useContext(ExerciseContext);
  if (context === undefined) {
    throw new Error('useExercises must be used within an ExerciseProvider');
  }
  return context;
};
