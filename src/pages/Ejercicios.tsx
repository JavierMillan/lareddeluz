import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EXERCISES, type Exercise } from "@/despega/exercises";
import { LETTERS } from "@/despega/letters";
import { downloadExercisePdf } from "@/despega/exercisePdf";
import "@/despega/despega.css";
import "@/despega/ejercicios.css";

const WORKBOOK = "/assets/despega-workbook.pdf";

function Nav() {
  return <nav className="despega-nav">
    <div>
      <a href="/" className="despega-nav__brand" aria-label="La Red de Luz"><img src="/assets/logo.png" alt="" width="28" height="28" /><span>La Red de Luz</span></a>
      <a href="/despega/" className="despega-nav__map">El método <span aria-hidden="true">↗</span></a>
      <a href={WORKBOOK} download className="despega-nav__cta">Descargar el cuaderno</a>
    </div>
  </nav>;
}

/** La hoja de un ejercicio: lo que el cuaderno trae, mas el espacio para escribirlo. */
function Sheet({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const written = Object.values(answers).some((value) => value.trim());
  const fields = exercise.steps.length
    ? exercise.steps.map((step, index) => ({ key: `${index + 1}. ${step}`, rows: 2 }))
    : [{ key: "Lo que salió", rows: 5 }];

  return (
    <motion.div className="sheet" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }}>
      <header className="sheet__head">
        <p className="sheet__code">{exercise.code} · {String(exercise.num).padStart(2, "0")} / 20</p>
        <h2>{exercise.title}</h2>
        <button type="button" className="sheet__close" onClick={onClose} aria-label="Cerrar el ejercicio">Cerrar</button>
      </header>

      <div className="sheet__brief">
        <div><p className="sheet__label">Para qué sirve</p><p>{exercise.purpose}</p></div>
        <div><p className="sheet__label">Qué necesitas</p><p>{exercise.needs}</p></div>
      </div>

      <div className="sheet__work">
        {fields.map((field) => (
          <label key={field.key} className="sheet__field">
            <span>{field.key}</span>
            <textarea
              rows={field.rows}
              value={answers[field.key] ?? ""}
              onChange={(event) => setAnswers((prev) => ({ ...prev, [field.key]: event.target.value }))}
              placeholder="Escríbelo aquí…"
            />
          </label>
        ))}
      </div>

      {exercise.expect && <p className="sheet__expect"><span className="sheet__label">Qué esperar</span>{exercise.expect}</p>}
      {exercise.signal && <p className="sheet__signal"><span className="sheet__label">Cómo sabes que funcionó</span>{exercise.signal}</p>}

      <div className="sheet__actions">
        <button type="button" onClick={() => downloadExercisePdf(exercise, answers)} disabled={!written}>
          {written ? "Descargar esta hoja en PDF" : "Escribe algo para descargarla"}
        </button>
        <p className="sheet__note">Se queda en tu computadora. Nada se envía ni se guarda aquí.</p>
      </div>
    </motion.div>
  );
}

export default function Ejercicios() {
  const [open, setOpen] = useState<string | null>(null);
  const byLetter = useMemo(() => LETTERS.map((letter) => ({
    letter,
    items: EXERCISES.filter((item) => item.letter === letter.id),
  })), []);
  const active = EXERCISES.find((item) => item.code === open) ?? null;

  // Escape cierra la hoja: es un dialogo modal, no puede atrapar el teclado.
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return <main className="despega ejercicios">
    <Nav />

    <header className="ejercicios-hero">
      <p className="despega-kicker"><b>CUADERNO DE TRABAJO</b><i />DESPEGA 3.0</p>
      <h1>Los 20 ejercicios,<br /><span>con espacio para escribirlos.</span></h1>
      <p className="ejercicios-hero__body">No tienes que hacerlos en orden ni todos de una vez. El que te llame hoy es el que te toca, y si uno se te atora puedes dejarlo y volver después.</p>
      <div className="ejercicios-hero__actions">
        <a href={WORKBOOK} download className="despega-start">Descargar el cuaderno completo <span aria-hidden="true">↓</span></a>
        <span>20 ejercicios · 7 coordenadas · PDF para imprimir</span>
      </div>
    </header>

    <section className="ejercicios-index" aria-label="Los 20 ejercicios">
      {byLetter.map(({ letter, items }) => (
        <section key={letter.id} className="ejercicios-group" style={{ "--amb": letter.amb, "--amb-a": letter.ambA } as React.CSSProperties}>
          <header className="ejercicios-group__head">
            <span className="ejercicios-group__glyph" aria-hidden="true">{letter.letter}</span>
            <div>
              <h2>{letter.verb}</h2>
              <p>{letter.sub} · {items.length} {items.length === 1 ? "ejercicio" : "ejercicios"}</p>
            </div>
          </header>
          <ul>
            {items.map((item) => (
              <li key={item.code}>
                <button type="button" onClick={() => setOpen(open === item.code ? null : item.code)} aria-expanded={open === item.code}>
                  <span className="ejercicios-card__code">{item.code}</span>
                  <span className="ejercicios-card__title">{item.title}</span>
                  <span className="ejercicios-card__needs">{item.needs}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>

    <AnimatePresence>
      {active && (
        <motion.div className="sheet__scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
          <div onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${active.code} · ${active.title}`}>
            <Sheet exercise={active} onClose={() => setOpen(null)} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <footer className="ejercicios-foot">
      <p>El cuaderno es de <a href="/despega/">DESPEGA 3.0</a>. Imprímelo, escríbelo a mano y quédatelo.</p>
      <p className="ejercicios-foot__credit">Javier Millán · una constelación de <a href="/">La Red de Luz</a></p>
    </footer>
  </main>;
}
