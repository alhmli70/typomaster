import { invoke } from '@tauri-apps/api/core';
import type { Exercise } from '../../types';

export async function getAllExercises(): Promise<Exercise[]> {
  const rows = await invoke<
    { id: string; title: string; content: string; language: string; level: string; collection: string; order: number }[]
  >('get_all_exercises');
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    content: r.content,
    language: r.language as Exercise['language'],
    level: r.level,
    collection: r.collection,
    order: r.order,
  }));
}

export async function addExercise(ex: Exercise) {
  await invoke('add_exercise', {
    exercise: {
      id: ex.id,
      title: ex.title,
      content: ex.content,
      language: ex.language,
      level: ex.level ?? 'medium',
      collection: ex.collection ?? '',
      order: ex.order ?? 0,
    },
  });
}

export async function updateExercise(id: string, ex: Omit<Exercise, 'id'>) {
  await invoke('update_exercise_cmd', {
    id,
    exercise: {
      title: ex.title,
      content: ex.content,
      language: ex.language,
      level: ex.level ?? 'medium',
      collection: ex.collection ?? '',
      order: ex.order ?? 0,
    },
  });
}

export async function deleteExercise(id: string) {
  await invoke('delete_exercise_cmd', { id });
}

export async function seedExercises(exercises: Exercise[]) {
  await invoke<number>('seed_exercises_batch', {
    exercises: exercises.map((ex) => ({
      id: ex.id,
      title: ex.title,
      content: ex.content,
      language: ex.language,
      level: ex.level ?? 'medium',
      collection: ex.collection ?? '',
      order: ex.order ?? 0,
    })),
  });
}

export async function isExerciseCompleted(id: string): Promise<boolean> {
  return invoke<boolean>('is_exercise_completed', { id });
}

export async function markExerciseCompleted(id: string) {
  await invoke('mark_exercise_completed', { id });
}

export async function getAllCompletedExercises(): Promise<string[]> {
  return invoke<string[]>('get_all_completed_exercises');
}

export async function isLessonCompleted(id: string): Promise<boolean> {
  return invoke<boolean>('is_lesson_completed', { id });
}

export async function markLessonCompleted(id: string) {
  await invoke('mark_lesson_completed', { id });
}

export async function getAllCompletedLessons(): Promise<string[]> {
  return invoke<string[]>('get_all_completed_lessons');
}
