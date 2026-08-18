# Sistema de Diseño — La Red de Luz

> Pega este documento como contexto en claude.ai/design (o cualquier agente de diseño)
> para que lo que construyas salga con la identidad de La Red de Luz.
> Doctrina visual: **Blueprint/Técnico + Minimalismo premium + acento Déco celeste.**
> Principio rector: *"No luz mágica. Infraestructura para la luz."*

---

## 1. Esencia de marca

- **Arquetipo:** Arquitecto / Constructor de ecosistemas (Sabio + Constructor). NO coach, NO gurú.
- **Tesis:** una estrella sola no es nada; conectada, forma una constelación. Persona = estrella,
  vínculo = conexión, proyecto = constelación, ecosistema = La Red.
- **Tensión central:** ingeniería + alma. Estructura + luz. Tecnología + humanidad.
- **Frase núcleo:** "No te falta luz. Te falta estructura."
- **Emoción objetivo:** el escalofrío de reconocimiento ("esto me describe y nunca lo habían nombrado así").

**Evitar siempre:** estética coach ("activa tu luz"), laptop + gráficos IA, frases motivacionales
vacías, espiritualidad genérica, glassmorphism dorado genérico.
**Favorecer:** mapas, nodos, redes, coordenadas, protocolos, bitácoras, arquitectura celeste,
líneas técnicas intencionales.

---

## 2. Color (tokens)

| Token | Hex | Uso |
|---|---|---|
| `--gold` | `#e4cd85` | Acento principal: líneas, coordenadas, CTAs, destacados. Oro cálido. |
| `--gold-dark` | `#c08a2d` | Segundo oro, gradientes de botón. |
| `--blue` / deep-blue | `#163384` | Azul profundo de apoyo (nodos secundarios, atmósfera). |
| `--void` / void-deep | `#0d0b16` | Fondo principal (casi negro). |
| `--void-2` / void-medium | `#161423` | Superficies elevadas, cards. |
| light-birth | `#f9f4e3` | Blanco cálido (raro, para secciones claras). |
| `--line` | `rgba(228,205,133,.22)` | Línea técnica blueprint. |
| `--line-soft` | `rgba(228,205,133,.12)` | Bordes sutiles de cards. |
| `--grid` | `rgba(228,205,133,.04)` | Grilla blueprint de fondo. |

**Regla del dorado:** usarlo como **línea y coordenada**, no como glow difuso por todos lados.
Disciplina, no brillo.

**Texto sobre void:** blanco puro para titulares clave; `white/70` cuerpo; `white/55` secundario;
`white/40–45` etiquetas tenues. Oro para acentos. Todo cumple contraste AA/AAA sobre `#0d0b16`.

---

## 3. Tipografía (3 roles)

| Rol | Fuente | Uso | Notas |
|---|---|---|---|
| Display | **Spectral** (serif) | Titulares, headings | Pesos 500–700 (no 800). Itálica para acentos íntimos. Alma editorial/bitácora. |
| Cuerpo | **Inter** (sans) | Párrafos, texto largo | 300–400 para cuerpo ligero. Legibilidad limpia. |
| Técnica | **JetBrains Mono** | Coordenadas, etiquetas, niveles, datos | La firma de ingeniero. Tracking amplio (~.22–.3em), UPPERCASE, tamaño pequeño (.7rem). |

Google Fonts:
`Spectral:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500` · `Inter:wght@300;400;500;600` ·
`JetBrains+Mono:wght@400;500;700`

**Idioma tipográfico:** el peso técnico lo carga la mono; Spectral carga el alma; Inter desaparece
para dejar leer. Nunca uses Playfair, Space Grotesk, Syne ni serifs genéricas.

---

## 4. Componentes y patrones

**Coordenada blueprint** (firma del sistema) — marca de sección tipo `CAP 03 · La constelación`:
mono uppercase, marca en oro + línea degradada horizontal.

**Botón primario:** gradiente `gold → gold-dark`, texto `void`, radius ~0.85rem, hover
`translateY(-2px)` + sombra dorada suave.
**Botón fantasma:** borde `--line`, texto claro, hover a oro.

**Card (glass/blueprint):** fondo `rgba(20,18,34,.4–.55)`, borde `--line-soft`, radius ~1rem,
a veces con `border-left`/`border-top` de acento dorado. Hover: `translateY(-3–4px)` + borde a `--line`.

**Etiqueta mono (`mono-label`):** `.7rem`, tracking `.22em`, uppercase. Para overlines, estados, datos.

**Grilla blueprint de fondo:** dos gradientes lineales de 1px en `--grid`, `background-size: 48px 48px`.
Da la textura de plano técnico. Aplicar en secciones "frame".

**Glass superficie (nav/overlays):** `rgba(20,18,34,.55)` + `backdrop-filter: blur(20px) saturate(120%)`
+ borde `--line-soft`.

**Constelación viva (signature):** canvas de fondo con nodos-estrella dorados que se conectan con
líneas conforme aumenta la "densidad". Narrativamente: pocas conexiones = soledad, muchas = red.

---

## 5. Motion

- Reveals al entrar en viewport: `opacity 0→1` + `translateY(28px→0)`, `0.8s ease-out`, con
  `transition-delay` escalonado (`--d`).
- Micro-interacciones 150–300ms, `ease-out` al entrar.
- Solo transform/opacity (nunca width/height/top/left).
- **Siempre** respetar `prefers-reduced-motion`: animaciones a ~0ms, reveals visibles sin desplazamiento.
- Motion con sentido narrativo, no decorativo. Una pieza clave por vista, no efectos dispersos.

---

## 6. Voz y copy

- **Tono:** íntimo (de tú a tú, como si Javi te hablara al lado) con subidas míticas en los golpes de marca.
- **Ritmo (Gary Provost):** varía la longitud de frase. Frases cortas. Y a veces una más larga que
  respira y lleva al lector de la mano hasta el punto. Corta. Pega.
- **Segunda persona:** háblale al lector como protagonista ("eres una luz sola...").
- **Frases de guerra:** "No te falta luz. Te falta estructura." · "Tu idea no está muerta. Está sola." ·
  "La luz circula antes de regresar." · "Antes de pedir, aporta." · "Menos perfección, más verdad."
- **Cero clichés de coach.** Nada de "activa tu potencial", "sé tu mejor versión", "manifiesta".

---

## 7. Layout

- Fondo oscuro (`#0d0b16`) con radiales sutiles de azul y oro muy tenues.
- Contenedores centrados, `max-w-3xl` a `max-w-6xl` según densidad.
- Espaciado generoso, ritmo vertical amplio entre secciones (clamp ~5.5rem–10rem).
- Mobile-first. Sin scroll horizontal. Touch targets ≥44px.
- Foco visible en teclado: `outline: 2px solid gold, offset 3px`.

---

*Fuente de verdad viva: `css/styles.css` e `index.html` de este repo. Si algo aquí y el código
difieren, gana el código.*
