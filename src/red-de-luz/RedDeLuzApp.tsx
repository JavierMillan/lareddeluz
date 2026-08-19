import { useState } from "react";
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
        <section
          id="constelaciones"
          className="rdl-observatory-section"
          onMouseEnter={() => setSkyPhase("ecosystem")}
          onFocus={() => setSkyPhase("ecosystem")}
        >
          <ConstellationObservatory />
        </section>
      </main>

      <NetworkFinale />
    </div>
  );
}
