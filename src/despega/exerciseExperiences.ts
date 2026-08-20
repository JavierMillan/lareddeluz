export type AnswerValue = string | string[];
export type ExerciseAnswer = Record<string, AnswerValue>;
export type PrintBlock = { label: string; lines: string[] };

export type Category = { key: string; label: string };
export type ComposeField = { key: string; label: string; placeholder: string };

export type ExerciseExperience =
  | { kind: "pause"; duration: number; downloadable: false }
  | { kind: "writing"; prompts: string[]; downloadable: true }
  | { kind: "capture"; categories: Category[]; downloadable: true }
  | { kind: "decision"; categories: Category[]; downloadable: true }
  | { kind: "compose"; fields: ComposeField[]; template: string; downloadable: true };

const categories = (...pairs: [string, string][]): Category[] => pairs.map(([key, label]) => ({ key, label }));

export const EXPERIENCE_BY_CODE: Record<string, ExerciseExperience> = {
  D1: { kind: "pause", duration: 10, downloadable: false },
  D2: { kind: "writing", prompts: ["Encuentra el momento", "Encuentra la conclusión que sacaste", "Ve dónde te ha servido", "Escribe la despedida", "Déjala a la vista"], downloadable: true },
  D3: {
    kind: "compose",
    fields: [
      { key: "old", label: "La frase automática", placeholder: "Por ejemplo: no fue nada" },
      { key: "story", label: "La historia que cuenta", placeholder: "Lo que esa frase dice de mí" },
      { key: "new", label: "La frase que elijo", placeholder: "Una respuesta que sí me represente" },
    ],
    template: "Cuando aparezca {old}, voy a elegir {new}, porque la historia que quiero contar es {story}.",
    downloadable: true,
  },
  D4: { kind: "capture", categories: categories(["audio", "Lo que escuché"], ["body", "Lo que vi"], ["patterns", "Tres automatismos"]), downloadable: true },
  E1: { kind: "decision", categories: categories(["fourEight", "4 · 4 · 8"], ["box", "Respiración de caja"], ["hold", "Retención cómoda"]), downloadable: true },
  E2: { kind: "capture", categories: categories(["drena", "Me drena"], ["neutro", "Neutro"], ["recarga", "Me recarga"]), downloadable: true },
  S1: { kind: "capture", categories: categories(["returns", "Drena y devuelve"], ["empty", "Drena y no devuelve"]), downloadable: true },
  S2: { kind: "writing", prompts: ["Lo que quiero decir en voz alta", "La justificación que se me salió"], downloadable: true },
  S3: { kind: "writing", prompts: ["Lo que me dio", "Por qué ya no me corresponde", "Lo que me llevo", "Mi frase de cierre"], downloadable: true },
  S4: { kind: "decision", categories: categories(["leaves", "Lo que se va"], ["stays", "Lo que se queda"]), downloadable: true },
  P1: { kind: "writing", prompts: ["Soy…", "Lo que doy a otros", "El nombre de mi súper yo"], downloadable: true },
  P2: { kind: "capture", categories: categories(["have", "Ya lo tengo"], ["known", "Sé cómo conseguirlo"], ["unknown", "Todavía no sé cómo"]), downloadable: true },
  P3: { kind: "capture", categories: categories(["skills", "Lo que sé hacer"], ["groups", "Parentescos"], ["territory", "Mi territorio"]), downloadable: true },
  P4: {
    kind: "compose",
    fields: [
      { key: "weeks", label: "Duración", placeholder: "2" },
      { key: "goal", label: "Meta", placeholder: "publicar mi idea" },
      { key: "feeling", label: "Cómo quiero sentirme", placeholder: "curiosidad" },
      { key: "cadence", label: "Ritmo real", placeholder: "3 mañanas" },
    ],
    template: "Durante las próximas {weeks} semanas voy a {goal}, sintiendo {feeling}, dedicándole {cadence}.",
    downloadable: true,
  },
  EJ1: { kind: "capture", categories: categories(["one", "1 · Natural"], ["two", "2 · Concentración"], ["three", "3 · Vencer resistencia"]), downloadable: true },
  EJ2: {
    kind: "compose",
    fields: [
      { key: "hard", label: "Qué cuesta sostener", placeholder: "Lo que pesa esta semana" },
      { key: "reduce", label: "Qué puedo reducir", placeholder: "Un ajuste concreto" },
      { key: "keep", label: "Qué sí quiero sostener", placeholder: "El rumbo que permanece" },
    ],
    template: "Esta semana ajusto {reduce} porque {hard}; mantengo {keep}.",
    downloadable: true,
  },
  G1: { kind: "capture", categories: categories(["good", "Qué salió bien"], ["bad", "Qué salió mal"], ["felt", "Cómo me sentí"]), downloadable: true },
  G2: { kind: "writing", prompts: ["¿Qué necesito recordar de hoy?"], downloadable: true },
  A1: { kind: "capture", categories: categories(["input", "Qué le meto"], ["return", "Qué me devuelve"], ["parts", "Las piezas del sistema"]), downloadable: true },
  A2: { kind: "decision", categories: categories(["facts", "Lo que sé"], ["fear", "Lo que estoy imaginando"], ["choice", "La decisión"]), downloadable: true },
};

function textLines(value: AnswerValue | undefined): string[] {
  if (Array.isArray(value)) return value.map((item) => item.trim()).filter(Boolean);
  return value?.trim() ? [value.trim()] : [];
}

export function composeStatement(template: string, answer: ExerciseAnswer): string {
  return template.replace(/\{([^}]+)\}/g, (_, key: string) => {
    const value = answer[key];
    return Array.isArray(value) ? value.join(", ") : value?.trim() || "_____";
  });
}

export function answerToBlocks(code: string, answer: ExerciseAnswer): PrintBlock[] {
  const experience = EXPERIENCE_BY_CODE[code];
  if (!experience || experience.kind === "pause") return [];

  if (experience.kind === "compose") {
    const hasValue = experience.fields.some((field) => textLines(answer[field.key]).length > 0);
    return hasValue ? [{ label: "Mi declaración", lines: [composeStatement(experience.template, answer)] }] : [];
  }

  const sources = experience.kind === "writing"
    ? experience.prompts.map((label, index) => ({ key: String(index), label }))
    : experience.categories;

  return sources.flatMap(({ key, label }) => {
    const lines = textLines(answer[key]);
    return lines.length ? [{ label, lines }] : [];
  });
}

export function answerHasContent(code: string, answer: ExerciseAnswer): boolean {
  return answerToBlocks(code, answer).length > 0;
}
