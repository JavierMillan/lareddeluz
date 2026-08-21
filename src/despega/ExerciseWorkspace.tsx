import { useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Exercise } from "./exercises";
import {
  EXPERIENCE_BY_CODE,
  answerHasContent,
  composeStatement,
  type Category,
  type ExerciseAnswer,
  type ExerciseExperience,
  isCustomExperience,
} from "./exerciseExperiences";
import { downloadExercisePdf } from "./exercisePdf";
import AuditExperience from "./experiences/AuditExperience";
import BreathingExperience from "./experiences/BreathingExperience";
import DecisionTableExperience from "./experiences/DecisionTableExperience";
import SprintExperience from "./experiences/SprintExperience";
import TerritoryExperience from "./experiences/TerritoryExperience";
import JourneyExperience from "./experiences/JourneyExperiences";

type SaveState = "idle" | "saving" | "saved" | "memory";

type Props = {
  exercise: Exercise;
  answer: ExerciseAnswer;
  onChange: (answer: ExerciseAnswer) => void;
  onBack: () => void;
  previous: Exercise;
  next: Exercise;
  onNavigate: (code: string) => void;
  onClear: () => void;
  saveState: SaveState;
};

const asText = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value.join("\n") : value ?? "";
const asList = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value : value?.trim() ? [value] : [];

function ReadingExperience({ experience }: {
  experience: Extract<ExerciseExperience, { kind: "reading" }>;
}) {
  return <section className="reading-experience" aria-label="Lectura directa">
    <div className="reading-cue">
      <span>Lee esta frase</span>
      <blockquote>{experience.statement}</blockquote>
    </div>
    <div className="reading-reveal">
      <p className="reading-stop">Ya está, eso es todo.</p>
      <h2>{experience.question}</h2>
      <div className="reading-explanation">
        {experience.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </div>
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

function ListExperience({ categories, answer, onChange, variant, movable = false }: {
  categories: Category[];
  answer: ExerciseAnswer;
  onChange: Props["onChange"];
  variant: "capture" | "decision";
  movable?: boolean;
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
      {category.help && <p className="answer-zone__help">{category.help}</p>}
      <ul>
        {asList(answer[category.key]).map((item, itemIndex) => <li key={`${item}-${itemIndex}`}>
          <p>{item}</p>
          <div className="move-controls">
            {movable && categoryIndex > 0 && <button type="button" onClick={() => move(categoryIndex, itemIndex, -1)} aria-label={`Mover ${item} a ${categories[categoryIndex - 1].label}`}>←</button>}
            {movable && categoryIndex < categories.length - 1 && <button type="button" onClick={() => move(categoryIndex, itemIndex, 1)} aria-label={`Mover ${item} a ${categories[categoryIndex + 1].label}`}>→</button>}
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

function EnergyExperience({ experience, answer, onChange }: {
  experience: Extract<ExerciseExperience, { kind: "energy" }>;
  answer: ExerciseAnswer;
  onChange: Props["onChange"];
}) {
  type EnergyEntry = { id: string; activity: string; day: string; time: string; energy: "drena" | "neutro" | "recarga" };
  const [activity, setActivity] = useState("");
  const [day, setDay] = useState(experience.days[0]);
  const [time, setTime] = useState("09:00");
  const [energy, setEnergy] = useState<EnergyEntry["energy"]>("neutro");
  const entries = asList(answer.entries).flatMap((line) => { try { return [JSON.parse(line) as EnergyEntry]; } catch { return []; } });
  const saveEntries = (next: EnergyEntry[]) => onChange({
    ...answer,
    entries: next.map((entry) => JSON.stringify(entry)),
    drena: next.filter((entry) => entry.energy === "drena").map((entry) => entry.activity),
    neutro: next.filter((entry) => entry.energy === "neutro").map((entry) => entry.activity),
    recarga: next.filter((entry) => entry.energy === "recarga").map((entry) => entry.activity),
  });
  const add = () => {
    const value = activity.trim();
    if (!value) return;
    saveEntries([...entries, { id: `${Date.now()}-${Math.random()}`, activity: value, day, time, energy }]);
    setActivity("");
  };
  const counts = { drena: entries.filter((entry) => entry.energy === "drena").length, neutro: entries.filter((entry) => entry.energy === "neutro").length, recarga: entries.filter((entry) => entry.energy === "recarga").length };

  return <div className="energy-experience energy-experience--timeline">
    <header className="instrument-intro">
      <p className="instrument-kicker">Una actividad · una sola captura</p>
      <h2>Dónde se te va el día.</h2>
      <p>Recorre tu registro y anota cada actividad con su día y hora aproximada. Clasifícala aquí mismo; no tienes que copiarla después a otra columna.</p>
    </header>
    <div className="energy-composer">
      <input aria-label="Actividad concreta" value={activity} onChange={(event) => setActivity(event.target.value)} placeholder="No pongas «trabajo»: escribe la actividad concreta…" />
      <select aria-label="Día" value={day} onChange={(event) => setDay(event.target.value)}>{experience.days.map((item) => <option key={item}>{item}</option>)}</select>
      <input type="time" aria-label="Hora aproximada" value={time} onChange={(event) => setTime(event.target.value)} />
      <select aria-label="Cómo me dejó" value={energy} onChange={(event) => setEnergy(event.target.value as EnergyEntry["energy"])}><option value="drena">Me drenó</option><option value="neutro">Neutro</option><option value="recarga">Me recargó</option></select>
      <button type="button" onClick={add}>Registrar actividad</button>
    </div>
    <p className="energy-summary">{counts.drena} drena · {counts.neutro} neutro · {counts.recarga} recarga</p>
    <div className="energy-days">{experience.days.map((item) => {
      const daily = entries.filter((entry) => entry.day === item).sort((a, b) => a.time.localeCompare(b.time));
      return <section key={item} className={daily.length ? "has-entries" : ""}><h3>{item}</h3>{daily.length ? <ol>{daily.map((entry) => <li key={entry.id} className={`energy-entry energy-entry--${entry.energy}`}><time>{entry.time}</time><p>{entry.activity}</p><span>{entry.energy === "drena" ? "Drena" : entry.energy === "recarga" ? "Recarga" : "Neutro"}</span><button type="button" onClick={() => saveEntries(entries.filter((itemEntry) => itemEntry.id !== entry.id))} aria-label={`Quitar ${entry.activity}`}>×</button></li>)}</ol> : <p>Sin registro</p>}</section>;
    })}</div>
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
  if (experience.kind === "reading") return <ReadingExperience experience={experience} />;
  if (experience.kind === "energy") return <EnergyExperience experience={experience} answer={answer} onChange={onChange} />;
  if (experience.kind === "writing") return <WritingExperience prompts={experience.prompts} answer={answer} onChange={onChange} />;
  if (experience.kind === "compose") return <ComposeExperience experience={experience} answer={answer} onChange={onChange} />;
  if (experience.kind === "audit") return <AuditExperience experience={experience} answer={answer} onChange={onChange} />;
  if (experience.kind === "breathing") return <BreathingExperience experience={experience} answer={answer} onChange={onChange} />;
  if (experience.kind === "territory") return <TerritoryExperience answer={answer} onChange={onChange} />;
  if (experience.kind === "sprint") return <SprintExperience experience={experience} answer={answer} onChange={onChange} />;
  if (experience.kind === "decision-table") return <DecisionTableExperience answer={answer} onChange={onChange} />;
  if (isCustomExperience(experience)) return <JourneyExperience kind={experience.kind} answer={answer} onChange={onChange} />;
  return <ListExperience categories={experience.categories} answer={answer} onChange={onChange} variant={experience.kind} movable={experience.movable} />;
}

const SAVE_COPY: Record<SaveState, string> = {
  idle: "Tus respuestas se quedan en este dispositivo",
  saving: "Guardando…",
  saved: "Guardado en este dispositivo",
  memory: "No se pudo guardar; sigue abierto en esta sesión",
};

export default function ExerciseWorkspace({ exercise, answer, onChange, onBack, previous, next, onNavigate, onClear, saveState }: Props) {
  const experience = EXPERIENCE_BY_CODE[exercise.code];
  const written = answerHasContent(exercise.code, answer);

  return <main className={`exercise-workspace exercise-workspace--${experience.kind}`} aria-label={`${exercise.code} · ${exercise.title}`}>
    <div className="workbook-toolbar">
      <button type="button" className="workbook-back" onClick={onBack}>← Volver al índice</button>
      <nav className="workbook-toolbar__nav" aria-label="Navegación entre ejercicios">
        <button type="button" onClick={() => onNavigate(previous.code)} aria-label={`Ejercicio anterior: ${previous.code} · ${previous.title}`}>← <b>{previous.code}</b></button>
        <span>{String(exercise.num).padStart(2, "0")} / 20</span>
        <button type="button" onClick={() => onNavigate(next.code)} aria-label={`Ejercicio siguiente: ${next.code} · ${next.title}`}><b>{next.code}</b> →</button>
      </nav>
    </div>

    <motion.article className="workbook-sheet" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }}>
      <header className="workbook-head">
        <p>{exercise.code} · DESPEGA</p>
        <h1 tabIndex={-1}>{exercise.title}</h1>
        <p className="workbook-purpose">{exercise.purpose}</p>
        <div className="workbook-needs"><span>Antes de empezar</span><p>{exercise.needs}</p></div>
      </header>

      {exercise.steps.length > 0 && <details className="workbook-instructions" open>
        <summary>Cómo hacerlo <span>{exercise.steps.length} pasos</span></summary>
        {exercise.notice && <aside className="workbook-notice"><strong>Antes de empezar</strong><p>{exercise.notice}</p></aside>}
        <ol>
          {exercise.steps.map((step, index) => <li key={`${exercise.code}-${index}`}>
            <i>{String(index + 1).padStart(2, "0")}</i>
            <p>{step}</p>
          </li>)}
        </ol>
      </details>}

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
