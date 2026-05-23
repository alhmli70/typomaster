import { invoke } from '@tauri-apps/api/core';

export async function getSetting(key: string): Promise<string | null> {
  try {
    const result = await invoke<string | null>('get_setting', { key });
    return result;
  } catch {
    return null;
  }
}

export async function setSetting(key: string, value: string): Promise<void> {
  await invoke('set_setting_cmd', { key, value });
}

export async function clearAllSettings(): Promise<void> {
  await invoke('clear_all_settings');
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const rows = await invoke<{ key: string; value: string }[]>('get_all_settings');
  const obj: Record<string, string> = {};
  for (const row of rows) {
    obj[row.key] = row.value;
  }
  return obj;
}
