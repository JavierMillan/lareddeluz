# La Red de Luz — experiencia C+

Fecha: 2026-08-19  
Estado: aprobado conceptualmente  
Alcance: primera etapa pública en React, desplegable en GitHub Pages

## 1. Objetivo

Convertir la portada de La Red de Luz en la entrada pública a un mundo de ecosistemas. La experiencia debe permitir que una persona:

1. sienta el problema de crecer o construir en aislamiento;
2. entienda, sin una explicación extensa, qué son los nodos, los vínculos y las constelaciones;
3. descubra las constelaciones que existen hoy;
4. entre a cada una mediante un CTA coherente con su experiencia real.

La página no presentará todavía funciones privadas, perfiles, progreso ni biblioteca unificada. Debe dejar una arquitectura visual y técnica preparada para una futura plataforma de sesiones, cursos, diapositivas, grabaciones y recursos.

## 2. Principio rector

> La persona debe sentir primero, entender después y actuar cuando ambas cosas coincidan.

La dirección artística, el frontend y el marketing funcionan como un solo sistema:

- La composición visual prepara una emoción.
- La interacción permite vivir el concepto.
- El copy nombra lo que la persona acaba de sentir.
- El CTA aparece cuando la escena ya le dio significado.

La técnica se comunica mediante precisión, no mediante decoración tecnológica: retícula, ritmo, jerarquía, estados claros, transiciones consistentes, rendimiento y accesibilidad.

## 3. Concepto C+

C+ combina un prólogo cinematográfico breve con un observatorio vivo de constelaciones.

La firma visual es la transformación progresiva del cielo:

```text
vacío → nodo → vínculo → constelación → ecosistema
```

El prólogo explica lo mínimo indispensable. El observatorio permite explorar lo que ya existe y se convierte en el puente conceptual hacia la futura plataforma.

## 4. Recorrido narrativo

### Escena 1 — El vacío

Una sola luz habita un espacio amplio y silencioso. La escala y el movimiento deben comunicar aislamiento antes de nombrarlo.

- Mensaje principal: “Brillar solo cansa.”
- Función: reconocimiento emocional.
- Interacción: la luz responde sutilmente al movimiento o al scroll; no persigue el cursor como un efecto decorativo.
- CTA: “Entender la red”, como ancla hacia el siguiente tramo.

### Escena 2 — El vínculo

Una segunda luz aparece y una línea nace entre ambas. La conexión ocurre por avance del visitante, no como animación automática desconectada de la lectura.

- Mensaje: “No te falta luz. Te falta dónde conectarla.”
- Función: explicar que las personas son nodos y que un vínculo crea posibilidades.
- Copy auxiliar: breve, íntimo y sin lenguaje de coach.
- CTA: ninguno; la escena debe continuar naturalmente.

### Escena 3 — La constelación

Más nodos se organizan alrededor de una misión compartida. Aquí se introduce la definición operativa:

> Una constelación es un ecosistema de personas, experiencias y recursos que crecen alrededor de una misión.

La visualización debe diferenciar una red humana de un adorno espacial: los enlaces representan relaciones y las agrupaciones representan proyectos reales.

### Escena 4 — El observatorio

El observatorio es la escena principal y memorable. Presenta el cielo actual con cuatro constelaciones, cada una con identidad, estado y acción propios.

#### DESPEGA

- Estado: activa.
- Rol: introspección estructurada y construcción de identidad.
- Acento: cobre `#d4823f`.
- CTA: “Recorrer el método”.
- Destino inicial: experiencia React de DESPEGA.

#### De tu Mente al Mundo

- Estado: activa.
- Rol: clases y experiencias para convertir conocimiento e ideas en presencia digital.
- Identidad: conserva su lenguaje visual propio.
- CTA: “Explorar las clases”.
- Destino: `https://detumentealmundo.lareddeluz.com/presentacion/`.

#### ¡Hablemos Inglés!

- Estado: activa y basada en sesiones en vivo.
- Rol: practicar inglés en comunidad mediante sesiones, diapositivas y recursos.
- Identidad: conserva su acento rojo y su lenguaje más directo.
- CTA: “Entrar a las sesiones”.
- Destino: `https://detumentealmundo.lareddeluz.com/ingles/`.

#### VitalBeat

- Estado: suspendida.
- Rol histórico: crecimiento físico.
- Presentación: visible como parte del cielo, con menor intensidad y etiqueta explícita “Suspendida”.
- CTA: no tendrá enlace ni promesa de reapertura.

### Escena 5 — La red viva

Después de explorar el observatorio, la página muestra que las constelaciones no son productos aislados: comparten un cielo, una cultura y personas que circulan entre experiencias.

- Mensaje: “La Red de Luz es el cielo donde viven las constelaciones.”
- Evidencia: sesiones, clases, métodos y recursos reales; no métricas inventadas.
- CTA primario: “Explorar las constelaciones”, que devuelve o enfoca el observatorio.
- CTA secundario: “Proponer una constelación”, dirigido al canal actual de contacto.

### Escena 6 — Umbral

Cierre breve con la filosofía del movimiento y una invitación no agresiva.

- Mensaje de cierre: “Ninguna luz debería crecer sola.”
- CTA comunitario: enlace al canal vigente de La Red de Luz.
- El manifiesto se reduce a tres principios memorables; la página no repetirá todos los argumentos anteriores.

## 5. Dirección visual

### Sensación

Limpia, moderna, elegante y asombrosa por precisión. La referencia a la dirección de imagen de Apple se interpreta como disciplina de composición, jerarquía, ritmo y detalle, no como copia de su estética.

### Paleta madre

- Vacío: `#0d0b16`.
- Superficie: `#161423`.
- Texto cálido: `#f9f4e3`.
- Dorado estructural: `#e4cd85`.
- Dorado profundo: `#c08a2d`.
- Azul atmosférico: `#163384`.

El dorado funciona como coordenada, línea y orientación. Los acentos de cada constelación aparecen únicamente cuando esa constelación entra en foco.

### Tipografía

- Display madre: Spectral.
- Cuerpo: Inter.
- Coordenadas y estados: JetBrains Mono.

La escala tipográfica será fluida. Los titulares emplearán pocas palabras y gran espacio alrededor; el cuerpo mantendrá anchos de lectura de aproximadamente 50–65 caracteres.

### Composición

- El vacío y el espacio negativo son parte del mensaje.
- No se usarán rejillas de tarjetas genéricas para el observatorio.
- Cada constelación se presenta como un portal editorial dentro del mapa.
- Las líneas, coordenadas y estados codifican información real.
- Se elimina cualquier elemento ornamental que no contribuya a jerarquía, orientación o emoción.

## 6. Motion e interacción

El movimiento tendrá una función narrativa por escena:

- El nodo pulsa para comunicar vida.
- El vínculo se dibuja para comunicar conexión.
- Los grupos se organizan para comunicar constelación.
- El observatorio cambia de atmósfera para comunicar identidad.
- El portal activo revela su CTA y una descripción breve.

Reglas:

- Priorizar `transform` y `opacity`.
- Evitar animaciones simultáneas compitiendo por atención.
- Mantener una interacción protagonista por viewport.
- Usar scroll ligado al progreso solamente cuando el gesto represente avance narrativo.
- Respetar `prefers-reduced-motion`; la experiencia reducida conservará toda la información y los estados sin recorridos largos ni movimiento continuo.
- Pausar animaciones ambientales cuando la pestaña no esté visible.
- En touch, cada estado debe ser accesible por toque y no depender de hover.

## 7. Arquitectura frontend

La aplicación seguirá siendo React + TypeScript + Vite + Motion. Se evitará introducir un router completo mientras solo existan dos entradas públicas.

### Entradas públicas

- `/` sirve La Red de Luz.
- `/despega/` sirve DESPEGA.

Vite se configurará como build multipágina para producir rutas físicas compatibles con GitHub Pages. No se dependerá de rewrites del servidor.

Estructura propuesta:

```text
src/
  app/
    RedDeLuzApp.tsx
    DespegaApp.tsx
  red-de-luz/
    data/constellations.ts
    scenes/
    components/
    motion/
  despega/
    ...
  shared/
    components/
    hooks/
    motion/
    styles/
index.html
despega/
  index.html
```

### Límites de componentes

- `SkyField`: render atmosférico; no contiene copy ni navegación.
- `NarrativeScene`: administra progreso y estados de una escena.
- `ConstellationObservatory`: coordina selección y navegación del mapa.
- `ConstellationPortal`: presenta una constelación desde datos; no conoce el layout global.
- `ConstellationStatus`: traduce estados `active | suspended` a texto y comportamiento accesible.
- `SiteNavigation`: enlaces reales de la portada y acceso a DESPEGA.
- `ReducedMotionExperience`: adapta densidad y duración sin duplicar contenido.

## 8. Modelo de datos

Las constelaciones se declararán como datos tipados para que el observatorio pueda crecer sin mezclar contenido con animación:

```ts
type Constellation = {
  id: string;
  name: string;
  summary: string;
  status: "active" | "suspended";
  accent: string;
  cta?: { label: string; href: string; external: boolean };
};
```

Una constelación suspendida no puede definir CTA. Esta regla se validará mediante tipos o una unión discriminada.

## 9. GitHub Pages y rutas

El build debe producir, como mínimo:

```text
dist/index.html
dist/despega/index.html
dist/assets/*
dist/CNAME
```

Todos los enlaces internos usarán rutas consistentes con el dominio personalizado. El enlace desde La Red de Luz hacia DESPEGA será `/despega/`. Los recursos estáticos compartidos vivirán únicamente en `public/` o serán importados por Vite; se eliminará la necesidad de mantener copias manuales en dos ubicaciones.

El despliegue conservará `CNAME` y se verificará desde una URL directa y desde navegación interna.

## 10. Accesibilidad y rendimiento

- Contraste WCAG AA como mínimo.
- Foco visible y orden lógico de teclado.
- Touch targets de al menos 44 × 44 px.
- Navegación por teclado completa en el observatorio.
- Semántica real para enlaces, botones, encabezados y estados.
- Canvas o SVG decorativos quedan fuera del árbol accesible; la misma información existe en HTML.
- JavaScript inicial objetivo: no aumentar innecesariamente el bundle actual; las escenas pesadas podrán cargarse de forma diferida.
- Imágenes con dimensiones, formatos modernos y carga diferida fuera del primer viewport.
- No usar video de fondo como requisito para comprender el hero.

## 11. SEO y presentación social

Cada entrada tendrá metadatos propios:

- título y descripción;
- canonical;
- Open Graph y Twitter cards;
- imagen social específica;
- idioma español;
- favicon y theme color.

La Red de Luz y DESPEGA no compartirán título, descripción ni imagen social.

## 12. Manejo de estados y fallos

- Los destinos externos se declaran en datos y se verifican durante desarrollo.
- Un portal sin URL no se renderiza como enlace.
- Si las capacidades gráficas son limitadas, la página conserva una composición estática legible.
- Si JavaScript falla, el HTML inicial mantiene el mensaje, el catálogo y sus enlaces principales.
- Ninguna función futura se muestra como disponible antes de existir.

## 13. Estrategia de pruebas

### Unitarias

- Modelo de constelaciones y regla de estados.
- Resolución de rutas internas y externas.
- Adaptación a movimiento reducido.

### Componentes

- Navegación por teclado del observatorio.
- CTA correcto para cada constelación activa.
- VitalBeat visible, suspendida y sin enlace.
- Estados accesibles y nombres comprensibles.

### Integración/build

- El build genera `/index.html` y `/despega/index.html`.
- Los assets y `CNAME` están presentes.
- No existen enlaces internos hacia `despega.html`.

### Visuales y experiencia

- Capturas de escritorio y móvil para cada escena clave.
- Revisión de overflow a 320, 375, 768, 1024 y 1440 px.
- Revisión con movimiento normal y reducido.
- Prueba manual de navegación táctil y teclado.

## 14. Criterios de aceptación

La primera etapa está lista cuando:

1. La portada explica nodos, vínculos y constelaciones sin depender de los cuatro pilares.
2. DTMM, Inglés y DESPEGA aparecen activas con CTAs distintos y correctos.
3. VitalBeat aparece suspendida y no es interactiva.
4. La experiencia mantiene su significado con movimiento reducido y sin hover.
5. La portada y DESPEGA tienen rutas físicas que funcionan al abrirse directamente en GitHub Pages.
6. La home estática anterior ya no es la fuente de verdad.
7. No se muestran funciones privadas o de plataforma que todavía no existen.
8. La interfaz alcanza un estándar visual limpio, moderno y editorial sin caer en plantillas, exceso de brillo o tarjetas genéricas.
9. El build, las pruebas automatizadas y la verificación de enlaces terminan sin errores.

## 15. Fuera de alcance

- Autenticación y perfiles.
- Progreso entre constelaciones.
- Reproductor de sesiones o grabaciones dentro de La Red de Luz.
- LMS, pagos, comentarios o membresías.
- Migración de DTMM e Inglés a React.
- Reactivación de VitalBeat.
- Desarrollo de nuevas constelaciones o representación completa de los cuatro pilares.
