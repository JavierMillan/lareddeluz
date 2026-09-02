export type AnswerValue = string | string[];
export type ExerciseAnswer = Record<string, AnswerValue>;
export type PrintBlock = { label: string; lines: string[] };

export type Category = { key: string; label: string; help?: string };
export type ComposeField = { key: string; label: string; placeholder: string; help?: string };
export type GuidedField = Required<Pick<ComposeField, "key" | "label" | "placeholder" | "help">>;
export type BreathTechnique = GuidedField & { instruction: string };
export type SprintTask = { id: string; title: string; priority: "alta" | "media" | "baja"; points: 1 | 2 | 3 };
export type CustomKind = "belief" | "phrase" | "drain-ledger" | "conversation" | "farewell" | "commitment" | "identity" | "gap" | "effort" | "pivot" | "retrospective" | "daily-log" | "system-map";
export type CustomExperience = { [K in CustomKind]: { kind: K; downloadable: true } }[CustomKind];

export type ExerciseExperience =
  | { kind: "reading"; statement: string; question: string; explanation: string[]; downloadable: false }
  | { kind: "writing"; prompts: string[]; downloadable: true }
  | { kind: "energy"; categories: Category[]; days: string[]; hours: string[]; downloadable: true }
  | { kind: "capture"; categories: Category[]; movable?: boolean; downloadable: true }
  | { kind: "decision"; categories: Category[]; movable?: boolean; downloadable: true }
  | { kind: "compose"; fields: ComposeField[]; template: string; downloadable: true }
  | { kind: "audit"; passes: GuidedField[]; downloadable: true }
  | { kind: "breathing"; techniques: BreathTechnique[]; downloadable: true }
  | { kind: "territory"; downloadable: true }
  | { kind: "sprint"; fields: ComposeField[]; template: string; downloadable: true }
  | { kind: "decision-table"; downloadable: true }
  | CustomExperience;

const CUSTOM_KINDS: CustomKind[] = ["belief", "phrase", "drain-ledger", "conversation", "farewell", "commitment", "identity", "gap", "effort", "pivot", "retrospective", "daily-log", "system-map"];
export function isCustomExperience(experience: ExerciseExperience): experience is CustomExperience {
  return CUSTOM_KINDS.includes(experience.kind as CustomKind);
}

const categories = (...pairs: [string, string][]): Category[] => pairs.map(([key, label]) => ({ key, label }));

export const EXPERIENCE_BY_CODE: Record<string, ExerciseExperience> = {
  D1: {
    kind: "reading",
    statement: "Los pingüinos de Alaska bailan cumbia los martes.",
    question: "¿Por qué la escuchaste?",
    explanation: [
      "Porque la escuchaste. No nada más la viste: sonó. Alguien la dijo adentro de tu cabeza, con voz y con tono, y hasta con la pausa antes de «los martes». Y tú no diste esa orden.",
      "Yo escribí una tontería sobre pingüinos bailando y algo dentro de ti la leyó en voz alta sin preguntarte si querías.",
      "Si una frase absurda activa esa voz sin tu permiso, imagínate el poder que tienen las frases que llevas escuchando toda la vida.",
    ],
    downloadable: false,
  },
  D2: { kind: "belief", downloadable: true },
  D3: { kind: "phrase", downloadable: true },
  D4: {
    kind: "audit",
    passes: [
      { key: "audio", label: "Primera pasada · escucha", help: "Escucha sin mirar. Anota únicamente lo que se repite: tono, muletillas, disculpas o formas de minimizarte.", placeholder: "Escuché que…" },
      { key: "body", label: "Segunda pasada · observa", help: "Mira el video sin sonido. Registra postura, manos, gestos y lo que hace tu cuerpo cuando dudas.", placeholder: "Vi que…" },
      { key: "patterns", label: "Tres automatismos", help: "Ahora mira el video completo y nombra sólo tres cosas que hacías sin saberlo.", placeholder: "Un automatismo que ahora puedo reconocer…" },
    ],
    downloadable: true,
  },
  E1: {
    kind: "breathing",
    techniques: [
      { key: "fourEight", label: "4 · 4 · 8", instruction: "Inhala 4 · retén 4 · exhala 8. Repite cinco veces.", help: "Después de probarla, registra sólo la señal más clara que notaste en tu cuerpo.", placeholder: "Mi cuerpo quedó…" },
      { key: "box", label: "Respiración de caja", instruction: "Inhala 4 · retén 4 · exhala 4 · espera 4. Repite cinco veces.", help: "No evalúes si fue interesante: observa si realmente bajó tu activación.", placeholder: "Mi cuerpo quedó…" },
      { key: "hold", label: "Retención cómoda", instruction: "Inhala rápido · retén cómodamente · suelta muy despacio. Repite cinco veces.", help: "Si te mareas, baja la profundidad. Anota cómo te dejó, no cómo debería dejarte.", placeholder: "Mi cuerpo quedó…" },
    ],
    downloadable: true,
  },
  E2: {
    kind: "energy",
    categories: categories(["drena", "Me drena"], ["neutro", "Neutro"], ["recarga", "Me recarga"]),
    days: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    hours: Array.from({ length: 17 }, (_, index) => `${String(index + 6).padStart(2, "0")}:00`),
    downloadable: true,
  },
  S1: { kind: "drain-ledger", downloadable: true },
  S2: { kind: "conversation", downloadable: true },
  S3: { kind: "commitment", downloadable: true },
  S4: { kind: "farewell", downloadable: true },
  P1: { kind: "identity", downloadable: true },
  P2: { kind: "gap", downloadable: true },
  P3: { kind: "territory", downloadable: true },
  P4: {
    kind: "sprint",
    fields: [
      { key: "weeks", label: "Duración", placeholder: "2" },
      { key: "goal", label: "Meta", placeholder: "publicar mi idea" },
      { key: "feeling", label: "Cómo quiero sentirme", placeholder: "curiosidad" },
      { key: "cadence", label: "Días por semana", placeholder: "3 días" },
      { key: "review", label: "Fecha de revisión", placeholder: "viernes 28" },
    ],
    template: "Durante las próximas {weeks} semanas voy a {goal}, sintiendo {feeling}, dedicándole {cadence} por semana, y lo reviso el {review}.",
    downloadable: true,
  },
  EJ1: { kind: "effort", downloadable: true },
  EJ2: { kind: "pivot", downloadable: true },
  G1: { kind: "retrospective", downloadable: true },
  G2: { kind: "daily-log", downloadable: true },
  A1: { kind: "system-map", downloadable: true },
  A2: { kind: "decision-table", downloadable: true },
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

export function parseSprintTasks(value: AnswerValue | undefined): SprintTask[] {
  return textLines(value).flatMap((entry) => {
    try {
      const task = JSON.parse(entry) as Partial<SprintTask>;
      if (!task.id || !task.title?.trim() || !["alta", "media", "baja"].includes(task.priority ?? "") || ![1, 2, 3].includes(task.points ?? 0)) return [];
      return [{ id: task.id, title: task.title.trim(), priority: task.priority!, points: task.points as 1 | 2 | 3 }];
    } catch {
      return [];
    }
  });
}

const CUSTOM_BLOCKS: Record<CustomKind, Category[]> = {
  belief: [
    { key: "moment", label: "El momento" }, { key: "belief", label: "La conclusión que saqué" },
    { key: "served", label: "Dónde me sirvió" }, { key: "goodbye", label: "Mi despedida" }, { key: "newBelief", label: "Lo que elijo creer ahora" },
  ],
  phrase: [{ key: "old", label: "La frase automática" }, { key: "story", label: "La historia que cuenta" }, { key: "new", label: "La frase que elijo" }],
  "drain-ledger": [{ key: "returns", label: "Drena y devuelve" }, { key: "empty", label: "Drena y no devuelve" }, { key: "counts", label: "Lo que más se repite" }],
  conversation: [{ key: "prepared", label: "Lo que necesitaba decir" }, { key: "justification", label: "La justificación que se me salió" }],
  farewell: [{ key: "gift", label: "Lo que me dio" }, { key: "noLonger", label: "Por qué ya no me corresponde" }, { key: "take", label: "Lo que me llevo" }, { key: "closing", label: "Mi despedida" }],
  commitment: [{ key: "leaves", label: "Lo que se va" }, { key: "stays", label: "Lo que se queda" }, { key: "completed", label: "Lo que ya solté" }],
  identity: [{ key: "statements", label: "Quién soy" }, { key: "gives", label: "Lo que doy a otros" }, { key: "name", label: "El nombre de mi súper tú" }],
  gap: [{ key: "items", label: "Mi mapa de brecha" }, { key: "first", label: "Por dónde empiezo" }],
  effort: [{ key: "entries", label: "El peso real de mi semana" }, { key: "total", label: "Puntos de la semana" }],
  pivot: [{ key: "hard", label: "Lo que me cuesta sostener" }, { key: "different", label: "Lo que puedo hacer distinto" }, { key: "choice", label: "Bajar la meta o cambiar la forma" }, { key: "adjusted", label: "Mi miniviaje ajustado" }, { key: "why", label: "Por qué lo ajusté" }],
  retrospective: [{ key: "good", label: "Qué salió bien" }, { key: "bad", label: "Qué salió mal" }, { key: "felt", label: "Cómo me sentí" }, { key: "adjustments", label: "Mis dos ajustes" }, { key: "gratitude", label: "Algo que agradezco" }],
  "daily-log": [{ key: "0", label: "Lo que necesito recordar" }, { key: "thoughtOnly", label: "Los días que sólo lo pensé" }],
  "system-map": [{ key: "area", label: "El área que estoy mirando" }, { key: "input", label: "Qué le meto" }, { key: "return", label: "Qué me devuelve" }, { key: "parts", label: "Las piezas del sistema" }, { key: "diagnosis", label: "Lo que realmente está fallando" }],
};

export function answerToBlocks(code: string, answer: ExerciseAnswer): PrintBlock[] {
  const experience = EXPERIENCE_BY_CODE[code];
  if (!experience) return [];

  if (experience.kind === "reading") return [];

  if (experience.kind === "compose" || experience.kind === "sprint") {
    const hasValue = experience.fields.some((field) => textLines(answer[field.key]).length > 0);
    const declaration = hasValue ? [{ label: "Mi declaración", lines: [composeStatement(experience.template, answer)] }] : [];
    if (experience.kind === "compose") return declaration;
    const priorityOrder = { alta: 0, media: 1, baja: 2 } as const;
    const tasks = parseSprintTasks(answer.tasks)
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
      .map((task) => `${task.title} · prioridad ${task.priority} · ${task.points} ${task.points === 1 ? "punto" : "puntos"}`);
    const capacity = textLines(answer.capacity);
    return [...declaration, ...(capacity.length ? [{ label: "Capacidad semanal", lines: capacity }] : []), ...(tasks.length ? [{ label: "Tasks del miniviaje", lines: tasks }] : [])];
  }

  if (experience.kind === "audit") {
    return experience.passes.flatMap(({ key, label }) => {
      const lines = textLines(answer[key]);
      return lines.length ? [{ label, lines }] : [];
    });
  }

  if (experience.kind === "breathing") {
    const notes = experience.techniques.flatMap(({ key, label }) => {
      const lines = textLines(answer[`note:${key}`]);
      return lines.length ? [{ label, lines }] : [];
    });
    const selected = asSelectedTechnique(experience, answer.selected);
    return [...notes, ...(selected ? [{ label: "La respiración que elijo", lines: [selected.label] }] : [])];
  }

  if (experience.kind === "territory") {
    const fields: Category[] = [
      { key: "skills", label: "Lo que sé hacer" },
      { key: "groups", label: "Parentescos" },
      { key: "territory", label: "Mi territorio" },
      { key: "where", label: "Dónde se usa" },
      { key: "who", label: "A quién le sirve" },
      { key: "paid", label: "Quién contrataría por ello" },
    ];
    return fields.flatMap(({ key, label }) => {
      const lines = textLines(answer[key]);
      return lines.length ? [{ label, lines }] : [];
    });
  }

  if (experience.kind === "decision-table") {
    const fields: Category[] = [
      { key: "decision", label: "La decisión, sin adornos" },
      { key: "facts", label: "Los hechos" },
      { key: "added", label: "La historia que estoy agregando" },
      { key: "realRisks", label: "Riesgos reales" },
      { key: "inventedRisks", label: "Riesgos inventados" },
      { key: "superSelf", label: "La decisión que se parece a quien quiero ser" },
      { key: "today", label: "Mi movimiento de hoy" },
    ];
    return fields.flatMap(({ key, label }) => {
      const lines = textLines(answer[key]);
      return lines.length ? [{ label, lines }] : [];
    });
  }

  if (isCustomExperience(experience)) {
    return CUSTOM_BLOCKS[experience.kind].flatMap(({ key, label }) => {
      const lines = textLines(answer[key]).map(humanizeStoredLine);
      return lines.length ? [{ label, lines }] : [];
    });
  }

  if (experience.kind === "energy") {
    const entries = textLines(answer.entries).map(humanizeStoredLine);
    if (entries.length) return [{ label: "Mi semana de energía", lines: entries }];
    const categoryBlocks = experience.categories.flatMap(({ key, label }) => {
      const lines = textLines(answer[key]);
      return lines.length ? [{ label, lines }] : [];
    });
    const scheduleBlocks = experience.days.flatMap((day) => experience.hours.flatMap((hour) => {
      const lines = textLines(answer[`schedule:${day}:${hour}`]);
      return lines.length ? [{ label: `${day} · ${hour}`, lines }] : [];
    }));
    return [...categoryBlocks, ...scheduleBlocks];
  }

  const sources = experience.kind === "writing"
    ? experience.prompts.map((label, index) => ({ key: String(index), label }))
    : experience.categories;

  return sources.flatMap(({ key, label }) => {
    const lines = textLines(answer[key]);
    return lines.length ? [{ label, lines }] : [];
  });
}

function humanizeStoredLine(value: string) {
  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;
    return Object.entries(parsed).filter(([key]) => key !== "id").map(([, item]) => String(item)).join(" · ");
  } catch {
    return value;
  }
}

function asSelectedTechnique(experience: Extract<ExerciseExperience, { kind: "breathing" }>, value: AnswerValue | undefined) {
  if (Array.isArray(value) || !value) return undefined;
  return experience.techniques.find((technique) => technique.key === value);
}

export function answerHasContent(code: string, answer: ExerciseAnswer): boolean {
  return answerToBlocks(code, answer).length > 0;
}
