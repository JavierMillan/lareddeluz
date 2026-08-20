# Navegación circular entre ejercicios

## Objetivo

Permitir avanzar o retroceder entre los 20 ejercicios de DESPEGA sin volver al índice y sin perder respuestas guardadas.

## Interacción

- La barra superior del cuaderno mostrará el ejercicio anterior, el contador actual y el ejercicio siguiente.
- La navegación será circular: desde D1, “anterior” abre A2; desde A2, “siguiente” abre D1.
- Cada control mostrará flecha y código de destino. En pantallas amplias podrá incluir el título accesible mediante `aria-label`; en móvil conservará código y flecha con un área táctil mínima de 44 px.
- Al navegar se actualizará el parámetro `?ejercicio=`, se cargará la respuesta guardada del destino y el foco pasará al título de la nueva hoja.
- No se agregarán atajos de teclado globales para evitar conflictos mientras la persona escribe.

## Arquitectura

- `Ejercicios` calculará los vecinos a partir del orden de `EXERCISES` usando módulo para cerrar el ciclo.
- `ExerciseWorkspace` recibirá dos destinos y un callback único de navegación.
- La navegación reutilizará el flujo actual de URL y estado; no duplicará persistencia ni almacenamiento.
- Los controles no aparecerán al imprimir.

## Casos límite

- D1 → anterior abre A2.
- A2 → siguiente abre D1.
- Una URL válida mantiene el orden esperado.
- Cambiar de ejercicio durante el estado “guardando” no debe perder la respuesta actual: antes de navegar se persistirá el contenido pendiente de forma inmediata.

## Verificación

- Pruebas de interfaz para avanzar, retroceder y cerrar el ciclo en ambos extremos.
- Prueba de persistencia al navegar con una respuesta pendiente.
- Suite completa, TypeScript y build de producción.
