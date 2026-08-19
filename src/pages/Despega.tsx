import { motion } from "motion/react";
import { Particles } from "@/components/ui/particles";
import { LETTERS, type Letter } from "@/despega/letters";
import { Breath, Weigh, SuperYou, Tremble, Scars, Edge } from "@/despega/Mechanics";

const WA = "https://wa.me/526221424577?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20DESPEGA";

/* Una sola coreografía de entrada para todo lo que sube */
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function Coord({ mark, sub, center }: { mark: string; sub: string; center?: boolean }) {
  return (
    <p
      className={`flex items-center gap-4 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-white/35 ${
        center ? "justify-center" : ""
      }`}
    >
      <b className="font-medium text-[rgb(var(--amb))]">{mark}</b>
      <i
        className="h-px not-italic"
        style={{
          flex: center ? "0 1 52px" : "0 1 68px",
          background: center
            ? "linear-gradient(90deg,transparent,rgb(var(--amb)),transparent)"
            : "linear-gradient(90deg,rgb(var(--amb)),transparent)",
        }}
      />
      <span>{sub}</span>
    </p>
  );
}

function LetterSection({ letter }: { letter: Letter }) {
  const { id, letter: glyph, coord, sub, title, accent, body, ask, exercises, amb, ambA } = letter;

  return (
    <section
      id={id}
      className="relative px-6 py-[clamp(7rem,17vh,12rem)] lg:px-[clamp(6rem,9vw,9rem)]"
      style={
        {
          "--amb": amb,
          background: `radial-gradient(120% 80% at 50% 0%, rgba(${amb}, ${ambA}) 0%, transparent 62%)`,
        } as React.CSSProperties
      }
    >
      {/* La letra gigante, marca de agua del momento */}
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-display leading-[0.8]"
        style={{
          fontSize: "clamp(5rem,15vw,12rem)",
          color: `rgb(${amb})`,
          opacity: 0.14,
          top: "clamp(2rem,6vh,5rem)",
          right: "clamp(1rem,5vw,5rem)",
        }}
      >
        {glyph}
      </span>

      {id === "e" && <Breath />}

      <div className="relative mx-auto w-full max-w-[54rem]">
        <motion.div variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <Coord mark={coord} sub={sub} />
        </motion.div>

        <motion.h2
          variants={rise}
          custom={0.12}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="my-7 font-display text-[clamp(2rem,5.2vw,3.6rem)] leading-[1.05] tracking-[-0.015em] text-balance"
        >
          {title}
          <br />
          <span className="text-copper-light">{accent}</span>
        </motion.h2>

        <motion.p
          variants={rise}
          custom={0.2}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-9 max-w-[58ch] text-[clamp(1.02rem,1.5vw,1.18rem)] font-light leading-[1.75] text-white/70"
        >
          {body}
        </motion.p>

        {/* La mecánica propia de cada letra */}
        {id === "s" && <Weigh />}
        {id === "p" && <SuperYou />}
        {id === "ej" && <Tremble />}
        {id === "g" && <Scars />}
        {id === "a" && <Edge />}

        <motion.p
          variants={rise}
          custom={0.3}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-[44ch] border-l pl-6 font-display text-[clamp(1.15rem,2.1vw,1.5rem)] italic leading-[1.45] text-white/[0.86]"
          style={{ borderColor: `rgb(${amb})` }}
        >
          {ask}
        </motion.p>

        <motion.p
          variants={rise}
          custom={0.38}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-9"
        >
          <span className="inline-flex items-center gap-2 border-b border-[rgba(212,130,63,.09)] pb-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/35">
            <span className="h-1 w-1 rounded-full" style={{ background: `rgb(${amb})` }} />
            {exercises} ejercicios en el libro
          </span>
        </motion.p>
      </div>
    </section>
  );
}

export default function Despega() {
  return (
    <main className="relative">
      {/* Atmósfera cobre, discreta */}
      <Particles
        className="pointer-events-none fixed inset-0 z-0"
        quantity={55}
        color="#d4823f"
        size={0.5}
        staticity={70}
      />

      {/* ══════ Hero ══════ */}
      <header className="relative grid min-h-svh place-items-center px-6 py-28 text-center">
        <div className="w-full max-w-[54rem]">
          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            style={{ "--amb": "212,130,63" } as React.CSSProperties}
          >
            <Coord mark="MAPEA" sub="tu punto de partida" center />
          </motion.div>

          <motion.h1
            variants={rise}
            custom={0.1}
            initial="hidden"
            animate="show"
            className="my-7 font-display text-[clamp(2.8rem,8.5vw,6.2rem)] leading-[1.04] tracking-[-0.015em] text-balance"
          >
            Suelta la vida
            <br />
            <span className="text-copper-light">que no es tuya.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            custom={0.2}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-[58ch] text-[clamp(1.02rem,1.5vw,1.18rem)] font-light leading-[1.75] text-white/70"
          >
            Un método ágil para dejar de sostener lo que ya no te corresponde y construir,
            por pasos, la versión de ti que sí elegiste.
          </motion.p>

          {/* Las siete letras: lo que vas a atravesar */}
          <motion.nav
            variants={rise}
            custom={0.32}
            initial="hidden"
            animate="show"
            aria-label="Los siete pasos"
            className="mt-14 flex justify-center gap-[clamp(0.8rem,2.6vw,1.8rem)]"
          >
            {LETTERS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                title={`${l.verb} ${l.sub}`}
                className="group relative pb-2.5 font-display text-[clamp(1.1rem,2.2vw,1.6rem)] text-white/35 transition-colors duration-500 hover:text-copper-light"
              >
                {l.letter}
                <span className="absolute bottom-0 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-current opacity-50 transition-transform duration-500 group-hover:scale-[2.4] group-hover:opacity-100" />
              </a>
            ))}
          </motion.nav>
        </div>

        <span
          aria-hidden
          className="absolute bottom-0 left-1/2 w-px"
          style={{
            height: "clamp(3rem,8vh,5rem)",
            background: "linear-gradient(180deg,transparent,#d4823f)",
            opacity: 0.65,
          }}
        />
      </header>

      {/* ══════ Las siete letras ══════ */}
      {LETTERS.map((l) => (
        <LetterSection key={l.id} letter={l} />
      ))}

      {/* ══════ Umbral ══════ */}
      <section
        className="relative px-6 py-[clamp(7rem,17vh,12rem)] text-center lg:px-[clamp(6rem,9vw,9rem)]"
        style={{ "--amb": "212,130,63" } as React.CSSProperties}
      >
        <div className="mx-auto w-full max-w-[44rem]">
          <motion.div variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Coord mark="ESTO NO SE ACABA AQUÍ" sub="tu umbral" center />
          </motion.div>

          <motion.h2
            variants={rise}
            custom={0.12}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="my-8 font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] text-balance"
          >
            Nada de esto lo hice solo.
            <br />
            <span className="text-copper-light">Tú tampoco tienes que hacerlo así.</span>
          </motion.h2>

          <motion.p
            variants={rise}
            custom={0.2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto mb-10 max-w-[58ch] text-[clamp(1.02rem,1.5vw,1.18rem)] font-light leading-[1.75] text-white/70"
          >
            Si llegaste hasta aquí leyendo, ya sabes que no fue por curiosidad. Fue porque algo
            de esto te encontró a ti primero.
          </motion.p>

          <motion.a
            variants={rise}
            custom={0.28}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            href={WA}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-copper px-8 py-4 font-medium text-[#17100a] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-copper-light"
          >
            Empezar
          </motion.a>

          <p className="mt-10 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-white/35">
            Javier Millán · una constelación de{" "}
            <a href="/home.html" className="text-gold">
              La Red de Luz
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
