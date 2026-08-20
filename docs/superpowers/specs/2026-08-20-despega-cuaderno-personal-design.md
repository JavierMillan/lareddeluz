# DESPEGA — Cuaderno personal interactivo

**Fecha:** 2026-08-20  
**Estado:** Diseño validado; pendiente de aprobación de especificación  
**Alcance:** `/ejercicios/`

## 1. Resultado buscado

Transformar la página de ejercicios de DESPEGA de un índice con formularios modales repetidos a un cuaderno digital personal: íntimo, claro y dinámico. La experiencia debe invitar a realizar el ejercicio, no a llenar un trámite.

El índice seguirá siendo el mapa de entrada. Al abrir un ejercicio, la persona entra a una hoja de pantalla completa con una interacción diseñada para la naturaleza de ese ejercicio. La salida impresa y el PDF se generan sin el índice ni contenido visual detrás.

## 2. Decisiones aprobadas

- Usar una **hoja completa**, no modal ni panel superpuesto.
- Mantener una URL compartible por ejercicio dentro de la entrada estática de GitHub Pages.
- Adoptar la atmósfera **A · Cobre vivo**.
- Mantener un solo lenguaje visual, pero variar la interacción según el ejercicio.
- Convertir D1, “Escúchate”, en una pausa breve de diez segundos sin campos ni PDF individual.
- Guardar las respuestas localmente en el dispositivo, sin cuenta ni servidor por ahora.
- Mantener una descarga PDF basada en datos y sumar impresión limpia de la hoja activa.

## 3. Principios de experiencia

1. **El ejercicio decide la herramienta.** Los pasos del libro no se convierten automáticamente en cajas de texto.
2. **Una intención por pantalla.** La hoja activa domina; índice y footer desaparecen mientras se trabaja.
3. **Acompañar sin fiscalizar.** No hay estados de “completo/incompleto”, porcentajes ni validaciones que parezcan tarea escolar.
4. **La respuesta pertenece a la persona.** El guardado es local, visible y explicado con lenguaje directo.
5. **El movimiento da significado.** Las transiciones marcan entrada, enfoque, clasificación o decisión; no decoran cada elemento.
6. **La impresión es una salida propia.** No es una captura de la interfaz.

## 4. Arquitectura de navegación

### Índice

`/ejercicios/` muestra los veinte ejercicios agrupados por coordenada. Cada tarjeta conserva código, título, tiempo o material necesario y una indicación breve del tipo de experiencia.

### Hoja activa

Al elegir un ejercicio:

- la aplicación actualiza la URL con un parámetro estable, por ejemplo `/ejercicios/?ejercicio=D2`;
- el índice sale de la vista y se renderiza únicamente la hoja activa;
- “Volver al índice” limpia el parámetro sin recargar la página;
- atrás/adelante del navegador funciona de manera natural;
- abrir o compartir la URL restaura directamente esa hoja;
- un código desconocido vuelve al índice sin romper la página.

Se usa query string en vez de `/ejercicios/D2/` porque GitHub Pages no resuelve rutas dinámicas sin generar archivos HTML adicionales.

## 5. Dirección visual: Cobre vivo

### Atmósfera

- Base tinta casi negra, con matices cálidos en vez de negro puro uniforme.
- Halos cobre de baja opacidad que crean profundidad sin competir con el contenido.
- Una espiral ascendente ambiental, grande y apenas visible, propia de DESPEGA.
- Retícula técnica muy tenue y localizada; nunca debe cubrir toda la hoja con el mismo contraste.
- La hoja usa una superficie tinta ligeramente más clara que el fondo y una línea de margen cobre.

### Sistema de color

Se elimina el azul aislado de “Envía calma”. Todas las coordenadas viven en una familia cobre común y se distinguen por:

- temperatura del cobre;
- glifo y código de coordenada;
- ritmo de composición;
- microanimación asociada al verbo.

El color no será el único medio de identificación. El contraste de texto y controles debe cumplir WCAG AA.

### Tipografía

- Serif editorial para títulos, preguntas y frases de cierre.
- Sans legible para contexto e instrucciones.
- Monoespaciada solo para códigos, progreso nominal y estado de guardado.

## 6. Sistema de interacciones

La escritura guiada sigue disponible cuando es la herramienta correcta, pero deja de ser el molde universal. Cada ejercicio recibe una configuración explícita de experiencia.

### A. Pausa u observación

Para ejercicios donde la acción ocurre fuera del formulario.

- temporizador o pulso visual discreto;
- una instrucción a la vez;
- cierre con “continuar”, sin obligar a producir evidencia.

**Ejemplo aprobado:** D1 muestra una pausa de diez segundos. No crea textarea, no guarda una respuesta vacía y no ofrece PDF individual.

### B. Escritura guiada

Para reflexión narrativa, despedidas o cartas.

- la pregunta aparece como encabezado editorial;
- un espacio amplio y continuo reemplaza la cuadrícula de campos pequeños;
- se avanza entre momentos del ejercicio sin perder lo escrito;
- el contexto “qué esperar” aparece como acompañamiento, no como advertencia permanente.

**Ejemplos:** D2 y S3.

### C. Captura y clasificación

Para auditorías, registros y listas que evolucionan durante varios días.

- añadir elementos debe tomar pocos segundos;
- los elementos se pueden mover entre categorías;
- las columnas se apilan en móvil sin perder su categoría;
- cuando aplique, se muestra el día o tramo actual, no un porcentaje de productividad.

**Ejemplos aprobados:** E2 usa “me drena / neutro / me recarga”; G2 usa un registro mínimo.

### D. Decisión y comparación

Para separar, priorizar o elegir.

- elementos breves que se mueven entre dos o tres zonas;
- confirmaciones suaves y reversibles;
- el resultado final queda visualmente legible en pantalla y papel.

**Ejemplo aprobado:** S4 usa “lo que se va / lo que se queda”.

### E. Composición guiada

Para planes o declaraciones formadas por varias decisiones pequeñas.

- cada respuesta completa una parte de una frase o mapa;
- la declaración resultante se actualiza en vivo;
- el resultado tiene jerarquía suficiente para guardarlo o imprimirlo.

**Ejemplo aprobado:** P4 construye la frase del primer miniviaje.

### Configuración, no heurística

El tipo de interacción no se deduce del número de pasos. Se añadirá una definición explícita por ejercicio, incluyendo sus campos, categorías y etiquetas. Esto evita que un ejercicio sin pasos, como D1 o A2, reciba automáticamente un textarea genérico.

Antes de mapear los veinte ejercicios se hará una revisión puntual de integridad contra el workbook: el origen actual contiene frases truncadas en algunos pasos y A2 carece de pasos aunque sí describe un ejercicio. Esta revisión corrige datos, no reescribe el método.

## 7. Estado y guardado local

### Modelo

Las respuestas se guardan por código de ejercicio y versión de esquema. El modelo admite texto, listas, categorías y composiciones sin convertir todo a texto prematuramente.

Ejemplo conceptual:

```ts
type ExerciseAnswer = {
  version: 1;
  updatedAt: string;
  values: Record<string, string | string[] | Record<string, string[]>>;
};
```

### Comportamiento

- hidratar la respuesta al abrir la hoja;
- guardar con debounce después de cada cambio;
- mostrar “Guardado en este dispositivo” solamente después de una escritura exitosa;
- conservar datos entre recargas;
- ofrecer “Borrar mis respuestas de este ejercicio” como acción secundaria con confirmación;
- capturar errores de cuota o acceso a `localStorage` y permitir seguir trabajando en memoria;
- no usar analítica para capturar respuestas ni contenido personal.

## 8. Impresión y PDF

Habrá dos salidas complementarias.

### Imprimir la hoja activa

`window.print()` usa estilos `@media print` que:

- ocultan navegación, fondo atmosférico, botones y estados de guardado;
- imprimen solo encabezado, propósito, respuestas y cierre del ejercicio activo;
- eliminan alturas fijas, overflow interno, sombras y animaciones;
- permiten saltos de página naturales;
- repiten etiquetas cuando una estructura continúa en otra página;
- mantienen categorías comprensibles sin depender del color.

Como el índice no existe en el árbol visible de la hoja activa, nunca puede quedar detrás o encima en impresión.

### Descargar PDF

El generador recibe las respuestas estructuradas y cada tipo de interacción define cómo convertirlas a bloques imprimibles. La composición visual de pantalla no se serializa directamente.

- texto narrativo → encabezado y párrafos;
- listas y categorías → secciones con etiquetas;
- decisiones → columnas convertidas a grupos lineales legibles;
- composición → declaración final y datos de apoyo;
- D1 → sin descarga individual.

El generador debe paginar todas las respuestas; no puede cortar silenciosamente contenido al llegar al margen inferior. Se verificarán tamaño carta, acentos en español, varias páginas y respuestas largas.

## 9. Movimiento y accesibilidad

- Entrada a hoja: transición corta de profundidad y opacidad, sin scroll secuestrado.
- Cambio de momento: desplazamiento pequeño que conserve orientación.
- Clasificación: el movimiento confirma el nuevo lugar del elemento.
- `prefers-reduced-motion: reduce` elimina transformaciones y temporizadores visuales no esenciales.
- Todas las acciones de arrastrar tienen alternativa por botones o menú para teclado y touch.
- Foco visible en todos los controles.
- Al abrir una hoja, el foco llega al título o primera acción; al volver, regresa a la tarjeta que la abrió.
- Los estados no dependen únicamente de color.
- Touch targets mínimos de 44 × 44 px.

## 10. Móvil

- La hoja ocupa el viewport disponible, pero el documento mantiene un solo scroll.
- La navegación usa una fila compacta: volver, código y acciones en menú cuando no caben.
- Columnas de clasificación se apilan y pueden cambiarse desde un selector accesible.
- Frases compuestas se reacomodan como bloques, sin inputs diminutos en línea.
- No se usan alturas fijas para contenido editable.
- El teclado virtual no debe ocultar el campo activo ni los controles de continuidad.
- Se respetan safe areas en iOS.

## 11. Estados límite

- `localStorage` bloqueado: aviso discreto y trabajo en memoria durante la sesión.
- respuesta guardada con esquema anterior: migración explícita o conservación segura; nunca borrado silencioso.
- ejercicio sin configuración: fallback editorial legible y error visible en desarrollo, no formulario genérico en producción.
- URL inválida: regreso al índice.
- contenido muy largo: crece la hoja y pagina la salida.
- impresión iniciada desde el índice: se imprime el índice limpio o se solicita abrir un ejercicio; nunca un modal vacío.

## 12. Verificación

### Pruebas automatizadas

- navegación por query string y botones atrás/adelante;
- D1 no renderiza campos ni descarga individual;
- hidratación, autosave, borrado y fallo de almacenamiento;
- renderizador correcto para cada familia de interacción;
- serialización de cada familia al PDF;
- PDF multipágina sin truncamiento;
- hoja desconocida vuelve al índice;
- reduced motion y controles alternativos a drag.

### Revisión manual

- 320, 375, 768, 1024 y 1440 px;
- Chrome, Safari móvil y Firefox;
- navegación completa por teclado;
- zoom del navegador a 200 %;
- impresión y guardado como PDF en carta;
- respuestas largas, listas vacías y listas extensas;
- recarga, regreso y enlace compartido.

## 13. Fuera de alcance

- cuentas, sincronización entre dispositivos o almacenamiento en servidor;
- seguimiento de progreso comunitario;
- convertir el cuaderno en LMS;
- editar el contenido metodológico del libro;
- rediseñar la landing principal de DESPEGA en este cambio.

## 14. Criterios de aceptación

La entrega se considera correcta cuando:

1. no existe modal ni doble scrollbar;
2. cada ejercicio abre como una hoja de pantalla completa con URL restaurable;
3. D1 funciona como pausa sin escritura ficticia;
4. los ejercicios ya no comparten un formulario universal;
5. la atmósfera Cobre vivo reemplaza el negro plano y el azul aislado sin bajar legibilidad;
6. las respuestas sobreviven una recarga en el mismo dispositivo;
7. impresión y PDF contienen únicamente la hoja y todas sus respuestas, sin superposición ni truncamiento;
8. móvil, teclado y reduced motion conservan la experiencia completa.
