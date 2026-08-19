import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Letter } from "./letters";

/**
 * Una letra clavada a pantalla completa.
 *
 * Estructura: un wrapper alto (250vh) que da el recorrido de scroll,
 * y dentro un hijo `sticky` de 100vh que se queda fijo mientras el
 * wrapper pasa. El resultado: no puedes saltarte la letra, y su
 * animación avanza contigo mientras está clavada.
 *
 * Es la técnica de pin + scrub de ScrollTrigger, hecha con Motion:
 *  - pin    → position: sticky sobre un wrapper alto
 *  - scrub  → useScroll del wrapper alimentando cada useTransform
 */

type Props = {
  letter: Letter;
  /** Alto del recorrido, en pantallas. Cambia el ritmo de cada letra. */
  screens?: number;
  /** La mecánica recibe el progreso (0→1) del tramo clavado */
  children?: (progress: MotionValue<number>) => ReactNode;
};

export function PinnedLetter({ letter, screens = 2.5, children }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const { id, letter: glyph, coord, sub, title, accent, body, ask, exercises, amb, ambA } = letter;

  /* El contenido entra al empezar el tramo y sale al final: dos
     letras consecutivas se cruzan en vez de cortarse. */
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [40, 0, 0, -40]);

  /* El clima respira: sube de intensidad a la mitad del tramo */
  const ambient = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [ambA * 0.5, ambA * 1.6, ambA * 0.5]
  );
  const bg = useTransform(
    ambient,
    (a) => `radial-gradient(120% 85% at 50% 0%, rgba(${amb}, ${a}) 0%, transparent 62%)`
  );

  /* La letra de agua deriva y crece mientras la atraviesas */
  const glyphY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const glyphOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.16, 0.05]);

  return (
    <div
      ref={wrapRef}
      id={id}
      style={{ height: `${screens * 100}svh`, "--amb": amb } as React.CSSProperties}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Clima de la letra */}
        <motion.div aria-hidden className="absolute inset-0" style={{ background: bg }} />

        {/* Marca de agua */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute select-none font-display leading-[0.8]"
          style={{
            fontSize: "clamp(6rem,18vw,15rem)",
            color: `rgb(${amb})`,
            opacity: glyphOpacity,
            y: glyphY,
            top: "clamp(1rem,5vh,4rem)",
            right: "clamp(1rem,5vw,5rem)",
          }}
        >
          {glyph}
        </motion.span>

        {/* Contenido, centrado en la pantalla clavada */}
        <motion.div
          style={{ opacity, y }}
          className="relative flex h-full items-center px-6 lg:px-[clamp(6rem,9vw,9rem)]"
        >
          <div className="mx-auto w-full max-w-[54rem]">
            <p className="flex items-center gap-4 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-white/35">
              <b className="font-medium" style={{ color: `rgb(${amb})` }}>
                {coord}
              </b>
              <i
                className="h-px not-italic"
                style={{
                  flex: "0 1 68px",
                  background: `linear-gradient(90deg,rgb(${amb}),transparent)`,
                }}
              />
              <span>{sub}</span>
            </p>

            <h2 className="my-7 font-display text-[clamp(2rem,5.2vw,3.6rem)] leading-[1.05] tracking-[-0.015em] text-balance">
              {title}
              <br />
              <span className="text-copper-light">{accent}</span>
            </h2>

            <p className="mb-8 max-w-[56ch] text-[clamp(1rem,1.4vw,1.14rem)] font-light leading-[1.75] text-white/70">
              {body}
            </p>

            {/* La mecánica de esta letra, alimentada por su progreso */}
            {children?.(scrollYProgress)}

            <p
              className="max-w-[44ch] border-l pl-6 font-display text-[clamp(1.1rem,2vw,1.42rem)] italic leading-[1.45] text-white/[0.86]"
              style={{ borderColor: `rgb(${amb})` }}
            >
              {ask}
            </p>

            <p className="mt-7">
              <span className="inline-flex items-center gap-2 border-b border-[rgba(212,130,63,.1)] pb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35">
                <span className="h-1 w-1 rounded-full" style={{ background: `rgb(${amb})` }} />
                {exercises} ejercicios en el libro
              </span>
            </p>
          </div>
        </motion.div>

        {/* Progreso dentro de la letra: se llena mientras la atraviesas */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 h-px origin-left"
          style={{
            width: "100%",
            background: `linear-gradient(90deg, rgb(${amb}), transparent)`,
            scaleX: scrollYProgress,
          }}
        />
      </div>
    </div>
  );
}
