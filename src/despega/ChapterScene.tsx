import { useLayoutEffect, useRef } from "react";
import type { Letter } from "./letters";
import { Breath, Compass, Edge, Scars, SuperYou, Tremble, Weigh } from "./Mechanics";
import { LetterInstrument } from "./LetterInstrument";

const instruments = { d: Compass, e: Breath, s: Weigh, p: SuperYou, ej: Tremble, g: Scars, a: Edge } as const;

export function ChapterScene({ letter, index }: { letter: Letter; index: number }) {
  const heading = useRef<HTMLHeadingElement>(null);
  useLayoutEffect(() => { heading.current?.focus({ preventScroll: true }); }, [letter.id]);
  const Instrument = instruments[letter.id as keyof typeof instruments] ?? Compass;
  return <article className="chapter-scene" data-chapter={letter.id} aria-labelledby={`chapter-${letter.id}`}>
    <div className="chapter-scene__narrative">
      <p className="chapter-scene__coordinate">{String(index + 1).padStart(2, "0")} / 07 · {letter.coord}</p>
      <h2 ref={heading} id={`chapter-${letter.id}`} tabIndex={-1}>{letter.title} <span>{letter.accent}</span></h2>
      <p className="chapter-scene__body">{letter.body}</p>
      <blockquote>{letter.ask}</blockquote>
    </div>
    <div className="chapter-scene__instrument"><LetterInstrument id={letter.id} glyph={letter.letter} active /><Instrument /></div>
  </article>;
}
