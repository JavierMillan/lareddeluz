# Workbook Shape Balance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Aplicar al workbook de DESPEGA la dirección híbrida aprobada: explicaciones abiertas, contenedores asimétricos sólo para actuar y desplegables con interacción evidente.

**Architecture:** El marcado semántico actual ya separa encabezado, instrucciones, experiencias, notas y acciones. La implementación se concentrará en `src/despega/ejercicios.css`, usando las clases existentes y `details[open]`; no cambiará datos, persistencia ni generación de PDF.

**Tech Stack:** React 19, TypeScript, CSS nativo, Vitest, Testing Library y Vite.

---

### Task 1: Desplegables claramente interactivos

**Files:**
- Modify: `src/despega/ejercicios.css`
- Test: `src/pages/Ejercicios.test.tsx`

- [ ] **Step 1: Añadir una prueba semántica de los desplegables**

En la prueba que abre D2, comprobar que los tres resúmenes son accesibles y que `Cómo hacerlo` cambia el estado `open` al hacer clic:

```tsx
const instructions = within(workspace).getByText("Cómo hacerlo").closest("summary")!;
expect(instructions.closest("details")).toHaveAttribute("open");
await userEvent.click(instructions);
expect(instructions.closest("details")).not.toHaveAttribute("open");
expect(within(workspace).getByText("Qué podrías sentir mientras lo haces")).toBeTruthy();
expect(within(workspace).getByText("Cómo vas a notar que algo cambió")).toBeTruthy();
```

- [ ] **Step 2: Ejecutar la prueba puntual**

Run: `.\\node_modules\\.bin\\vitest.cmd run src/pages/Ejercicios.test.tsx`

Expected: PASS; el marcado nativo ya ofrece el comportamiento y la prueba evita perderlo al estilizar.

- [ ] **Step 3: Implementar hover, focus y estado abierto**

Agregar en `src/despega/ejercicios.css`:

```css
.workbook-instructions summary,.context-notes summary {
  position:relative;
  transition:color .22s ease,transform .22s ease,border-color .22s ease,background-color .22s ease;
}
.workbook-instructions summary:hover,.workbook-instructions summary:focus-visible,
.context-notes summary:hover,.context-notes summary:focus-visible {
  color:#f0b17b;
  transform:translateX(4px);
}
.workbook-instructions[open] summary { color:#efad72; }
.context-notes summary:after {
  content:"↘";
  margin-left:auto;
  color:var(--copper);
  font-size:.9rem;
  transition:transform .22s ease;
}
.context-notes details[open] summary:after { transform:rotate(45deg); }
```

- [ ] **Step 4: Repetir la prueba puntual**

Run: `.\\node_modules\\.bin\\vitest.cmd run src/pages/Ejercicios.test.tsx`

Expected: PASS.

### Task 2: Abrir la estructura editorial y suavizar la hoja

**Files:**
- Modify: `src/despega/ejercicios.css`

- [ ] **Step 1: Reducir el efecto de tarjeta exterior**

Ajustar `.workbook-sheet` para conservar la hoja rectangular con un marco más silencioso y una luz interior asimétrica:

```css
.workbook-sheet {
  border-color:rgba(227,151,92,.08);
  background:
    radial-gradient(ellipse 42% 30% at 90% 14%,rgba(205,101,43,.055),transparent 72%),
    linear-gradient(145deg,rgba(31,21,28,.97),rgba(15,12,19,.985));
  box-shadow:inset 0 1px rgba(255,255,255,.025),0 36px 100px -48px rgba(0,0,0,.78);
}
```

- [ ] **Step 2: Mantener explicaciones abiertas**

Conservar encabezado, instrucciones y escritura larga sin cajas completas. Reforzar únicamente las líneas parciales y el aire entre bloques:

```css
.workbook-head { border-bottom-color:rgba(225,147,87,.12); }
.workbook-instructions { border-bottom-color:rgba(225,147,87,.12); }
.journal-prompt textarea { background:linear-gradient(90deg,rgba(224,132,65,.035),transparent 76%); }
```

### Task 3: Contenedores asimétricos para actuar

**Files:**
- Modify: `src/despega/ejercicios.css`

- [ ] **Step 1: Aplicar forma híbrida a las zonas de captura y decisión**

```css
.answer-zone {
  border:0;
  border-top:1px solid rgba(231,157,98,.3);
  border-radius:1.75rem .35rem 1.75rem .7rem;
  background:linear-gradient(145deg,rgba(59,38,38,.3),rgba(20,16,23,.24));
  box-shadow:inset 0 1px rgba(255,255,255,.025);
  transition:background-color .22s ease,box-shadow .22s ease,border-color .22s ease;
}
.answer-zone:nth-child(even) {
  margin-top:1.35rem;
  border-radius:.45rem 1.8rem .75rem 1.8rem;
}
.answer-zone:hover,.answer-zone:focus-within {
  border-top-color:rgba(231,157,98,.52);
  background:linear-gradient(145deg,rgba(68,42,40,.42),rgba(24,18,27,.32));
  box-shadow:inset 0 1px rgba(255,255,255,.04),0 18px 40px -34px rgba(0,0,0,.9);
}
```

- [ ] **Step 2: Redondear sólo los controles de acción**

```css
.zone-add button { border-radius:50%; }
.answer-zone li { border:0; border-bottom:1px solid rgba(255,255,255,.07); background:rgba(255,255,255,.012); }
.workbook-actions button:not(.clear-answer),.workbook-toolbar__nav button { border-radius:999px; }
```

- [ ] **Step 3: Mantener composición y lectura abiertas**

No aplicar radios a `.journal-prompt textarea`, `.compose-fields input`, `.reading-cue` ni `.compose-experience blockquote`; estos componentes conservarán líneas editoriales.

### Task 4: Responsive, impresión y movimiento reducido

**Files:**
- Modify: `src/despega/ejercicios.css`

- [ ] **Step 1: Eliminar el escalonado decorativo en mobile**

Dentro de `@media(max-width:800px)` agregar:

```css
.answer-zone:nth-child(even) { margin-top:0; }
.answer-zone { border-radius:1.25rem .3rem 1.25rem .55rem; }
.context-notes { grid-template-columns:1fr; }
```

- [ ] **Step 2: Proteger movimiento reducido**

La regla existente de `prefers-reduced-motion` debe seguir cubriendo transformaciones y transiciones. Confirmar que no se añade animación infinita ni movimiento indispensable para comprender el estado.

- [ ] **Step 3: Proteger impresión**

Dentro de `@media print`, neutralizar las formas nuevas:

```css
.answer-zone { margin-top:0!important; border-radius:0; box-shadow:none; background:none; }
.workbook-instructions summary,.context-notes summary { transform:none!important; }
```

### Task 5: Verificación final y publicación

**Files:**
- Test: `src/pages/Ejercicios.test.tsx`
- Verify: `src/despega/ejercicios.css`

- [ ] **Step 1: Ejecutar toda la suite**

Run: `.\\node_modules\\.bin\\vitest.cmd run`

Expected: 20 archivos de prueba aprobados y al menos 52 pruebas aprobadas.

- [ ] **Step 2: Verificar TypeScript y producción**

Run: `.\\node_modules\\.bin\\tsc.cmd -b --pretty false`

Expected: exit 0.

Run: `.\\node_modules\\.bin\\vite.cmd build`

Expected: build de producción exitoso.

Run: `node scripts/verify-build.mjs`

Expected: `Build contract: OK`.

- [ ] **Step 3: Revisar visualmente**

Comprobar `/ejercicios/?ejercicio=E2` y un ejercicio de escritura en escritorio y mobile. Verificar hovers, teclado, apilado de categorías y vista de impresión.

- [ ] **Step 4: Commit y push**

```bash
git add src/despega/ejercicios.css src/pages/Ejercicios.test.tsx docs/superpowers/plans/2026-08-20-workbook-shape-balance.md
git commit -m "feat: equilibra las formas del workbook"
git push origin main
```
