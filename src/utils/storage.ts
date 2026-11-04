/**
 * Safe localStorage helpers.
 * Storage can throw (Safari private mode, quota exceeded, disabled cookies) — never crash the app.
 */
export function storageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function storageSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error(`Failed to write "${key}" to localStorage`, e);
  }
}

export function storageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error(`Failed to remove "${key}" from localStorage`, e);
  }
}

export function storageGetJSON<T>(key: string, fallback: T): T {
  const raw = storageGet(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

