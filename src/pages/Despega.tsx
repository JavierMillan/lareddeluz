import { motion } from "motion/react";
import { Particles } from "@/components/ui/particles";
import { ChapterJourney } from "@/despega/ChapterJourney";
import "@/despega/despega.css";

const WA = "https://wa.me/526221424577?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20DESPEGA";
const rise = { hidden: { opacity: 0, y: 16 }, show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: .85, delay: d, ease: [0.22, 1, 0.36, 1] as const } }) };

function Nav() {
  return <nav className="despega-nav">
    <div>
      <a href="/" className="despega-nav__brand" aria-label="La Red de Luz"><img src="/assets/logo.png" alt="" width="28" height="28" /><span>La Red de Luz</span></a>
      <a href="#viaje" className="despega-nav__map">Mapa de vuelo <span aria-hidden="true">↓</span></a>
      <a href={WA} target="_blank" rel="noopener" className="despega-nav__cta">Conseguir DESPEGA</a>
    </div>
  </nav>;
}

export default function Despega() {
  return <main className="despega">
    <Nav />
    <Particles className="despega-particles" quantity={60} color="#d4823f" size={.5} staticity={70} />

    <header className="despega-hero">
      <div className="despega-hero__aurora" aria-hidden="true"><i /><i /><i /></div>
      <div className="despega-hero__copy">
        <motion.p variants={rise} initial="hidden" animate="show" className="despega-kicker"><b>DESPEGA</b><i />Mapa de vuelo interior</motion.p>
        <motion.h1 variants={rise} custom={.1} initial="hidden" animate="show">Suelta la vida<br/><span>que no es tuya.</span></motion.h1>
        <motion.p variants={rise} custom={.2} initial="hidden" animate="show" className="despega-hero__body">Un método ágil para dejar de sostener lo que ya no te corresponde y construir, por pasos, la versión de ti que sí elegiste.</motion.p>
        <motion.div variants={rise} custom={.32} initial="hidden" animate="show" className="despega-hero__actions">
          <a id="despega-index" href="#viaje" className="despega-start">Iniciar calibración <span aria-hidden="true">↘</span></a>
          <span>7 coordenadas · 7 instrumentos</span>
        </motion.div>
      </div>
      <div className="despega-hero__telemetry" aria-hidden="true"><span>ALT 00</span><i /><span>RUMBO PROPIO</span><i /><span>SEÑAL ESTABLE</span></div>
      <a href="#viaje" className="despega-hero__scroll" aria-label="Ir al mapa de vuelo"><span>Desliza para entrar</span><i /></a>
    </header>

    <ChapterJourney />

    <section className="despega-final">
      <div aria-hidden="true" className="despega-final__glow" />
      <div>
        <motion.p variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }} className="despega-kicker"><b>ESTO NO SE ACABA AQUÍ</b><i />tu umbral</motion.p>
        <motion.h2 variants={rise} custom={.12} initial="hidden" whileInView="show" viewport={{ once: true }}>Nada de esto lo hice solo.<br/><span>Tú tampoco tienes que hacerlo así.</span></motion.h2>
        <motion.p variants={rise} custom={.2} initial="hidden" whileInView="show" viewport={{ once: true }} className="despega-final__body">Si llegaste hasta aquí leyendo, ya sabes que no fue por curiosidad. Fue porque algo de esto te encontró a ti primero.</motion.p>
        <motion.a variants={rise} custom={.28} initial="hidden" whileInView="show" viewport={{ once: true }} href={WA} target="_blank" rel="noopener" className="despega-final__cta">Empezar <span aria-hidden="true">↗</span></motion.a>
        <p className="despega-final__credit">Javier Millán · una constelación de <a href="/">La Red de Luz</a></p>
      </div>
    </section>
  </main>;
}
