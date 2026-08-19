import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SCARS, SUPER_YOU, WEIGH } from "./letters";

/**
 * Los siete instrumentos.
 *
 * Regla del conjunto: la escena hace algo antes de pedir nada. Ninguno
 * arranca con un boton, ninguno termina en gris. Estos capitulos hablan de
 * cosas que no se cierran — el instrumento no puede entregar un comprobante
 * de tarea cumplida.
 *
 * Donde queda accion, el verbo va en primera persona: el lector habla, la
 * interfaz no manda.
 */

/* D — DESCUBRE · la aguja va sola; sostenerla es el unico gesto.
   El capitulo dice que soltaste el timon, asi que el instrumento no puede
   ser un control de precision: es una deriva que solo se aquieta mientras
   la sostienes, y vuelve a irse cuando la sueltas. */
export function Compass() {
  const reduce = useReducedMotion();
  const [held, setHeld] = useState(false);
  const [bearing, setBearing] = useState(-12);
  const heldRef = useRef(false);
  useEffect(() => { heldRef.current = held; }, [held]);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      if (!heldRef.current) {
        const t = (now - start) / 1000;
        // dos senos de periodos inconmensurables: nunca repite el mismo giro
        setBearing(Math.sin(t / 3.7) * 34 + Math.sin(t / 1.31) * 13);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  const hold = (value: boolean) => () => setHeld(value);
  return <div className="instrument compass" data-held={held}>
    <div
      className="compass__dial"
      style={{ "--bearing": `${bearing}deg` } as CSSProperties}
      role="button"
      tabIndex={0}
      aria-pressed={held}
      aria-label={held ? "Sosteniendo el rumbo" : "Sostén para aquietar la aguja"}
      onPointerDown={hold(true)}
      onPointerUp={hold(false)}
      onPointerLeave={hold(false)}
      onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); setHeld(true); } }}
      onKeyUp={(e) => { if (e.key === " " || e.key === "Enter") setHeld(false); }}
      onBlur={hold(false)}
    >
      <span aria-hidden="true" className="compass__needle" />
      <span className="compass__north">N</span>
    </div>
    <p>{held ? "Se queda quieta mientras la sostienes." : "No se está quieta sola."}</p>
  </div>;
}

/* E — ENVÍA CALMA · respira desde que llegas.
   Sin boton de arranque: pedirle al lector que presione algo para
   recibir calma es justo la contradiccion que el capitulo denuncia. */
const BREATH_STEPS = ["Inhala", "Sostén", "Exhala"];
export function Breath() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % 3), 2400);
    return () => window.clearInterval(timer);
  }, [reduce]);
  return <div className="instrument breath">
    <div className="breath__orb" aria-hidden="true"><span /></div>
    {/* aria-hidden: la palabra cambia cada 2.4s. Anunciarla en un live region
        seria interrumpir cada 2.4s justo lo que el capitulo intenta bajar. */}
    <p className="breath__cue" aria-hidden="true">{reduce ? "Inhala · Sostén · Exhala" : BREATH_STEPS[step]}</p>
    <p className="breath__note">Ya está pasando. Tu cuerpo también participa.</p>
  </div>;
}

/* S — SELECCIONA · un item a la vez, sin etiqueta.
   El capitulo dice que lo dificil es que estas cosas llegan SIN etiqueta.
   Imprimir la respuesta al lado convertia el ejercicio en un examen resuelto. */
export function Weigh() {
  const [index, setIndex] = useState(0);
  const [kept, setKept] = useState(0);
  const item = WEIGH[index];
  const done = index >= WEIGH.length;
  const decide = (keep: boolean) => {
    setKept((value) => value + (keep ? 1 : 0));
    setIndex((value) => value + 1);
  };
  return <div className="instrument weigh" data-testid="despega-scale">
    {done ? (
      <div className="weigh__closing">
        <p className="weigh__tally">Te quedaste con {kept} de {WEIGH.length}.</p>
        <p className="weigh__ask">Lo que soltaste aquí, ¿lo sueltas igual de fácil afuera?</p>
      </div>
    ) : (
      <>
        <p className="weigh__count" aria-hidden="true">{index + 1} / {WEIGH.length}</p>
        <motion.p key={item.text} className="weigh__item" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }}>{item.text}</motion.p>
        <div className="weigh__sides" role="group" aria-label={`Pesa: ${item.text}`}>
          <button type="button" onClick={() => decide(false)}>Drena</button>
          <button type="button" onClick={() => decide(true)}>Cuesta y vale</button>
        </div>
      </>
    )}
  </div>;
}

/* P — PLANIFICA · el lector escribe; las lineas de Javi son evidencia, no guion.
   El capitulo dice "aqui escribes a tu super tu". Revelar las lineas del autor
   bajo un boton que decia "Escribir" le quitaba la pluma al heroe de la historia. */
export function SuperYou() {
  const [text, setText] = useState("");
  return <div className="instrument super-you">
    <label className="super-you__field">
      <span className="super-you__lead">Soy</span>
      <input
        type="text"
        name="super-you"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="el que…"
        aria-label="Escribe tu súper tú, en presente"
        autoComplete="off"
      />
    </label>
    <p className="super-you__hint">{text.trim() ? "Eso. En presente, como si ya fuera." : "En presente. Tu subconsciente lee el futuro como que todavía no."}</p>
    <div className="super-you__evidence">
      <p className="super-you__label">así lo escribió él</p>
      <ul>{SUPER_YOU.map((line) => <li key={line}>{line}</li>)}</ul>
    </div>
  </div>;
}

/* Ej — EJECUTA · la onda no se apaga: se desacelera y sigue.
   Mandarlo no resuelve nada — nadie ha contestado todavia. */
export function Tremble() {
  const [sent, setSent] = useState(false);
  return <div className="instrument tremble" data-sent={sent}>
    <div className="tremble__wave" aria-hidden="true">{[1, 2, 3, 4, 5, 6, 7].map((bar) => <i key={bar} />)}</div>
    <p role="status">{sent ? "Nadie contestó todavía. Y aun así ya está afuera." : "00:07 · sigue sin mandarse"}</p>
    {!sent && <button type="button" onClick={() => setSent(true)}>Lo mando</button>}
  </div>;
}

/* G — GUARDA · la herida y el sueño se conectan solos.
   Era un radio group de dos opciones sin estado accesible; ahora el vinculo
   se traza y el lector solo cambia de par. */
export function Scars() {
  const [active, setActive] = useState(0);
  const pair = SCARS[active];
  return <div className="instrument scars">
    <motion.div key={pair.wound} className="scars__pair" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}>
      <p className="scars__side"><small>lo que dolió</small>{pair.wound}</p>
      <span className="scars__link" aria-hidden="true"><i /></span>
      <p className="scars__side"><small>lo que nació de ahí</small>{pair.dream}</p>
    </motion.div>
    <div className="scars__switch" role="group" aria-label="Cambiar de par">
      {SCARS.map((item, index) => (
        <button
          key={item.wound}
          type="button"
          aria-current={index === active ? "true" : undefined}
          aria-label={`Par ${index + 1} de ${SCARS.length}`}
          onClick={() => setActive(index)}
        >
          <i aria-hidden="true" />
        </button>
      ))}
    </div>
  </div>;
}

/* A — AJUSTA · cruzas, y el jalon sigue ahi.
   El texto dice que el jalon no se quita antes de saltar: se quita despues,
   y solo si saltas. Un boton gris de "ya cruzaste" contradecia el capitulo. */
export function Edge() {
  const reduce = useReducedMotion();
  const [crossed, setCrossed] = useState(false);
  return <div className="instrument threshold" data-crossed={crossed} data-testid="despega-threshold">
    <div className="threshold__line" aria-hidden="true">
      <motion.i
        animate={crossed ? { left: ["0%", "calc(100% - 18px)", "calc(93% - 18px)", "calc(100% - 18px)"] } : { left: "0%" }}
        transition={crossed && !reduce
          ? { duration: 3.6, times: [0, .3, .62, 1], ease: [.22, 1, .36, 1], repeat: Infinity, repeatType: "reverse", repeatDelay: .5 }
          : { duration: reduce ? 0 : .7, ease: [.22, 1, .36, 1] }}
      />
    </div>
    <p role="status">{crossed ? "Cruzaste. El jalón sigue ahí." : "La certeza no viene antes."}</p>
    {!crossed && <button type="button" onClick={() => setCrossed(true)}>Salto</button>}
  </div>;
}
