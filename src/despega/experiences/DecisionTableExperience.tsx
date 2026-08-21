import type { ExerciseAnswer } from "../exerciseExperiences";

type Props = { answer: ExerciseAnswer; onChange: (answer: ExerciseAnswer) => void };
const asText = (value: ExerciseAnswer[string]) => Array.isArray(value) ? value.join("\n") : value ?? "";

function Area({ title, help, children }: { title: string; help: string; children: React.ReactNode }) {
  return <section className="decision-zone" data-testid="decision-analysis-zone"><h3>{title}</h3><p>{help}</p>{children}</section>;
}

function TextArea({ answerKey, label, placeholder, rows = 5, answer, onChange }: Props & { answerKey: string; label: string; placeholder: string; rows?: number }) {
  return <label className="decision-field"><span>{label}</span><textarea aria-label={label} rows={rows} value={asText(answer[answerKey])} onChange={(event) => onChange({ ...answer, [answerKey]: event.target.value })} placeholder={placeholder} /><div className="print-value">{asText(answer[answerKey])}</div></label>;
}

export default function DecisionTableExperience({ answer, onChange }: Props) {
  return <div className="decision-table-experience">
    <header className="instrument-intro"><p className="instrument-kicker">Hecho · historia · riesgo</p><h2>Separa lo que pasó de lo que imaginas.</h2><p>La claridad aparece cuando dejas de tratar tus interpretaciones como si fueran evidencia.</p></header>
    <section className="decision-question"><TextArea answerKey="decision" label="La decisión, en una frase" placeholder="¿Renuncio o no? ¿Tengo esa conversación?" rows={2} answer={answer} onChange={onChange} /></section>
    <div className="decision-grid">
      <Area title="01 · Los hechos" help="Sólo lo que podrías probar: números, fechas y palabras textuales."><TextArea answerKey="facts" label="Hechos comprobables" placeholder="Lo que sé que ocurrió…" answer={answer} onChange={onChange} /></Area>
      <Area title="02 · La historia" help="Lo que supones, interpretas o crees que otros piensan."><TextArea answerKey="added" label="Lo que estoy agregando" placeholder="La película que mi cabeza está armando…" answer={answer} onChange={onChange} /></Area>
      <Area title="03 · Los riesgos" help="Distingue una consecuencia concreta de un miedo que no puedes comprobar."><TextArea answerKey="realRisks" label="Riesgos reales" placeholder="Por ejemplo: tres meses sin ingreso…" rows={3} answer={answer} onChange={onChange} /><TextArea answerKey="inventedRisks" label="Riesgos inventados" placeholder="Por ejemplo: todos pensarán que fracasé…" rows={3} answer={answer} onChange={onChange} /></Area>
    </div>
    <section className="decision-close">
      <TextArea answerKey="superSelf" label="Viendo sólo los hechos y los riesgos reales, ¿qué haría la persona que quieres ser?" placeholder="La decisión que se parece más a mí…" rows={4} answer={answer} onChange={onChange} />
      <TextArea answerKey="today" label="¿Qué movimiento de menos de cinco minutos puedes hacer hoy?" placeholder="Enviar el mensaje, agendar la conversación…" rows={3} answer={answer} onChange={onChange} />
    </section>
  </div>;
}

