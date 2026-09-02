import type { ExerciseAnswer } from "./exerciseExperiences";

const memory = new Map<string, ExerciseAnswer>();
const keyFor = (code: string) => `despega:exercise:${code}:v1`;

/* S3 y S4 se intercambiaron: ahora primero se decide qué se va y qué se queda,
   y después se cierra la despedida. Quien ya había escrito antes del cambio
   tiene sus respuestas bajo el código anterior, así que se mueven una sola vez
   para que cada texto siga apareciendo en el ejercicio al que pertenece. */
const MIGRACION = "despega:exercise:swap-s3-s4";

function migrarSwapS3S4(): void {
  try {
    if (localStorage.getItem(MIGRACION)) return;
    const s3 = localStorage.getItem(keyFor("S3"));
    const s4 = localStorage.getItem(keyFor("S4"));
    if (s3) localStorage.setItem(keyFor("S4"), s3);
    else localStorage.removeItem(keyFor("S4"));
    if (s4) localStorage.setItem(keyFor("S3"), s4);
    else localStorage.removeItem(keyFor("S3"));
    localStorage.setItem(MIGRACION, new Date().toISOString());
  } catch {
    // Si el navegador bloquea storage no hay nada que migrar.
  }
}

migrarSwapS3S4();

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
