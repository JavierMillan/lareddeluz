import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePageVisibility } from "@/shared/hooks/usePageVisibility";
import { ConstellationAtlas } from "./components/ConstellationAtlas";
import { ConstellationFocus } from "./components/ConstellationFocus";
import { NarrativePrologue } from "./components/NarrativePrologue";
import { NarrativeJourney } from "./components/NarrativeJourney";
import { NetworkContext } from "./components/NetworkContext";
import { NetworkFinale } from "./components/NetworkFinale";
import { SiteNavigation } from "./components/SiteNavigation";
import { SkyField, type SkyPhase } from "./components/SkyField";
import type { Constellation } from "./data/constellations";

export function RedDeLuzApp() {
  const [skyPhase, setSkyPhase] = useState<SkyPhase>("void");
  const [selected, setSelected] = useState<Constellation | null>(null);
  const pageVisible = usePageVisibility();
  const siteRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const site = siteRef.current;
    if (!site) return;
    if (selected) {
      site.setAttribute("inert", "");
      site.setAttribute("aria-hidden", "true");
    } else {
      site.removeAttribute("inert");
      site.removeAttribute("aria-hidden");
    }
  }, [selected]);

  const openFocus = (item: Constellation, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(item);
  };

  const closeFocus = () => {
    setSelected(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <div className="rdl-app">
      <div ref={siteRef} className="rdl-site-shell">
        <a className="rdl-skip" href="#contenido">
          Saltar al contenido
        </a>
        <SiteNavigation />
        <SkyField phase={skyPhase} active={pageVisible} />

        <main id="contenido">
          <NarrativePrologue onPhaseChange={setSkyPhase} />
          <NarrativeJourney onPhaseChange={setSkyPhase} />
          <motion.section
            id="constelaciones"
            className="rdl-atlas-section"
            onViewportEnter={() => setSkyPhase("ecosystem")}
            viewport={{ amount: 0.25 }}
            onMouseEnter={() => setSkyPhase("ecosystem")}
            onFocus={() => setSkyPhase("ecosystem")}
          >
            <ConstellationAtlas onSelect={openFocus} />
          </motion.section>
          <NetworkContext />
        </main>

        <NetworkFinale />
      </div>

      {selected && <ConstellationFocus selected={selected} onClose={closeFocus} />}
    </div>
  );
}
