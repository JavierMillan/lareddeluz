# Balance visual del workbook de DESPEGA

## Objetivo

Hacer que las hojas de ejercicios se sientan menos cuadradas sin perder orden, legibilidad ni la sensación de cuaderno. La dirección aprobada mezcla el aire editorial de la propuesta A, la suavidad de B y los contenedores asimétricos de C.

La regla visual es: **aire para explicar, contenedor para actuar, curva para orientar la mirada**.

## Alcance

Este cambio cubre la interfaz de cada ejercicio en `/ejercicios/`:

- encabezado y contexto del ejercicio;
- bloque desplegable de instrucciones;
- áreas de escritura, captura, decisión y composición;
- notas desplegables de acompañamiento;
- botones de navegación y acciones de la hoja;
- comportamiento responsive y estados de interacción.

No cambia el contenido, la persistencia, la navegación circular, la estructura de respuestas ni la salida impresa. El branding del PDF descargable se resolverá como una pieza separada cuando se elija su dirección visual.

## Dirección visual

### Superficie principal

La hoja completa conserva su geometría editorial y su ancho actual. No se redondeará como una tarjeta gigante. El marco exterior se hará más silencioso para que la forma no compita con el contenido.

El fondo orbital existente permanece como gesto ambiental, con baja intensidad.

### Encabezado y explicaciones

El título, propósito, requisitos e instrucciones vivirán principalmente en espacio abierto. La jerarquía se construirá con aire, líneas parciales, sangrías y cambios tipográficos, no con paneles completos.

La composición de escritorio mantendrá la relación de dos columnas entre contexto y requisitos. En mobile se apilará sin perder el orden de lectura.

### Áreas de acción

Los contenedores se reservarán para los lugares donde la persona escribe, clasifica o decide. Tendrán:

- radios asimétricos, con una o dos esquinas más suaves y otras casi rectas;
- fondos tenues, sin bordes completos de alto contraste;
- variaciones leves de posición para evitar una cuadrícula rígida;
- una alineación suficientemente estable para que comparar categorías siga siendo fácil.

Las áreas de texto largo conservarán el tratamiento editorial abierto con líneas horizontales. No se convertirán en cajas redondeadas.

### Ritmo y gesto orbital

Los círculos y arcos se usarán como señales de recorrido, no como decoración repetida. Habrá un gesto orbital dominante por hoja; el resto de los componentes permanecerá contenido.

## Interacción

### Desplegables

Los resúmenes de `Cómo hacerlo`, `Qué podrías sentir` y `Cómo vas a notar que algo cambió` deben comunicar que son interactivos mediante:

- cambio visible de color y contraste en hover;
- desplazamiento horizontal breve del texto;
- indicador `+ / −` o flecha que rota al abrir;
- superficie de interacción mínima de 44 px;
- estado `focus-visible` equivalente al hover para teclado;
- cursor de interacción y transición corta, sin movimiento continuo.

El estado abierto tendrá una señal persistente, no dependerá sólo de la animación.

### Contenedores de respuesta

En hover o focus, cada zona elevará ligeramente el contraste del fondo y del acento, sin saltar de posición. Los controles para agregar o mover respuestas conservarán sus etiquetas accesibles.

## Responsive

- En escritorio, las categorías podrán mantener columnas escalonadas.
- Debajo de 800 px, todas las zonas se apilarán y perderán los desplazamientos verticales decorativos.
- Los radios asimétricos se conservarán en mobile, pero con menor intensidad.
- No habrá desbordamiento horizontal salvo en la tabla semanal E2, que seguirá usando su contenedor de scroll.
- Los targets táctiles mantendrán al menos 44 px.

## Impresión y movimiento reducido

Los nuevos fondos, radios y gestos orbitales no aparecerán en impresión. La hoja impresa seguirá siendo lineal, blanca y sin capas superpuestas.

Con `prefers-reduced-motion`, las transiciones se reducirán prácticamente a cero. Los estados de hover, focus y apertura seguirán siendo visibles por color, forma e indicador.

## Implementación

El cambio debe resolverse principalmente en `src/despega/ejercicios.css`. Sólo se modificará `ExerciseWorkspace.tsx` si hace falta añadir un elemento semántico para el indicador de apertura; se preferirán los elementos nativos `details` y `summary` existentes.

No se crearán nuevas variantes por ejercicio. Las experiencias actuales —lectura, escritura, captura, decisión, energía y composición— compartirán el mismo sistema visual con ajustes por tipo.

## Verificación

- Pruebas existentes de los 20 ejercicios, navegación, persistencia y PDF deben seguir pasando.
- Se añadirá cobertura para los estados semánticos de los desplegables si cambia el marcado.
- Se verificará TypeScript y el build de producción.
- Se revisarán escritorio y mobile, además de teclado y `prefers-reduced-motion`.
- La impresión no debe mostrar fondos oscuros, órbitas ni contenedores superpuestos.
