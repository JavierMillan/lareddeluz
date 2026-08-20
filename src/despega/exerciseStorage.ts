import type { ExerciseAnswer } from "./exerciseExperiences";

const memory = new Map<string, ExerciseAnswer>();
const keyFor = (code: string) => `despega:exercise:${code}:v1`;

export function loadAnswer(code: string): ExerciseAnswer {
  try {
    const raw = localStorage.getItem(keyFor(code));
    if (raw) {
      const parsed = JSON.parse(raw) as { version?: number; values?: ExerciseAnswer };
      if (parsed.version === 1 && parsed.values) return parsed.values;
    }
  } catch {
    // El cuaderno puede seguir funcionando aunque el navegador bloquee storage.
  }
  return memory.get(code) ?? {};
}

export function saveAnswer(code: string, values: ExerciseAnswer): { persisted: boolean } {
  memory.set(code, values);
  try {
    localStorage.setItem(keyFor(code), JSON.stringify({
      version: 1,
      updatedAt: new Date().toISOString(),
      values,
    }));
    return { persisted: true };
  } catch {
    return { persisted: false };
  }
}

export function clearAnswer(code: string): boolean {
  memory.delete(code);
  try {
    localStorage.removeItem(keyFor(code));
    return true;
  } catch {
    return false;
  }
}
