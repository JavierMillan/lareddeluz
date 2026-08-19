# DESPEGA Mapa de Vuelo Interior Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar las siete escenas clavadas al scroll de DESPEGA por un visor de capítulos controlado, donde cada letra se transforma en un instrumento interactivo, y reequilibrar el hero de La Red de Luz.

**Architecture:** Mantener `letters.ts` como fuente editorial y separar navegación, marco visual y mecánicas. `ChapterJourney` controla hash, teclado, swipe y foco; `FlightPath` muestra el progreso; `ChapterScene` compone el contenido y delega cada interacción a mecánicas independientes. La profundidad se construye con SVG, CSS y Motion, sin WebGL ni dependencias nuevas.

**Tech Stack:** React 18, TypeScript, Motion, SVG, CSS/Tailwind, Vitest, Testing Library, Vite multipágina.

---

## Mapa de archivos

- Crear `src/despega/journey.ts`: IDs, lectura/escritura de hash y navegación lineal acotada.
- Crear `src/despega/journey.test.ts`: contrato puro del viaje.
- Crear `src/despega/FlightPath.tsx`: índice DESPEGA, trayectoria acumulada y selección directa.
- Crear `src/despega/FlightPath.test.tsx`: estado visual y accesible del índice.
- Crear `src/despega/ChapterJourney.tsx`: estado, URL, teclado, swipe, foco y región viva.
- Crear `src/despega/ChapterJourney.test.tsx`: navegación completa sin depender del layout.
- Crear `src/despega/ChapterScene.tsx`: estructura semántica y montaje de instrumentos.
- Crear `src/despega/LetterInstrument.tsx`: SVG compartido del glifo y su transformación visual.
- Reescribir `src/despega/Mechanics.tsx`: instrumentos activados por acciones, no por `MotionValue` de scroll.
- Crear `src/despega/Mechanics.test.tsx`: estados de respiración, balanza, audio y umbral.
- Crear `src/despega/despega.css`: layout del visor, capas, instrumentos y responsive.
- Modificar `src/pages/Despega.tsx`: hero, navegación compacta, visor y umbral.
- Crear `src/pages/Despega.test.tsx`: integración del CTA y viaje.
- Eliminar `src/despega/PinnedLetter.tsx`: modelo sustituido.
- Conservar `src/despega/tremor.ts` y su prueba sólo si alimenta el estado interactivo de Ejecuta; eliminarlo si queda sin imports.
- Modificar `src/red-de-luz/red-de-luz.css`: contrapeso editorial del hero.

### Task 1: Contrato puro de navegación

**Files:**
- Create: `src/despega/journey.ts`
- Create: `src/despega/journey.test.ts`

- [ ] **Step 1: Write the failing navigation test**

```ts
import { describe, expect, it } from "vitest";
import { chapterFromHash, moveChapter, writeChapterHash } from "./journey";

describe("journey", () => {
  it("normaliza hashes y limita los extremos", () => {
    expect(chapterFromHash("#s")).toBe(2);
    expect(chapterFromHash("#unknown")).toBe(0);
    expect(moveChapter(0, -1)).toBe(0);
    expect(moveChapter(6, 1)).toBe(6);
    expect(moveChapter(3, 1)).toBe(4);
  });

  it("escribe el hash sin recargar", () => {
    writeChapterHash("ej");
    expect(window.location.hash).toBe("#ej");
  });
});
```

- [ ] **Step 2: Run the test and confirm the missing module failure**

Run: `.\node_modules\.bin\vitest.cmd run src/despega/journey.test.ts`

Expected: FAIL because `./journey` does not exist.

- [ ] **Step 3: Implement the navigation helpers**

```ts
export const CHAPTER_IDS = ["d", "e", "s", "p", "ej", "g", "a"] as const;
export type ChapterId = (typeof CHAPTER_IDS)[number];

export function chapterFromHash(hash: string) {
  const id = hash.replace(/^#/, "") as ChapterId;
  const index = CHAPTER_IDS.indexOf(id);
  return index < 0 ? 0 : index;
}

export function moveChapter(index: number, delta: -1 | 1) {
  return Math.max(0, Math.min(CHAPTER_IDS.length - 1, index + delta));
}

export function writeChapterHash(id: ChapterId) {
  window.history.replaceState(null, "", `#${id}`);
}
```

- [ ] **Step 4: Run the navigation test**

Run: `.\node_modules\.bin\vitest.cmd run src/despega/journey.test.ts`

Expected: 2 tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/despega/journey.ts src/despega/journey.test.ts
git commit -m "test: define la navegacion de despega"
```

### Task 2: Trayectoria e índice de letras

**Files:**
- Create: `src/despega/FlightPath.tsx`
- Create: `src/despega/FlightPath.test.tsx`

- [ ] **Step 1: Write the failing component test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { FlightPath } from "./FlightPath";

it("expone el capítulo activo y permite elegir una coordenada", async () => {
  const onSelect = vi.fn();
  render(<FlightPath activeIndex={2} onSelect={onSelect} />);
  expect(screen.getByRole("button", { name: "Selecciona, capítulo actual" })).toHaveAttribute("aria-current", "step");
  await userEvent.click(screen.getByRole("button", { name: "Planifica" }));
  expect(onSelect).toHaveBeenCalledWith(3);
});
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `.\node_modules\.bin\vitest.cmd run src/despega/FlightPath.test.tsx`

Expected: FAIL because `FlightPath` does not exist.

- [ ] **Step 3: Implement `FlightPath`**

```tsx
import { LETTERS } from "./letters";

type Props = { activeIndex: number; onSelect: (index: number) => void };

export function FlightPath({ activeIndex, onSelect }: Props) {
  return (
    <nav className="flight-path" aria-label="Capítulos de DESPEGA">
      <svg aria-hidden="true" viewBox="0 0 700 40" preserveAspectRatio="none">
        <path className="flight-path__base" d="M12 20H688" />
        <path className="flight-path__progress" d="M12 20H688" pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 - activeIndex / 6 }} />
      </svg>
      <ol>
        {LETTERS.map((item, index) => {
          const active = index === activeIndex;
          return (
            <li key={item.id}>
              <button type="button" aria-current={active ? "step" : undefined} aria-label={`${item.verb[0]}${item.verb.slice(1).toLowerCase()}${active ? ", capítulo actual" : ""}`} onClick={() => onSelect(index)}>
                <span>{item.letter}</span><small>{String(index + 1).padStart(2, "0")}</small>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 4: Run the component test**

Run: `.\node_modules\.bin\vitest.cmd run src/despega/FlightPath.test.tsx`

Expected: 1 test PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/despega/FlightPath.tsx src/despega/FlightPath.test.tsx
git commit -m "feat: agrega la trayectoria de despega"
```

### Task 3: Instrumentos interactivos sin scroll scrub

**Files:**
- Modify: `src/despega/Mechanics.tsx`
- Create: `src/despega/Mechanics.test.tsx`
- Modify or delete: `src/despega/tremor.ts`
- Modify or delete: `src/despega/tremor.test.ts`

- [ ] **Step 1: Write failing interaction tests**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Breath, Weigh, Tremble, Edge } from "./Mechanics";

describe("chapter instruments", () => {
  it("activa una respiración guiada", async () => {
    render(<Breath />);
    await userEvent.click(screen.getByRole("button", { name: "Comenzar una respiración" }));
    expect(screen.getByRole("status")).toHaveTextContent(/inhala/i);
  });

  it("separa los pesos sin traslaciones verticales", async () => {
    render(<Weigh />);
    await userEvent.click(screen.getByRole("button", { name: /grupo de mensajes/i }));
    expect(screen.getByTestId("despega-scale")).toHaveAttribute("data-tilt", "drains");
  });

  it("resuelve el audio y el umbral mediante botones", async () => {
    const { rerender } = render(<Tremble />);
    await userEvent.click(screen.getByRole("button", { name: "Mandar el audio" }));
    expect(screen.getByRole("status")).toHaveTextContent("Mandado. No pasó nada.");
    rerender(<Edge />);
    await userEvent.click(screen.getByRole("button", { name: "Cruzar el umbral" }));
    expect(screen.getByTestId("despega-threshold")).toHaveAttribute("data-crossed", "true");
  });
});
```

- [ ] **Step 2: Run the tests and confirm the prop/API failures**

Run: `.\node_modules\.bin\vitest.cmd run src/despega/Mechanics.test.tsx`

Expected: FAIL because the current instruments require `progress`.

- [ ] **Step 3: Replace the scroll-driven API with action-driven instruments**

Implement these exact public signatures in `Mechanics.tsx`:

```tsx
export function Compass(): JSX.Element;
export function Breath(): JSX.Element;
export function Weigh(): JSX.Element;
export function SuperYou(): JSX.Element;
export function Tremble(): JSX.Element;
export function Scars(): JSX.Element;
export function Edge(): JSX.Element;
```

Use local state for interaction. `Weigh` buttons set `data-tilt` to `drains` or `worth`; its list items may change `x`, opacity and border color but never `y`. `Breath` cycles `Inhala` → `Sostén` → `Exhala` with an explicit button and clears its timers on unmount. `Tremble` uses a short keyframe animation only before sending. `Edge` sets `data-crossed="true"` after activation. `Scars` renders each wound/dream as one semantic pair in source order.

- [ ] **Step 4: Run mechanics and legacy tremor tests**

Run: `.\node_modules\.bin\vitest.cmd run src/despega/Mechanics.test.tsx src/despega/tremor.test.ts`

Expected: all retained tests PASS. If `tremor.ts` is no longer imported, remove it and its test in the same commit.

- [ ] **Step 5: Commit**

```powershell
git add src/despega/Mechanics.tsx src/despega/Mechanics.test.tsx src/despega/tremor.ts src/despega/tremor.test.ts
git commit -m "feat: convierte las letras en instrumentos interactivos"
```

### Task 4: Marco visual y transformación de la letra

**Files:**
- Create: `src/despega/LetterInstrument.tsx`
- Create: `src/despega/ChapterScene.tsx`
- Create: `src/despega/ChapterScene.test.tsx`

- [ ] **Step 1: Write the failing scene test**

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { LETTERS } from "./letters";
import { ChapterScene } from "./ChapterScene";

it("conecta narrativa, glifo e instrumento del capítulo", () => {
  render(<ChapterScene letter={LETTERS[2]} index={2} />);
  expect(screen.getByRole("heading", { name: /No es lo que cuesta/i })).toHaveFocus();
  expect(screen.getByTestId("letter-instrument")).toHaveAttribute("data-letter", "s");
  expect(screen.getByTestId("despega-scale")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and confirm missing components**

Run: `.\node_modules\.bin\vitest.cmd run src/despega/ChapterScene.test.tsx`

Expected: FAIL because `ChapterScene` does not exist.

- [ ] **Step 3: Implement the shared glifo and scene contract**

`LetterInstrument` renders one SVG with `viewBox="0 0 240 240"`, `data-letter={id}`, a quiet coordinate grid and an outlined glyph using the current chapter color. It receives only `{ id, glyph, active }`; interaction logic stays in `Mechanics.tsx`.

`ChapterScene` receives `{ letter: Letter; index: number }`, focuses its `h2` in a layout effect, maps IDs to instruments, and renders this semantic order:

```tsx
<article className="chapter-scene" data-chapter={letter.id} aria-labelledby={`chapter-${letter.id}`}>
  <div className="chapter-scene__narrative">
    <p className="chapter-scene__coordinate">{String(index + 1).padStart(2, "0")} / 07 · {letter.coord}</p>
    <h2 id={`chapter-${letter.id}`} tabIndex={-1}>{letter.title} <span>{letter.accent}</span></h2>
    <p>{letter.body}</p>
    <blockquote>{letter.ask}</blockquote>
  </div>
  <div className="chapter-scene__instrument">
    <LetterInstrument id={letter.id} glyph={letter.letter} active />
    {instrumentFor(letter.id)}
  </div>
</article>
```

- [ ] **Step 4: Run the scene test**

Run: `.\node_modules\.bin\vitest.cmd run src/despega/ChapterScene.test.tsx`

Expected: 1 test PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/despega/LetterInstrument.tsx src/despega/ChapterScene.tsx src/despega/ChapterScene.test.tsx
git commit -m "feat: crea las escenas del mapa de vuelo"
```

### Task 5: Controlador de capítulos, hash, teclado y swipe

**Files:**
- Create: `src/despega/ChapterJourney.tsx`
- Create: `src/despega/ChapterJourney.test.tsx`

- [ ] **Step 1: Write the failing journey interaction test**

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { ChapterJourney } from "./ChapterJourney";

it("permite avanzar, volver, elegir y usar teclado", async () => {
  render(<ChapterJourney />);
  expect(screen.getByRole("heading", { name: /No sabes cuándo/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Siguiente: Envía calma" }));
  expect(window.location.hash).toBe("#e");
  fireEvent.keyDown(window, { key: "ArrowRight" });
  expect(screen.getByRole("heading", { name: /No es lo que cuesta/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Descubre" }));
  expect(window.location.hash).toBe("#d");
});
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `.\node_modules\.bin\vitest.cmd run src/despega/ChapterJourney.test.tsx`

Expected: FAIL because `ChapterJourney` does not exist.

- [ ] **Step 3: Implement the controller**

Use `AnimatePresence mode="wait"`, initialize from `chapterFromHash`, listen to `hashchange`, and update the hash through `writeChapterHash`. Keep `direction` as `-1 | 1`, initialized to `1`; `go(delta)` stores the delta before moving and `select(next)` derives direction from `next >= active ? 1 : -1`. Read reduced motion with `useReducedMotion()`. Register left/right arrows only when the event target is not an input, textarea, select or contenteditable element. Track pointer-down X/Y and navigate after pointer-up only when horizontal distance exceeds 56 px and vertical distance remains below 48 px.

Render:

```tsx
<section id="viaje" className="chapter-journey" aria-label="Método DESPEGA">
  <p className="sr-only" aria-live="polite">Capítulo {active + 1} de 7: {letter.verb}</p>
  <FlightPath activeIndex={active} onSelect={select} />
  <AnimatePresence mode="wait" initial={false}>
    <motion.div key={letter.id} initial={{ opacity: 0, x: direction * 48 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -36 }} transition={{ duration: reduceMotion ? 0 : .58, ease: [.22, 1, .36, 1] }}>
      <ChapterScene letter={letter} index={active} />
    </motion.div>
  </AnimatePresence>
  <div className="chapter-journey__controls">
    <button disabled={active === 0} onClick={() => go(-1)}>Anterior</button>
    <button disabled={active === 6} onClick={() => go(1)}>Siguiente: {LETTERS[active + 1]?.verb}</button>
  </div>
</section>
```

- [ ] **Step 4: Add swipe and Escape assertions, then run the test**

Add pointer events with a 90 px horizontal delta and assert the next chapter. Assert Escape focuses the hero index link without changing the method data.

Run: `.\node_modules\.bin\vitest.cmd run src/despega/ChapterJourney.test.tsx`

Expected: all journey tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/despega/ChapterJourney.tsx src/despega/ChapterJourney.test.tsx
git commit -m "feat: agrega el visor controlado de capitulos"
```

### Task 6: Integración de DESPEGA y responsive

**Files:**
- Modify: `src/pages/Despega.tsx`
- Create: `src/pages/Despega.test.tsx`
- Create: `src/despega/despega.css`
- Delete: `src/despega/PinnedLetter.tsx`

- [ ] **Step 1: Write the failing page integration test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import Despega from "./Despega";

it("entra al mapa de vuelo sin una secuencia sticky", async () => {
  render(<Despega />);
  expect(screen.getByRole("link", { name: "Conseguir DESPEGA" })).toHaveAttribute("href", expect.stringContaining("wa.me"));
  await userEvent.click(screen.getByRole("link", { name: "Iniciar calibración" }));
  expect(screen.getByRole("region", { name: "Método DESPEGA" })).toBeInTheDocument();
  expect(document.querySelector(".sticky")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test and confirm copy/structure failure**

Run: `.\node_modules\.bin\vitest.cmd run src/pages/Despega.test.tsx`

Expected: FAIL because the hero still renders the old anchored letter list.

- [ ] **Step 3: Replace pinned sections with `ChapterJourney`**

Remove `SCREENS`, `PinnedLetter` and progress-based mechanic imports. Import `ChapterJourney` and `@/despega/despega.css`. Change the hero method CTA to:

```tsx
<a id="despega-index" href="#viaje" className="despega-start">
  Iniciar calibración <span aria-hidden="true">↘</span>
</a>
```

Render `<ChapterJourney />` once between hero and final threshold. Keep the WhatsApp CTA and final copy.

- [ ] **Step 4: Implement the responsive CSS contract**

In `despega.css` define:

- `--despega-nav-height: 72px` desktop and `64px` below 640 px.
- `.chapter-journey { min-height: 100svh; min-height: 100dvh; padding-top: calc(var(--despega-nav-height) + env(safe-area-inset-top)); }`
- Desktop two-column scene with narrative and instrument.
- Mobile one-column scene, internal natural height and no absolute body copy.
- `.chapter-scene__instrument` never under the navbar.
- `.weigh-list` uses stable grid placement; no vertical transforms.
- Bottom controls have `min-height: 44px`, safe-area padding and never cover focused content.
- Reduced motion removes ambient loops and shared translation.
- At 320, 375, 390 and 430 px there is no fixed pixel width greater than the viewport.

- [ ] **Step 5: Delete the obsolete pinned component and run the DESPEGA suite**

Run: `.\node_modules\.bin\vitest.cmd run src/despega src/pages/Despega.test.tsx`

Expected: all DESPEGA tests PASS and `rg "PinnedLetter|screens=|MotionValue<number>" src/despega src/pages/Despega.tsx` returns no obsolete integration.

- [ ] **Step 6: Commit**

```powershell
git add src/pages/Despega.tsx src/pages/Despega.test.tsx src/despega/despega.css src/despega/PinnedLetter.tsx
git commit -m "feat: transforma despega en un mapa de vuelo"
```

### Task 7: Reequilibrio del hero de La Red de Luz

**Files:**
- Modify: `src/red-de-luz/components/NarrativePrologue.tsx`
- Modify: `src/red-de-luz/red-de-luz.css`
- Modify: `src/red-de-luz/components/NarrativePrologue.test.tsx`

- [ ] **Step 1: Extend the prologue test with the editorial counterweight**

Assert that the aside has a visible label and remains separate from the background SVG:

```tsx
expect(screen.getByText("Aquí empieza la red")).toBeInTheDocument();
expect(screen.getByText(/Una idea no necesita más ruido/i)).toHaveClass("rdl-hero__aside-copy");
```

- [ ] **Step 2: Run the test and confirm failure**

Run: `.\node_modules\.bin\vitest.cmd run src/red-de-luz/components/NarrativePrologue.test.tsx`

Expected: FAIL because the counterweight label does not exist.

- [ ] **Step 3: Add the semantic editorial block**

```tsx
<aside className="rdl-hero__aside">
  <span>Aquí empieza la red</span>
  <p className="rdl-hero__aside-copy">Una idea no necesita más ruido. Necesita estructura y gente con quien crecer.</p>
</aside>
```

Adjust the desktop grid to `minmax(0, 7.4fr) minmax(18rem, 3.6fr)`, align the aside to the visual center of the second title line, increase its maximum width to 25rem, and extend a subtle horizontal rule toward the headline. Keep all sky-field opacities unchanged. Preserve the stacked mobile order below the actions.

- [ ] **Step 4: Run Red de Luz tests**

Run: `.\node_modules\.bin\vitest.cmd run src/red-de-luz`

Expected: all Red de Luz tests PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/red-de-luz/components/NarrativePrologue.tsx src/red-de-luz/components/NarrativePrologue.test.tsx src/red-de-luz/red-de-luz.css
git commit -m "fix: equilibra el hero de la red de luz"
```

### Task 8: Auditoría visual, accesible y de producción

**Files:**
- Modify only files implicated by verified findings.

- [ ] **Step 1: Run the complete automated suite**

Run: `.\node_modules\.bin\vitest.cmd run`

Expected: all tests PASS.

- [ ] **Step 2: Run typecheck and production build**

```powershell
.\node_modules\.bin\tsc.cmd -b --pretty false
$env:CI='true'; & 'C:\Users\Usuario\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd' run build
```

Expected: TypeScript exits 0; Vite builds both entries; `Build contract: OK`.

- [ ] **Step 3: Verify keyboard and URL behavior manually**

At `/despega/`, verify Tab order, left/right arrows, Escape, direct loading of all seven hashes, focus on the new chapter title, disabled end controls, and visible focus. Confirm no keyboard command fires while focus is in a control that consumes arrow keys.

- [ ] **Step 4: Verify responsive compositions**

Capture DESPEGA hero, S, G and A at 1440×1000, 390×844 and 320×700. Confirm navbar clearance, no overlap in S, readable G pairings, reachable controls, safe-area padding and no horizontal scroll. Capture the La Red de Luz hero at 1440×1000 and confirm the right counterweight balances the composition without strengthening the background constellation.

- [ ] **Step 5: Verify reduced motion and 200% zoom**

Emulate `prefers-reduced-motion: reduce`, navigate all chapters and confirm state remains understandable without loops or translations. At 200% zoom confirm content reflows and controls do not cover headings or questions.

- [ ] **Step 6: Fix only reproducible critical or major findings and rerun impacted checks**

Do not add new visual concepts during audit. For every fix, rerun its component test and repeat the viewport that exposed it.

- [ ] **Step 7: Commit final verified adjustments**

```powershell
git add src
git commit -m "fix: pule la experiencia responsive de despega"
```
