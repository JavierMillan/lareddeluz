import { motion } from "motion/react";
import type { SkyPhase } from "./SkyField";

type Props = { onPhaseChange: (phase: SkyPhase) => void };

const reflections = [
  { title: "Ya llegaste", text: "Cumpliste metas, marcaste casillas y todavía aparece esa pregunta bajita: ¿esto era todo?" },
  { title: "Traes una idea", text: "Sabes que llevas algo dentro, pero todavía no encuentra dónde crecer." },
  { title: "Estás cambiando", text: "Avanzas, pero hacerlo sin personas que entiendan el proceso empieza a pesar." },
];

export function NarrativeJourney({ onPhaseChange }: Props) {
  return (
    <div className="rdl-journey">
      <motion.section id="reflejo" className="rdl-reflection" onViewportEnter={() => onPhaseChange("void")} viewport={{ amount: 0.45 }}>
        <div className="rdl-section-heading">
          <p className="rdl-coordinate">01 · El reflejo</p>
          <h2>No estás perdido. <span>Estás sin estructura.</span></h2>
          <p>Te lo digo porque yo estuve ahí. Y porque esa sensación suele aparecer de tres formas.</p>
        </div>
        <ol className="rdl-reflection__list">
          {reflections.map((item, index) => (
            <motion.li key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ delay: index * 0.09 }}>
              <span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p>
            </motion.li>
          ))}
        </ol>
      </motion.section>

      <motion.section id="vinculo" className="rdl-link-story" onViewportEnter={() => onPhaseChange("link")} viewport={{ amount: 0.5 }}>
        <div className="rdl-link-story__visual" aria-hidden="true"><i /><span /><i /></div>
        <div className="rdl-link-story__copy">
          <p className="rdl-coordinate">02 · El primer vínculo</p>
          <h2>Una persona es un nodo. <span>Dos personas pueden cambiar la dirección.</span></h2>
          <p>Cuando comparten una intención, apoyo o trabajo, aparece una conexión. La luz deja de gastarse sólo hacia afuera y empieza a circular.</p>
        </div>
      </motion.section>

      <motion.section id="constelacion" className="rdl-definition" onViewportEnter={() => onPhaseChange("constellation")} viewport={{ amount: 0.5 }}>
        <p className="rdl-coordinate">03 · La constelación</p>
        <p className="rdl-definition__statement">Una constelación es un proyecto convertido en ecosistema humano.</p>
        <div className="rdl-definition__contrast"><span>No una audiencia.</span><span>No una lista.</span><strong>Una misión que varias personas hacen vivir.</strong></div>
      </motion.section>
    </div>
  );
}
