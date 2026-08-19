---
target: DESPEGA - los 7 instrumentos
total_score: 23
max_score: 32
na_heuristics: 5,9
p0_count: 2
p1_count: 2
timestamp: 2026-08-19T21-58-49Z
slug: src-despega-mechanics-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence)

## Design Specificity Verdict

Authored, with a precise failure at the last inch. The shell is genuinely bespoke — hand-modeled copper medallions, nautical grid, fractal paper grain, unmistakable single-author copy. But the seven instruments are category-interchangeable widgets wearing copper: a range slider, a play/pause toggle, a segmented filter, a stepper, a send button, a tab group. The atmosphere was authored; the interactions were specified.

Detector: 2 findings, both `layout-transition` on `.tremble__wave i` (despega.css:184,188). Both dismissed as false positives — 2px bars in a fixed-height flex row, firing once on click; `transform` would distort the glow.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Compass bearing produces no status when moved |
| 2 | Match System / Real World | 2 | Controls speak UI; copy speaks life |
| 3 | User Control and Freedom | 4 | Keyboard, swipe, hash, Escape — complete |
| 4 | Consistency and Standards | 2 | JetBrains Mono declared as identity spine, never applied |
| 5 | Error Prevention | n/a | No destructive actions exist |
| 6 | Recognition Rather Than Recall | 3 | Two identical "E" medallions on mobile |
| 7 | Flexibility and Efficiency | 3 | No progress persistence across reload |
| 8 | Aesthetic and Minimalist Design | 3 | S-Selecciona: 7 targets in the chapter about carrying less |
| 9 | Error Recovery | n/a | Nothing can fail |
| 10 | Help and Documentation | 3 | Swipe and arrow-key nav never disclosed |
| **Total** | | **23/32** | n/a: 5, 9 |

## Per-chapter promise/control coherence

| Letter | Promise | What the control does | Verdict |
|---|---|---|---|
| D Descubre | Adrift, lost the helm | Precision slider, 141 positions | Contradicts |
| E Envia Calma | Lower the noise | Button to start, button to pause | Contradicts |
| S Selecciona | Discriminate what drains | Every item pre-labeled with the answer | Contradicts |
| P Planifica | "Aqui escribes a tu super tu" | Reveals the author's lines. "Ruta trazada" | Contradicts |
| E Ejecuta | The tremble with nobody listening | Send then disabled | Closest |
| G Guarda | Every dream born of a wound | 2-option radio group | Contradicts |
| A Ajusta | Decided to jump, body will not move | One click and it moves | Contradicts |

Pattern: five end in an imperative (Comenzar · Escribir · Mandar · Cruzar · Pausar); four terminate in a disabled past-tense label. These chapters are about things that do not complete; the interface issues completion receipts.

## Priority Issues

**[P0] Instruments issue commands and hand out receipts.** Fix: remove the start gate on Breath (orb breathes on mount); make terminal states continuous (waveform decays toward a low pulse; the dot crosses and the pull-back remains); rewrite labels from imperative to first person (`Cruzar el umbral` becomes `Salto`).

**[P0] P-Planifica takes the pen from the reader.** Body says the reader writes their future self, button says "Escribir en presente", and it reveals the AUTHOR's three lines, then claims "Ruta trazada". Violates both brand profiles' central law (reader is hero; Javi is mentor-evidence). Fix: `Soy` in Instrument Serif plus a bare editable field; demote the author's lines below at rgba(255,255,255,.28) under a mono label.

**[P1] Weigh prints the answer key on the quiz.** Every row renders "drena"/"cuesta y vale" before the reader classifies. Collapses discriminate into agree, inverting the chapter's thesis that these things arrive unlabeled. Fix: one unlabeled item at a time, sent left or right.

**[P1] The compass asserts precision in the chapter about being adrift.** And it is the FIRST interaction of the method — teaches in three seconds that this is a control panel. Fix: remove the slider; the needle drifts on its own; the only affordance is to HOLD — press and it steadies, release and it drifts.

**[P2] Two authored systems never wired.** Verified by grep: JetBrains Mono is downloaded (despega/index.html:25) and appears 0 times in despega.css, which uses 17 bare `monospace`, resolving to Courier New on Windows. And `amb`/`ambA` in letters.ts encode a per-chapter emotional climate (blue at E, gold peak at P, settled copper at A), documented in the file header, consumed by nothing. Also dead: `sub`, `exercises`.

## Accessibility (Assessment B, verified independently)

- **Breath is the most hostile chapter to screen readers**: `role="status"` on text rotating every 2400ms indefinitely, announcing the three breath words forever. `Mechanics.tsx` never calls `useReducedMotion`, so prefers-reduced-motion cannot reach it (JS, not CSS).
- **G-Guarda selection state has no accessible signal** — no aria-pressed / role=radio / aria-current; conveyed only by border color.
- Contrast failures (two independent methods agreeing within 0.03): `.chapter-journey__controls>span` 2.08:1 at 8.6px; `.flight-path button small` 2.07:1 at 8px; `.weigh-list small` 2.43:1 at 7.7px; `.despega-hero__telemetry` 1.79:1 at 8.5px. 16 elements under 12px; smallest three at roughly half the 16px baseline.
- Touch targets under 44px (runtime-measured): 7 flight-path medallions 38-41px wide; weigh-list rows 41px tall (min-height:0 explicitly cancels the 44px floor); nav links 10-11px tall.
- Strengths: focus-visible covers all four interactive types with no `outline:none` anywhere; the SMIL satellite — which escapes CSS reduced-motion because SMIL ignores animation-duration — is correctly neutralized via `display:none`.

## What's Working

1. **The flight-path medallions' state machine** — three states with distinct physical logic (cold struck metal, heated and stayed hot, chest opening), not opacity variations.
2. **The letter glyph as atmosphere** — drawn twice (metal gradient fill plus stroked outline), then deliberately subordinated: z-index -1, opacity .55, off-center, pushed into its own grid band.
3. **Navigation accessibility is load-bearing** — focus moves to the chapter h2, aria-live announces the chapter, arrow keys stand down inside inputs, Escape returns to index.

## Minor Observations

- Two E letters (positions 2 and 5) render identical medallions on mobile where `em` is hidden.
- Mixed vehicle metaphor: flight map plus aviation telemetry over a nautical chapter one, with a compass.
- The brief names an ascending spiral twice as the central motif; the page ships a horizontal rail.
- Instrument state is local useState, destroyed by AnimatePresence mode="wait" — the rail visualizes accumulated progress over chapters that forget everything.
- `.instrument { overflow: auto }` creates a nested scroll region inside a page that otherwise guarantees one screen per chapter.
- Particles are fixed at z-index 0 behind a near-opaque chapter background — 60 animated elements visible only on hero and final.

## Questions to Consider

1. If you deleted every button, what would still work? The breathing orb, the drifting needle, the trembling waveform, the glyph's breath, the satellite. The page is best exactly where it stops asking for input.
2. Seven climates written into letters.ts and never rendered — a build that ran out of time, or did wiring it feel like decoration?
3. Is there a single sentence in this book that would survive being followed by a greyed-out completion badge?
4. In the chapter where the reader is supposed to write, the reader reads — and it is the author's words.
5. The brief names the ascending spiral twice. The page ships a flat line.
6. The reader arrives at E-Envia Calma exhausted and must press a button to be allowed to relax. Count how many places require an action to receive the promised state. That number is the gap between an experience and a form.
