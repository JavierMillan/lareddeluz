import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import { WEIGH, SCARS, SUPER_YOU } from "./letters";

/* ───────────────────────────────────────────────
   Las mecánicas: cada letra tiene un estado que
   avanza con tu scroll, no que se dispara una vez.
   ─────────────────────────────────────────────── */

/** E · la respiración. Inhala corto, exhala largo — como debe ser. */
export function Breath() {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
      style={{
        width: "min(58vw, 30rem)",
        aspectRatio: "1",
        borderColor: "rgba(62,96,168,.32)",
      }}
      animate={{ scale: [0.86, 1, 0.86], opacity: [0.4, 0.85, 0.4] }}
      transition={{ duration: 11, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
    />
  );
}

/** S · el peso. Lo que drena se hunde conforme avanzas; lo que vale se sostiene. */
export function Weigh() {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  return (
    <ul ref={ref} className="mb-9 grid gap-2">
      {WEIGH.map((item, i) => (
        <WeighRow key={i} item={item} progress={scrollYProgress} />
      ))}
    </ul>
  );
}

function WeighRow({
  item,
  progress,
}: {
  item: (typeof WEIGH)[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const drains = item.kind === "drena";
  const y = useTransform(progress, [0, 1], [0, drains ? 26 : -4]);
  const opacity = useTransform(progress, [0, 1], [1, drains ? 0.32 : 1]);

  return (
    <motion.li
      style={{ y, opacity }}
      className="flex flex-wrap items-center gap-3 rounded-[10px] border px-5 py-4 text-[0.95rem]"
      // El borde delata la naturaleza de cada cosa antes de leer la etiqueta
      data-kind={item.kind}
    >
      <span className="text-white/70">{item.text}</span>
      <b className="ml-auto font-mono text-[0.56rem] font-normal uppercase tracking-[0.14em] text-white/35">
        {drains ? "drena" : "cuesta y vale"}
      </b>
    </motion.li>
  );
}

/** P · el súper tú. Se escribe en presente, al ritmo de tu scroll. */
export function SuperYou() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(SUPER_YOU.length);
      return;
    }
    let i = 0;
    const tick = () => {
      i += 1;
      setShown(i);
      if (i < SUPER_YOU.length) timer = window.setTimeout(tick, 1100);
    };
    let timer = window.setTimeout(tick, 350);
    return () => window.clearTimeout(timer);
  }, [inView]);

  return (
    <div ref={ref} className="mb-9 min-h-[7.5em] font-display text-[clamp(1.3rem,2.8vw,1.95rem)] leading-[1.5]">
      {SUPER_YOU.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={i < shown ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-copper-light"
        >
          {line}
        </motion.p>
      ))}
    </div>
  );
}

/** EJ · el temblor. La mano antes de mandar el audio. */
export function Tremble() {
  const [sent, setSent] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setSent(true)}
      disabled={sent}
      className="mb-9 inline-flex items-center gap-3 rounded-full border px-8 py-4 text-[0.95rem] transition-colors"
      style={{
        borderColor: sent ? "rgb(214,120,58)" : "rgba(212,130,63,.2)",
        background: sent ? "rgba(214,120,58,.1)" : "transparent",
        color: sent ? "#e6a668" : "rgba(255,255,255,.72)",
        cursor: sent ? "default" : "pointer",
      }}
      whileHover={
        sent
          ? {}
          : { x: [0, 0.7, -0.6, 0.5, 0], y: [0, -0.5, 0.6, 0.4, 0], transition: { duration: 0.16, repeat: Infinity } }
      }
    >
      {sent ? "Mandado. No pasó nada." : "Mandar el audio"}
    </motion.button>
  );
}

/** G · la cicatriz. Cada herida se conecta con el sueño que nació de ella. */
export function Scars() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  return (
    <div ref={ref} className="mb-9 grid gap-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <div>
        <p className="mb-3 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/35">
          lo que dolió
        </p>
        <ul className="grid gap-3">
          {SCARS.map((s, i) => (
            <ScarItem key={i} text={s.wound} show={inView} delay={i * 0.25} />
          ))}
        </ul>
      </div>

      {/* La línea que las une, trazándose */}
      <motion.span
        aria-hidden
        className="hidden h-px origin-left bg-[rgb(178,100,52)] md:block"
        style={{ width: "clamp(28px, 6vw, 72px)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />

      <div>
        <p className="mb-3 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/35">
          lo que quieres
        </p>
        <ul className="grid gap-3">
          {SCARS.map((s, i) => (
            <ScarItem key={i} text={s.dream} show={inView} delay={0.4 + i * 0.25} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ScarItem({ text, show, delay }: { text: string; show: boolean; delay: number }) {
  return (
    <motion.li
      className="rounded-[9px] border px-4 py-3 text-[0.92rem]"
      initial={{ borderColor: "rgba(212,130,63,.09)", color: "rgba(255,255,255,.5)" }}
      animate={show ? { borderColor: "rgba(212,130,63,.2)", color: "rgba(255,255,255,.72)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.li>
  );
}

/** A · el risco. Ya decidiste; el cuerpo todavía no. */
export function Edge() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.4"],
  });

  // El punto vibra al borde y sólo se suelta al final del tramo
  const left = useTransform(scrollYProgress, [0, 0.75, 1], ["12%", "16%", "86%"]);
  const bottom = useTransform(scrollYProgress, [0, 0.75, 1], ["-4px", "-4px", "5rem"]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative mb-9 h-28 border-b"
      style={{ borderColor: "rgba(212,130,63,.2)" }}
    >
      <motion.span
        className="absolute h-2 w-2 rounded-full bg-copper-light"
        style={{ left, bottom, boxShadow: "0 0 14px rgba(212,130,63,.45)" }}
        animate={{ x: [0, 1.5, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
      />
    </div>
  );
}
