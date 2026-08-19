# La Red de Luz C+ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la portada React C+ de La Red de Luz, conservar DESPEGA como segunda entrada física y publicar ambas rutas correctamente en GitHub Pages.

**Architecture:** Vite producirá dos entradas HTML (`/` y `/despega/`) sin depender de rewrites. La portada se dividirá en un prólogo narrativo, un SVG atmosférico y un observatorio de constelaciones alimentado por datos tipados; DESPEGA conservará su implementación actual detrás de su propia entrada.

**Tech Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 3, Motion 13, Vitest, Testing Library, jsdom.

---

## Mapa de archivos

### Nuevos

- `vitest.config.ts`: configuración de pruebas unitarias y de componentes.
- `src/test/setup.ts`: matchers DOM y limpieza automática.
- `src/entries/red-de-luz.tsx`: montaje exclusivo de la portada madre.
- `src/entries/despega.tsx`: montaje exclusivo de DESPEGA.
- `despega/index.html`: entrada física de GitHub Pages.
- `src/red-de-luz/data/constellations.ts`: catálogo tipado y fuente única de CTAs/estados.
- `src/red-de-luz/data/constellations.test.ts`: contrato del catálogo.
- `src/red-de-luz/components/SkyField.tsx`: cielo SVG narrativo sin contenido textual.
- `src/red-de-luz/components/SkyField.test.tsx`: contrato de fases del cielo.
- `src/red-de-luz/components/NarrativePrologue.tsx`: escenas vacío, vínculo y constelación.
- `src/red-de-luz/components/NarrativePrologue.test.tsx`: orden y mensajes del prólogo.
- `src/red-de-luz/components/ConstellationObservatory.tsx`: selección, teclado, detalle y CTA.
- `src/red-de-luz/components/ConstellationObservatory.test.tsx`: navegación y estados.
- `src/red-de-luz/components/SiteNavigation.tsx`: navegación pública accesible.
- `src/red-de-luz/components/NetworkFinale.tsx`: cierre de red y CTAs finales.
- `src/red-de-luz/RedDeLuzApp.tsx`: composición de la portada.
- `src/red-de-luz/red-de-luz.css`: tokens, layout, portales, estados y responsive.
- `src/shared/hooks/usePageVisibility.ts`: pausa de atmósfera fuera de la pestaña.
- `src/shared/hooks/usePageVisibility.test.tsx`: contrato de visibilidad.
- `src/despega/tremor.ts`: función pura para el desplazamiento del temblor.
- `src/despega/tremor.test.ts`: regresión del temblor.
- `scripts/verify-build.mjs`: contrato ejecutable del resultado de Vite.

### Modificados

- `package.json`: scripts y dependencias de pruebas.
- `vite.config.ts`: entradas multipágina.
- `tailwind.config.js`: escaneo de ambos HTML.
- `index.html`: metadatos de La Red de Luz y entrada correcta.
- `src/index.css`: base compartida neutra; los acentos pasan a cada marca.
- `src/despega/Mechanics.tsx`: temblor continuo y movimiento reducido.
- `src/pages/Despega.tsx`: rutas internas canónicas y metadatos visuales coherentes.
- `public/CNAME`: conservar sin cambios de contenido.

### Eliminados al final, después de verificar el build React

- `src/App.tsx`
- `src/main.tsx`
- `public/home.html`
- `public/css/styles.css`
- `public/css/despega.css`
- `public/js/main.js`
- `public/js/network.js`
- `public/js/tailwind-config.js`
- `despega.html`
- duplicados raíz `assets/`, `css/` y `js/` que no sean importados ni estén en `public/`

---

### Task 1: Instalar el arnés de pruebas

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Añadir scripts y dependencias**

Ejecutar:

```bash
npm install --save-dev vitest@^3.2.4 jsdom@^26.1.0 @testing-library/react@^16.3.0 @testing-library/jest-dom@^6.6.3 @testing-library/user-event@^14.6.1
```

Actualizar `scripts` en `package.json`:

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build && node scripts/verify-build.mjs",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest",
  "typecheck": "tsc -b --pretty false"
}
```

- [ ] **Step 2: Crear la configuración de Vitest**

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
```

`src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
```

- [ ] **Step 3: Ejecutar el arnés vacío**

Run: `npm test -- --passWithNoTests`  
Expected: PASS, `No test files found` sin error.

- [ ] **Step 4: Confirmar TypeScript**

Run: `npm run typecheck`  
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/test/setup.ts
git commit -m "test: configura pruebas de React"
```

---

### Task 2: Establecer el contrato multipágina

**Files:**
- Create: `src/entries/red-de-luz.tsx`
- Create: `src/entries/despega.tsx`
- Create: `despega/index.html`
- Create: `scripts/verify-build.mjs`
- Modify: `index.html`
- Modify: `vite.config.ts`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Escribir el verificador que falla**

Crear `scripts/verify-build.mjs`:

```js
import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const required = [
  "dist/index.html",
  "dist/despega/index.html",
  "dist/CNAME",
];

for (const file of required) {
  await access(path.join(root, file));
}

const home = await readFile(path.join(root, "dist/index.html"), "utf8");
const despega = await readFile(path.join(root, "dist/despega/index.html"), "utf8");

if (!home.includes("La Red de Luz")) throw new Error("Falta identidad de La Red de Luz");
if (!despega.includes("DESPEGA")) throw new Error("Falta identidad de DESPEGA");
if (home.includes("despega.html")) throw new Error("Persiste la ruta legacy despega.html");

console.log("Build contract: OK");
```

- [ ] **Step 2: Verificar el fallo actual**

Run: `node scripts/verify-build.mjs`  
Expected: FAIL con `ENOENT ... dist/despega/index.html`.

- [ ] **Step 3: Crear las dos entradas React**

`src/entries/red-de-luz.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RedDeLuzApp } from "@/red-de-luz/RedDeLuzApp";
import "@/index.css";
import "@/red-de-luz/red-de-luz.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><RedDeLuzApp /></React.StrictMode>
);
```

`src/entries/despega.tsx`:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import Despega from "@/pages/Despega";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><Despega /></React.StrictMode>
);
```

Durante esta tarea crear archivos mínimos compilables:

`src/red-de-luz/RedDeLuzApp.tsx`:

```tsx
export function RedDeLuzApp() {
  return <main><h1>La Red de Luz</h1></main>;
}
```

`src/red-de-luz/red-de-luz.css`:

```css
.rdl-app { min-height: 100vh; }
```

- [ ] **Step 4: Actualizar las entradas HTML**

Cambiar el script de `index.html` a:

```html
<script type="module" src="/src/entries/red-de-luz.tsx"></script>
```

Crear `despega/index.html` copiando la estructura semántica de `index.html`, con título `DESPEGA — La Red de Luz`, fuentes de DESPEGA y:

```html
<div id="root"></div>
<script type="module" src="/src/entries/despega.tsx"></script>
```

- [ ] **Step 5: Configurar Rollup multipágina**

Reemplazar `vite.config.ts` por:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        despega: path.resolve(__dirname, "despega/index.html"),
      },
    },
  },
});
```

En `tailwind.config.js` cambiar `content` a:

```js
content: ["./index.html", "./despega/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
```

- [ ] **Step 6: Construir y validar el contrato**

Run: `npm run build`  
Expected: Vite produce ambas entradas y termina con `Build contract: OK`.

- [ ] **Step 7: Commit**

```bash
git add index.html despega/index.html vite.config.ts tailwind.config.js scripts/verify-build.mjs src/entries src/red-de-luz
git commit -m "build: publica home y despega como entradas fisicas"
```

---

### Task 3: Crear el catálogo tipado de constelaciones

**Files:**
- Create: `src/red-de-luz/data/constellations.ts`
- Create: `src/red-de-luz/data/constellations.test.ts`

- [ ] **Step 1: Escribir las pruebas que fallan**

```ts
import { describe, expect, it } from "vitest";
import { CONSTELLATIONS } from "./constellations";

describe("CONSTELLATIONS", () => {
  it("declara tres constelaciones activas con CTA propio", () => {
    const active = CONSTELLATIONS.filter((item) => item.status === "active");
    expect(active.map((item) => item.id)).toEqual(["despega", "dtmm", "ingles"]);
    expect(active.map((item) => item.cta.label)).toEqual([
      "Recorrer el método",
      "Explorar las clases",
      "Entrar a las sesiones",
    ]);
  });

  it("mantiene VitalBeat visible pero sin enlace", () => {
    const vitalBeat = CONSTELLATIONS.find((item) => item.id === "vitalbeat");
    expect(vitalBeat).toMatchObject({ status: "suspended" });
    expect("cta" in vitalBeat!).toBe(false);
  });
});
```

- [ ] **Step 2: Verificar el fallo**

Run: `npm test -- src/red-de-luz/data/constellations.test.ts`  
Expected: FAIL porque el módulo no existe.

- [ ] **Step 3: Implementar la unión discriminada y los datos**

```ts
type BaseConstellation = {
  id: "despega" | "dtmm" | "ingles" | "vitalbeat";
  name: string;
  eyebrow: string;
  summary: string;
  accent: string;
};

export type ActiveConstellation = BaseConstellation & {
  status: "active";
  cta: { label: string; href: string; external: boolean };
};

export type SuspendedConstellation = BaseConstellation & {
  status: "suspended";
};

export type Constellation = ActiveConstellation | SuspendedConstellation;

export const CONSTELLATIONS: readonly Constellation[] = [
  {
    id: "despega",
    name: "DESPEGA",
    eyebrow: "Introspección estructurada",
    summary: "Siete pasos para soltar la vida que no es tuya y volver a elegirte.",
    accent: "#d4823f",
    status: "active",
    cta: { label: "Recorrer el método", href: "/despega/", external: false },
  },
  {
    id: "dtmm",
    name: "De tu Mente al Mundo",
    eyebrow: "Clases y creación",
    summary: "Conocimiento aplicado para convertir ideas en una presencia digital real.",
    accent: "#d2a928",
    status: "active",
    cta: {
      label: "Explorar las clases",
      href: "https://detumentealmundo.lareddeluz.com/presentacion/",
      external: true,
    },
  },
  {
    id: "ingles",
    name: "¡Hablemos Inglés!",
    eyebrow: "Sesiones en vivo",
    summary: "Un espacio para practicar, equivocarnos y aprender en comunidad.",
    accent: "#ba3f35",
    status: "active",
    cta: {
      label: "Entrar a las sesiones",
      href: "https://detumentealmundo.lareddeluz.com/ingles/",
      external: true,
    },
  },
  {
    id: "vitalbeat",
    name: "VitalBeat",
    eyebrow: "Constelación suspendida",
    summary: "Un espacio de movimiento y bienestar que podrá volver a encenderse.",
    accent: "#75836f",
    status: "suspended",
  },
] as const;
```

- [ ] **Step 4: Verificar y commit**

Run: `npm test -- src/red-de-luz/data/constellations.test.ts`  
Expected: 2 tests PASS.

```bash
git add src/red-de-luz/data
git commit -m "feat: modela el cielo actual de constelaciones"
```

---

### Task 4: Construir el cielo narrativo SVG

**Files:**
- Create: `src/red-de-luz/components/SkyField.tsx`
- Create: `src/red-de-luz/components/SkyField.test.tsx`
- Modify: `src/red-de-luz/red-de-luz.css`

- [ ] **Step 1: Escribir la prueba de fases**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkyField } from "./SkyField";

describe("SkyField", () => {
  it("expone la fase narrativa sin anunciar el SVG decorativo", () => {
    const { rerender } = render(<SkyField phase="void" active />);
    const field = screen.getByTestId("sky-field");
    expect(field).toHaveAttribute("aria-hidden", "true");
    expect(field).toHaveAttribute("data-phase", "void");
    rerender(<SkyField phase="ecosystem" active />);
    expect(field).toHaveAttribute("data-phase", "ecosystem");
  });
});
```

- [ ] **Step 2: Verificar el fallo**

Run: `npm test -- src/red-de-luz/components/SkyField.test.tsx`  
Expected: FAIL porque `SkyField` no existe.

- [ ] **Step 3: Implementar el SVG**

```tsx
import { motion } from "motion/react";

export type SkyPhase = "void" | "link" | "constellation" | "ecosystem";

type Props = { phase: SkyPhase; active: boolean };

const nodes = [
  [180, 300], [420, 180], [650, 330], [880, 160], [1040, 360], [700, 90],
] as const;
const links = [
  "M180 300L420 180", "M420 180L650 330", "M650 330L880 160",
  "M880 160L1040 360", "M420 180L700 90", "M700 90L880 160",
] as const;

export function SkyField({ phase, active }: Props) {
  return (
    <div className="rdl-sky" data-phase={phase} data-active={active}>
      <svg
        data-testid="sky-field"
        data-phase={phase}
        aria-hidden="true"
        viewBox="0 0 1200 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="rdl-star"><stop stopColor="#f9f4e3"/><stop offset="1" stopColor="#e4cd85"/></radialGradient>
          <filter id="rdl-glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g className="rdl-sky__links">
          {links.map((d) => <motion.path key={d} d={d} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />)}
        </g>
        <g className="rdl-sky__nodes">
          {nodes.map(([cx, cy], index) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 0 ? 7 : 4} />)}
        </g>
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: Añadir estilos de fase**

Añadir a `src/red-de-luz/red-de-luz.css`:

```css
.rdl-sky { position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
.rdl-sky svg { width: 100%; height: 100%; opacity: .82; }
.rdl-sky__links path { fill: none; stroke: rgba(228,205,133,.28); stroke-width: 1; }
.rdl-sky__nodes circle { fill: url(#rdl-star); filter: url(#rdl-glow); transform-box: fill-box; transform-origin: center; animation: rdl-pulse 4.8s ease-in-out infinite; }
.rdl-sky[data-active="false"] circle { animation-play-state: paused; }
.rdl-sky[data-phase="void"] .rdl-sky__links,
.rdl-sky[data-phase="void"] .rdl-sky__nodes circle:not(:first-child) { opacity: 0; }
.rdl-sky[data-phase="link"] .rdl-sky__links path:nth-child(n+2),
.rdl-sky[data-phase="link"] .rdl-sky__nodes circle:nth-child(n+3) { opacity: 0; }
.rdl-sky[data-phase="constellation"] .rdl-sky__links path:nth-child(n+4),
.rdl-sky[data-phase="constellation"] .rdl-sky__nodes circle:nth-child(n+5) { opacity: 0; }
.rdl-sky__links, .rdl-sky__nodes circle { transition: opacity 800ms cubic-bezier(.22,1,.36,1), transform 800ms cubic-bezier(.22,1,.36,1); }
@keyframes rdl-pulse { 50% { opacity: .62; transform: scale(.78); } }
@media (prefers-reduced-motion: reduce) {
  .rdl-sky__nodes circle { animation: none; }
  .rdl-sky__links, .rdl-sky__nodes circle { transition: none; }
}
```

- [ ] **Step 5: Verificar y commit**

Run: `npm test -- src/red-de-luz/components/SkyField.test.tsx && npm run typecheck`  
Expected: PASS y exit 0.

```bash
git add src/red-de-luz/components/SkyField* src/red-de-luz/red-de-luz.css
git commit -m "feat: crea el cielo narrativo por fases"
```

---

### Task 5: Implementar el prólogo sentir → entender

**Files:**
- Create: `src/red-de-luz/components/NarrativePrologue.tsx`
- Create: `src/red-de-luz/components/NarrativePrologue.test.tsx`

- [ ] **Step 1: Escribir la prueba de contenido y orden**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NarrativePrologue } from "./NarrativePrologue";

it("cuenta vacío, vínculo y constelación en ese orden", () => {
  render(<NarrativePrologue onPhaseChange={vi.fn()} />);
  const headings = screen.getAllByRole("heading").map((node) => node.textContent);
  expect(headings).toEqual([
    "Brillar solo cansa.",
    "No te falta luz. Te falta dónde conectarla.",
    "Una misión compartida cambia la forma del cielo.",
  ]);
  expect(screen.getByRole("link", { name: "Entender la red" })).toHaveAttribute("href", "#vinculo");
});
```

- [ ] **Step 2: Verificar el fallo**

Run: `npm test -- src/red-de-luz/components/NarrativePrologue.test.tsx`  
Expected: FAIL porque el componente no existe.

- [ ] **Step 3: Implementar las tres escenas**

```tsx
import { motion } from "motion/react";
import type { SkyPhase } from "./SkyField";

type Props = { onPhaseChange: (phase: SkyPhase) => void };

const scenes = [
  {
    id: "cielo",
    phase: "void" as const,
    label: "Una luz en el vacío",
    title: "Brillar solo cansa.",
    body: "Puedes avanzar, aprender y construir. Pero llega un punto en que crecer sin vínculos empieza a pesar.",
  },
  {
    id: "vinculo",
    phase: "link" as const,
    label: "El primer vínculo",
    title: "No te falta luz. Te falta dónde conectarla.",
    body: "Aquí las personas son nodos. Cuando dos nodos comparten algo real, nace una conexión.",
  },
  {
    id: "constelacion",
    phase: "constellation" as const,
    label: "Una misión en común",
    title: "Una misión compartida cambia la forma del cielo.",
    body: "Una constelación es un ecosistema de personas, experiencias y recursos que crecen alrededor de una misión.",
  },
] as const;

export function NarrativePrologue({ onPhaseChange }: Props) {
  return (
    <div className="rdl-prologue">
      {scenes.map((scene, index) => (
        <motion.section
          id={scene.id}
          key={scene.id}
          className="rdl-scene"
          onViewportEnter={() => onPhaseChange(scene.phase)}
          viewport={{ amount: 0.55 }}
        >
          <div className="rdl-scene__copy">
            <p className="rdl-coordinate">{scene.label}</p>
            <h1>{scene.title}</h1>
            <p>{scene.body}</p>
            {index === 0 && <a className="rdl-text-link" href="#vinculo">Entender la red</a>}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Añadir layout editorial**

Añadir a `red-de-luz.css`:

```css
.rdl-prologue { position: relative; z-index: 1; }
.rdl-scene { min-height: 100svh; display: grid; grid-template-columns: repeat(12,minmax(0,1fr)); align-items: center; padding: clamp(6rem,10vw,10rem) clamp(1.25rem,6vw,6rem); }
.rdl-scene__copy { grid-column: 2 / span 6; max-width: 62ch; }
.rdl-scene:nth-child(even) .rdl-scene__copy { grid-column: 6 / span 6; }
.rdl-scene h1 { max-width: 12ch; font-family: "Spectral", Georgia, serif; font-size: clamp(3rem,7.5vw,7rem); font-weight: 500; line-height: .96; letter-spacing: -.035em; text-wrap: balance; }
.rdl-scene__copy > p:not(.rdl-coordinate) { max-width: 52ch; margin-top: 1.5rem; color: rgba(249,244,227,.68); font-size: clamp(1rem,1.4vw,1.2rem); line-height: 1.7; }
.rdl-coordinate { margin-bottom: 1.25rem; color: #e4cd85; font: 500 .68rem/1.3 "JetBrains Mono", monospace; letter-spacing: .2em; text-transform: uppercase; }
.rdl-text-link { display: inline-flex; min-height: 44px; align-items: center; margin-top: 2rem; border-bottom: 1px solid rgba(228,205,133,.3); color: #f9f4e3; }
@media (max-width: 720px) {
  .rdl-scene { grid-template-columns: 1fr; padding-inline: 1.25rem; }
  .rdl-scene__copy, .rdl-scene:nth-child(even) .rdl-scene__copy { grid-column: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .rdl-scene { min-height: auto; padding-block: clamp(5rem,16vw,8rem); }
}
```

- [ ] **Step 5: Verificar y commit**

Run: `npm test -- src/red-de-luz/components/NarrativePrologue.test.tsx`  
Expected: PASS.

```bash
git add src/red-de-luz/components/NarrativePrologue* src/red-de-luz/red-de-luz.css
git commit -m "feat: narra del aislamiento a la constelacion"
```

---

### Task 6: Construir el observatorio accesible

**Files:**
- Create: `src/red-de-luz/components/ConstellationObservatory.tsx`
- Create: `src/red-de-luz/components/ConstellationObservatory.test.tsx`
- Modify: `src/red-de-luz/red-de-luz.css`

- [ ] **Step 1: Escribir pruebas de selección, CTA y suspensión**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ConstellationObservatory } from "./ConstellationObservatory";

describe("ConstellationObservatory", () => {
  it("cambia de portal con teclado y muestra el CTA correcto", async () => {
    const user = userEvent.setup();
    render(<ConstellationObservatory />);
    const despega = screen.getByRole("tab", { name: /DESPEGA/ });
    despega.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /De tu Mente al Mundo/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("link", { name: "Explorar las clases" })).toBeVisible();
  });

  it("presenta VitalBeat como suspendida y sin enlace", async () => {
    const user = userEvent.setup();
    render(<ConstellationObservatory />);
    await user.click(screen.getByRole("tab", { name: /VitalBeat/ }));
    expect(screen.getByText("Constelación suspendida")).toBeVisible();
    expect(screen.queryByRole("link", { name: /VitalBeat/ })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Verificar el fallo**

Run: `npm test -- src/red-de-luz/components/ConstellationObservatory.test.tsx`  
Expected: FAIL porque el componente no existe.

- [ ] **Step 3: Implementar tabs y detalle**

Crear `ConstellationObservatory.tsx`:

```tsx
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
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

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight") { event.preventDefault(); choose(selectedIndex + 1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); choose(selectedIndex - 1); }
    if (event.key === "Home") { event.preventDefault(); choose(0); }
    if (event.key === "End") { event.preventDefault(); choose(CONSTELLATIONS.length - 1); }
  };

  return (
    <div className="rdl-observatory">
      <div className="rdl-observatory__intro">
        <p className="rdl-coordinate">El observatorio</p>
        <h2>Un cielo.<br />Distintas formas de crecer.</h2>
      </div>
      <div className="rdl-observatory__map" role="tablist" aria-label="Constelaciones">
        {CONSTELLATIONS.map((item, index) => (
          <button
            key={item.id}
            ref={(node) => { refs.current[index] = node; }}
            type="button"
            role="tab"
            aria-selected={selectedIndex === index}
            aria-controls="constellation-panel"
            tabIndex={selectedIndex === index ? 0 : -1}
            className="rdl-portal"
            data-status={item.status}
            style={{ "--portal-accent": item.accent } as CSSProperties}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={onKeyDown}
          >
            <span className="rdl-portal__node" aria-hidden="true" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div id="constellation-panel" className="rdl-observatory__detail" role="tabpanel">
        <p className="rdl-coordinate">{selected.eyebrow}</p>
        <h3>{selected.name}</h3>
        <p>{selected.summary}</p>
        {selected.status === "active" ? (
          <a
            className="rdl-portal-cta"
            href={selected.cta.href}
            target={selected.cta.external ? "_blank" : undefined}
            rel={selected.cta.external ? "noopener" : undefined}
          >
            {selected.cta.label}<span aria-hidden="true">↗</span>
          </a>
        ) : (
          <p className="rdl-suspended-note">Constelación suspendida</p>
        )}
      </div>
    </div>
  );
}
```

El portal seleccionado expone `style={{ "--portal-accent": item.accent } as CSSProperties}`. El estado suspendido conserva selección informativa, pero nunca renderiza `<a>`.

- [ ] **Step 4: Diseñar el observatorio sin cards genéricas**

Añadir a `red-de-luz.css`:

```css
.rdl-observatory { position: relative; z-index: 2; display: grid; grid-template-columns: 1.1fr 1.7fr 1fr; gap: clamp(2rem,5vw,5rem); min-height: 100svh; align-items: center; padding: clamp(6rem,9vw,9rem) clamp(1.25rem,6vw,6rem); }
.rdl-observatory__intro h2 { font-family: "Spectral",Georgia,serif; font-size: clamp(2.6rem,5vw,5rem); font-weight: 500; line-height: 1; }
.rdl-observatory__map { position: relative; display: grid; gap: clamp(1rem,3vw,2.75rem); padding-left: 2rem; border-left: 1px solid rgba(228,205,133,.18); }
.rdl-portal { position: relative; min-height: 52px; padding: 0; border: 0; background: transparent; color: rgba(249,244,227,.48); font: 500 clamp(1rem,1.6vw,1.35rem)/1.2 "Spectral",serif; text-align: left; cursor: pointer; transition: color 300ms ease, transform 500ms cubic-bezier(.22,1,.36,1); }
.rdl-portal__node { position: absolute; left: -2.28rem; top: 50%; width: 8px; height: 8px; border-radius: 50%; background: var(--portal-accent); box-shadow: 0 0 18px color-mix(in srgb,var(--portal-accent) 65%,transparent); transform: translateY(-50%); }
.rdl-portal[aria-selected="true"] { color: #f9f4e3; transform: translateX(.55rem); }
.rdl-portal[data-status="suspended"] { opacity: .5; }
.rdl-observatory__detail { min-height: 18rem; padding-left: clamp(1.5rem,3vw,3rem); border-left: 1px solid rgba(228,205,133,.18); }
.rdl-observatory__detail h3 { font-family: "Spectral",Georgia,serif; font-size: clamp(2rem,3.5vw,3.5rem); font-weight: 500; line-height: 1; }
.rdl-observatory__detail > p:not(.rdl-coordinate,.rdl-suspended-note) { margin-top: 1.5rem; color: rgba(249,244,227,.68); line-height: 1.7; }
.rdl-portal-cta { display: inline-flex; min-height: 44px; align-items: center; gap: .65rem; margin-top: 2rem; border-bottom: 1px solid currentColor; color: #f9f4e3; }
.rdl-suspended-note { margin-top: 2rem; color: rgba(249,244,227,.46); font: 500 .68rem/1.3 "JetBrains Mono",monospace; letter-spacing: .16em; text-transform: uppercase; }
@media (max-width: 860px) {
  .rdl-observatory { grid-template-columns: 1fr; min-height: auto; }
  .rdl-observatory__map { grid-auto-flow: column; grid-auto-columns: minmax(12rem,70%); overflow-x: auto; scroll-snap-type: x mandatory; border-left: 0; padding: 0 0 1rem; }
  .rdl-portal { scroll-snap-align: start; border-bottom: 1px solid rgba(228,205,133,.16); }
  .rdl-portal__node { position: static; display: inline-block; margin-right: .75rem; transform: none; }
  .rdl-observatory__detail { min-height: 15rem; padding: 1.5rem 0 0; border-left: 0; border-top: 1px solid rgba(228,205,133,.18); }
}
```

- [ ] **Step 5: Verificar y commit**

Run: `npm test -- src/red-de-luz/components/ConstellationObservatory.test.tsx && npm run typecheck`  
Expected: 2 tests PASS y exit 0.

```bash
git add src/red-de-luz/components/ConstellationObservatory* src/red-de-luz/red-de-luz.css
git commit -m "feat: añade observatorio accesible de constelaciones"
```

---

### Task 7: Componer la portada C+

**Files:**
- Create: `src/shared/hooks/usePageVisibility.ts`
- Create: `src/shared/hooks/usePageVisibility.test.tsx`
- Create: `src/red-de-luz/components/SiteNavigation.tsx`
- Create: `src/red-de-luz/components/NetworkFinale.tsx`
- Modify: `src/red-de-luz/RedDeLuzApp.tsx`
- Modify: `src/red-de-luz/red-de-luz.css`
- Modify: `src/index.css`

- [ ] **Step 1: Escribir la prueba de visibilidad**

```tsx
import { renderHook, act } from "@testing-library/react";
import { expect, it } from "vitest";
import { usePageVisibility } from "./usePageVisibility";

it("refleja si la pestaña está visible", () => {
  const { result } = renderHook(() => usePageVisibility());
  expect(result.current).toBe(true);
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
  act(() => document.dispatchEvent(new Event("visibilitychange")));
  expect(result.current).toBe(false);
});
```

- [ ] **Step 2: Verificar el fallo e implementar el hook**

Run: `npm test -- src/shared/hooks/usePageVisibility.test.tsx`  
Expected: FAIL porque el hook no existe.

```ts
import { useEffect, useState } from "react";

export function usePageVisibility() {
  const [visible, setVisible] = useState(() => document.visibilityState !== "hidden");
  useEffect(() => {
    const update = () => setVisible(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  return visible;
}
```

- [ ] **Step 3: Crear navegación y cierre**

Crear `SiteNavigation.tsx`:

```tsx
import { useEffect, useState } from "react";

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="rdl-nav">
      <a className="rdl-nav__brand" href="#cielo" aria-label="La Red de Luz, inicio">
        <img src="/assets/logo.png" alt="" width="30" height="30" />
        <span>La Red de Luz</span>
      </a>
      <button
        className="rdl-nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="rdl-nav-links"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Cerrar" : "Explorar"}
      </button>
      <nav id="rdl-nav-links" data-open={open} aria-label="Navegación principal">
        <a href="#cielo" onClick={() => setOpen(false)}>El cielo</a>
        <a href="#observatorio" onClick={() => setOpen(false)}>Constelaciones</a>
        <a href="#la-red" onClick={() => setOpen(false)}>La red</a>
        <a href="/despega/">DESPEGA</a>
      </nav>
    </header>
  );
}
```

`NetworkFinale` contiene:

```tsx
<section id="la-red" className="rdl-finale">
  <p className="rdl-coordinate">La red viva</p>
  <h2>La Red de Luz es el cielo donde viven las constelaciones.</h2>
  <p>Ninguna luz debería crecer sola.</p>
  <div className="rdl-actions">
    <a href="#observatorio">Explorar las constelaciones</a>
    <a href="https://wa.me/526221424577?text=Hola%2C%20quiero%20proponer%20una%20constelaci%C3%B3n" target="_blank" rel="noopener">Proponer una constelación</a>
  </div>
</section>
```

- [ ] **Step 4: Componer `RedDeLuzApp`**

```tsx
import { MotionConfig, useReducedMotion } from "motion/react";
import { useState } from "react";
import { usePageVisibility } from "@/shared/hooks/usePageVisibility";
import { ConstellationObservatory } from "./components/ConstellationObservatory";
import { NarrativePrologue } from "./components/NarrativePrologue";
import { NetworkFinale } from "./components/NetworkFinale";
import { SiteNavigation } from "./components/SiteNavigation";
import { SkyField, type SkyPhase } from "./components/SkyField";

export function RedDeLuzApp() {
  const [phase, setPhase] = useState<SkyPhase>("void");
  const visible = usePageVisibility();
  const reduced = useReducedMotion();
  return (
    <MotionConfig reducedMotion="user">
      <div className="rdl-app" data-reduced-motion={reduced}>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <SiteNavigation />
        <SkyField phase={phase} active={visible && !reduced} />
        <main id="contenido">
          <NarrativePrologue onPhaseChange={setPhase} />
          <section id="observatorio" onMouseEnter={() => setPhase("ecosystem")}>
            <ConstellationObservatory />
          </section>
          <NetworkFinale />
        </main>
      </div>
    </MotionConfig>
  );
}
```

- [ ] **Step 5: Separar base compartida y marca**

En `src/index.css`, dejar solo fondo, tipografía base, reset, selección, foco y reduced motion. Mover tokens cobre a estilos de DESPEGA o mantenerlos bajo `.despega`. En `red-de-luz.css`, declarar tokens madre bajo `.rdl-app`, usar Spectral para display y asegurar que ningún selector global cambie DESPEGA.

- [ ] **Step 6: Ejecutar pruebas y build**

Run: `npm test && npm run build`  
Expected: todas las pruebas PASS y `Build contract: OK`.

- [ ] **Step 7: Commit**

```bash
git add src/shared src/red-de-luz src/index.css
git commit -m "feat: compone la experiencia C+ de La Red de Luz"
```

---

### Task 8: Corregir el temblor y las rutas de DESPEGA

**Files:**
- Create: `src/despega/tremor.ts`
- Create: `src/despega/tremor.test.ts`
- Modify: `src/despega/Mechanics.tsx`
- Modify: `src/pages/Despega.tsx`

- [ ] **Step 1: Escribir la regresión del temblor**

```ts
import { expect, it } from "vitest";
import { tremorOffset } from "./tremor";

it("cambia con el tiempo aunque la intensidad permanezca constante", () => {
  expect(tremorOffset(0, 2)).not.toBe(tremorOffset(40, 2));
  expect(tremorOffset(80, 0)).toBe(0);
});
```

- [ ] **Step 2: Verificar el fallo e implementar la función**

Run: `npm test -- src/despega/tremor.test.ts`  
Expected: FAIL porque el módulo no existe.

```ts
export function tremorOffset(time: number, intensity: number) {
  return intensity === 0 ? 0 : Math.sin(time / 40) * intensity;
}
```

- [ ] **Step 3: Conectar el tiempo real de Motion**

En `Mechanics.tsx`, importar `useTime` y `tremorOffset`. Reemplazar `useTremor` por:

```ts
function useTremor(intensity: MotionValue<number>) {
  const time = useTime();
  return useTransform(() => tremorOffset(time.get(), intensity.get()));
}
```

- [ ] **Step 4: Canonicalizar enlaces**

En `src/pages/Despega.tsx`, reemplazar ambos `href="/home.html"` por `href="/"`. Mantener los enlaces externos con `rel="noopener"`. Agregar clase raíz `despega` al `<main>` para acotar tokens y estilos.

- [ ] **Step 5: Verificar y commit**

Run: `npm test -- src/despega/tremor.test.ts && npm run typecheck && npm run build`  
Expected: PASS, exit 0 y contrato de build correcto.

```bash
git add src/despega/tremor* src/despega/Mechanics.tsx src/pages/Despega.tsx
git commit -m "fix: estabiliza motion y rutas de despega"
```

---

### Task 9: Añadir SEO específico por entrada

**Files:**
- Modify: `index.html`
- Modify: `despega/index.html`

- [ ] **Step 1: Escribir una comprobación que falla**

Antes del build, ampliar `scripts/verify-build.mjs` con:

```js
function assertMeta(html, expectedCanonical) {
  const required = [
    'name="description"',
    `rel="canonical" href="${expectedCanonical}"`,
    'property="og:title"',
    'property="og:description"',
    'property="og:image"',
    'name="twitter:card"',
  ];
  for (const marker of required) {
    if (!html.includes(marker)) throw new Error(`Falta metadata: ${marker}`);
  }
}

assertMeta(home, "https://lareddeluz.com/");
assertMeta(despega, "https://lareddeluz.com/despega/");
```

Ejecutar `npm run build`.  
Expected: FAIL con `Falta metadata: rel="canonical"...`.

- [ ] **Step 2: Añadir metadatos de La Red de Luz**

En `index.html`:

```html
<title>La Red de Luz — El cielo donde viven las constelaciones</title>
<meta name="description" content="Un mundo de ecosistemas para aprender, crear y crecer en comunidad. Descubre las constelaciones de La Red de Luz." />
<link rel="canonical" href="https://lareddeluz.com/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="La Red de Luz" />
<meta property="og:description" content="El cielo donde viven las constelaciones." />
<meta property="og:image" content="https://lareddeluz.com/assets/social-red-de-luz.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 3: Añadir metadatos de DESPEGA**

En `despega/index.html`:

```html
<title>DESPEGA — Suelta la vida que no es tuya</title>
<meta name="description" content="Un método ágil de siete pasos para dejar de sostener lo que ya no te corresponde y volver a elegirte." />
<link rel="canonical" href="https://lareddeluz.com/despega/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="DESPEGA — La Red de Luz" />
<meta property="og:description" content="Siete pasos para soltar la vida que no es tuya." />
<meta property="og:image" content="https://lareddeluz.com/assets/despega-social.jpg" />
<meta name="twitter:card" content="summary_large_image" />
```

- [ ] **Step 4: Crear imágenes sociales reales**

Usar el generador de imágenes con estos prompts y exportar exactamente a 1200×630:

```text
social-red-de-luz.jpg — Fondo void #0d0b16, una constelación técnica dorada formada por pocos nodos y líneas precisas, composición editorial con amplio espacio negativo, sensación de un cielo que contiene mundos, sin texto, sin nebulosas, sin estética esotérica, dirección de arte premium y minimalista.

despega-social.jpg — Fondo void #0d0b16, una espiral ascendente de partículas cobre #d4823f inspirada en una bitácora de ingeniería, composición limpia con amplio espacio negativo, sensación de soltar peso y avanzar, sin texto, sin red de constelaciones, sin estética esotérica.
```

Verificar dimensiones con `identify public/assets/social-red-de-luz.jpg public/assets/despega-social.jpg` o la herramienta de inspección de imágenes disponible antes de continuar.

- [ ] **Step 5: Verificar y commit**

Run: `npm run build`  
Expected: `Build contract: OK` con metadatos completos.

```bash
git add index.html despega/index.html public/assets scripts/verify-build.mjs
git commit -m "feat: añade identidad social a ambas entradas"
```

---

### Task 10: Retirar la implementación estática sin romper producción

**Files:**
- Delete: archivos legacy enumerados en “Mapa de archivos”
- Modify: cualquier referencia encontrada por búsqueda

- [ ] **Step 1: Inventariar referencias antes de borrar**

Run:

```bash
rg -n "home\.html|despega\.html|public/js|public/css|js/main\.js|network\.js" . --glob '!node_modules/**' --glob '!dist/**' --glob '!.git/**'
```

Expected: solo archivos legacy y documentación histórica; ninguna entrada React depende de ellos.

- [ ] **Step 2: Verificar el build React previo al borrado**

Run: `npm test && npm run build`  
Expected: PASS y `Build contract: OK`.

- [ ] **Step 3: Eliminar únicamente los archivos legacy validados**

Eliminar las rutas exactas de la sección “Eliminados al final”. No eliminar `public/assets`, `public/CNAME`, archivos importados por React ni material editorial fuera de `Pages/main`.

- [ ] **Step 4: Repetir búsqueda y build**

Run:

```bash
rg -n "home\.html|despega\.html" src index.html despega public
npm test
npm run build
```

Expected: `rg` sin coincidencias, todas las pruebas PASS y contrato de build correcto.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: retira la experiencia estatica anterior"
```

---

### Task 11: Auditoría responsive, accesible y de publicación

**Files:**
- Modify: `src/red-de-luz/red-de-luz.css` y componentes solo si la auditoría revela defectos
- Create: `docs/qa/2026-08-19-c-plus-checklist.md`

- [ ] **Step 1: Ejecutar verificaciones automatizadas frescas**

Run:

```bash
npm test
npm run typecheck
npm run build
```

Expected: cero tests fallidos, TypeScript exit 0 y `Build contract: OK`.

- [ ] **Step 2: Servir el build, no el dev server**

Run: `npm run preview -- --host 127.0.0.1`  
Expected: preview disponible y ambas URLs responden: `/` y `/despega/`.

- [ ] **Step 3: Revisar cinco anchos y dos preferencias de movimiento**

Capturar y revisar `/` y `/despega/` a 320, 375, 768, 1024 y 1440 px. Repetir al menos 375 y 1440 con `prefers-reduced-motion: reduce`. Confirmar:

- sin overflow horizontal;
- texto sin colisiones ni cortes;
- observatorio usable por toque;
- foco visible y orden lógico;
- VitalBeat sin CTA;
- animaciones ambientales pausadas en pestaña oculta;
- experiencia completa con movimiento reducido.

- [ ] **Step 4: Verificar enlaces públicos**

Comprobar manualmente los destinos de DTMM e Inglés, `/despega/`, `/`, WhatsApp y propuesta de constelación. Los externos abren con `noopener`; los internos permanecen en la misma pestaña.

- [ ] **Step 5: Registrar evidencia**

Crear `docs/qa/2026-08-19-c-plus-checklist.md` con fecha, comandos, resultados, URLs revisadas, anchos revisados y cualquier limitación real. No escribir “pendiente”; si algo falla, corregirlo y repetir el comando antes de marcarlo.

- [ ] **Step 6: Commit final de QA**

```bash
git add docs/qa src
git commit -m "test: documenta verificacion de la experiencia C+"
```

---

## Orden de entrega

1. Tasks 1–3 aseguran pruebas, publicación multipágina y datos confiables.
2. Tasks 4–7 construyen la experiencia C+ completa.
3. Tasks 8–9 estabilizan DESPEGA y la presentación social.
4. Task 10 elimina la duplicación solo después de confirmar que React la reemplaza.
5. Task 11 reúne la evidencia final antes de cualquier push.

No se hará push a `origin/main` hasta que el usuario revise la experiencia local y autorice explícitamente la publicación.
