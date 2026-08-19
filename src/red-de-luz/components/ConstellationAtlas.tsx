import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { CONSTELLATIONS, type Constellation } from "../data/constellations";
import { ConstellationFigure } from "./ConstellationFigure";

type Props = {
  onSelect: (item: Constellation, trigger: HTMLElement) => void;
};

export function ConstellationAtlas({ onSelect }: Props) {
  const [focusIndex, setFocusIndex] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const moveFocus = (index: number) => {
    const next = (index + CONSTELLATIONS.length) % CONSTELLATIONS.length;
    setFocusIndex(next);
    refs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveFocus(CONSTELLATIONS.length - 1);
    }
  };

  return (
    <div className="rdl-atlas">
      <div className="rdl-atlas__intro">
        <p className="rdl-coordinate">04 · El cielo actual</p>
        <h2>Encuentra <span>dónde crecer.</span></h2>
        <p>Cada constelación reúne personas, experiencias y recursos alrededor de una misión. El texto orienta; la curiosidad hace el resto.</p>
        <span className="rdl-atlas__hint"><i /> Elige una constelación</span>
      </div>

      <div className="rdl-atlas__field" role="group" aria-label="Constelaciones de La Red de Luz">
        <svg className="rdl-atlas__route" viewBox="0 0 760 650" aria-hidden="true">
          <path d="M100 135C245 40 520 40 655 105M140 170C245 280 310 330 385 350M385 350C305 460 245 535 170 575M385 350C510 445 585 505 660 545" />
        </svg>
        {CONSTELLATIONS.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => { refs.current[index] = node; }}
            type="button"
            className="rdl-atlas-star"
            data-constellation={item.id}
            data-status={item.status}
            aria-label={`${item.name}${item.status === "suspended" ? ", suspendida" : ""}`}
            tabIndex={focusIndex === index ? 0 : -1}
            style={{ "--constellation-accent": item.accent } as CSSProperties}
            onFocus={() => setFocusIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onClick={(event) => onSelect(item, event.currentTarget)}
          >
            <ConstellationFigure figure={item.figure} label={`Figura de ${item.metaphor.split(" · ")[0]}`} />
            <span className="rdl-atlas-star__name">{item.name}</span>
            <span className="rdl-atlas-star__meta">{item.metaphor}</span>
            {item.status === "suspended" && <span className="rdl-atlas-star__status">Suspendida</span>}
          </button>
        ))}
      </div>
      <p className="rdl-atlas__credit">Figuras occidentales basadas en líneas de Stellarium e identificadores Hipparcos.</p>
    </div>
  );
}
