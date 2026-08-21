import type { ExerciseAnswer, ExerciseExperience } from "../exerciseExperiences";

type Props = {
  experience: Extract<ExerciseExperience, { kind: "breathing" }>;
  answer: ExerciseAnswer;
  onChange: (answer: ExerciseAnswer) => void;
};

const asText = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value.join("\n") : value ?? "";

export default function BreathingExperience({ experience, answer, onChange }: Props) {
  const selected = asText(answer.selected);
  return <div className="breathing-experience">
    <header className="instrument-intro">
      <p className="instrument-kicker">Prueba · observa · elige</p>
      <h2>No busques la técnica perfecta. Nota cuál te baja.</h2>
      <p>Haz cinco ciclos de cada una. Tu única medida es cómo queda tu cuerpo al terminar.</p>
    </header>
    <div className="breath-orbit">
      {experience.techniques.map((technique, index) => {
        const noteKey = `note:${technique.key}`;
        const chosen = selected === technique.key;
        return <section className={`breath-card${chosen ? " is-chosen" : ""}`} key={technique.key}>
          <span className="breath-number">0{index + 1}</span>
          <h3>{technique.label}</h3>
          <p className="breath-rhythm">{technique.instruction}</p>
          <p className="instrument-help">{technique.help}</p>
          <textarea aria-label={`Cómo me dejó ${technique.label}`} rows={3} value={asText(answer[noteKey])} onChange={(event) => onChange({ ...answer, [noteKey]: event.target.value })} placeholder={technique.placeholder} />
          <div className="print-value">{asText(answer[noteKey])}</div>
          <label className="breath-choice">
            <input type="radio" name="selected-breath" checked={chosen} onChange={() => onChange({ ...answer, selected: technique.key })} aria-label={`Elegir ${technique.label}`} />
            <span>{chosen ? "Ésta es la mía" : "Elegir ésta"}</span>
          </label>
        </section>;
      })}
    </div>
  </div>;
}

