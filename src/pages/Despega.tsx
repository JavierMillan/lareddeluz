import { motion, useScroll, useTransform } from "motion/react";
import { Particles } from "@/components/ui/particles";
import { LETTERS } from "@/despega/letters";
import { PinnedLetter } from "@/despega/PinnedLetter";
import { Breath, Weigh, SuperYou, Tremble, Scars, Edge } from "@/despega/Mechanics";

const WA = "https://wa.me/526221424577?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20DESPEGA";

const rise = {
  hidden: { opacity: 0, y: 16 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** El ritmo no es plano: la E te deja ir, la S y la A te retienen. */
const SCREENS: Record<string, number> = {
  d: 2.4,
  e: 1.8,
  s: 3.2,
  p: 2.8,
  ej: 2.2,
  g: 2.6,
  a: 3,
};

function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(13,11,22,0)", "rgba(13,11,22,.72)"]);
  const border = useTransform(
    scrollY,
    [0, 120],
    ["rgba(212,130,63,0)", "rgba(212,130,63,.12)"]
  );

  return (
    <motion.nav
      style={{ background: bg, borderColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-[76rem] items-center justify-between gap-4 px-6 py-3.5">
        <a href="/home.html" className="flex items-center gap-2.5" aria-label="La Red de Luz">
          <img src="/assets/logo.png" alt="" width="28" height="28" className="h-7 w-auto" />
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-gold">
            La Red de Luz
          </span>
        </a>

        {/* Las siete letras, siempre a la vista */}
        <div className="hidden items-center gap-1 md:flex">
          {LETTERS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              title={`${l.verb} · ${l.sub}`}
              className="px-2 py-1 font-display text-[1.05rem] text-white/30 transition-colors duration-300 hover:text-copper-light"
            >
              {l.letter}
            </a>
          ))}
        </div>

        <a
          href={WA}
          target="_blank"
          rel="noopener"
          className="rounded-full bg-copper px-5 py-2 text-[0.82rem] font-medium text-[#17100a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-copper-light"
        >
          Conseguir DESPEGA
        </a>
      </div>
    </motion.nav>
  );
}

export default function Despega() {
  return (
    <main className="relative">
      <Nav />

      {/* Atmósfera cobre */}
      <Particles
        className="pointer-events-none fixed inset-0 z-0"
        quantity={60}
        color="#d4823f"
        size={0.5}
        staticity={70}
      />

      {/* ══════ Hero ══════ */}
      <header className="relative grid min-h-svh place-items-center px-6 py-28 text-center">
        {/* Capas de luz: se suman en vez de taparse (blend-add) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="blend-add absolute left-1/2 top-[-20%] h-[70vh] w-[70vw] -translate-x-1/2 rounded-full"
            style={{ background: "rgba(212,130,63,.14)", filter: "blur(160px)" }}
          />
          <motion.div
            className="blend-add absolute left-[15%] top-[10%] h-[40vh] w-[26vw] rounded-full"
            style={{ background: "rgba(230,166,104,.1)", filter: "blur(120px)" }}
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="blend-add absolute right-[12%] top-[24%] h-[36vh] w-[22vw] rounded-full"
            style={{ background: "rgba(163,95,38,.12)", filter: "blur(130px)" }}
            animate={{ opacity: [0.4, 0.75, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </div>

        <div className="relative w-full max-w-[54rem]">
          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            className="flex items-center justify-center gap-4 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-white/35"
          >
            <b className="font-medium text-copper">MAPEA</b>
            <i
              className="h-px not-italic"
              style={{
                flex: "0 1 52px",
                background: "linear-gradient(90deg,transparent,#d4823f,transparent)",
              }}
            />
            <span>tu punto de partida</span>
          </motion.p>

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
            className="mx-auto max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.18rem)] font-light leading-[1.75] text-white/70"
          >
            Un método ágil para dejar de sostener lo que ya no te corresponde y construir,
            por pasos, la versión de ti que sí elegiste.
          </motion.p>

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

      {/* ══════ Las siete letras, clavadas ══════ */}
      {LETTERS.map((l) => (
        <PinnedLetter key={l.id} letter={l} screens={SCREENS[l.id]}>
          {(p) => {
            if (l.id === "e") return <Breath progress={p} />;
            if (l.id === "s") return <Weigh progress={p} />;
            if (l.id === "p") return <SuperYou progress={p} />;
            if (l.id === "ej") return <Tremble progress={p} />;
            if (l.id === "g") return <Scars progress={p} />;
            if (l.id === "a") return <Edge progress={p} />;
            return null;
          }}
        </PinnedLetter>
      ))}

      {/* ══════ Umbral ══════ */}
      <section className="relative grid min-h-svh place-items-center px-6 py-28 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="blend-add absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "rgba(212,130,63,.13)", filter: "blur(150px)" }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-[44rem]">
          <motion.p
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 font-mono text-[0.66rem] uppercase tracking-[0.24em] text-white/35"
          >
            <b className="font-medium text-copper">ESTO NO SE ACABA AQUÍ</b>
            <i
              className="h-px not-italic"
              style={{
                flex: "0 1 52px",
                background: "linear-gradient(90deg,transparent,#d4823f,transparent)",
              }}
            />
            <span>tu umbral</span>
          </motion.p>

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
            className="mx-auto mb-10 max-w-[56ch] text-[clamp(1.02rem,1.5vw,1.18rem)] font-light leading-[1.75] text-white/70"
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
            className="inline-flex items-center gap-2 rounded-full bg-copper px-8 py-4 font-medium text-[#17100a] transition-all duration-300 hover:-translate-y-0.5 hover:bg-copper-light"
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
