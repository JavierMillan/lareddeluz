# Refinamiento del Cuaderno Vivo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refinar D2, E1, E2, la secuencia S, P1 y P3 para que el cuaderno sea más claro, inmersivo y adaptable sin perder respuestas guardadas ni romper la impresión.

**Architecture:** Las experiencias mantienen sus tipos y claves persistidas. Las composiciones específicas se actualizan dentro de sus componentes existentes, mientras `Ejercicios.tsx` obtiene un orden de recorrido explícito distinto del orden editorial base para colocar S4 antes de S3. El CSS usa grids adaptables sin anchos mínimos ni overflow horizontal.

**Tech Stack:** React 18, TypeScript, CSS, Vitest, Testing Library, Vite.

---

### Task 1: Fijar el nuevo comportamiento con pruebas

**Files:**
- Modify: `src/pages/Ejercicios.test.tsx`
- Modify: `src/despega/exerciseExperiences.test.ts`

- [ ] **Step 1: Escribir las pruebas fallidas de E1, D2 y secuencia S**

Añadir casos que comprueben que E1 no muestra áreas de nota para técnicas no elegidas, D2 presenta tres momentos principales y la navegación avanza de S2 a S4 y después a S3:

```tsx
expect(screen.queryByRole("textbox", { name: /Cómo me dejó 4 · 4 · 8/i })).toBeNull();
await userEvent.click(screen.getByRole("radio", { name: /Elegir 4 · 4 · 8/i }));
expect(screen.getByRole("textbox", { name: /Cómo me dejó 4 · 4 · 8/i })).toBeTruthy();

expect(screen.getAllByTestId("belief-moment")).toHaveLength(3);

await userEvent.click(screen.getByRole("button", { name: /ejercicio siguiente: S4/i }));
expect(screen.getByRole("main", { name: /S4 · Se va o se queda/i })).toBeTruthy();
await userEvent.click(screen.getByRole("button", { name: /ejercicio siguiente: S3/i }));
```

- [ ] **Step 2: Escribir las pruebas fallidas de E2, P1 y P3**

Comprobar etiquetas compactas, ausencia de las figuras anteriores y presencia del mapa por etapas:

```tsx
expect(screen.getByRole("button", { name: "Añadir" })).toBeTruthy();
expect(container.querySelector(".energy-days")).toHaveClass("energy-days");
expect(container.querySelector(".identity-balance")).toBeNull();
expect(container.querySelector(".identity-name")).toHaveClass("identity-signature");
expect(screen.getAllByTestId("territory-stage")).toHaveLength(3);
expect(container.querySelector(".territory-core")).toBeNull();
```

- [ ] **Step 3: Ejecutar las pruebas y confirmar que fallan**

Run:

```powershell
node node_modules/vitest/vitest.mjs run src/pages/Ejercicios.test.tsx src/despega/exerciseExperiences.test.ts
```

Expected: FAIL en los nuevos landmarks, el orden S y la selección progresiva de E1.

### Task 2: Simplificar D2 y hacer E1 elegible

**Files:**
- Modify: `src/despega/experiences/JourneyExperiences.tsx`
- Modify: `src/despega/experiences/BreathingExperience.tsx`
- Modify: `src/despega/journey-experiences.css`
- Modify: `src/despega/ejercicios.css`

- [ ] **Step 1: Reescribir D2 como tres momentos**

Mantener `moment`, `belief`, `served`, `newBelief` y `goodbye`, pero agrupar `served` dentro del segundo momento y presentar el cierre como una sola frase editable:

```tsx
<div className="belief-story">
  <section data-testid="belief-moment">...</section>
  <section data-testid="belief-moment" className="belief-story__turn">...</section>
  <section data-testid="belief-moment">...</section>
</div>
<section className="belief-closing">
  <Field answerKey="goodbye" label="Mi despedida" ... />
</section>
```

- [ ] **Step 2: Mostrar sólo el registro de la respiración elegida**

Cada técnica conserva su radio real. El `textarea` y la nota de impresión se renderizan únicamente cuando `selected === technique.key`:

```tsx
{chosen && <div className="breath-reflection">
  <textarea aria-label={`Cómo me dejó ${technique.label}`} ... />
  <div className="print-value">...</div>
</div>}
```

Cambiar la introducción por una invitación a elegir una técnica, sin pedir probar las tres.

- [ ] **Step 3: Ajustar las composiciones y sus estados de foco**

Usar una línea narrativa vertical para D2 y fichas de respiración compactas. Ningún campo debe quedar debajo de un trazo decorativo; los controles conservan 44 px mínimos y foco visible.

- [ ] **Step 4: Ejecutar las pruebas focalizadas**

Run:

```powershell
node node_modules/vitest/vitest.mjs run src/pages/Ejercicios.test.tsx -t "D2|E1"
```

Expected: PASS.

### Task 3: Compactar E2 sin desplazamiento horizontal

**Files:**
- Modify: `src/despega/ExerciseWorkspace.tsx`
- Modify: `src/despega/journey-experiences.css`
- Modify: `src/despega/ejercicios.css`
- Test: `src/pages/Ejercicios.test.tsx`

- [ ] **Step 1: Reorganizar el compositor con etiquetas visibles**

Dividir la actividad y los metadatos en grupos semánticos, conservar los `aria-label` existentes y renombrar la acción:

```tsx
<div className="energy-composer__activity">
  <label><span>Actividad concreta</span><input ... /></label>
</div>
<div className="energy-composer__meta">
  <label><span>Día</span><select ... /></label>
  <label><span>Hora</span><input type="time" ... /></label>
  <label><span>Me dejó</span><select ... /></label>
  <button type="button" onClick={add}>Añadir</button>
</div>
```

- [ ] **Step 2: Convertir la semana en grid intrínseco**

Eliminar `overflow-x:auto` y cualquier `min-width` rígido. Usar siete columnas en anchos amplios, cinco columnas a partir de 900 px y una columna en móvil. Las tarjetas vacías usan altura automática:

```css
.energy-days{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));overflow:visible}
@media(max-width:1100px) and (min-width:801px){.energy-days{grid-template-columns:repeat(5,minmax(0,1fr))}}
@media(max-width:800px){.energy-days{grid-template-columns:1fr}}
```

- [ ] **Step 3: Verificar captura, eliminación y layout**

Run:

```powershell
node node_modules/vitest/vitest.mjs run src/pages/Ejercicios.test.tsx -t "E2"
```

Expected: PASS y ninguna regla estructural de E2 usa `overflow-x:auto`.

### Task 4: Corregir la secuencia S y la continuidad opcional

**Files:**
- Modify: `src/pages/Ejercicios.tsx`
- Modify: `src/despega/experiences/JourneyExperiences.tsx`
- Test: `src/pages/Ejercicios.test.tsx`

- [ ] **Step 1: Definir un orden de recorrido explícito**

Crear una lista derivada que sólo reordene el bloque S:

```tsx
const JOURNEY_ORDER = EXERCISES.flatMap((exercise) =>
  exercise.code === "S3" ? [] : exercise.code === "S4"
    ? [exercise, EXERCISES.find((item) => item.code === "S3")!]
    : [exercise]
);
```

Usar `JOURNEY_ORDER` para el índice visual, `previous` y `next`; mantener `EXERCISES` para validar códigos y almacenamiento.

- [ ] **Step 2: Añadir importación opcional S4 → S3**

En la carta de despedida, ofrecer `Traer lo que decidí soltar` y copiar `S4.leaves` sólo cuando la persona lo active. Guardar la selección en una clave propia de S3 sin cambiar las claves actuales de la carta.

- [ ] **Step 3: Ejecutar la prueba de navegación y continuidad**

Run:

```powershell
node node_modules/vitest/vitest.mjs run src/pages/Ejercicios.test.tsx -t "S4|S3|orden"
```

Expected: PASS; S2 avanza a S4, S4 a S3 y S3 a P1.

### Task 5: Refinar P1 y reconstruir P3

**Files:**
- Modify: `src/despega/experiences/JourneyExperiences.tsx`
- Modify: `src/despega/experiences/TerritoryExperience.tsx`
- Modify: `src/despega/journey-experiences.css`
- Modify: `src/despega/ejercicios.css`
- Test: `src/pages/Ejercicios.test.tsx`

- [ ] **Step 1: Convertir P1 en retrato editorial**

Eliminar el medidor porcentual. Conservar los dos `ListBuilder` y transformar el nombre en firma:

```tsx
<div className="identity-spread">
  <ListBuilder answerKey="statements" ... />
  <ListBuilder answerKey="gives" ... />
</div>
<section className="identity-name identity-signature">
  <Field answerKey="name" label="Firma esta versión de ti" ... />
</section>
```

- [ ] **Step 2: Convertir P3 en tres etapas legibles**

Mantener las claves `skills`, `groups`, `territory`, `where`, `who` y `paid`. Sustituir `territory-core` por tres secciones `data-testid="territory-stage"`: habilidades, parentescos y territorio. La prueba de realidad queda bajo la tercera etapa.

- [ ] **Step 3: Aplicar geografía escrita y responsive**

Las etapas usan columnas conectadas por bordes y espacio en escritorio, y una línea vertical en móvil. Eliminar pseudo-elementos circulares y botones redondos flotantes.

- [ ] **Step 4: Ejecutar las pruebas focalizadas**

Run:

```powershell
node node_modules/vitest/vitest.mjs run src/pages/Ejercicios.test.tsx -t "P1|P3"
```

Expected: PASS.

### Task 6: Verificar impresión, regresiones y build

**Files:**
- Modify: `src/despega/journey-experiences.css`
- Modify: `src/despega/ejercicios.css`
- Test: `src/despega/exerciseExperiences.test.ts`
- Test: `src/pages/Ejercicios.test.tsx`

- [ ] **Step 1: Ajustar impresión**

Ocultar compositores y radios; mostrar sólo valores con contenido. Forzar D2, E2, P1 y P3 a bloques sin fondos, sin radios y con `break-inside:avoid` donde corresponda.

- [ ] **Step 2: Ejecutar toda la suite**

Run:

```powershell
node node_modules/vitest/vitest.mjs run
```

Expected: 20 archivos y todas las pruebas PASS.

- [ ] **Step 3: Validar TypeScript y producción**

Run:

```powershell
node node_modules/typescript/bin/tsc -b --pretty false
node node_modules/vite/bin/vite.js build
node scripts/verify-build.mjs
```

Expected: TypeScript sin errores, build exitoso y `Build contract: OK`.

- [ ] **Step 4: Revisar el diff y publicar**

Preparar únicamente los archivos del refinamiento y documentación; excluir `.artifacts/`. Crear un commit de implementación y hacer push a `origin/main`.

- [ ] **Step 5: Entregar el prompt editorial**

El mensaje final debe incluir un prompt autocontenido para corregir el ebook: conservar voz y contenido, mover la decisión `se va o se queda` antes de la despedida, reparar transiciones y devolver los fragmentos editados sin modificar capítulos ajenos.
