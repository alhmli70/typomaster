export function isTauri(): boolean {
  return typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;
}

export { initDatabase } from './driver';
