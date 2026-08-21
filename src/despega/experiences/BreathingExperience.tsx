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
      <p className="instrument-kicker">Elige · prueba · escucha</p>
      <h2>Empieza por la que hoy te dé curiosidad.</h2>
      <p>No tienes que probarlas todas. Elige una, haz cinco ciclos y nota cómo queda tu cuerpo. Las otras seguirán aquí cuando quieras volver.</p>
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
          <label className="breath-choice">
            <input type="radio" name="selected-breath" checked={chosen} onChange={() => onChange({ ...answer, selected: technique.key })} aria-label={`Elegir ${technique.label}`} />
            <span>{chosen ? "Estoy probando ésta" : "Probar ésta"}</span>
          </label>
          {chosen && <div className="breath-reflection">
            <label><span>¿Cómo quedó tu cuerpo?</span><textarea aria-label={`Cómo me dejó ${technique.label}`} rows={3} value={asText(answer[noteKey])} onChange={(event) => onChange({ ...answer, [noteKey]: event.target.value })} placeholder={technique.placeholder} /></label>
            <div className="print-value">{asText(answer[noteKey])}</div>
          </div>}
        </section>;
      })}
    </div>
  </div>;
}
