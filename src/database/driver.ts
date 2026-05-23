export interface DBRow {
  [column: string]: unknown;
}

export interface DatabaseDriver {
  select<T = Record<string, unknown>>(sql: string, bindings?: unknown[]): Promise<T[]>;
  execute(sql: string, bindings?: unknown[]): Promise<{ rowsAffected: number; lastInsertId?: number }>;
}

import { invoke } from '@tauri-apps/api/core';

export async function initDatabase(): Promise<boolean> {
  try {
    await invoke('get_typing_stats');
    return true;
  } catch {
    return true;
  }
}

export async function getDb(): Promise<DatabaseDriver> {
  throw new Error('Direct SQL access is removed. Use repository functions instead.');
}

export function getDbError(): Error | null {
  return null;
}
