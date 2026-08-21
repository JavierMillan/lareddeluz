# Refinamiento del cuaderno vivo de DESPEGA

## Objetivo

Corregir seis fricciones detectadas al usar el cuaderno: controles que parecen formulario, una semana que exige desplazamiento horizontal, reflexiones demasiado fragmentadas, figuras decorativas que compiten con la escritura y un orden emocional incoherente antes de la despedida.

La intervención conserva las respuestas existentes y mantiene la salida imprimible. El contenido de `DESPEGA 3.0.pdf` sigue siendo la fuente principal, salvo la corrección explícita de secuencia aprobada para el bloque S.

## Decisiones de experiencia

### D2 · Ponle nombre a tu creencia

La experiencia se convierte en una sola hoja narrativa con tres momentos:

1. **Lo que pasó:** recuerdo cotidiano, edad aproximada y personas presentes.
2. **Lo que aprendí a creer:** la conclusión en una frase. Dentro de este momento se incluye una nota breve sobre cómo esa creencia protegió o sirvió; deja de ser una caja independiente de igual peso.
3. **Lo que hoy elijo:** una nueva creencia concreta y reconocible.

La despedida se presenta como cierre editorial construido con lo anterior. La interfaz permite editar la frase final, pero no añade otra etapa visual. Se conserva el aviso para detenerse y buscar acompañamiento cuando aparezca algo demasiado intenso.

Las claves guardadas actuales (`moment`, `belief`, `served`, `goodbye`, `newBelief`) se mantienen para no perder respuestas.

### E1 · Encuentra tu respiración

Las tres técnicas permanecen disponibles como un repertorio. La persona elige primero la que le llama la atención y prueba esa técnica. Sólo la seleccionada despliega el espacio para registrar cómo quedó su cuerpo.

No se comunica que probar todas sea obligatorio. Se puede cambiar de técnica y conservar las notas anteriores. El cierre reconoce una respiración elegida, no una comparación terminada.

### E2 · Auditoría de energía

La captura se reorganiza como una bitácora compacta:

- actividad en la primera línea;
- día, hora, efecto y acción en una segunda línea visual más corta;
- controles con etiquetas visibles y superficies integradas al cuaderno;
- botón con una acción breve: `Añadir`.

La semana deja de ser una fila rígida de siete tarjetas:

- escritorio amplio: siete columnas dentro del ancho disponible;
- escritorio intermedio: cinco días laborales y una segunda fila para el fin de semana;
- móvil: agenda vertical por día;
- nunca hay desplazamiento horizontal.

Las tarjetas vacías son compactas y crecen sólo cuando reciben actividades. El color de cada registro comunica si drenó, fue neutro o recargó sin convertir la interfaz en un tablero administrativo.

### Secuencia S

El orden visible será:

1. S1 · reconocer lo que drena;
2. S2 · decirlo en voz alta y detectar la justificación;
3. S4 · decidir qué se queda y qué se va;
4. S3 · despedirse de lo que ya se decidió soltar.

Los códigos, títulos, almacenamiento y contenido interno no se intercambian. Sólo cambia el orden de navegación y presentación. Así se conserva toda respuesta existente y se corrige la progresión emocional.

S3 podrá traer opcionalmente los elementos ya decididos como `se va` en S4. La importación nunca será automática.

### P1 · La versión que eliges

Se elimina la figura ovalada y el medidor porcentual. La composición será una página editorial:

- afirmaciones personales a la izquierda;
- aportes hacia otras personas a la derecha;
- el nombre de esa versión como firma amplia al final.

La jerarquía y el espacio construyen el retrato; ningún trazo se superpone a los campos.

### P3 · Encuentra tu territorio

El falso diagrama de Venn se reemplaza por un mapa de afinidades en tres etapas:

1. capturar habilidades como fragmentos breves;
2. nombrar grupos o parentescos encontrados;
3. escribir el territorio que reúne la mayoría y comprobar dónde se usa, a quién sirve y quién pagaría por ello.

En escritorio las etapas forman un recorrido horizontal conectado por líneas discretas. En móvil se apilan como un recorrido vertical. Los botones dejan de ser círculos flotantes y se integran a cada superficie de captura.

## Lenguaje visual

Se conservan la paleta, tipografías y materialidad del cuaderno. La firma de esta pasada es una **geografía escrita**: las relaciones se perciben por proximidad, flujo y jerarquía, no por óvalos colocados encima de inputs.

Los campos usarán líneas de escritura, fondos de baja opacidad y focos de cobre contenidos. Los radios serán asimétricos y discretos; ninguna caja debe parecer una tarjeta genérica.

## Responsive, accesibilidad e impresión

- No habrá scroll horizontal entre 320 px y escritorio amplio.
- Todos los controles conservarán etiquetas accesibles y foco visible.
- Los botones tendrán áreas táctiles de al menos 44 px.
- Las respiraciones podrán elegirse con teclado mediante controles radio reales.
- `prefers-reduced-motion` seguirá siendo respetado; esta pasada no depende de animaciones para comprenderse.
- En impresión se muestran las respuestas y se ocultan compositores, botones y controles vacíos.
- El nuevo orden S se reflejará también en las flechas de navegación circular.

## Compatibilidad y pruebas

- No se renombra ninguna clave persistida.
- Se añadirán pruebas de orden S, selección no obligatoria de todas las respiraciones, ausencia de scroll estructural en E2 y landmarks de las nuevas composiciones.
- Se conservarán las pruebas de autoguardado, recuperación y generación PDF.
- La verificación final incluye Vitest, TypeScript, build de Vite y contrato de GitHub Pages.

## Entregable editorial adicional

Al terminar se entregará un prompt reutilizable para corregir el ebook. El prompt pedirá conservar la voz de DESPEGA, cambiar la secuencia para decidir qué se queda antes de despedirse y revisar las transiciones afectadas sin reescribir capítulos no relacionados.
