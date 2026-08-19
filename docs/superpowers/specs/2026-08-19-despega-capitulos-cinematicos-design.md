# DESPEGA: capítulos cinematográficos

## Objetivo

Transformar DESPEGA de una secuencia larga de secciones clavadas al scroll en una experiencia de siete capítulos controlada por la persona. Cada letra debe sentirse como un momento distinto del método, no como el mismo componente con una microanimación diferente.

El rediseño también corrige las colisiones móviles señaladas y equilibra el vacío del lado derecho en el hero de La Red de Luz sin devolver protagonismo a la constelación ambiental.

## Principios

- El contenido y el orden del método DESPEGA se conservan.
- El cobre sigue siendo el hilo conductor, pero no el único clima emocional.
- Cada animación debe expresar la idea del capítulo y ofrecer una interacción comprensible.
- La navegación nunca debe sentirse como una trampa: siempre habrá forma visible de avanzar, retroceder y salir al índice.
- Teclado, swipe y controles táctiles ejecutan las mismas acciones.
- Movimiento reducido conserva todo el contenido y sustituye desplazamientos complejos por cambios directos de estado.

## Firma: Mapa de vuelo interior

DESPEGA se presenta como un instrumento futurista de navegación personal. No imita una cabina espacial ni una interfaz de ciencia ficción: combina cartografía, trayectoria y calibración para convertir el significado del método en interacción.

Las letras son simultáneamente índice, transición e instrumento. Al elegir una, el glifo crece desde su posición en la trayectoria y su geometría se transforma en la mecánica del capítulo. Al avanzar, un trazo del instrumento anterior origina la siguiente letra. Esta continuidad espacial es la firma memorable de la experiencia.

La trayectoria se construye capítulo por capítulo. En el umbral final aparece completa y conduce al CTA de DESPEGA.

## Arquitectura de la experiencia

### Entrada

El hero conserva su promesa actual y presenta las siete letras como coordenadas de una trayectoria. El CTA «Iniciar calibración» activa D; la compra de DESPEGA permanece disponible en la navegación.

### Visor de capítulos

Al entrar al método, un visor ocupa el viewport disponible debajo de la navegación. Sólo existe un capítulo activo. Cambiar de letra transforma el glifo o un trazo compartido para construir la escena siguiente; ya no hay wrappers de varios cientos de `svh`, contenido sticky ni animaciones sincronizadas continuamente al scroll.

El estado activo se refleja en el hash de la URL (`#d`, `#e`, `#s`, `#p`, `#ej`, `#g`, `#a`). Abrir directamente uno de esos hashes carga el capítulo correspondiente.

Controles:

- Botones visibles «Anterior» y «Siguiente».
- Índice DESPEGA con la letra activa indicada.
- Flechas izquierda/derecha en teclado.
- Swipe horizontal en pantallas táctiles.
- Escape regresa al índice/hero cuando el visor tiene el foco.

El último capítulo conduce al umbral final y su CTA comercial.

## Lenguaje visual

La interfaz base permanece nocturna. El cobre une todas las escenas; un segundo clima cambia con el significado del capítulo. Líneas vectoriales, capas SVG, perspectiva CSS y partículas discretas producen profundidad sin depender de WebGL:

| Capítulo | Clima | Función emocional |
| --- | --- | --- |
| D · Descubre | óxido y niebla | desorientación que encuentra referencia |
| E · Envía calma | azul nocturno | desaceleración corporal |
| S · Selecciona | terracota y carbón | distinguir peso de valor |
| P · Planifica | oro tenue | dirección y posibilidad |
| E · Ejecuta | coral eléctrico | tensión antes de actuar |
| G · Guarda | madera y ámbar | integrar herida y aprendizaje |
| A · Ajusta | cobre amanecer | cruzar una decisión |

No se busca un arcoíris. Los colores secundarios aparecen como luz, profundidad y respuesta interactiva; la tipografía, los controles y los elementos estructurales siguen perteneciendo a DESPEGA. La animación significativa siempre responde a una acción; el ambiente nunca reemplaza a la interacción.

## Mecánicas por capítulo

### D · La brújula

La curva de D se convierte en una brújula fuera de eje. Al elegir una dirección, el rumbo se estabiliza y traza el primer segmento de la trayectoria.

### E · La respiración

Los tres trazos de E se expanden y contraen hasta formar un campo de respiración. Activarlo guía una inhalación y una exhalación, y reduce el movimiento y la densidad ambiental. No depende de mantener presionado ni bloquea el avance.

### S · La balanza

La curva de S separa dos planos: «drena» y «cuesta y vale». La interacción cambia inclinación, luminosidad y posición lateral de la balanza; ningún elemento se desplaza verticalmente sobre otro. En móvil se convierte en dos grupos apilados estables.

### P · La ruta

El tallo de P se prolonga como carta de navegación. Las frases del súper tú se revelan como destinos y la interacción selecciona una para convertirla en el rumbo visible.

### E · La onda

Los trazos de la segunda E se convierten en una onda de voz con tensión contenida. El botón «Mandar el audio» resuelve el temblor, limpia la señal y muestra «Mandado. No pasó nada.» como estado real y accesible.

### G · Los hilos

La apertura de G origina los hilos que vinculan cada herida con el sueño que nació de ella. En escritorio los hilos cruzan la composición; en móvil cada pareja conserva una conexión vertical explícita.

### A · El umbral

La A se abre físicamente como un umbral. La acción «Cruzar» desplaza el punto más allá del borde, completa la trayectoria DESPEGA y revela la invitación final. También funciona con un toque o tecla; no depende de arrastrar.

## Composición responsive

### Escritorio

- Escena dividida entre narrativa y mecánica, con proporciones distintas según el capítulo.
- Navegación superior estable y controles del visor en el borde inferior.
- Altura mínima basada en `100dvh`, con fallback de `100svh`.
- El contenido puede desplazarse internamente sólo cuando la altura disponible no alcanza.

### Móvil

- Navbar compacta con logo, marca abreviada y CTA que nunca invade el contenido.
- Espacio superior reservado explícitamente para la navegación y safe area.
- Una sola columna; la mecánica se presenta antes o después del texto según la secuencia emocional.
- Controles inferiores con áreas táctiles mínimas de 44 px y safe area.
- Tipografía limitada por ancho real, sin letras decorativas debajo del navbar.
- La balanza S no usa traslaciones verticales y sus filas nunca se superponen.

## Transiciones y accesibilidad

- Duración objetivo entre capítulos: 450–700 ms.
- Se animan principalmente `transform` y `opacity`.
- El capítulo entrante recibe foco programáticamente en su título.
- El anuncio de capítulo cambia mediante una región `aria-live="polite"`.
- Los controles tienen nombres específicos y foco visible.
- Con `prefers-reduced-motion`, el cambio es inmediato y se eliminan loops ambientales.
- El swipe es un atajo; botones y teclado siempre están disponibles.

## Reequilibrio del hero de La Red de Luz

El bloque secundario deja de descansar en la esquina inferior derecha. Se alinea más cerca del centro óptico del titular y gana escala tipográfica moderada. Una línea tenue crea relación con el bloque principal.

No se agrega otra ilustración grande ni se aumenta la constelación de fondo. El equilibrio proviene de la composición editorial, no de llenar el vacío con decoración.

En móvil, el bloque secundario permanece debajo de las acciones y conserva separación suficiente del navbar.

## Componentes y responsabilidades

- `Despega.tsx`: entrada, navegación global y montaje del viaje.
- `ChapterJourney`: estado activo, hash, teclado, swipe, trayectoria acumulada y transición entre capítulos.
- `ChapterScene`: marco semántico y composición compartida.
- `FlightPath`: índice de letras, progreso y trazo acumulado del viaje.
- `LetterMorph`: capa SVG compartida que transforma el glifo en instrumento sin contener lógica editorial.
- Mecánicas independientes por letra: contienen únicamente la interacción específica.
- Los datos editoriales permanecen en `letters.ts`; se amplían sólo con la información visual necesaria.

El componente `PinnedLetter` y el modelo de progreso por scroll se retiran cuando el visor los sustituya.

## Verificación

- Navegación directa y secuencial por los siete hashes.
- Controles anterior/siguiente, teclado, Escape y swipe.
- Estado y anuncio accesible de cada capítulo.
- Ausencia de solapamientos en S a 320, 375, 390 y 430 px.
- Navbar sin colisiones en móvil y zoom al 200%.
- Movimiento reducido sin pérdida de contenido.
- CTA de compra intacto.
- Hero de La Red de Luz equilibrado en escritorio sin fortalecer el fondo.
- Suite de pruebas, TypeScript y build multipágina para GitHub Pages.
