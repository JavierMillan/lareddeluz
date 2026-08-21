# Cuaderno vivo de DESPEGA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir los veinte ejercicios de DESPEGA en herramientas inmersivas, fieles al PDF, conectables de forma opcional y correctamente imprimibles.

**Architecture:** Una unión discriminada asigna un instrumento a cada ejercicio. Los componentes específicos guardan en `ExerciseAnswer`; `answerToBlocks` traduce cualquier instrumento a bloques semánticos para el PDF. Las conexiones leen otras respuestas sólo cuando la persona pulsa “Traer lo que ya escribiste”.

**Tech Stack:** React 18, TypeScript, Motion, Vitest, Testing Library, CSS y generador PDF propio.

---

- [x] Definir los veinte contratos y comprobar que cada código tiene su instrumento.
- [x] Implementar D1–D4 y E1–E2 con captura única y fiel al libro.
- [x] Implementar S1–S4 como balanza, conversación, carta y muro.
- [x] Implementar P1–P4 como identidad, brecha, territorio y sprint.
- [x] Implementar EJ1–EJ2 como peso real y pivote.
- [x] Implementar G1–G2 como retrospectiva y registro mínimo.
- [x] Implementar A1–A2 como anatomía del sistema y mesa de decisión.
- [x] Añadir conexiones opcionales E2→S1, P1→P2 y P4→EJ1/EJ2/G1.
- [x] Hacer responsivas e imprimibles las composiciones.
- [x] Verificar con `vitest`, TypeScript, Vite y el contrato de build.

