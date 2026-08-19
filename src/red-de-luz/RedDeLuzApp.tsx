import { useState } from "react";
import { motion } from "motion/react";
import { usePageVisibility } from "@/shared/hooks/usePageVisibility";
import { ConstellationObservatory } from "./components/ConstellationObservatory";
import { NarrativePrologue } from "./components/NarrativePrologue";
import { NetworkFinale } from "./components/NetworkFinale";
import { SiteNavigation } from "./components/SiteNavigation";
import { SkyField, type SkyPhase } from "./components/SkyField";

export function RedDeLuzApp() {
  const [skyPhase, setSkyPhase] = useState<SkyPhase>("void");
  const pageVisible = usePageVisibility();

  return (
    <div className="rdl-app">
      <a className="rdl-skip" href="#contenido">
        Saltar al contenido
      </a>
      <SiteNavigation />
      <SkyField phase={skyPhase} active={pageVisible} />

      <main id="contenido">
        <NarrativePrologue onPhaseChange={setSkyPhase} />
        <motion.section
          id="constelaciones"
          className="rdl-observatory-section"
          onViewportEnter={() => setSkyPhase("ecosystem")}
          viewport={{ amount: 0.3 }}
          onMouseEnter={() => setSkyPhase("ecosystem")}
          onFocus={() => setSkyPhase("ecosystem")}
        >
          <ConstellationObservatory />
        </motion.section>
      </main>

      <NetworkFinale />
    </div>
  );
}
