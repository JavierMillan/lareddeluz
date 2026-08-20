import { useEffect, useMemo, useRef, useState } from "react";
import { EXERCISES } from "@/despega/exercises";
import { LETTERS } from "@/despega/letters";
import { EXPERIENCE_BY_CODE, type ExerciseAnswer } from "@/despega/exerciseExperiences";
import { clearAnswer, loadAnswer, saveAnswer } from "@/despega/exerciseStorage";
import ExerciseWorkspace from "@/despega/ExerciseWorkspace";
import "@/despega/despega.css";
import "@/despega/ejercicios.css";

const WORKBOOK = "/assets/despega-workbook.pdf";

type SaveState = "idle" | "saving" | "saved" | "memory";

function codeFromLocation(): string | null {
  const code = new URLSearchParams(window.location.search).get("ejercicio")?.toUpperCase() ?? null;
  return EXERCISES.some((exercise) => exercise.code === code) ? code : null;
}

function setExerciseInUrl(code: string | null) {
  const url = new URL(window.location.href);
  if (code) url.searchParams.set("ejercicio", code);
  else url.searchParams.delete("ejercicio");
  window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
}

function Nav() {
  return <nav className="despega-nav">
    <div>
      <a href="/" className="despega-nav__brand" aria-label="La Red de Luz"><img src="/assets/logo.png" alt="" width="28" height="28" /><span>La Red de Luz</span></a>
      <a href="/despega/" className="despega-nav__map">El método <span aria-hidden="true">↗</span></a>
      <a href={WORKBOOK} download className="despega-nav__cta">Descargar el cuaderno</a>
    </div>
  </nav>;
}

const KIND_COPY = {
  reading: "Lectura directa",
  energy: "Mapa semanal",
  writing: "Escritura íntima",
  capture: "Registro vivo",
  decision: "Decisión visual",
  compose: "Construcción guiada",
} as const;

export default function Ejercicios() {
  const [activeCode, setActiveCode] = useState<string | null>(() => codeFromLocation());
  const [answer, setAnswer] = useState<ExerciseAnswer>({});
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const opener = useRef<HTMLButtonElement | null>(null);
  const byLetter = useMemo(() => LETTERS.map((letter) => ({
    letter,
    items: EXERCISES.filter((item) => item.letter === letter.id),
  })), []);
  const active = EXERCISES.find((item) => item.code === activeCode) ?? null;
  const activeIndex = active ? EXERCISES.findIndex((item) => item.code === active.code) : -1;
  const previous = active ? EXERCISES[(activeIndex - 1 + EXERCISES.length) % EXERCISES.length] : null;
  const next = active ? EXERCISES[(activeIndex + 1) % EXERCISES.length] : null;

  useEffect(() => {
    const onPop = () => setActiveCode(codeFromLocation());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    setAnswer(active ? loadAnswer(active.code) : {});
    setSaveState("idle");
    if (active) window.setTimeout(() => document.querySelector<HTMLElement>(".workbook-head h1")?.focus(), 0);
  }, [active?.code]);

  useEffect(() => {
    if (!active || saveState !== "saving") return;
    const timer = window.setTimeout(() => {
      setSaveState(saveAnswer(active.code, answer).persisted ? "saved" : "memory");
    }, 350);
    return () => window.clearTimeout(timer);
  }, [active, answer, saveState]);

  const openExercise = (code: string, button: HTMLButtonElement) => {
    opener.current = button;
    setExerciseInUrl(code);
    setActiveCode(code);
  };

  const backToIndex = () => {
    setExerciseInUrl(null);
    setActiveCode(null);
    window.setTimeout(() => opener.current?.focus(), 0);
  };

  const navigateExercise = (code: string) => {
    if (active && saveState === "saving") saveAnswer(active.code, answer);
    setExerciseInUrl(code);
    setActiveCode(code);
  };

  const changeAnswer = (next: ExerciseAnswer) => {
    setAnswer(next);
    setSaveState("saving");
  };

  const removeAnswer = () => {
    if (!active || !window.confirm("¿Borrar tus respuestas de este ejercicio en este dispositivo?")) return;
    clearAnswer(active.code);
    setAnswer({});
    setSaveState("idle");
  };

  if (active && previous && next) return <ExerciseWorkspace
    exercise={active}
    answer={answer}
    onChange={changeAnswer}
    onBack={backToIndex}
    previous={previous}
    next={next}
    onNavigate={navigateExercise}
    onClear={removeAnswer}
    saveState={saveState}
  />;

  return <main className="despega ejercicios">
    <Nav />

    <header className="ejercicios-hero">
      <p className="despega-kicker"><b>CUADERNO DE TRABAJO</b><i />DESPEGA 3.0</p>
      <h1>Los 20 ejercicios,<br /><span>cada uno con su propia forma.</span></h1>
      <p className="ejercicios-hero__body">No tienes que hacerlos en orden ni todos de una vez. El que te llame hoy es el que te toca. Tus respuestas se guardan únicamente en este dispositivo.</p>
      <div className="ejercicios-hero__actions">
        <a href={WORKBOOK} download className="despega-start">Descargar el cuaderno completo <span aria-hidden="true">↓</span></a>
        <span>20 ejercicios · 7 coordenadas · un cuaderno personal</span>
      </div>
    </header>

    <section className="ejercicios-index" aria-label="Los 20 ejercicios">
      {byLetter.map(({ letter, items }) => (
        <section key={letter.id} className="ejercicios-group" style={{ "--amb": letter.amb, "--amb-a": letter.ambA } as React.CSSProperties}>
          <header className="ejercicios-group__head">
            <span className="ejercicios-group__glyph" aria-hidden="true">{letter.letter}</span>
            <div><h2>{letter.verb}</h2><p>{letter.sub} · {items.length} {items.length === 1 ? "ejercicio" : "ejercicios"}</p></div>
          </header>
          <ul>
            {items.map((item) => <li key={item.code}>
              <button type="button" onClick={(event) => openExercise(item.code, event.currentTarget)}>
                <span className="ejercicios-card__meta"><b className="ejercicios-card__code">{item.code}</b><i>{KIND_COPY[EXPERIENCE_BY_CODE[item.code].kind]}</i></span>
                <span className="ejercicios-card__title">{item.title}</span>
                <span className="ejercicios-card__needs">{item.needs}</span>
                <span className="ejercicios-card__open">Abrir hoja <i aria-hidden="true">↗</i></span>
              </button>
            </li>)}
          </ul>
        </section>
      ))}
    </section>

    <footer className="ejercicios-foot">
      <p>El cuaderno es de <a href="/despega/">DESPEGA 3.0</a>. Hazlo a tu ritmo y quédatelo.</p>
      <p className="ejercicios-foot__credit">Javier Millán · una constelación de <a href="/">La Red de Luz</a></p>
    </footer>
  </main>;
}
