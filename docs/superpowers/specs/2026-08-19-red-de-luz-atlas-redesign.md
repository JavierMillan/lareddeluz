# La Red de Luz — Atlas vivo y recorrido narrativo

Fecha: 2026-08-19  
Estado: diseño aprobado para revisión escrita

## Objetivo

La portada debe comunicar que La Red de Luz es el cielo donde viven distintas constelaciones: ecosistemas con personas, experiencias en vivo y recursos alrededor de una misión. La experiencia debe despertar curiosidad, explicar lo suficiente para entender el modelo y convertir hacia dos niveles distintos:

1. La Red invita al grupo general de avisos.
2. Cada constelación lleva a su propio espacio.

El resultado conservará el fondo espacial aprobado, recuperará el recorrido explicativo de la versión anterior y reemplazará el radar actual por un atlas vivo de constelaciones reales.

## Principios de experiencia

- Sentir primero, entender después y actuar cuando haya afinidad.
- La atmósfera acompaña al texto; nunca compite con él.
- Cada sección cambia de composición y ritmo para evitar monotonía.
- La exploración tiene una recompensa: seleccionar una constelación cambia la cámara y abre un modo de enfoque inmersivo.
- El texto orienta; la curiosidad impulsa la interacción.
- La versión móvil se compone para móvil y no encoge el escritorio.

## Dirección visual

### Fondo

Se conserva el cielo profundo, el grano sutil y la luz atmosférica. La red ambiental permanecerá entre 8% y 18% de opacidad mientras haya texto principal. Sólo ganará intensidad durante transiciones, demostraciones de vínculos y el atlas.

### Identidad

La navegación utilizará el logo existente en `public/assets/logo.png`. Spectral seguirá como tipografía editorial e Inter como tipografía funcional. Oro, cobre y azul profundo se mantienen como base; los acentos propios de cada constelación sólo aparecen en sus estrellas, resplandor y CTA.

### Constelaciones

Las figuras se basarán en conexiones occidentales publicadas por Stellarium mediante identificadores Hipparcos. La asociación con los ecosistemas es metafórica:

- DESPEGA: Aquila — vuelo y elevación.
- De tu Mente al Mundo: Lyra — creación y transmisión.
- ¡Hablemos Inglés!: Gemini — dos voces e intercambio.
- Club de Lectura: Corona Borealis — un círculo que se completa con otras personas.
- VitalBeat: Leo — cuerpo, pulso y fuerza.

Las constelaciones no tendrán tarjeta, caja ni superficie propia. Vivirán directamente en el cielo. Su affordance se comunicará mediante etiqueta, cambio de luminosidad, escala moderada, foco visible y movimiento breve del trazo.

## Recorrido de la página

### 1. Hero — una luz suelta

Título: **Brillar solo cansa.**

Contexto:

> Puedes aprender por tu cuenta, empezar un proyecto y cambiar de rumbo. Pero llega un punto donde avanzar sin gente que entienda lo que estás construyendo se vuelve pesado.

CTA principal: **Ocupa tu lugar en la red**  
Destino: `https://chat.whatsapp.com/LQwZxtrJSmNECZEyIwO9az`

CTA secundario: **Explorar el cielo**  
Destino: sección del atlas.

### 2. El reflejo

Se recupera la idea de “No estás perdido. Estás sin estructura.” con tres reconocimientos breves:

- Ya llegaste, pero algo sigue sin sentirse tuyo.
- Traes una idea, pero no encuentra dónde crecer.
- Estás cambiando y hacerlo en soledad empieza a pesar.

Esta sección usa composición modular y menor escala tipográfica para romper el patrón de titulares gigantes a pantalla completa.

### 3. El primer vínculo

Explica que una persona es un nodo y que una conexión nace cuando dos personas comparten intención, apoyo o trabajo. La demostración visual enlaza sólo dos o tres nodos; el texto tiene prioridad y el fondo baja de intensidad.

### 4. La constelación

Explica en pocas líneas que una constelación es un proyecto convertido en ecosistema humano: no una audiencia, sino personas que se reúnen alrededor de una misión. Esta sección hace la transición visual hacia el atlas.

### 5. Atlas vivo

Ocupa al menos una pantalla completa. El encabezado es breve:

> Encuentra dónde crecer.

> Cada constelación reúne personas, experiencias y recursos alrededor de una misión. El texto orienta; la curiosidad hace el resto.

En escritorio, las cinco figuras se distribuyen como un mapa celeste asimétrico y mantienen suficiente separación para que sus zonas táctiles no se crucen. En móvil, dejan de usar coordenadas libres: se organizan en una ruta vertical escalonada para impedir recortes y solapamientos.

### 6. La Red

Una sección breve vuelve a mostrar el conjunto y explica el nivel superior: varias constelaciones comparten el mismo cielo. Aquí se aclara que hoy existen sesiones y grupos en vivo, y que los recursos y clases irán habitando espacios propios conforme crezca la plataforma.

### 7. Umbral

Título: **Empezaste como una luz suelta. Ya no tienes que serlo.**

CTA: **Entrar al grupo de avisos**  
Destino: `https://chat.whatsapp.com/LQwZxtrJSmNECZEyIwO9az`

Texto auxiliar: **Gratis · avisos y nuevas constelaciones · sin ruido**.

## Modo de enfoque inmersivo

Seleccionar una constelación no abre un panel lateral. Inicia una transición de cámara:

1. El atlas retrocede, pierde contraste y deja de recibir interacción.
2. La figura seleccionada crece dentro de una retícula orbital sutil.
3. El nombre, la promesa, un contexto breve y el CTA aparecen como navegación astronómica.
4. Cerrar devuelve exactamente el foco a la constelación que abrió la vista.

En escritorio, el contenido ocupa el tercio inferior izquierdo y la figura domina la mitad derecha. En móvil, la figura ocupa la parte superior y el contenido se apila debajo. El CTA permanece visible sin cubrir texto ni depender de una altura fija.

### Contenido y destinos

#### DESPEGA

- Promesa: siete pasos para soltar la vida que no es tuya y volver a elegirte.
- Contexto: metodología de introspección estructurada para ordenar lo interno y tomar decisiones propias.
- CTA: **Recorrer el método**.
- Destino: `/despega/`.

#### De tu Mente al Mundo

- Promesa: convertir una idea en algo que puedas mostrar, usar y seguir construyendo.
- Contexto: clases y experiencias aplicadas sobre presencia digital, creación e inteligencia artificial.
- CTA: **Conocer De tu Mente al Mundo**.
- Destino: `https://detumentealmundo.lareddeluz.com/`.

#### ¡Hablemos Inglés!

- Promesa: practicar inglés hablando con personas reales, no sólo estudiándolo en un cuaderno.
- Contexto: sesiones en vivo para practicar, equivocarse y aprender sin presión.
- CTA: **Entrar al grupo de Inglés**.
- Destino: `https://chat.whatsapp.com/Iw8zFKhkPVaFTGHrMPtTWi`.

#### Club de Lectura

- Promesa: leer una idea y descubrir en qué se convierte cuando pasa por otras personas.
- Contexto: lecturas compartidas y conversaciones para pensar en comunidad.
- CTA: **Entrar al Club de Lectura**.
- Destino: `https://chat.whatsapp.com/BxRf4AsM93G7DocbbtQGF7`.

#### VitalBeat

- Promesa histórica: aquí no entrenamos solas, crecemos juntas.
- Contexto: estudio boutique para mujeres con Barre y entrenamiento funcional, grupos pequeños y acompañamiento cercano.
- Estado: **Suspendida por ahora**.
- No muestra CTA ni enlaza al sitio mientras permanezca suspendida.

## Navegación y estados

- Todos los nodos del atlas serán botones semánticos con nombres accesibles.
- Flechas moverán el foco entre constelaciones; `Enter` y `Espacio` abrirán el enfoque.
- `Escape` cerrará el enfoque.
- El modo inmersivo usará `role="dialog"`, nombre accesible, foco inicial razonable, trampa de foco y restauración al disparador.
- El fondo será `inert` mientras el enfoque esté abierto y el scroll de la página quedará bloqueado.
- Los enlaces externos abrirán una pestaña nueva con `rel="noopener"`; los internos conservarán la misma pestaña.
- VitalBeat anunciará claramente su estado suspendido y no parecerá accionable hacia un destino inexistente.

## Responsive y rendimiento

- Puntos de control visual: 1440, 1024, 768, 390 y 320 px.
- No habrá texto, navegación ni constelaciones recortadas a 320 px.
- Las zonas táctiles medirán al menos 44 × 44 CSS px.
- La interfaz soportará zoom del navegador al 200% sin perder acciones.
- El cielo se renderizará con SVG y CSS; no se incorporará Three.js.
- Las animaciones se pausarán cuando la pestaña no sea visible.
- `prefers-reduced-motion` eliminará zoom, parallax y trazos animados; el cambio de estado seguirá siendo comprensible.

## Contraste y legibilidad

- Texto normal: contraste mínimo 4.5:1.
- Texto grande y elementos gráficos necesarios: mínimo 3:1.
- Las etiquetas secundarias que hoy se ven demasiado tenues subirán de contraste.
- El color nunca será la única señal de selección o suspensión.
- Los párrafos conservarán un máximo cercano a 65 caracteres por línea.

## Componentes previstos

- `SiteNavigation`: logo, navegación y CTA global.
- `SkyField`: fondo ambiental con intensidad controlada por fase.
- `NarrativeJourney`: reflejo, vínculo y definición de constelación.
- `ConstellationAtlas`: distribución responsive y navegación entre ecosistemas.
- `ConstellationFigure`: SVG real reutilizable por atlas y enfoque.
- `ConstellationFocus`: diálogo inmersivo y CTA contextual.
- `NetworkFinale`: explicación de la red y CTA general.
- Modelo de datos extendido con figura real, contexto, destino y estado.

## Validación y auditoría

La implementación se cerrará con una sola pasada consolidada:

1. **Design critique**: primera impresión, jerarquía, ritmo, affordance y consistencia.
2. **WCAG 2.1 AA**: contraste, teclado, foco, diálogo, objetivos táctiles y zoom al 200%.
3. **Web Interface Guidelines**: auditoría de los archivos React y CSS contra las reglas vigentes.
4. **Pruebas automatizadas**: datos y destinos, apertura/cierre del diálogo, restauración de foco, teclado y estados suspendidos.
5. **QA visual**: capturas en 1440, 390 y 320 px, además de revisión de DESPEGA.
6. **Build final**: TypeScript, Vitest, Vite y contrato de GitHub Pages.

Los hallazgos críticos o mayores se corregirán antes de declarar la entrega completa. Los hallazgos menores se corregirán si no amplían el alcance ni comprometen el calendario.

## Fuera de alcance

- Plataforma completa tipo Skool.
- Autenticación, perfiles y progreso de cursos.
- Reactivar VitalBeat.
- Crear nuevas constelaciones adicionales.
- Reescribir los sitios externos de DTMM, Inglés o VitalBeat.

## Fuentes de contexto

- Stellarium Western Sky Culture: `https://github.com/Stellarium/stellarium-skycultures/blob/master/western/index.json`
- VitalBeat: `https://vitalbeat.lareddeluz.com/`
- Sitio anterior de La Red de Luz, conservado en el historial de Git.
