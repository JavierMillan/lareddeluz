import { motion } from "motion/react";
import type { SkyPhase } from "./SkyField";

type Props = {
  onPhaseChange: (phase: SkyPhase) => void;
};

const scenes = [
  {
    id: "cielo",
    phase: "void" as const,
    coordinate: "00 · Una luz en el vacío",
    title: (
      <>
        Brillar solo <span>cansa.</span>
      </>
    ),
    body: "Puedes avanzar, aprender y construir. Pero llega un punto en que crecer sin vínculos empieza a pesar.",
    aside: "Una idea aislada no está muerta. Está esperando estructura.",
  },
  {
    id: "vinculo",
    phase: "link" as const,
    coordinate: "01 · El primer vínculo",
    title: (
      <>
        No te falta luz.
        <span>Te falta dónde conectarla.</span>
      </>
    ),
    body: "Aquí las personas son nodos. Cuando dos nodos comparten una intención real, nace una conexión.",
    aside: "La luz circula antes de regresar.",
  },
  {
    id: "constelacion",
    phase: "constellation" as const,
    coordinate: "02 · Una misión en común",
    title: (
      <>
        Una misión compartida
        <span>cambia la forma del cielo.</span>
      </>
    ),
    body: "Una constelación es un ecosistema de personas, experiencias y recursos que crecen alrededor de una misión.",
    aside: "No una audiencia. No una lista. Un lugar vivo al que puedes entrar.",
  },
] as const;

export function NarrativePrologue({ onPhaseChange }: Props) {
  return (
    <div className="rdl-prologue">
      {scenes.map((scene, index) => (
        <motion.section
          id={scene.id}
          key={scene.id}
          className="rdl-scene"
          onViewportEnter={() => onPhaseChange(scene.phase)}
          viewport={{ amount: 0.55 }}
        >
          <motion.div
            className="rdl-scene__copy"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="rdl-coordinate">{scene.coordinate}</p>
            {index === 0 ? <h1>{scene.title}</h1> : <h2>{scene.title}</h2>}
            <p className="rdl-scene__body">{scene.body}</p>
            <p className="rdl-scene__aside">{scene.aside}</p>
            {index === 0 && (
              <a className="rdl-text-link" href="#vinculo">
                Entender la red <span aria-hidden="true">↓</span>
              </a>
            )}
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
}
