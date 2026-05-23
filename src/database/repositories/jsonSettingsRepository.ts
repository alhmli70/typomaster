const STORAGE_KEY = 'typomaster-settings';

async function isTauri(): Promise<boolean> {
  return typeof window !== 'undefined' && (window as any).__TAURI__ !== undefined;
}

export async function saveAllSettings(settings: Record<string, string>): Promise<void> {
  const json = JSON.stringify(settings, null, 2);
  if (await isTauri()) {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('save_settings', { settings: json });
  } else {
    localStorage.setItem(STORAGE_KEY, json);
  }
}

export async function clearAllSettings(): Promise<void> {
  if (await isTauri()) {
    const { invoke } = await import('@tauri-apps/api/core');
    await invoke('save_settings', { settings: '{}' });
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export async function loadAllSettings(): Promise<Record<string, string>> {
  if (await isTauri()) {
    const { invoke } = await import('@tauri-apps/api/core');
    const json = await invoke<string>('load_settings');
    try {
      return JSON.parse(json);
    } catch {
      return {};
    }
  } else {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }
}
