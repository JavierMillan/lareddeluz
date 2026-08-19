# Red de Luz Atlas Vivo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recuperar el recorrido narrativo de La Red de Luz y convertir el selector actual en un atlas accesible de cinco constelaciones con enfoque inmersivo y destinos propios.

**Architecture:** El contenido vive en un modelo discriminado y las figuras SVG reales se resuelven por identificador. `ConstellationAtlas` controla selección y distribución; `ConstellationFocus` encapsula el diálogo, el foco y el bloqueo del fondo. `RedDeLuzApp` sólo orquesta fases del cielo y compone el recorrido.

**Tech Stack:** React 18, TypeScript, Motion, SVG, CSS responsive, Vitest, Testing Library, Vite multipágina.

---

## File map

- Modify `src/red-de-luz/data/constellations.ts`: cinco ecosistemas, contenido, destinos y figura real.
- Modify `src/red-de-luz/data/constellations.test.ts`: contrato de enlaces, estado suspendido y figuras.
- Create `src/red-de-luz/components/ConstellationFigure.tsx`: geometría SVG reutilizable.
- Create `src/red-de-luz/components/ConstellationFigure.test.tsx`: selección de figura y título accesible.
- Create `src/red-de-luz/components/NarrativeJourney.tsx`: reflejo, vínculo, definición y contexto de red.
- Create `src/red-de-luz/components/NarrativeJourney.test.tsx`: copy y estructura del recorrido.
- Replace `src/red-de-luz/components/ConstellationObservatory.tsx` with `ConstellationAtlas.tsx`: campo de exploración.
- Replace its test with `ConstellationAtlas.test.tsx`: teclado, selección y estado suspendido.
- Create `src/red-de-luz/components/ConstellationFocus.tsx`: diálogo inmersivo accesible.
- Create `src/red-de-luz/components/ConstellationFocus.test.tsx`: Escape, foco y CTA contextual.
- Modify `src/red-de-luz/components/SiteNavigation.tsx`: logo real y CTA global.
- Modify `src/red-de-luz/components/NetworkFinale.tsx`: grupo general de avisos.
- Modify `src/red-de-luz/components/SkyField.tsx`: reducir competencia visual según fase.
- Modify `src/red-de-luz/RedDeLuzApp.tsx`: composición completa y estado del enfoque.
- Rewrite `src/red-de-luz/red-de-luz.css`: tokens, ritmo, atlas, diálogo y mobile.

### Task 1: Expand constellation model

**Files:**
- Modify: `src/red-de-luz/data/constellations.ts`
- Modify: `src/red-de-luz/data/constellations.test.ts`

- [ ] **Step 1: Write failing model assertions**

Add expectations that ids equal `despega, dtmm, ingles, lectura, vitalbeat`; active destinations match the approved URLs; each item has `figure`; VitalBeat has no CTA.

```ts
expect(CONSTELLATIONS.map(({ id }) => id)).toEqual([
  "despega", "dtmm", "ingles", "lectura", "vitalbeat",
]);
expect(CONSTELLATIONS.find(({ id }) => id === "ingles")?.cta.href)
  .toBe("https://chat.whatsapp.com/Iw8zFKhkPVaFTGHrMPtTWi");
expect(CONSTELLATIONS.find(({ id }) => id === "lectura")?.cta.href)
  .toBe("https://chat.whatsapp.com/BxRf4AsM93G7DocbbtQGF7");
```

- [ ] **Step 2: Run the model test and confirm failure**

Run: `node_modules/.bin/vitest.cmd run src/red-de-luz/data/constellations.test.ts`  
Expected: FAIL because `lectura` and the new destinations do not exist.

- [ ] **Step 3: Implement the discriminated data contract**

Use `figure: "aquila" | "lyra" | "gemini" | "corona-borealis" | "leo"`, `context`, `metaphor`, and approved CTAs. Set DTMM to `https://detumentealmundo.lareddeluz.com/`; set VitalBeat to suspended with the brief studio context and no CTA.

- [ ] **Step 4: Run the test and commit**

Run: `node_modules/.bin/vitest.cmd run src/red-de-luz/data/constellations.test.ts`  
Expected: PASS.

Commit: `feat: amplia el mapa actual de constelaciones`

### Task 2: Build reusable real constellation figures

**Files:**
- Create: `src/red-de-luz/components/ConstellationFigure.tsx`
- Create: `src/red-de-luz/components/ConstellationFigure.test.tsx`

- [ ] **Step 1: Write the failing figure test**

```tsx
render(<ConstellationFigure figure="aquila" label="Aquila" />);
expect(screen.getByRole("img", { name: "Aquila" })).toBeInTheDocument();
expect(screen.getByTestId("constellation-aquila").querySelectorAll("circle").length)
  .toBeGreaterThan(5);
```

- [ ] **Step 2: Confirm RED**

Run: `node_modules/.bin/vitest.cmd run src/red-de-luz/components/ConstellationFigure.test.tsx`  
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement figure geometry**

Store viewBox, paths and nodes for Aquila, Lyra, Gemini, Corona Borealis and Leo in a typed record. Render one SVG with `<title>`, a soft glow path, a crisp path and star circles. Use the Stellarium western connection topology; do not add invented connections.

- [ ] **Step 4: Confirm GREEN and commit**

Run the targeted test. Expected: PASS.  
Commit: `feat: dibuja constelaciones basadas en stellarium`

### Task 3: Restore the narrative journey

**Files:**
- Create: `src/red-de-luz/components/NarrativeJourney.tsx`
- Create: `src/red-de-luz/components/NarrativeJourney.test.tsx`
- Modify: `src/red-de-luz/components/NarrativePrologue.tsx`

- [ ] **Step 1: Write the failing journey test**

```tsx
render(<NarrativeJourney onPhaseChange={() => undefined} />);
expect(screen.getByRole("heading", { name: /No estás perdido/ })).toBeInTheDocument();
expect(screen.getByText(/una persona es un nodo/i)).toBeInTheDocument();
expect(screen.getByText(/proyecto convertido en ecosistema humano/i)).toBeInTheDocument();
```

- [ ] **Step 2: Confirm RED**

Run the targeted test. Expected: missing module.

- [ ] **Step 3: Implement three varied sections**

Create `ReflectionSection`, `LinkSection`, and `ConstellationDefinitionSection` within the focused file. Use the approved copy, three recognition statements, a two-node visual demonstration, and phase callbacks. Keep the existing hero but add the two CTA destinations and reduce its aside dominance.

- [ ] **Step 4: Confirm GREEN and commit**

Run prologue and journey tests. Expected: PASS.  
Commit: `feat: recupera el recorrido narrativo de la red`

### Task 4: Replace radar with the atlas

**Files:**
- Create: `src/red-de-luz/components/ConstellationAtlas.tsx`
- Create: `src/red-de-luz/components/ConstellationAtlas.test.tsx`
- Delete: `src/red-de-luz/components/ConstellationObservatory.tsx`
- Delete: `src/red-de-luz/components/ConstellationObservatory.test.tsx`

- [ ] **Step 1: Write failing interaction tests**

```tsx
const onSelect = vi.fn();
render(<ConstellationAtlas onSelect={onSelect} />);
await user.click(screen.getByRole("button", { name: /Club de Lectura/ }));
expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "lectura" }));
expect(screen.getByRole("button", { name: /VitalBeat, suspendida/ })).toBeInTheDocument();
```

Add ArrowRight wrap-around and Home/End coverage.

- [ ] **Step 2: Confirm RED**

Run the targeted test. Expected: missing module.

- [ ] **Step 3: Implement the transparent atlas**

Render a short heading, route SVG and five semantic buttons containing `ConstellationFigure`. Use `data-constellation` and status attributes rather than inline layout values. Call `onSelect(item, trigger)` for active items and for VitalBeat so its context remains viewable. Do not render card surfaces.

- [ ] **Step 4: Confirm GREEN and commit**

Run targeted atlas tests. Expected: PASS.  
Commit: `feat: transforma el radar en un atlas vivo`

### Task 5: Implement the immersive focus dialog

**Files:**
- Create: `src/red-de-luz/components/ConstellationFocus.tsx`
- Create: `src/red-de-luz/components/ConstellationFocus.test.tsx`

- [ ] **Step 1: Write failing dialog tests**

Cover:

```tsx
expect(screen.getByRole("dialog", { name: "DESPEGA" })).toBeInTheDocument();
await user.keyboard("{Escape}");
expect(onClose).toHaveBeenCalledOnce();
expect(screen.getByRole("link", { name: "Recorrer el método" })).toHaveAttribute("href", "/despega/");
```

Also assert that VitalBeat renders `Suspendida por ahora` and no link.

- [ ] **Step 2: Confirm RED**

Run the targeted test. Expected: missing module.

- [ ] **Step 3: Implement accessible focus management**

Render only when `selected` exists. Use `role="dialog"`, `aria-modal="true"`, heading linkage, Escape listener, initial close-button focus, Tab wrap across focusable controls, body scroll lock and cleanup. Call `onClose`; `RedDeLuzApp` restores focus to the stored trigger. External CTAs receive `_blank` and `noopener`.

- [ ] **Step 4: Confirm GREEN and commit**

Run the targeted test. Expected: PASS.  
Commit: `feat: agrega enfoque inmersivo a las constelaciones`

### Task 6: Compose the approved experience and responsive system

**Files:**
- Modify: `src/red-de-luz/RedDeLuzApp.tsx`
- Modify: `src/red-de-luz/components/SiteNavigation.tsx`
- Modify: `src/red-de-luz/components/NetworkFinale.tsx`
- Modify: `src/red-de-luz/components/SkyField.tsx`
- Rewrite: `src/red-de-luz/red-de-luz.css`

- [ ] **Step 1: Add an integration test**

Render the app, assert the real logo, general WhatsApp CTA, atlas heading, five constellation controls, and opening/closing the Club de Lectura focus.

- [ ] **Step 2: Confirm the integration test fails**

Expected: current app still renders the observatory and lacks the journey.

- [ ] **Step 3: Compose state and focus restoration**

Keep `selected: Constellation | null` and `triggerRef`. On atlas selection, store trigger and open focus; on close, clear selection and focus the trigger in `requestAnimationFrame`. Render hero → journey → atlas → network context → finale. Mark the background content inert and `aria-hidden` while the dialog is open.

- [ ] **Step 4: Implement visual tokens and desktop layout**

Set the environmental network opacity below text, introduce varied section grids, transparent constellation buttons, focus rings and the desktop immersive layout. Use the existing logo asset.

- [ ] **Step 5: Implement mobile layout**

At `max-width: 760px`, replace absolute constellation coordinates with a two-column staggered grid and full-width center item; at `max-width: 430px`, use one alternating vertical route. The focus layout becomes figure-first, content-second, with a reachable CTA and no fixed content height.

- [ ] **Step 6: Implement reduced motion and contrast fixes**

Remove zoom and path drawing under `prefers-reduced-motion`; retain immediate opacity state changes. Raise secondary labels to AA contrast and add non-color selected/suspended signals.

- [ ] **Step 7: Run all tests and commit**

Run: `node_modules/.bin/vitest.cmd run`  
Expected: all tests PASS.  
Commit: `feat: ensambla la experiencia atlas de la red`

### Task 7: Audit and production verification

**Files:**
- Review: `src/red-de-luz/**/*.tsx`
- Review: `src/red-de-luz/red-de-luz.css`
- Review: `index.html`

- [ ] **Step 1: Run design critique**

Capture 1440 × 1000, 390 × 844 and 320 × 800. Verify first impression, hierarchy, section rhythm, atlas affordance and focus-mode clarity. Fix critical and major findings only, then recapture affected viewports.

- [ ] **Step 2: Run WCAG 2.1 AA checks**

Test keyboard-only atlas/dialog use, Escape, focus restoration, visible focus, touch targets, 200% zoom, reduced motion and text contrast. Fix every blocking or major finding.

- [ ] **Step 3: Apply current Web Interface Guidelines**

Fetch `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md` and review the modified TSX/CSS files in terse `file:line` form. Fix actionable critical/major findings.

- [ ] **Step 4: Verify links and statuses**

Confirm the general CTA uses the announcements group, Inglés and Lectura use their dedicated groups, DTMM uses its root domain, DESPEGA uses `/despega/`, and VitalBeat has no action.

- [ ] **Step 5: Run the fresh final gate**

Run: `node_modules/.bin/vitest.cmd run`  
Run: `node_modules/.bin/tsc.cmd -b --pretty false`  
Run: `node_modules/.bin/vite.cmd build`  
Run: `node scripts/verify-build.mjs`  
Expected: zero test failures, zero TypeScript errors, successful Vite build and `Build contract: OK`.

- [ ] **Step 6: Commit the audit fixes**

Commit: `fix: cierra auditoria ux y responsive del atlas`
