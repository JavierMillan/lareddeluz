import { describe, expect, it } from "vitest";
import { EXERCISES } from "./exercises";
import { EXPERIENCE_BY_CODE, answerToBlocks } from "./exerciseExperiences";

describe("experiencias del cuaderno", () => {
  it("configura explicitamente los 20 ejercicios", () => {
    expect(Object.keys(EXPERIENCE_BY_CODE).sort()).toEqual(EXERCISES.map((item) => item.code).sort());
  });

  it("D1 conserva la lectura directa del libro principal", () => {
    expect(EXPERIENCE_BY_CODE.D1).toMatchObject({
      kind: "reading",
      statement: "Los pingüinos de Alaska bailan cumbia los martes.",
      question: "¿Por qué la escuchaste?",
      downloadable: false,
    });
    expect(answerToBlocks("D1", {})).toEqual([]);
  });

  it("normaliza clasificaciones para imprimir", () => {
    expect(answerToBlocks("E2", { drena: ["Junta"], neutro: [], recarga: ["Caminar"] })).toEqual([
      { label: "Me drena", lines: ["Junta"] },
      { label: "Me recarga", lines: ["Caminar"] },
    ]);
  });

  it("convierte una composicion en una declaracion legible", () => {
    const blocks = answerToBlocks("P4", {
      weeks: "2",
      goal: "publicar",
      feeling: "curiosidad",
      cadence: "3 mañanas",
      review: "viernes 28",
    });
    expect(blocks[0].lines[0]).toBe("Durante las próximas 2 semanas voy a publicar, sintiendo curiosidad, dedicándole 3 mañanas por semana, y lo reviso el viernes 28.");
  });

  it("mantiene las preguntas y columnas del libro en EJ2 y A2", () => {
    expect(EXPERIENCE_BY_CODE.EJ2).toMatchObject({
      kind: "writing",
      prompts: expect.arrayContaining(["¿Qué puedo hacer distinto sin romperme?", "¿Le bajo a la meta o le cambio la forma?"]),
    });
    expect(EXPERIENCE_BY_CODE.A2).toMatchObject({
      kind: "capture",
      categories: expect.arrayContaining([
        { key: "added", label: "Lo que yo estoy agregando" },
        { key: "realRisks", label: "Riesgos reales" },
        { key: "inventedRisks", label: "Riesgos inventados" },
      ]),
    });
  });

  it("conserva completas las instrucciones del libro principal", () => {
    const exercise = (code: string) => EXERCISES.find((item) => item.code === code)!;
    expect(exercise("D2").notice).toMatch(/busca a un profesional/);
    expect(exercise("D2").steps[0]).toMatch(/quién estaba ahí\.$/);
    expect(exercise("D2").steps[2]).toMatch(/Es entre tú y tú, pero sin que te dé pena mirarlo\.$/);
    expect(exercise("D3").steps[0]).toMatch(/Ahí es donde se esconden\.$/);
    expect(exercise("D4").steps[0]).toMatch(/así es como hablas de verdad\.$/);
    expect(exercise("E1").steps[4]).toMatch(/la que te bajó de verdad\.$/);
    expect(exercise("E2").steps[3]).toMatch(/Aunque sean quince minutos\.$/);
    expect(exercise("S1").steps[4]).toMatch(/ahí está la cuenta\.$/);
    expect(exercise("P4").steps[5]).toMatch(/lo reviso el \[fecha\]\.»$/);
    expect(exercise("A2").steps).toHaveLength(7);
    expect(exercise("A2").steps[6]).toMatch(/dirección de esa respuesta\.$/);
  });
});
