import { useState } from "react";
import type { ExerciseAnswer } from "../exerciseExperiences";

type Props = { answer: ExerciseAnswer; onChange: (answer: ExerciseAnswer) => void };
const asText = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value.join("\n") : value ?? "";
const asList = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value : value?.trim() ? [value] : [];

function IdeaList({ answerKey, label, placeholder, answer, onChange }: Props & { answerKey: string; label: string; placeholder: string }) {
  const [draft, setDraft] = useState("");
  const values = asList(answer[answerKey]);
  const add = () => {
    const value = draft.trim();
    if (!value) return;
    onChange({ ...answer, [answerKey]: [...values, value] });
    setDraft("");
  };
  return <section className={`territory-pool territory-pool--${answerKey}`}>
    <h3>{label}</h3>
    <ul>{values.map((value, index) => <li key={`${value}-${index}`}>{value}<button type="button" onClick={() => onChange({ ...answer, [answerKey]: values.filter((_, itemIndex) => itemIndex !== index) })} aria-label={`Quitar ${value}`}>×</button></li>)}</ul>
    <div className="instrument-add"><input aria-label={`Agregar a ${label}`} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") add(); }} placeholder={placeholder} /><button type="button" onClick={add}>Agregar</button></div>
  </section>;
}

export default function TerritoryExperience({ answer, onChange }: Props) {
  return <div className="territory-experience">
    <header className="instrument-intro">
      <p className="instrument-kicker">Tu Ikigai no tiene que ser un punto perfecto</p>
      <h2>Tu territorio aparece en el cruce.</h2>
      <p>Junta lo que sabes hacer, encuentra parentescos y nombra el campo donde la mayoría puede trabajar junta. Algunas habilidades pueden quedarse fuera.</p>
    </header>
    <div className="territory-map">
      <IdeaList answerKey="skills" label="Lo que sé hacer" placeholder="Diseño, escuchar, cocinar…" answer={answer} onChange={onChange} />
      <IdeaList answerKey="groups" label="Parentescos" placeholder="Habilidades que podrían trabajar juntas…" answer={answer} onChange={onChange} />
      <section className="territory-core">
        <span>Convergencia</span>
        <label>Mi territorio<textarea aria-label="Mi territorio" rows={3} value={asText(answer.territory)} onChange={(event) => onChange({ ...answer, territory: event.target.value })} placeholder="El campo donde cabe la mayoría…" /></label>
        <div className="print-value">{asText(answer.territory)}</div>
      </section>
    </div>
    <section className="territory-proof">
      <p className="instrument-kicker">Bájalo a tierra</p>
      <div>
        <label>Dónde se usa<textarea aria-label="Dónde se usa" rows={3} value={asText(answer.where)} onChange={(event) => onChange({ ...answer, where: event.target.value })} placeholder="Proyectos, espacios o industrias concretas…" /></label>
        <label>A quién le sirve<textarea aria-label="A quién le sirve" rows={3} value={asText(answer.who)} onChange={(event) => onChange({ ...answer, who: event.target.value })} placeholder="La persona o comunidad que se beneficia…" /></label>
        <label>Quién contrataría por ello<textarea aria-label="Quién contrataría por ello" rows={3} value={asText(answer.paid)} onChange={(event) => onChange({ ...answer, paid: event.target.value })} placeholder="Alguien que ya busca resolver esto…" /></label>
      </div>
    </section>
  </div>;
}

