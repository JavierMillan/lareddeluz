import { useEffect, useMemo, useRef, useState } from "react";
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
  position: number;
};

const asText = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value.join("\n") : value ?? "";
/**
 * Aviso corto para un campo que falta.
 *
 * Un boton que no hace nada al pulsarlo deja al lector adivinando. El aviso
 * se dice en voz alta (aria-live) y se borra solo, para no acumular reganos
 * en pantalla.
 */
function useHint() {
  const [hint, setHint] = useState("");
  const timer = useRef<number | undefined>(undefined);
  const say = (message: string) => {
    setHint(message);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setHint(""), 4000);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return { hint, say, clear: () => setHint("") };
}

/** Se anuncia siempre, aunque este vacio, para que el lector de pantalla lo siga. */
function Hint({ children }: { children: string }) {
  return <p className="field-hint" role="status" aria-live="polite" data-shown={children ? "" : undefined}>
    {children ? <><span aria-hidden="true">!</span>{children}</> : null}
  </p>;
}

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
  const { hint, say, clear } = useHint();
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const add = (category: Category) => {
    const value = drafts[category.key]?.trim();
    if (!value) { say("Escribe algo antes de agregarlo."); return; }
    if (asList(answer[category.key]).includes(value)) { say("Eso ya está en la lista."); return; }
    clear();
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
    <Hint>{hint}</Hint>
  </div>;
}

function EnergyExperience({ experience, answer, onChange }: {
  experience: Extract<ExerciseExperience, { kind: "energy" }>;
  answer: ExerciseAnswer;
  onChange: Props["onChange"];
}) {
  /**
   * Un bloque describe un tramo recurrente: "lunes a viernes, 9:00-18:00".
   * La vida se repite por semana, asi que capturarla dia por dia obligaba a
   * escribir cinco veces lo mismo. Patron tomado de SavvyCal/Calendly.
   */
  type EnergyBlock = {
    id: string;
    activity: string;
    days: number[];
    from: string;
    to: string;
    energy: "drena" | "neutro" | "recarga";
  };
  const SHORT = ["L", "M", "M", "J", "V", "S", "D"];
  const WEEKDAYS = [0, 1, 2, 3, 4];

  const { hint, say, clear } = useHint();
  const [activity, setActivity] = useState("");
  const [days, setDays] = useState<number[]>(WEEKDAYS);
  const [from, setFrom] = useState("09:00");
  const [to, setTo] = useState("18:00");
  const [energy, setEnergy] = useState<EnergyBlock["energy"]>("neutro");

  const blocks = asList(answer.entries).flatMap((line) => {
    try {
      const parsed = JSON.parse(line) as Partial<EnergyBlock> & { day?: string; time?: string };
      // Compatibilidad: las capturas viejas guardaban un dia y una hora sueltos.
      if (!parsed.days) {
        const index = experience.days.findIndex((name) => name === parsed.day);
        return [{
          id: String(parsed.id ?? Math.random()),
          activity: String(parsed.activity ?? ""),
          days: index >= 0 ? [index] : [0],
          from: String(parsed.time ?? "09:00"),
          to: String(parsed.time ?? "09:00"),
          energy: (parsed.energy ?? "neutro") as EnergyBlock["energy"],
        }];
      }
      return [parsed as EnergyBlock];
    } catch { return []; }
  });

  const label = (block: EnergyBlock) => {
    const sorted = [...block.days].sort((a, b) => a - b);
    if (!sorted.length) return "Sin días";
    const consecutive = sorted.every((day, index) => index === 0 || day === sorted[index - 1] + 1);
    if (sorted.length > 2 && consecutive) return `${experience.days[sorted[0]]} a ${experience.days[sorted[sorted.length - 1]]}`;
    return sorted.map((day) => experience.days[day]).join(", ");
  };

  const saveBlocks = (next: EnergyBlock[]) => onChange({
    ...answer,
    entries: next.map((block) => JSON.stringify(block)),
    drena: next.filter((block) => block.energy === "drena").map((block) => `${block.activity} · ${label(block)} ${block.from}-${block.to}`),
    neutro: next.filter((block) => block.energy === "neutro").map((block) => `${block.activity} · ${label(block)} ${block.from}-${block.to}`),
    recarga: next.filter((block) => block.energy === "recarga").map((block) => `${block.activity} · ${label(block)} ${block.from}-${block.to}`),
  });

  const add = () => {
    const value = activity.trim();
    if (!value) { say("Escribe qué actividad es antes de añadirla."); return; }
    if (!days.length) { say("Marca al menos un día de la semana."); return; }
    if (from >= to) { say("La hora de fin tiene que ser posterior a la de inicio."); return; }
    clear();
    saveBlocks([...blocks, { id: `${Date.now()}-${Math.random()}`, activity: value, days: [...days], from, to, energy }]);
    setActivity("");
  };

  const toggleDay = (index: number) => setDays((current) =>
    current.includes(index) ? current.filter((day) => day !== index) : [...current, index]);

  /** Horas que cubre un bloque en toda la semana: mide el peso real. */
  const weeklyHours = (block: EnergyBlock) => {
    const [fromH, fromM] = block.from.split(":").map(Number);
    const [toH, toM] = block.to.split(":").map(Number);
    const minutes = Math.max(0, (toH * 60 + toM) - (fromH * 60 + fromM));
    return (minutes / 60) * block.days.length;
  };
  const totals = {
    drena: blocks.filter((block) => block.energy === "drena").reduce((sum, block) => sum + weeklyHours(block), 0),
    neutro: blocks.filter((block) => block.energy === "neutro").reduce((sum, block) => sum + weeklyHours(block), 0),
    recarga: blocks.filter((block) => block.energy === "recarga").reduce((sum, block) => sum + weeklyHours(block), 0),
  };
  const totalHours = totals.drena + totals.neutro + totals.recarga;
  const hours = (value: number) => `${Math.round(value * 10) / 10} h`;

  return <div className="energy-experience">
    <header className="instrument-intro">
      <p className="instrument-kicker">Un bloque · toda la semana</p>
      <h2>Dónde se te va el día.</h2>
      <p>Marca los días que se repiten y su horario. Si algo pasa de lunes a viernes, es una sola captura — no cinco.</p>
    </header>

    <div className="energy-block-form">
      <label className="energy-block-form__activity">
        <span>Actividad concreta</span>
        <input
          aria-label="Actividad concreta"
          value={activity}
          onChange={(event) => setActivity(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter") add(); }}
          placeholder="Ej. reunión semanal, traslado, caminar…"
        />
      </label>

      <div className="energy-days-picker" role="group" aria-label="Días que se repite">
        <span>Se repite</span>
        <div>
          {SHORT.map((initial, index) => <button
            key={index}
            type="button"
            role="checkbox"
            aria-checked={days.includes(index)}
            aria-label={experience.days[index]}
            data-on={days.includes(index) || undefined}
            onClick={() => toggleDay(index)}
          >{initial}</button>)}
        </div>
        <div className="energy-days-picker__presets">
          <button type="button" onClick={() => setDays(WEEKDAYS)}>Entre semana</button>
          <button type="button" onClick={() => setDays([5, 6])}>Fin de semana</button>
          <button type="button" onClick={() => setDays([0, 1, 2, 3, 4, 5, 6])}>Todos</button>
        </div>
      </div>

      <div className="energy-block-form__meta">
        <label><span>De</span><input type="time" aria-label="Hora de inicio" value={from} onChange={(event) => setFrom(event.target.value)} /></label>
        <label><span>A</span><input type="time" aria-label="Hora de fin" value={to} onChange={(event) => setTo(event.target.value)} /></label>
        <label><span>Me dejó</span>
          <select aria-label="Cómo me dejó" value={energy} onChange={(event) => setEnergy(event.target.value as EnergyBlock["energy"])}>
            <option value="drena">Me drenó</option>
            <option value="neutro">Neutro</option>
            <option value="recarga">Me recargó</option>
          </select>
        </label>
        <button type="button" onClick={add}>Añadir</button>
      </div>
      <Hint>{hint}</Hint>
    </div>

    {blocks.length > 0 && <>
      <div className="energy-balance" aria-hidden="true">
        {(["drena", "neutro", "recarga"] as const).map((key) => totals[key] > 0 && <span
          key={key}
          className={`energy-balance--${key}`}
          style={{ flexGrow: totals[key] }}
        >{hours(totals[key])}</span>)}
      </div>
      <p className="energy-summary">{hours(totals.drena)} drenan · {hours(totals.recarga)} recargan · {hours(totalHours)} registradas</p>

      <ul className="energy-blocks">
        {blocks.map((block) => <li key={block.id} className={`energy-block energy-block--${block.energy}`}>
          <div className="energy-block__week" aria-hidden="true">
            {SHORT.map((initial, index) => <i key={index} data-on={block.days.includes(index) || undefined}>{initial}</i>)}
          </div>
          <div className="energy-block__body">
            <p>{block.activity}</p>
            <small>{label(block)} · {block.from}–{block.to} · {hours(weeklyHours(block))} por semana</small>
          </div>
          <button type="button" onClick={() => saveBlocks(blocks.filter((item) => item.id !== block.id))} aria-label={`Quitar ${block.activity}`}>×</button>
        </li>)}
      </ul>
    </>}
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

export default function ExerciseWorkspace({ exercise, answer, onChange, onBack, previous, next, onNavigate, onClear, saveState, position }: Props) {
  const experience = EXPERIENCE_BY_CODE[exercise.code];
  const written = answerHasContent(exercise.code, answer);

  return <main className={`exercise-workspace exercise-workspace--${experience.kind}`} aria-label={`${exercise.code} · ${exercise.title}`}>
    <div className="workbook-toolbar">
      <button type="button" className="workbook-back" onClick={onBack}>← Volver al índice</button>
      <nav className="workbook-toolbar__nav" aria-label="Navegación entre ejercicios">
        <button type="button" onClick={() => onNavigate(previous.code)} aria-label={`Ejercicio anterior: ${previous.code} · ${previous.title}`}>← <b>{previous.code}</b></button>
        <span>{String(position).padStart(2, "0")} / 20</span>
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
        <p className="save-state" data-state={saveState} aria-live="polite">{SAVE_COPY[saveState]}</p>
        <div>
          <button type="button" onClick={() => window.print()}>Imprimir esta hoja</button>
          <button type="button" disabled={!written} onClick={() => downloadExercisePdf(exercise, answer)}>Descargar esta hoja en PDF</button>
          {written && <button type="button" className="clear-answer" onClick={onClear}>Borrar mis respuestas</button>}
        </div>
      </footer>}
    </motion.article>
  </main>;
}
