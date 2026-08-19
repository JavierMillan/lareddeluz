import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LETTERS } from "./letters";
import { chapterFromHash, moveChapter, writeChapterHash, type ChapterId } from "./journey";
import { FlightPath } from "./FlightPath";
import { ChapterScene } from "./ChapterScene";

export function ChapterJourney() {
  const [active, setActive] = useState(() => chapterFromHash(window.location.hash));
  const [direction, setDirection] = useState<-1 | 1>(1);
  const pointer = useRef({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();
  const select = useCallback((next: number) => { setDirection(next >= active ? 1 : -1); setActive(next); writeChapterHash(LETTERS[next].id as ChapterId); }, [active]);
  const go = useCallback((delta: -1 | 1) => select(moveChapter(active, delta)), [active, select]);
  useEffect(() => {
    const syncHash = () => setActive(chapterFromHash(window.location.hash));
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof Element && target.matches("input, textarea, select, [contenteditable='true']")) return;
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Escape") document.querySelector<HTMLElement>("#despega-index")?.focus();
    };
    window.addEventListener("hashchange", syncHash); window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("hashchange", syncHash); window.removeEventListener("keydown", onKey); };
  }, [go]);
  const letter = LETTERS[active];
  return <section id="viaje" className="chapter-journey" aria-label="Método DESPEGA" onPointerDown={(event) => { pointer.current = { x: event.clientX, y: event.clientY }; }} onPointerUp={(event) => { const dx = event.clientX - pointer.current.x; const dy = event.clientY - pointer.current.y; if (Math.abs(dx) > 56 && Math.abs(dy) < 48) go(dx < 0 ? 1 : -1); }}>
    <p className="sr-only" aria-live="polite">Capítulo {active + 1} de 7: {letter.verb}</p>
    <FlightPath activeIndex={active} onSelect={select} />
    <div className="chapter-journey__viewport"><AnimatePresence mode="wait" initial={false}><motion.div key={letter.id} initial={reduceMotion ? false : { opacity: 0, x: direction * 48, filter: "blur(8px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction * -36, filter: "blur(6px)" }} transition={{ duration: reduceMotion ? 0 : .58, ease: [.22, 1, .36, 1] }}><ChapterScene letter={letter} index={active} /></motion.div></AnimatePresence></div>
    <div className="chapter-journey__controls"><button type="button" disabled={active === 0} onClick={() => go(-1)}><span aria-hidden="true">←</span> Anterior</button><span>{String(active + 1).padStart(2, "0")} / 07</span><button type="button" disabled={active === LETTERS.length - 1} onClick={() => go(1)}>Siguiente{LETTERS[active + 1] ? `: ${LETTERS[active + 1].verb[0]}${LETTERS[active + 1].verb.slice(1).toLowerCase()}` : ""} <span aria-hidden="true">→</span></button></div>
  </section>;
}
