import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { SCARS, SUPER_YOU, WEIGH } from "./letters";

export function Compass() {
  const [bearing, setBearing] = useState(38);
  return <div className="instrument compass">
    <div className="compass__dial" style={{ "--bearing": `${bearing}deg` } as CSSProperties}><span aria-hidden="true" className="compass__needle" /><span className="compass__north">N</span></div>
    <label htmlFor="despega-bearing">¿Hacia dónde sí?</label>
    <input id="despega-bearing" name="bearing" aria-label="Ajustar rumbo" type="range" min="-70" max="70" value={bearing} onChange={(event) => setBearing(Number(event.target.value))} />
  </div>;
}

const BREATH_STEPS = ["Inhala", "Sostén", "Exhala"];
export function Breath() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setStep((value) => (value + 1) % 3), 2400);
    return () => window.clearInterval(timer);
  }, [active]);
  return <div className="instrument breath" data-active={active}>
    <div className="breath__orb" aria-hidden="true"><span /></div>
    <p role="status">{active ? BREATH_STEPS[step] : "Tu cuerpo también participa."}</p>
    <button type="button" onClick={() => { setStep(0); setActive((value) => !value); }}>{active ? "Pausar respiración" : "Comenzar una respiración"}</button>
  </div>;
}

export function Weigh() {
  const [tilt, setTilt] = useState<"neutral" | "drains" | "worth">("neutral");
  return <div className="instrument scale" data-tilt={tilt} data-testid="despega-scale">
    <div className="scale__choices" role="group" aria-label="Pesa lo que sostienes"><button type="button" onClick={() => setTilt("drains")}>Lo que drena</button><button type="button" onClick={() => setTilt("worth")}>Lo que cuesta y vale</button></div>
    <ul className="weigh-list">{WEIGH.map((item) => <li key={item.text} data-kind={item.kind}><button type="button" onClick={() => setTilt(item.kind === "drena" ? "drains" : "worth")}>{item.text}</button><small>{item.kind === "drena" ? "drena" : "cuesta y vale"}</small></li>)}</ul>
  </div>;
}

export function SuperYou() {
  const [revealed, setRevealed] = useState(0);
  return <div className="instrument super-you"><ol>{SUPER_YOU.map((line, index) => <li key={line} data-visible={index < revealed}>{line}</li>)}</ol><button type="button" onClick={() => setRevealed((value) => Math.min(SUPER_YOU.length, value + 1))} disabled={revealed === SUPER_YOU.length}>{revealed === SUPER_YOU.length ? "Ruta trazada" : "Escribir en presente"}</button></div>;
}

export function Tremble() {
  const [sent, setSent] = useState(false);
  return <div className="instrument tremble" data-sent={sent}><div className="tremble__wave" aria-hidden="true">{[1, 2, 3, 4, 5, 6, 7].map((bar) => <i key={bar} />)}</div><p role="status">{sent ? "Mandado. No pasó nada." : "00:07 · listo para enviar"}</p><button type="button" onClick={() => setSent(true)} disabled={sent}>{sent ? "Ya lo mandaste" : "Mandar el audio"}</button></div>;
}

export function Scars() {
  const [active, setActive] = useState(0);
  return <div className="instrument scars">{SCARS.map((pair, index) => <button type="button" key={pair.wound} data-active={index === active} onClick={() => setActive(index)}><span><small>lo que dolió</small>{pair.wound}</span><i aria-hidden="true" /><span><small>lo que nació</small>{pair.dream}</span></button>)}</div>;
}

export function Edge() {
  const [crossed, setCrossed] = useState(false);
  return <div className="instrument threshold" data-crossed={crossed} data-testid="despega-threshold"><div className="threshold__line" aria-hidden="true"><motion.i animate={{ left: crossed ? "calc(100% - 18px)" : "0%" }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }} /></div><p role="status">{crossed ? "Tu cuerpo aprende después de moverte." : "La certeza no viene antes."}</p><button type="button" onClick={() => setCrossed(true)} disabled={crossed}>{crossed ? "Ya cruzaste" : "Cruzar el umbral"}</button></div>;
}
