import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Exercise } from "./exercises";
import {
  EXPERIENCE_BY_CODE,
  answerHasContent,
  composeStatement,
  type Category,
  type ExerciseAnswer,
  type ExerciseExperience,
} from "./exerciseExperiences";
import { downloadExercisePdf } from "./exercisePdf";

type SaveState = "idle" | "saving" | "saved" | "memory";

type Props = {
  exercise: Exercise;
  answer: ExerciseAnswer;
  onChange: (answer: ExerciseAnswer) => void;
  onBack: () => void;
  onClear: () => void;
  saveState: SaveState;
};

const asText = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value.join("\n") : value ?? "";
const asList = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value : value?.trim() ? [value] : [];

function PauseExperience({ duration }: { duration: number }) {
  const [remaining, setRemaining] = useState(duration);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const timer = window.setTimeout(() => setRemaining((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [remaining, running]);

  const start = () => {
    setRemaining(duration);
    setRunning(true);
  };

  return <section className="pause-experience" aria-label="Pausa guiada">
    <div className={`pause-orb${running ? " is-running" : ""}`} aria-live="polite">
      <span>{remaining > 0 ? remaining : "·"}</span>
    </div>
    <p>{remaining > 0
      ? "Cierra los ojos. Escucha lo primero que tu cabeza intenta decirte."
      : "Ahí está. No necesitabas escribirla para comprobar que existe."}</p>
    <button type="button" onClick={start}>{running && remaining > 0 ? "Reiniciar pausa" : "Comenzar pausa"}</button>
    <small>Sin respuestas · sin nada que entregar</small>
  </section>;
}

function WritingExperience({ prompts, answer, onChange }: {
  prompts: string[];
  answer: ExerciseAnswer;
  onChange: Props["onChange"];
}) {
  return <div className="writing-experience">
    {prompts.map((prompt, index) => {
      const key = String(index);
      return <label key={prompt} className="journal-prompt">
        <span><i>{String(index + 1).padStart(2, "0")}</i>{prompt}</span>
        <textarea
          aria-label={prompt}
          rows={index === prompts.length - 1 ? 5 : 4}
          value={asText(answer[key])}
          onChange={(event) => onChange({ ...answer, [key]: event.target.value })}
          placeholder="Deja que salga como venga…"
        />
        <div className="print-value">{asText(answer[key])}</div>
      </label>;
    })}
  </div>;
}

function ListExperience({ categories, answer, onChange, variant }: {
  categories: Category[];
  answer: ExerciseAnswer;
  onChange: Props["onChange"];
  variant: "capture" | "decision";
}) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const add = (category: Category) => {
    const value = drafts[category.key]?.trim();
    if (!value) return;
    onChange({ ...answer, [category.key]: [...asList(answer[category.key]), value] });
    setDrafts((current) => ({ ...current, [category.key]: "" }));
  };

  const remove = (key: string, index: number) => {
    onChange({ ...answer, [key]: asList(answer[key]).filter((_, itemIndex) => itemIndex !== index) });
  };

  const move = (fromIndex: number, itemIndex: number, direction: -1 | 1) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= categories.length) return;
    const from = categories[fromIndex];
    const to = categories[toIndex];
    const source = asList(answer[from.key]);
    const item = source[itemIndex];
    onChange({
      ...answer,
      [from.key]: source.filter((_, index) => index !== itemIndex),
      [to.key]: [...asList(answer[to.key]), item],
    });
  };

  return <div className={`list-experience list-experience--${variant}`}>
    {categories.map((category, categoryIndex) => <section className="answer-zone" key={category.key}>
      <header><span>{String(categoryIndex + 1).padStart(2, "0")}</span><h2>{category.label}</h2></header>
      <ul>
        {asList(answer[category.key]).map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>
          <p>{item}</p>
          <div className="move-controls">
            {categoryIndex > 0 && <button type="button" onClick={() => move(categoryIndex, itemIndex, -1)} aria-label={`Mover ${item} a ${categories[categoryIndex - 1].label}`}>←</button>}
            {categoryIndex < categories.length - 1 && <button type="button" onClick={() => move(categoryIndex, itemIndex, 1)} aria-label={`Mover ${item} a ${categories[categoryIndex + 1].label}`}>→</button>}
            <button type="button" onClick={() => remove(category.key, itemIndex)} aria-label={`Quitar ${item}`}>×</button>
          </div>
        </li>)}
      </ul>
      <div className="zone-add">
        <input
          aria-label={`Agregar a ${category.label}`}
          value={drafts[category.key] ?? ""}
          onChange={(event) => setDrafts((current) => ({ ...current, [category.key]: event.target.value }))}
          onKeyDown={(event) => { if (event.key === "Enter") add(category); }}
          placeholder="Escribe algo breve…"
        />
        <button type="button" onClick={() => add(category)} aria-label={`Agregar en ${category.label}`}>+</button>
      </div>
    </section>)}
  </div>;
}

function ComposeExperience({ experience, answer, onChange }: {
  experience: Extract<ExerciseExperience, { kind: "compose" }>;
  answer: ExerciseAnswer;
  onChange: Props["onChange"];
}) {
  const statement = useMemo(() => composeStatement(experience.template, answer), [answer, experience.template]);
  return <div className="compose-experience">
    <div className="compose-fields">
      {experience.fields.map((field, index) => <label key={field.key}>
        <span><i>{String(index + 1).padStart(2, "0")}</i>{field.label}</span>
        <input
          value={asText(answer[field.key])}
          onChange={(event) => onChange({ ...answer, [field.key]: event.target.value })}
          placeholder={field.placeholder}
        />
      </label>)}
    </div>
    <blockquote>{statement}</blockquote>
  </div>;
}

function Experience({ experience, answer, onChange }: {
  experience: ExerciseExperience;
  answer: ExerciseAnswer;
  onChange: Props["onChange"];
}) {
  if (experience.kind === "pause") return <PauseExperience duration={experience.duration} />;
  if (experience.kind === "writing") return <WritingExperience prompts={experience.prompts} answer={answer} onChange={onChange} />;
  if (experience.kind === "compose") return <ComposeExperience experience={experience} answer={answer} onChange={onChange} />;
  return <ListExperience categories={experience.categories} answer={answer} onChange={onChange} variant={experience.kind} />;
}

const SAVE_COPY: Record<SaveState, string> = {
  idle: "Tus respuestas se quedan en este dispositivo",
  saving: "Guardando…",
  saved: "Guardado en este dispositivo",
  memory: "No se pudo guardar; sigue abierto en esta sesión",
};

export default function ExerciseWorkspace({ exercise, answer, onChange, onBack, onClear, saveState }: Props) {
  const experience = EXPERIENCE_BY_CODE[exercise.code];
  const written = answerHasContent(exercise.code, answer);

  return <main className="exercise-workspace" aria-label={`${exercise.code} · ${exercise.title}`}>
    <div className="workbook-toolbar">
      <button type="button" className="workbook-back" onClick={onBack}>← Volver al índice</button>
      <span>{String(exercise.num).padStart(2, "0")} / 20</span>
    </div>

    <motion.article className="workbook-sheet" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }}>
      <header className="workbook-head">
        <p>{exercise.code} · DESPEGA</p>
        <h1 tabIndex={-1}>{exercise.title}</h1>
        <p className="workbook-purpose">{exercise.purpose}</p>
        <div className="workbook-needs"><span>Antes de empezar</span><p>{exercise.needs}</p></div>
      </header>

      <section className="workbook-body">
        <Experience experience={experience} answer={answer} onChange={onChange} />
      </section>

      {(exercise.expect || exercise.signal) && <aside className="context-notes">
        {exercise.expect && <details><summary>Qué podrías sentir mientras lo haces</summary><p>{exercise.expect}</p></details>}
        {exercise.signal && <details><summary>Cómo vas a notar que algo cambió</summary><p>{exercise.signal}</p></details>}
      </aside>}

      {experience.downloadable && <footer className="workbook-actions">
        <p className="save-state" aria-live="polite">{SAVE_COPY[saveState]}</p>
        <div>
          <button type="button" onClick={() => window.print()}>Imprimir esta hoja</button>
          <button type="button" disabled={!written} onClick={() => downloadExercisePdf(exercise, answer)}>Descargar esta hoja en PDF</button>
          {written && <button type="button" className="clear-answer" onClick={onClear}>Borrar mis respuestas</button>}
        </div>
      </footer>}
    </motion.article>
  </main>;
}
