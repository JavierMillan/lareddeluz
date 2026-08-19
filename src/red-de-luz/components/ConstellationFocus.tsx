import { useEffect, useRef, type CSSProperties, type KeyboardEvent } from "react";
import { CONSTELLATIONS, type Constellation } from "../data/constellations";
import { ConstellationFigure } from "./ConstellationFigure";

type Props = {
  selected: Constellation;
  onClose: () => void;
};

export function ConstellationFocus({ selected, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const index = CONSTELLATIONS.findIndex((item) => item.id === selected.id);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="rdl-focus-layer" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        ref={dialogRef}
        className="rdl-focus"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rdl-focus-title"
        aria-describedby="rdl-focus-description"
        style={{ "--constellation-accent": selected.accent } as CSSProperties}
        onKeyDown={handleKeyDown}
      >
        <div className="rdl-focus__topline">
          <span>{String(index + 1).padStart(2, "0")} / {String(CONSTELLATIONS.length).padStart(2, "0")}</span>
          <button ref={closeRef} type="button" className="rdl-focus__close" onClick={onClose}>Cerrar enfoque <span aria-hidden="true">×</span></button>
        </div>

        <div className="rdl-focus__sky" aria-hidden="true">
          <div className="rdl-focus__rings" />
          <ConstellationFigure figure={selected.figure} label={selected.metaphor.split(" · ")[0]} />
          <span className="rdl-focus__star-name">{selected.metaphor}</span>
        </div>

        <div className="rdl-focus__copy">
          <p className="rdl-coordinate">{selected.eyebrow}</p>
          <h2 id="rdl-focus-title">{selected.name}</h2>
          <p id="rdl-focus-description" className="rdl-focus__summary">{selected.summary}</p>
          <p className="rdl-focus__context">{selected.context}</p>
          <div className="rdl-focus__metaphor"><strong>{selected.metaphor.split(" · ")[0]}</strong><span>{selected.metaphor.split(" · ")[1]}</span></div>

          {selected.status === "active" ? (
            <a className="rdl-focus__cta" href={selected.cta.href} target={selected.cta.external ? "_blank" : undefined} rel={selected.cta.external ? "noopener" : undefined}>{selected.cta.label}<span aria-hidden="true">↗</span></a>
          ) : (
            <p className="rdl-focus__suspended">Suspendida por ahora</p>
          )}
        </div>
      </div>
    </div>
  );
}
