# DESPEGA Cuaderno Personal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/ejercicios/` as a full-screen, locally saved Cobre vivo workbook whose interactions match each exercise and whose print/PDF outputs never include or overlap the index.

**Architecture:** Keep the existing static Vite entry so GitHub Pages remains compatible. Drive the active exercise from `?ejercicio=CODE`, place explicit experience metadata beside the exercise data, persist structured answers behind a versioned local-storage adapter, and render the active exercise through a small family of interaction components. Keep browser printing DOM-based and PDF download data-based.

**Tech Stack:** React 18, TypeScript, Motion, Vitest, Testing Library, CSS print media, browser `localStorage`, existing dependency-free PDF writer.

---

## File map

- Create `src/despega/exerciseExperiences.ts`: answer types, interaction families, explicit 20-exercise configuration, answer-to-print-block normalization.
- Create `src/despega/exerciseExperiences.test.ts`: configuration completeness and normalization tests.
- Create `src/despega/exerciseStorage.ts`: versioned local persistence with in-memory fallback.
- Create `src/despega/exerciseStorage.test.ts`: hydration, save, clear, and storage failure tests.
- Create `src/despega/ExerciseWorkspace.tsx`: full-screen sheet and the five interaction renderers.
- Modify `src/pages/Ejercicios.tsx`: query-string navigation, index/workspace switching, focus restoration.
- Modify `src/pages/Ejercicios.test.tsx`: full-screen navigation, D1 behavior, autosave, and representative interaction tests.
- Modify `src/despega/exercises.ts`: repair source truncation against the published workbook without changing method copy.
- Modify `src/despega/letters.ts`: unify chapter ambience into the Cobre vivo family.
- Modify `src/despega/ejercicios.css`: Cobre vivo index/workspace, responsive layout, reduced motion, and clean print rules.
- Modify `src/despega/exercisePdf.ts`: accept structured print blocks and paginate instead of truncating.
- Modify `src/despega/exercisePdf.test.ts`: multipage and structured-family PDF coverage.

### Task 1: Lock the exercise experience model

**Files:**
- Create: `src/despega/exerciseExperiences.ts`
- Create: `src/despega/exerciseExperiences.test.ts`

- [ ] **Step 1: Write the failing configuration tests**

```ts
import { describe, expect, it } from "vitest";
import { EXERCISES } from "./exercises";
import { EXPERIENCE_BY_CODE, answerToBlocks } from "./exerciseExperiences";

describe("experiencias del cuaderno", () => {
  it("configura explicitamente los 20 ejercicios", () => {
    expect(Object.keys(EXPERIENCE_BY_CODE).sort()).toEqual(EXERCISES.map(x => x.code).sort());
  });

  it("D1 es una pausa sin campos ni PDF", () => {
    expect(EXPERIENCE_BY_CODE.D1).toMatchObject({ kind: "pause", duration: 10, downloadable: false });
  });

  it("normaliza clasificaciones y composiciones para imprimir", () => {
    expect(answerToBlocks("E2", { drena: ["Junta"], neutro: [], recarga: ["Caminar"] }))
      .toEqual([{ label: "Me drena", lines: ["Junta"] }, { label: "Me recarga", lines: ["Caminar"] }]);
    expect(answerToBlocks("P4", { weeks: "2", goal: "publicar", feeling: "curiosidad", cadence: "3 mañanas" })[0].lines[0])
      .toContain("Durante las próximas 2 semanas");
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `pnpm test -- src/despega/exerciseExperiences.test.ts`  
Expected: FAIL because `exerciseExperiences.ts` does not exist.

- [ ] **Step 3: Implement explicit experience types and the complete mapping**

```ts
export type AnswerValue = string | string[];
export type ExerciseAnswer = Record<string, AnswerValue>;
export type PrintBlock = { label: string; lines: string[] };

type Experience =
  | { kind: "pause"; duration: number; downloadable: false }
  | { kind: "writing"; prompts: string[]; downloadable: true }
  | { kind: "capture"; categories: { key: string; label: string }[]; downloadable: true }
  | { kind: "decision"; categories: { key: string; label: string }[]; downloadable: true }
  | { kind: "compose"; fields: { key: string; label: string; placeholder: string }[]; template: string; downloadable: true };

const categories = (...pairs: [string, string][]) => pairs.map(([key, label]) => ({ key, label }));

export const EXPERIENCE_BY_CODE: Record<string, Experience> = {
  D1: { kind: "pause", duration: 10, downloadable: false },
  D2: { kind: "writing", prompts: ["Encuentra el momento", "Encuentra la conclusión que sacaste", "Ve dónde te ha servido", "Escribe la despedida", "Déjala a la vista"], downloadable: true },
  D3: { kind: "compose", fields: [{ key: "old", label: "La frase automática", placeholder: "Por ejemplo: no fue nada" }, { key: "story", label: "La historia que cuenta", placeholder: "Lo que esa frase dice de mí" }, { key: "new", label: "La frase que elijo", placeholder: "Una respuesta que sí me represente" }], template: "Cuando aparezca {old}, voy a elegir {new}, porque la historia que quiero contar es {story}.", downloadable: true },
  D4: { kind: "capture", categories: categories(["audio", "Lo que escuché"], ["body", "Lo que vi"], ["patterns", "Tres automatismos"]), downloadable: true },
  E1: { kind: "decision", categories: categories(["fourEight", "4 · 4 · 8"], ["box", "Respiración de caja"], ["hold", "Retención cómoda"]), downloadable: true },
  E2: { kind: "capture", categories: categories(["drena", "Me drena"], ["neutro", "Neutro"], ["recarga", "Me recarga"]), downloadable: true },
  S1: { kind: "capture", categories: categories(["returns", "Drena y devuelve"], ["empty", "Drena y no devuelve"]), downloadable: true },
  S2: { kind: "writing", prompts: ["Lo que quiero decir en voz alta", "La justificación que se me salió"], downloadable: true },
  S3: { kind: "writing", prompts: ["Lo que me dio", "Por qué ya no me corresponde", "Lo que me llevo", "Mi frase de cierre"], downloadable: true },
  S4: { kind: "decision", categories: categories(["leaves", "Lo que se va"], ["stays", "Lo que se queda"]), downloadable: true },
  P1: { kind: "writing", prompts: ["Soy…", "Lo que doy a otros", "El nombre de mi súper yo"], downloadable: true },
  P2: { kind: "capture", categories: categories(["have", "Ya lo tengo"], ["known", "Sé cómo conseguirlo"], ["unknown", "Todavía no sé cómo"]), downloadable: true },
  P3: { kind: "capture", categories: categories(["skills", "Lo que sé hacer"], ["groups", "Parentescos"], ["territory", "Mi territorio"]), downloadable: true },
  P4: { kind: "compose", fields: [{ key: "weeks", label: "Duración", placeholder: "2" }, { key: "goal", label: "Meta", placeholder: "publicar mi idea" }, { key: "feeling", label: "Cómo quiero sentirme", placeholder: "curiosidad" }, { key: "cadence", label: "Ritmo real", placeholder: "3 mañanas" }], template: "Durante las próximas {weeks} semanas voy a {goal}, sintiendo {feeling}, dedicándole {cadence}.", downloadable: true },
  EJ1: { kind: "capture", categories: categories(["one", "1 · Natural"], ["two", "2 · Concentración"], ["three", "3 · Vencer resistencia"]), downloadable: true },
  EJ2: { kind: "compose", fields: [{ key: "hard", label: "Qué cuesta sostener", placeholder: "Lo que pesa esta semana" }, { key: "reduce", label: "Qué puedo reducir", placeholder: "Un ajuste concreto" }, { key: "keep", label: "Qué sí quiero sostener", placeholder: "El rumbo que permanece" }], template: "Esta semana ajusto {reduce} porque {hard}; mantengo {keep}.", downloadable: true },
  G1: { kind: "capture", categories: categories(["good", "Qué salió bien"], ["bad", "Qué salió mal"], ["felt", "Cómo me sentí"]), downloadable: true },
  G2: { kind: "writing", prompts: ["¿Qué necesito recordar de hoy?"], downloadable: true },
  A1: { kind: "capture", categories: categories(["input", "Qué le meto"], ["return", "Qué me devuelve"], ["parts", "Las piezas del sistema"]), downloadable: true },
  A2: { kind: "decision", categories: categories(["facts", "Lo que sé"], ["fear", "Lo que estoy imaginando"], ["choice", "La decisión"]), downloadable: true },
};
```

Add `answerToBlocks(code, answer)` that omits empty values, labels categories/fields from the configuration, and expands the `compose.template` by replacing `{key}` tokens.

- [ ] **Step 4: Run the configuration tests**

Run: `pnpm test -- src/despega/exerciseExperiences.test.ts`  
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/despega/exerciseExperiences.ts src/despega/exerciseExperiences.test.ts
git commit -m "feat: modela experiencias del cuaderno"
```

### Task 2: Add resilient local autosave

**Files:**
- Create: `src/despega/exerciseStorage.ts`
- Create: `src/despega/exerciseStorage.test.ts`

- [ ] **Step 1: Write failing storage tests**

Test that `loadAnswer("D2")` returns `{}` initially, `saveAnswer` round-trips values under `despega:exercise:D2:v1`, `clearAnswer` removes them, and a mocked `localStorage.setItem` exception returns `{ persisted: false }` while `loadAnswer` still reads the in-memory value.

- [ ] **Step 2: Verify failure**

Run: `pnpm test -- src/despega/exerciseStorage.test.ts`  
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the adapter**

```ts
import type { ExerciseAnswer } from "./exerciseExperiences";

const memory = new Map<string, ExerciseAnswer>();
const keyFor = (code: string) => `despega:exercise:${code}:v1`;

export function loadAnswer(code: string): ExerciseAnswer {
  try {
    const raw = localStorage.getItem(keyFor(code));
    if (raw) return JSON.parse(raw).values ?? {};
  } catch { /* memory fallback below */ }
  return memory.get(code) ?? {};
}

export function saveAnswer(code: string, values: ExerciseAnswer) {
  memory.set(code, values);
  try {
    localStorage.setItem(keyFor(code), JSON.stringify({ version: 1, updatedAt: new Date().toISOString(), values }));
    return { persisted: true };
  } catch { return { persisted: false }; }
}

export function clearAnswer(code: string) {
  memory.delete(code);
  try { localStorage.removeItem(keyFor(code)); return true; } catch { return false; }
}
```

- [ ] **Step 4: Run storage tests**

Run: `pnpm test -- src/despega/exerciseStorage.test.ts`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/despega/exerciseStorage.ts src/despega/exerciseStorage.test.ts
git commit -m "feat: guarda respuestas localmente"
```

### Task 3: Make PDF output structured and multipage

**Files:**
- Modify: `src/despega/exercisePdf.ts`
- Modify: `src/despega/exercisePdf.test.ts`

- [ ] **Step 1: Add failing PDF tests**

Add tests that pass `PrintBlock[]`, verify category labels, generate a 200-line answer, assert `/Count 2` or greater, and assert a sentinel from the last line is present. Keep the WinAnsi, parentheses and xref assertions.

- [ ] **Step 2: Verify the long-answer test fails**

Run: `pnpm test -- src/despega/exercisePdf.test.ts`  
Expected: FAIL because the current writer truncates when `y` reaches the bottom margin.

- [ ] **Step 3: Refactor the writer to paginate**

Change `buildExercisePdfString(exercise, answers)` to accept `ExerciseAnswer`, call `answerToBlocks`, accumulate one content stream per page, and create page/content object pairs dynamically. Before each output line, call `ensureSpace(linesNeeded)`; if the remaining space is insufficient, close the current page and continue on a new one. Build `/Kids [...]` and `/Count N` from the actual pages, then compute the xref over the dynamic object list.

- [ ] **Step 4: Run PDF tests**

Run: `pnpm test -- src/despega/exercisePdf.test.ts`  
Expected: PASS with the final sentinel present and multiple pages declared.

- [ ] **Step 5: Commit**

```bash
git add src/despega/exercisePdf.ts src/despega/exercisePdf.test.ts
git commit -m "fix: pagina respuestas completas en pdf"
```

### Task 4: Build the full-screen exercise workspace

**Files:**
- Create: `src/despega/ExerciseWorkspace.tsx`
- Modify: `src/pages/Ejercicios.test.tsx`

- [ ] **Step 1: Replace modal expectations with failing workspace tests**

Cover these observable behaviors:

```ts
it("abre D1 como pausa de pantalla completa sin textbox ni PDF", async () => {
  render(<Ejercicios />);
  await userEvent.click(screen.getByText("D1").closest("button")!);
  expect(screen.getByRole("main", { name: /D1 · Escúchate/i })).toBeTruthy();
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(screen.queryByRole("textbox")).toBeNull();
  expect(screen.queryByText(/descargar esta hoja/i)).toBeNull();
});

it("E2 permite agregar elementos a sus tres categorías", async () => {
  render(<Ejercicios />);
  await userEvent.click(screen.getByText("E2").closest("button")!);
  expect(screen.getByRole("heading", { name: "Me drena" })).toBeTruthy();
  expect(screen.getByRole("heading", { name: "Neutro" })).toBeTruthy();
  expect(screen.getByRole("heading", { name: "Me recarga" })).toBeTruthy();
});
```

- [ ] **Step 2: Verify tests fail**

Run: `pnpm test -- src/pages/Ejercicios.test.tsx`  
Expected: FAIL because the current UI is a dialog with universal textareas.

- [ ] **Step 3: Implement `ExerciseWorkspace`**

The component accepts `{ exercise, answer, onChange, onBack, saveState }`, obtains `EXPERIENCE_BY_CODE[exercise.code]`, and renders:

- `PauseExperience`: start/reset ten-second timer and one instruction, no answer mutation;
- `WritingExperience`: one large editorial textarea per prompt;
- `CaptureExperience`: category sections with add input, remove, and move-left/move-right buttons;
- `DecisionExperience`: same accessible move controls with stronger two/three-zone presentation;
- `ComposeExperience`: labeled inputs plus a live sentence expanded from the template.

Use buttons for every move so touch and keyboard never depend on drag. Render `exercise.expect` and `exercise.signal` in collapsible contextual notes. Render PDF and print actions only when `downloadable` is true and the normalized answer has content.

- [ ] **Step 4: Run page tests**

Run: `pnpm test -- src/pages/Ejercicios.test.tsx`  
Expected: representative D1 and E2 tests pass; navigation tests remain for Task 5.

- [ ] **Step 5: Commit**

```bash
git add src/despega/ExerciseWorkspace.tsx src/pages/Ejercicios.test.tsx
git commit -m "feat: crea hojas interactivas de pantalla completa"
```

### Task 5: Replace modal state with URL state and autosave

**Files:**
- Modify: `src/pages/Ejercicios.tsx`
- Modify: `src/pages/Ejercicios.test.tsx`

- [ ] **Step 1: Add failing URL and persistence tests**

Test direct rendering from `history.replaceState({}, "", "/ejercicios/?ejercicio=P4")`, opening a card writes `?ejercicio=`, the back button clears it, browser `popstate` restores the index, typing into G2 survives unmount/remount, and clearing a response requires confirmation.

- [ ] **Step 2: Verify tests fail**

Run: `pnpm test -- src/pages/Ejercicios.test.tsx`  
Expected: FAIL because state currently lives only in `useState` and the modal owns answers.

- [ ] **Step 3: Implement URL-derived active state**

Use a `readCode()` helper around `new URLSearchParams(location.search)`, listen for `popstate`, and call `history.pushState` when opening or returning. Store the opener element and restore focus after returning. Mount either the index or `ExerciseWorkspace`, never both.

- [ ] **Step 4: Wire debounced autosave**

Hydrate with `loadAnswer(code)`, keep the answer in page state, and save 350 ms after changes. Show `Guardando…`, `Guardado en este dispositivo`, or `No se pudo guardar; sigue abierto en esta sesión`. Clear through `window.confirm` and `clearAnswer`.

- [ ] **Step 5: Run page tests**

Run: `pnpm test -- src/pages/Ejercicios.test.tsx`  
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Ejercicios.tsx src/pages/Ejercicios.test.tsx
git commit -m "feat: navega y autoguarda hojas de ejercicios"
```

### Task 6: Apply Cobre vivo, responsive behavior, and print isolation

**Files:**
- Modify: `src/despega/letters.ts`
- Modify: `src/despega/ejercicios.css`

- [ ] **Step 1: Unify chapter ambience**

Replace the blue and yellow outliers with copper-family RGB values while keeping perceptible temperature differences: D `188,105,59`, E `207,132,82`, S `176,82,43`, P `226,161,103`, EJ `204,103,51`, G `165,91,53`, A `215,127,69`. Keep intensity between `.04` and `.08` so the content remains dominant.

- [ ] **Step 2: Replace modal CSS with Cobre vivo workspace CSS**

Remove `.sheet__scrim` and modal positioning. Add:

- `.exercise-workspace` as the only active document scroll surface;
- atmospheric pseudo-elements for the low-opacity spiral and localized technical grid;
- `.workbook-sheet` with ink surface and copper margin rule;
- responsive stacks for capture/decision zones;
- minimum 44 px targets and visible `:focus-visible` rings;
- compose inputs that become block rows below 600 px;
- `min-height: 100svh` without fixed editable-content heights.

- [ ] **Step 3: Add reduced-motion and print rules**

```css
@media (prefers-reduced-motion: reduce) {
  .exercise-workspace *, .exercise-workspace *::before, .exercise-workspace *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}

@media print {
  @page { size: letter; margin: 16mm; }
  .exercise-workspace { min-height: auto; background: #fff !important; color: #161219 !important; }
  .exercise-workspace::before, .exercise-workspace::after,
  .workbook-toolbar, .workbook-actions, .save-state, .move-controls { display: none !important; }
  .workbook-sheet { width: auto; margin: 0; padding: 0; border: 0; box-shadow: none; background: #fff !important; }
  textarea, input { border: 0; color: #161219 !important; background: transparent !important; overflow: visible; }
  .capture-card, .decision-zone, .context-note { break-inside: avoid; color: #161219; border-color: #777; }
}
```

- [ ] **Step 4: Run tests and build**

Run: `pnpm test && pnpm run build`  
Expected: all tests pass; build verifier confirms `/ejercicios/` assets.

- [ ] **Step 5: Commit**

```bash
git add src/despega/letters.ts src/despega/ejercicios.css
git commit -m "feat: viste el cuaderno con cobre vivo"
```

### Task 7: Repair workbook source integrity

**Files:**
- Modify: `src/despega/exercises.ts`
- Modify: `src/despega/exerciseExperiences.test.ts`

- [ ] **Step 1: Extract the published workbook text for comparison**

Use the bundled Python runtime with `pypdf.PdfReader("public/assets/despega-workbook.pdf")` and print only pages containing `D3`, `D4`, `E1`, `E2`, `A2` or their titles. Do not modify the PDF.

- [ ] **Step 2: Repair only proven truncations**

Replace strings ending mid-sentence in the current `steps` arrays with the complete sentences extracted from the workbook. Restore A2's actual steps from the same source. Do not rewrite purpose, expectations, tone, or method.

- [ ] **Step 3: Add integrity assertions**

Assert that every non-pause exercise has meaningful configuration and that no `steps` entry ends with the known broken fragments (`"cuando"`, `"por"`, `"la"`, `"metido"`, `"encogido?"` is valid only if complete in source). Assert A2 has at least one source step.

- [ ] **Step 4: Run the complete suite**

Run: `pnpm test`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/despega/exercises.ts src/despega/exerciseExperiences.test.ts
git commit -m "fix: restaura instrucciones completas del cuaderno"
```

### Task 8: Final visual, mobile, print, and deployment verification

**Files:**
- Modify if failures require it: `src/despega/ExerciseWorkspace.tsx`, `src/pages/Ejercicios.tsx`, `src/despega/ejercicios.css`, related tests

- [ ] **Step 1: Run static verification**

Run: `pnpm test && pnpm run typecheck && pnpm run build`  
Expected: zero failures and a verified multipage build.

- [ ] **Step 2: Preview production build**

Run: `pnpm run preview -- --host 127.0.0.1` and open `/ejercicios/`.

- [ ] **Step 3: Inspect representative exercises**

Check D1 pause, D2 writing, E2 capture, S4 decision, and P4 composition at 1440, 768, 375, and 320 px. Verify only one scrollbar, no navbar collision, no horizontal overflow, visible focus, and a stable mobile keyboard layout.

- [ ] **Step 4: Verify persistence and navigation**

Write in G2, reload, use back/forward, reopen G2, then clear it. Verify the direct P4 query URL restores correctly.

- [ ] **Step 5: Verify print and PDF**

Print E2 and a long D2 response to letter-sized PDF. Confirm no index, navbar, atmosphere, controls, clipped text, or blank overlay appears. Download the structured PDF and confirm every last response is present on its final page.

- [ ] **Step 6: Run final diff and status checks**

Run: `git diff --check && git status --short`  
Expected: no whitespace errors; only intentional files changed.

- [ ] **Step 7: Commit any verification fixes**

```bash
git add src/despega src/pages/Ejercicios.tsx src/pages/Ejercicios.test.tsx
git commit -m "fix: pule cuaderno despega en movil e impresion"
```
