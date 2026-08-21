import { useState } from "react";
import type { ExerciseAnswer, ExerciseExperience } from "../exerciseExperiences";

type Props = {
  experience: Extract<ExerciseExperience, { kind: "audit" }>;
  answer: ExerciseAnswer;
  onChange: (answer: ExerciseAnswer) => void;
};

const asText = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value.join("\n") : value ?? "";
const asList = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value : value?.trim() ? [value] : [];

export default function AuditExperience({ experience, answer, onChange }: Props) {
  const [pattern, setPattern] = useState("");
  const finalPass = experience.passes[2];
  const patterns = asList(answer[finalPass.key]).slice(0, 3);

  const addPattern = () => {
    const value = pattern.trim();
    if (!value || patterns.length >= 3) return;
    onChange({ ...answer, [finalPass.key]: [...patterns, value] });
    setPattern("");
  };

  return <div className="audit-experience">
    <div className="audit-thread" aria-hidden="true"><span /><span /><span /></div>
    {experience.passes.slice(0, 2).map((pass, index) => <section className="audit-pass" key={pass.key}>
      <p className="instrument-kicker">Pasada {String(index + 1).padStart(2, "0")}</p>
      <h2>{pass.label}</h2>
      <p className="instrument-help">{pass.help}</p>
      <textarea
        aria-label={pass.label}
        rows={5}
        value={asText(answer[pass.key])}
        onChange={(event) => onChange({ ...answer, [pass.key]: event.target.value })}
        placeholder={pass.placeholder}
      />
      <div className="print-value">{asText(answer[pass.key])}</div>
    </section>)}
    <section className="audit-pass audit-pass--final">
      <p className="instrument-kicker">Cierre · máximo tres</p>
      <h2>{finalPass.label}</h2>
      <p className="instrument-help">{finalPass.help}</p>
      <ol className="audit-patterns">
        {patterns.map((item, index) => <li key={`${item}-${index}`}>
          <span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p>
          <button type="button" onClick={() => onChange({ ...answer, [finalPass.key]: patterns.filter((_, itemIndex) => itemIndex !== index) })} aria-label={`Quitar ${item}`}>×</button>
        </li>)}
      </ol>
      {patterns.length < 3 && <div className="instrument-add">
        <input aria-label="Agregar automatismo" value={pattern} onChange={(event) => setPattern(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") addPattern(); }} placeholder={finalPass.placeholder} />
        <button type="button" onClick={addPattern}>Agregar</button>
      </div>}
    </section>
  </div>;
}

