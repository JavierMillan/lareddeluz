# Brand Profile — DESPEGA (Constelación · La Red de Luz)
<!-- version: 1.0 · updated: 2026-08-18 · status: confirmed -->

> Sub-marca de **La Red de Luz** — ver `brand-profile-lareddeluz.md` para el
> sistema raíz (void, dorado de logo, doctrina blueprint, principio de
> inmersión narrativa). Este perfil define lo que hace a DESPEGA distinta:
> su acento, su tipografía display, su motivo visual y su capa emocional.

## 0. Snapshot
- One-line definition: metodología ágil de autodescubrimiento estructurado — "soltar la vida que no es tuya". 7 pasos (D-E-S-P-E-G-A), 20 ejercicios, un workbook, un método de bolsillo (CRECE). Escrito por Javier Millán desde su propio proceso.
- Tagline / frase ancla: **"No te falta disciplina. La estás gastando toda en sostener cosas que no son tuyas."**
- Canales principales: web (despega.html), WhatsApp, workbook PDF descargable.
- Goal de la mayoría de visuales: que el lector reconozca su propia vida en la historia de Javi y sienta que hay un camino trazado (no una promesa mágica) para soltar lo que ya no es suyo.

## 1. Essence
- Mission: dar estructura ágil (metodologías de ingeniería de software aplicadas a uno mismo) al proceso de soltar lo que ya no corresponde y construir la versión de ti que sí elegiste.
- Personalidad (5 adjetivos): ascendente, honesto-sin-adorno, estructurado, vulnerable, en movimiento.
- Arquetipo junguiano: **El Buscador/Explorador** que se volvió mapa para otros — cruzado con **Sabio-Constructor** (hereda de la marca madre, pero aquí el Sabio es literalmente "ingeniero de software", no un mentor abstracto).
- Audiencia: alguien que por fuera cumplió la lista completa (trabajo, sueldo, relación estable) y aun así siente un vacío que no sabe nombrar — o alguien que ya identificó algo que quiere soltar pero no sabe cómo ni por dónde empezar.
- La ÚNICA sensación que todo visual debe evocar: **"esto que él vivió es mi mapa, no su historia"** — el lector se ve a sí mismo cruzando el mismo umbral, con Javi como evidencia de que se puede, nunca como protagonista de la pieza.
- Principio narrativo específico: cada anécdota real de Javi (los pingüinos, el audio grabado 25 veces, la escalera corporativa soltada, el risco) se cierra con una pregunta abierta que el lector responde con SU propia historia — nunca una afirmación tipo "tú sientes X". Ver `brand-profile-lareddeluz.md` §8.
- Admirados (dirección, nunca copiar): bitácoras de campo/expedición, cuadernos de ingeniero con anotaciones a mano, la estética "trabajo en progreso" de un taller real — no el misticismo contemplativo de index.html.

## 2. Color system
Hereda el void (`#0d0b16`) y el dorado de marca madre (exclusivo del logo/nav) de
`brand-profile-lareddeluz.md`. DESPEGA añade su propio acento cálido, distinto
del dorado puro — el patrón que ya siguen las constelaciones hermanas (rojo en
Inglés, mostaza en DTMM, púrpura en Lectura).

- **Acento primario (~10%, reservado)** — `--despega-copper #d4823f` cobre/ámbar cálido. Es "la espiral que sube" — progreso, CTA, el motivo central.
  - Hover/brillo: `--despega-copper-light #e6a668`.
  - Gradiente de botón: `--despega-copper-dark #a35f26`.
- **Líneas propias**: `--despega-line rgba(212,130,63,.25)` técnica · `--despega-line-soft rgba(212,130,63,.10)` bordes sutiles — reemplazan a `--line`/`--line-soft` doradas SOLO dentro de despega.html, para que el acento cobre gobierne la jerarquía visual de la página.
- **Dominante (~60%)** y **secundario (~30%)**: iguales a la marca madre (void + dorado en logo/nav/texto). El dorado NUNCA es el acento protagónico dentro del cuerpo de DESPEGA — eso es exclusivo del cobre.
- Harmony logic: análoga cálida (dorado de marca madre → cobre de DESPEGA) — mismo ángulo de matiz, más saturado y rojizo. Suficientemente distinto para leerse como propio, sin romper la familia cálida de la Red.
- 60-30-10: 60% void (terreno compartido) · 30% dorado base + blancos (nav, logo — "esto sigue siendo La Red de Luz") · 10% cobre (lo que debe destacar como propio de DESPEGA: progreso, CTA, motivo).

## 3. Typography system
Hereda Inter (cuerpo) y el registro de voz de la marca madre. Cambia la display
face y sube el peso relativo de la mono — ver rationale.

- **Display**: **Instrument Serif** — itálicas expresivas con carácter contemporáneo, distinta a Spectral (mítica-editorial de index.html), Unbounded (geométrica-cálida de DTMM) y Archivo Black (broadcast de Inglés). Solo tiene un peso (400) con romana e itálica — usar la itálica como acento deliberado en frases-ancla, igual que el sistema base ya usa cursivas para "subidas míticas".
- **Cuerpo**: **Inter** — 300/400, heredado sin cambio.
- **Técnica/mono**: **JetBrains Mono** — heredada, pero con más protagonismo que en index.html. DESPEGA es un método con pasos numerados y ejercicios con código (D1, S3, EJ2): la mono deja de ser solo acento y se vuelve columna vertebral de la identidad — coordenadas, progreso, códigos de ejercicio, todo en mono con tracking técnico.
- Pairing rationale: Instrument Serif = la voz personal/vulnerable de Javi contando su historia · JetBrains Mono = el sistema/método que él construyó desde esa historia · Inter = donde el lector respira y lee sin ruido. Fuente: Google Fonts — `Instrument+Serif:ital@0;1`.
- Type scale: hereda `clamp()` fluido del sistema base — h1 `clamp(2.1rem, 5.5vw, 3.4rem)`, h2 de sección similar a index.html.
- Guardrail: nunca usar Fraunces (reservada a DTMM) ni Archivo Black (reservada a Inglés) — cada sub-marca conserva su display face única, no se comparte entre hermanas.

## 4. Composition & layout doctrine
Hereda spacing, grid blueprint y card system de la marca madre. Cambia:

- **Coordenada de sección**: sustituye "CAP 0X" (vocabulario de historia/capítulo de index.html) por **verbos de acción de la portada del Workbook**: MAPEA, SUELTA, CLARIFICA, ITERA, DISEÑA, REFLEXIONA — vocabulario de método, no de relato. Ya existe como diseño aprobado en la portada de "DESPEGA 3.0 - Workbook.pdf".
- **Indicador de progreso de los 7 pasos**: un rail/espiral que se llena de cobre conforme el lector avanza D→E→S→P→E→G→A — visualiza literalmente "vas subiendo la espiral", reemplaza el scroll-rail genérico compartido.
- **Fondo de sección hero**: espiral de partículas cobre ascendiendo desde un punto en la base hacia arriba, sobre la misma grilla blueprint estática de `.chapter-frame` — mismo motor visual (canvas, partículas con glow) que `network.js`, metáfora distinta (un viaje individual ascendente, no una red de vínculos entre personas — ver guardrail de marca madre §9).
- **Cada paso D-E-S-P-E-G-A**: ficha de ejercicio (coordenada con verbo + número de paso + conteo real de ejercicios como dato duro) en vez de prosa continua — jerarquía de "expediente/dato" más marcada que en index.html.

## 5. Aesthetic direction (style)
- Style blend: 45% bitácora técnica de ingeniero (mono, coordenadas, datos duros) / 35% confesión editorial íntima (Instrument Serif itálica, historia real) / 20% ascenso físico (motivo de espiral, sensación de movimiento vertical).
- Texture/finish: mismo grid blueprint que la marca madre, partículas con glow cobre en vez de dorado.
- Motion feel: hereda reveals `opacity+translateY` del sistema base; el indicador de progreso se anima llenándose de cobre al hacer scroll — motion con sentido de "avance de método", no solo decorativo.

## 6. Imagery / motivo central
- **Espiral ascendente de partículas cobre** — motivo derivado directamente de la portada aprobada del Workbook. Reemplaza el canvas de "constelación-red" de index.html dentro de despega.html.
- Glifo de firma: un trazo de espiral simple (line-art cobre) como marca de agua de sección, equivalente al punto dorado pulsante de index.html.
- Nunca reutilizar el canvas `network.js` de nodos-red tal cual — ver guardrail de marca madre.

## 7. Logo & assets
- Mismo lockup de marca madre (ícono dorado + "La Red de Luz") en la nav — DESPEGA no tiene ícono propio separado, es una constelación dentro del mismo dominio, no una sub-marca con dominio propio (a diferencia de DTMM/Inglés).
- El cobre nunca toca el ícono del logo — se queda exclusivo del contenido de la página.

## 8. Voice tie-in
- Tono en 3 palabras: honesto, ascendente, estructurado.
- Cómo se ve: cada anécdota real de Javi (pingüinos bailando cumbia, el audio grabado 25 veces, la escalera corporativa, el risco) cierra con una pregunta abierta al lector — nunca una afirmación de lo que el lector siente. Él es el mentor-evidencia; el lector es el héroe de su propia historia.
- El "no te falta disciplina" es la frase ancla — debe aparecer temprano y con peso visual propio (Instrument Serif itálica + cobre).

## 9. Guardrails — el "never"
- Nunca Spectral, Unbounded, ni Archivo Black como display — Instrument Serif es exclusiva de DESPEGA entre las sub-marcas.
- Nunca el canvas de constelación-red (`network.js` tal cual) — usar el motivo de espiral ascendente propio.
- Nunca dorado puro como acento protagónico del cuerpo — reservado al logo/nav.
- Nunca escribir la anécdota de Javi sin cerrarla con una pregunta abierta al lector.
- Nunca "CAP 0X" como coordenada de sección — usar los verbos de método (MAPEA/SUELTA/CLARIFICA/ITERA/DISEÑA/REFLEXIONA).
- Nunca lenguaje de coach/promesa mágica — la estructura ágil es literal (metodología de ingeniería de software), no metafórica.
