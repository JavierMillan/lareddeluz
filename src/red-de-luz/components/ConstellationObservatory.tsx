import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { CONSTELLATIONS } from "../data/constellations";

export function ConstellationObservatory() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = CONSTELLATIONS[selectedIndex];

  const choose = (index: number) => {
    const next = (index + CONSTELLATIONS.length) % CONSTELLATIONS.length;
    setSelectedIndex(next);
    refs.current[next]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      choose(selectedIndex + 1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      choose(selectedIndex - 1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      choose(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      choose(CONSTELLATIONS.length - 1);
    }
  };

  return (
    <div className="rdl-observatory">
      <div className="rdl-observatory__intro">
        <p className="rdl-coordinate">03 · El observatorio</p>
        <h2>
          Un cielo.
          <span>Distintas formas de crecer.</span>
        </h2>
        <p>
          Cada constelación tiene su propia misión, lenguaje y experiencia. Todas comparten
          algo: aquí el crecimiento ocurre en compañía.
        </p>
      </div>

      <div className="rdl-observatory__map" role="tablist" aria-label="Constelaciones">
        <svg className="rdl-observatory__orbits" aria-hidden="true" viewBox="0 0 100 100">
          <path d="M24 24 C42 8, 56 12, 72 18" />
          <path d="M24 24 C36 44, 43 62, 58 72" />
          <path d="M58 72 C70 66, 76 62, 86 60" />
        </svg>

        {CONSTELLATIONS.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            aria-label={`${item.name}${item.status === "suspended" ? ", suspendida" : ""}`}
            aria-selected={selectedIndex === index}
            aria-controls="constellation-panel"
            tabIndex={selectedIndex === index ? 0 : -1}
            className="rdl-portal"
            data-status={item.status}
            style={
              {
                "--portal-accent": item.accent,
                "--portal-x": `${item.coordinate.x}%`,
                "--portal-y": `${item.coordinate.y}%`,
              } as CSSProperties
            }
            onClick={() => setSelectedIndex(index)}
            onKeyDown={handleKeyDown}
          >
            <span className="rdl-portal__node" aria-hidden="true" />
            <span className="rdl-portal__label">{item.shortName}</span>
            {item.status === "suspended" && (
              <span className="rdl-portal__status">Suspendida</span>
            )}
          </button>
        ))}
      </div>

      <div
        id="constellation-panel"
        className="rdl-observatory__detail"
        role="tabpanel"
        style={{ "--portal-accent": selected.accent } as CSSProperties}
      >
        <div className="rdl-observatory__index" aria-hidden="true">
          {String(selectedIndex + 1).padStart(2, "0")}
        </div>
        <p className="rdl-coordinate">{selected.eyebrow}</p>
        <h3>{selected.name}</h3>
        <p className="rdl-observatory__summary">{selected.summary}</p>

        {selected.status === "active" ? (
          <a
            className="rdl-portal-cta"
            href={selected.cta.href}
            target={selected.cta.external ? "_blank" : undefined}
            rel={selected.cta.external ? "noopener" : undefined}
          >
            {selected.cta.label}
            <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <p className="rdl-suspended-note">Constelación suspendida</p>
        )}
      </div>
    </div>
  );
}
