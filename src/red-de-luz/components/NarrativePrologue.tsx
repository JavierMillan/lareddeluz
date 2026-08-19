import { motion } from "motion/react";
import type { SkyPhase } from "./SkyField";

type Props = { onPhaseChange: (phase: SkyPhase) => void };
const ANNOUNCEMENTS = "https://chat.whatsapp.com/LQwZxtrJSmNECZEyIwO9az";

export function NarrativePrologue({ onPhaseChange }: Props) {
  return (
    <motion.section id="cielo" className="rdl-hero" onViewportEnter={() => onPhaseChange("void")} viewport={{ amount: 0.5 }}>
      <motion.div className="rdl-hero__copy" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
        <p className="rdl-coordinate">00 · Una luz en el vacío</p>
        <h1>Brillar solo <span>cansa.</span></h1>
        <p className="rdl-hero__body">Puedes aprender por tu cuenta, empezar un proyecto y cambiar de rumbo. Pero llega un punto donde avanzar sin gente que entienda lo que estás construyendo se vuelve pesado.</p>
        <div className="rdl-hero__actions">
          <a className="rdl-primary-cta" href={ANNOUNCEMENTS} target="_blank" rel="noopener">Ocupa tu lugar en la red <span aria-hidden="true">↗</span></a>
          <a className="rdl-text-link" href="#constelaciones">Explorar el cielo <span aria-hidden="true">↓</span></a>
        </div>
      </motion.div>
      <p className="rdl-hero__aside">Una idea no necesita más ruido. Necesita estructura y gente con quien crecer.</p>
    </motion.section>
  );
}
