import { useState } from "react";
import { motion, useTransform, useMotionValueEvent, type MotionValue } from "motion/react";
import { WEIGH, SCARS, SUPER_YOU } from "./letters";

/* ───────────────────────────────────────────────
   Las mecánicas.

   Todas reciben el progreso (0→1) del tramo clavado de su letra:
   la emoción avanza mientras atraviesas la sección, no se dispara
   una vez y muere.
   ─────────────────────────────────────────────── */

type P = { progress: MotionValue<number> };

/** E · la respiración. Inhala corto, exhala largo. */
export function Breath({ progress }: P) {
  // El círculo crece con tu avance, además de respirar por su cuenta
  const scale = useTransform(progress, [0, 1], [0.8, 1.15]);
  const opacity = useTransform(progress, [0, 0.5, 1], [0.15, 0.5, 0.15]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border"
      style={{
        width: "min(56vw, 30rem)",
        aspectRatio: "1",
        borderColor: "rgba(62,96,168,.4)",
        x: "-50%",
        y: "-50%",
        scale,
        opacity,
      }}
    >
      <motion.div
        className="h-full w-full rounded-full border"
        style={{ borderColor: "rgba(62,96,168,.25)" }}
        animate={{ scale: [0.88, 1, 0.88] }}
        transition={{ duration: 11, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      />
    </motion.div>
  );
}

/** S · el peso. Lo que drena se hunde mientras avanzas; lo que vale se sostiene. */
export function Weigh({ progress }: P) {
  return (
    <ul className="mb-8 grid gap-2">
      {WEIGH.map((item, i) => (
        <WeighRow key={i} item={item} progress={progress} index={i} />
      ))}
    </ul>
  );
}

function WeighRow({
  item,
  progress,
  index,
}: {
  item: (typeof WEIGH)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const drains = item.kind === "drena";
  // Cada fila reacciona con un desfase: el peso cae en cascada
  const from = 0.15 + index * 0.06;
  const to = from + 0.35;

  const y = useTransform(progress, [from, to], [0, drains ? 30 : -5]);
  const opacity = useTransform(progress, [from, to], [1, drains ? 0.28 : 1]);
  const borderColor = useTransform(
    progress,
    [from, to],
    ["rgba(212,130,63,.14)", drains ? "rgba(212,130,63,.04)" : "rgba(196,108,44,.55)"]
  );

  return (
    <motion.li
      style={{ y, opacity, borderColor }}
      className="flex flex-wrap items-center gap-3 rounded-[10px] border px-5 py-3.5 text-[0.93rem]"
    >
      <span className="text-white/70">{item.text}</span>
      <b className="ml-auto font-mono text-[0.55rem] font-normal uppercase tracking-[0.14em] text-white/35">
        {drains ? "drena" : "cuesta y vale"}
      </b>
    </motion.li>
  );
}

/** P · el súper tú. Se escribe en presente, al ritmo de tu scroll. */
export function SuperYou({ progress }: P) {
  return (
    <div className="mb-8 min-h-[7em] font-display text-[clamp(1.25rem,2.6vw,1.85rem)] leading-[1.5]">
      {SUPER_YOU.map((line, i) => (
        <SuperLine key={i} line={line} progress={progress} index={i} />
      ))}
    </div>
  );
}

function SuperLine({
  line,
  progress,
  index,
}: {
  line: string;
  progress: MotionValue<number>;
  index: number;
}) {
  // Una línea por tercio del tramo: tú la escribes al avanzar
  const from = 0.18 + index * 0.2;
  const opacity = useTransform(progress, [from, from + 0.12], [0, 1]);
  const y = useTransform(progress, [from, from + 0.12], [14, 0]);
  const blur = useTransform(progress, [from, from + 0.12], ["blur(6px)", "blur(0px)"]);

  return (
    <motion.p style={{ opacity, y, filter: blur }} className="text-copper-light">
      {line}
    </motion.p>
  );
}

/** EJ · el temblor. La tensión sube conforme te acercas al final del tramo. */
export function Tremble({ progress }: P) {
  // Cuanto más avanzas, más tiembla — hasta que se suelta
  const shake = useTransform(progress, [0.2, 0.7, 0.85], [0, 1.6, 0]);
  const borderColor = useTransform(
    progress,
    [0.2, 0.85],
    ["rgba(212,130,63,.2)", "rgb(214,120,58)"]
  );
  const bg = useTransform(
    progress,
    [0.75, 0.85],
    ["rgba(214,120,58,0)", "rgba(214,120,58,.12)"]
  );
  // El texto es estado real: un MotionValue de string no se puede renderizar
  const [sent, setSent] = useState(false);
  useMotionValueEvent(progress, "change", (p) => setSent(p > 0.85));

  return (
    <motion.div
      style={{ borderColor, background: bg, x: useTremor(shake) }}
      className="mb-8 inline-flex items-center gap-3 rounded-full border px-8 py-3.5 text-[0.93rem] text-white/75"
    >
      <span>{sent ? "Mandado. No pasó nada." : "Mandar el audio"}</span>
    </motion.div>
  );
}

/** Convierte una intensidad en un temblor continuo */
function useTremor(intensity: MotionValue<number>) {
  return useTransform(intensity, (i) =>
    i === 0 ? 0 : Math.sin(Date.now() / 40) * i
  );
}

/** G · la cicatriz. Cada herida se conecta con su sueño, una por una. */
export function Scars({ progress }: P) {
  return (
    <div className="mb-8 grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <div>
        <p className="mb-3 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/35">
          lo que dolió
        </p>
        <ul className="grid gap-2.5">
          {SCARS.map((s, i) => (
            <ScarItem key={i} text={s.wound} progress={progress} from={0.2 + i * 0.15} />
          ))}
        </ul>
      </div>

      <Link progress={progress} />

      <div>
        <p className="mb-3 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/35">
          lo que quieres
        </p>
        <ul className="grid gap-2.5">
          {SCARS.map((s, i) => (
            <ScarItem key={i} text={s.dream} progress={progress} from={0.3 + i * 0.15} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function Link({ progress }: P) {
  const scaleX = useTransform(progress, [0.25, 0.65], [0, 1]);
  return (
    <motion.span
      aria-hidden
      className="hidden h-px origin-left bg-[rgb(178,100,52)] md:block"
      style={{ width: "clamp(28px,6vw,72px)", scaleX }}
    />
  );
}

function ScarItem({
  text,
  progress,
  from,
}: {
  text: string;
  progress: MotionValue<number>;
  from: number;
}) {
  const color = useTransform(progress, [from, from + 0.2], ["rgba(255,255,255,.42)", "rgba(255,255,255,.75)"]);
  const borderColor = useTransform(
    progress,
    [from, from + 0.2],
    ["rgba(212,130,63,.08)", "rgba(212,130,63,.28)"]
  );

  return (
    <motion.li
      style={{ color, borderColor }}
      className="rounded-[9px] border px-4 py-2.5 text-[0.9rem]"
    >
      {text}
    </motion.li>
  );
}

/** A · el risco. Ya decidiste; el cuerpo se suelta al final del tramo. */
export function Edge({ progress }: P) {
  const left = useTransform(progress, [0, 0.7, 0.95], ["12%", "17%", "86%"]);
  const bottom = useTransform(progress, [0, 0.7, 0.95], ["-4px", "-4px", "5.5rem"]);
  const shake = useTransform(progress, [0, 0.65, 0.72], [0.6, 2.2, 0]);

  return (
    <div
      aria-hidden
      className="relative mb-8 h-24 border-b"
      style={{ borderColor: "rgba(212,130,63,.22)" }}
    >
      <motion.span
        className="absolute h-2 w-2 rounded-full bg-copper-light"
        style={{
          left,
          bottom,
          x: useTremor(shake),
          boxShadow: "0 0 14px rgba(212,130,63,.5)",
        }}
      />
    </div>
  );
}
