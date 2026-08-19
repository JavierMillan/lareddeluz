# Brand Profile — La Red de Luz (marca madre)
<!-- version: 1.0 · updated: 2026-08-18 · status: confirmed (extraído de DESIGN-SYSTEM.md / css/styles.css de producción) -->

> Marca paraguas de todo el ecosistema. Cada constelación (DESPEGA, DTMM,
> ¡Hablemos Inglés!, Club de Lectura...) es una sub-marca con su propio
> Brand Profile que **referencia y hereda de este documento** — nunca lo
> repite entero. Ver `brand-profile-despega.md`, `brand-profile-dtmm.md`,
> `ingles/brand-profile-hablemos-ingles.md`.

## 0. Snapshot
- One-line definition: ecosistema de comunidades y metodologías de crecimiento personal — "una constelación de estrellas conectadas".
- Tagline / frase ancla: **"No te falta luz. Te falta estructura."** · "Ninguna luz debería crecer sola." · "Menos perfección, más verdad."
- Canales principales: web (lareddeluz.com), WhatsApp, cada constelación con su propio hub.
- Goal de la mayoría de visuales: **inmersión narrativa** — que el lector se vea a sí mismo dentro de la historia, no que lea sobre alguien más.

## 1. Essence (la fuente de la luz)
- Mission / promise: que ninguna persona con una idea o un proceso de crecimiento tenga que atravesarlo sola — la estructura como puente entre la luz individual y la red.
- Personalidad (5 adjetivos): íntimo, técnico-con-alma, contemplativo, honesto, mítico-sin-ser-esotérico.
- Arquetipo junguiano: **Sabio + Constructor** (Arquitecto de ecosistemas). NO coach, NO gurú.
- Tensión central: ingeniería + alma. Estructura + luz. Tecnología + humanidad. "No luz mágica. Infraestructura para la luz."
- Audiencia: personas que por fuera están bien pero sienten un vacío que no saben nombrar — la "estrella sola" que no reconoce que puede conectarse.
- La ÚNICA sensación que todo visual debe evocar: el escalofrío de reconocimiento — "esto me describe y nunca lo habían nombrado así".
- Principio narrativo (gobierna TODO, no solo el copy): **la inmersión es el mecanismo, no un adorno.** Cada constelación cuenta su propia historia y el lector debe sentirse su protagonista — nunca un espectador leyendo sobre alguien más. La estructura visual (capítulos, motivo central, progreso) existe para hacer viva esa historia, igual que el copy.
- Evitar siempre: estética coach ("activa tu luz"), laptop + gráficos IA genéricos, frases motivacionales vacías, espiritualidad genérica, glassmorphism dorado genérico.

## 2. Color system (paleta raíz — cada constelación deriva su propio acento)
- **Dominante (~60%)** — void `#0d0b16` (fondo principal, casi negro) y `--void-2 #161423` (superficies elevadas). Nunca negro puro frío `#000`.
- **Secundario (~30%)** — dorado `--gold #e4cd85` (línea, coordenada, acento de la marca madre — el color que aparece en el logo y la nav de TODAS las constelaciones) y su gradiente `--gold-dark #c08a2d`. Blanco/crema `#f9f4e3` para texto claro raro.
- **Acento estructural** — azul profundo `--blue #163384`, atmósfera/nodos secundarios, uso mínimo.
- Líneas: `--line rgba(228,205,133,.22)` técnica · `--line-soft rgba(228,205,133,.12)` bordes sutiles · `--grid rgba(228,205,133,.04)` grilla blueprint de fondo.
- **Regla del dorado**: úsalo como línea y coordenada, no como glow difuso. Disciplina, no brillo.
- **El dorado es de la marca madre, no de las sub-marcas**: cada constelación elige su propio acento de color (cobre en DESPEGA, rojo en Inglés, mostaza en DTMM, púrpura en Lectura) y reserva el dorado puro para el lockup del logo/nav — igual que ya establece el guardrail de Hablemos Inglés ("nunca dorado como acento de composición, es exclusivo del logo").
- Contraste: blanco puro para titulares clave; white/70 cuerpo; white/55 secundario; white/40–45 etiquetas tenues. Todo AA/AAA sobre `#0d0b16`.

## 3. Typography system (raíz — cada constelación puede tener su propia display face)
- **Trío base de la marca madre** (usado en `index.html`, piezas firmadas directamente como "La Red de Luz"):
  - Display: **Spectral** (serif) — titulares, itálica para acentos íntimos.
  - Cuerpo: **Inter** — 300–400 para cuerpo ligero.
  - Técnica: **JetBrains Mono** — coordenadas, etiquetas, datos. Tracking amplio (~.22–.3em), uppercase, tamaño pequeño.
- **Principio de sub-marca**: el cuerpo de texto (Inter) y el registro de voz pueden compartirse entre constelaciones, pero **cada constelación elige su propia tipografía display con personalidad propia** — no todas heredan Spectral automáticamente. Precedente: DTMM usa Unbounded/Fraunces, Hablemos Inglés usa Archivo Black. La mono (JetBrains Mono o equivalente con el mismo rol) sí tiende a mantenerse como "firma técnica" transversal, salvo que la sub-marca defina otra.
- Nunca Playfair, Space Grotesk, Syne ni serifs genéricas de relleno.

## 4. Composition & layout doctrine
- Contenedores centrados, `max-w-3xl` a `max-w-6xl` según densidad.
- Espaciado generoso, ritmo vertical amplio entre secciones (clamp ~5.5rem–10rem).
- Coordenada blueprint (firma del sistema): marca de sección tipo `CAP 03 · La constelación` — mono uppercase, marca en oro + línea degradada horizontal. Cada sub-marca puede sustituir "CAP" por su propio vocabulario de progreso (ver DESPEGA: verbos de acción en vez de capítulos).
- Card (glass/blueprint): fondo `rgba(20,18,34,.4–.55)`, borde `--line-soft`, radius ~1rem.
- Glass superficie (nav/overlays): `rgba(20,18,34,.55)` + `backdrop-filter: blur(20px) saturate(120%)`.
- Grilla blueprint de fondo: dos gradientes lineales de 1px en `--grid`, `background-size: 48px 48px`.
- Mobile-first. Sin scroll horizontal. Touch targets ≥44px. Foco visible: `outline: 2px solid gold, offset 3px`.

## 5. Aesthetic direction (style)
- Doctrina: **Blueprint/Técnico + Minimalismo premium + acento cálido**.
- Motion: reveals `opacity 0→1` + `translateY(28px→0)`, `0.8s ease-out`, stagger por `--d`. Solo transform/opacity. Siempre respeta `prefers-reduced-motion`.
- Motion con sentido narrativo, no decorativo — una pieza clave por vista.

## 6. Imagery / motivo central
- **El motivo visual central de cada constelación debe ser la metáfora operativa de lo que esa constelación literalmente hace** — nunca decoración heredada sin significado.
- Marca madre (`index.html`): constelación viva — nodos-estrella dorados que se conectan con líneas conforme aumenta la "densidad" (canvas `network.js`). Narrativamente: pocas conexiones = soledad, muchas = red. **Este motivo es exclusivo de la narrativa de vínculos entre personas** (index.html, historia.html) — no se reutiliza automáticamente en sub-marcas cuyo tema no sea "red humana".

## 7. Logo & assets
- Ícono: figura dorada "persona-árbol"/estrella con raíces, línea fina. Wordmark "LA RED DE LUZ" en mono tracking amplio o Spectral según contexto.
- Clear space: el logo respira solo, sin texto pegado, nunca sobre fondo cargado sin zona de negro limpio.
- Do/don't: no recolorear el ícono fuera de dorado; no estirarlo.

## 8. Voice tie-in
- Tono: íntimo (de tú a tú) con subidas míticas en los golpes de marca. Ritmo Gary Provost: frases cortas, y a veces una más larga que respira.
- Segunda persona: háblale al lector como protagonista.
- Cero clichés de coach.
- **Storytelling = inmersión, no narración en tercera persona.** El fundador/autor de cada pieza (Javi) es el mentor que ya cruzó el camino — su anécdota real sirve de evidencia y espejo, nunca de sustituto de la historia del lector. El lector es siempre el héroe de su propia historia; la pieza le abre preguntas y camino, no le dicta lo que siente.

## 9. Guardrails — el "never"
- Nunca negro puro `#000` — usar `--void #0d0b16`.
- Nunca el dorado puro como acento protagónico de una sub-marca — es la firma exclusiva de la marca madre (logo/nav).
- Nunca reutilizar el motivo de "constelación de red humana" en una sub-marca cuyo tema no sea vínculos entre personas — cada constelación necesita su propio motivo derivado de lo que hace.
- Nunca estética coach, frases motivacionales vacías, ni espiritualidad genérica.
- Nunca contar la historia de Javi en tercera persona sin devolverle al lector una pregunta o espejo propio — la evidencia sirve al lector, no reemplaza su historia.
