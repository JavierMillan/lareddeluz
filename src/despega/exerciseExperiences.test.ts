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

  it("asigna a los 20 ejercicios el instrumento que corresponde a su accion", () => {
    expect(Object.fromEntries(Object.entries(EXPERIENCE_BY_CODE).map(([code, experience]) => [code, experience.kind]))).toEqual({
      D1: "reading", D2: "belief", D3: "phrase", D4: "audit",
      E1: "breathing", E2: "energy",
      S1: "drain-ledger", S2: "conversation", S3: "farewell", S4: "commitment",
      P1: "identity", P2: "gap", P3: "territory", P4: "sprint",
      EJ1: "effort", EJ2: "pivot",
      G1: "retrospective", G2: "daily-log",
      A1: "system-map", A2: "decision-table",
    });
  });

  it("imprime la respiracion elegida junto con la respuesta corporal", () => {
    expect(answerToBlocks("E1", { selected: "box", "note:box": "Se aflojaron mis hombros" })).toEqual([
      { label: "Respiración de caja", lines: ["Se aflojaron mis hombros"] },
      { label: "La respiración que elijo", lines: ["Respiración de caja"] },
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

  it("mantiene las preguntas del libro en EJ2 y la mesa de decision A2", () => {
    expect(EXPERIENCE_BY_CODE.EJ2).toMatchObject({ kind: "pivot" });
    expect(EXPERIENCE_BY_CODE.A2).toMatchObject({
      kind: "decision-table",
    });
  });

  it("conserva completas las instrucciones del libro principal", () => {
    const exercise = (code: string) => EXERCISES.find((item) => item.code === code)!;
    expect(exercise("D2").notice).toMatch(/busca a un profesional/);
    expect(exercise("D2").notice).not.toMatch(/recuerdo cotidiano/i);
    expect(exercise("D2").expect).not.toMatch(/acompañado|profesional/i);
    expect(exercise("D2").steps[0]).toMatch(/recuerdo cotidiano/);
    expect(exercise("D2").steps[2]).toMatch(/tres momentos.*protegió/i);
    expect(exercise("D3").steps[0]).toMatch(/Ahí es donde se esconden\.$/);
    expect(exercise("D4").steps[0]).toMatch(/así es como hablas de verdad\.$/);
    expect(exercise("E1").steps[4]).toMatch(/la que te bajó de verdad\.$/);
    expect(exercise("E2").steps[3]).toMatch(/Aunque sean quince minutos\.$/);
    expect(exercise("E2").needs).not.toMatch(/columnas/i);
    expect(exercise("S1").steps[4]).toMatch(/ahí está la cuenta\.$/);
    expect(exercise("P4").steps[5]).toMatch(/lo reviso el \[fecha\]/);
    expect(exercise("G2").needs).not.toMatch(/dormir/i);
    expect(exercise("A2").steps).toHaveLength(7);
    expect(exercise("A2").needs).not.toMatch(/columnas/i);
    expect(exercise("A2").steps[6]).toMatch(/dirección de esa respuesta\.$/);
  });

  it("mantiene las instrucciones breves y accionables", () => {
    const verboseSteps = EXERCISES.flatMap((exercise) => exercise.steps
      .map((step, index) => ({ code: exercise.code, step: index + 1, length: step.length }))
      .filter((item) => item.length > 240));

    expect(verboseSteps).toEqual([]);
    for (const exercise of EXERCISES) {
      if (exercise.notice) expect(exercise.notice.length, `${exercise.code}: aviso`).toBeLessThanOrEqual(500);
    }
  });

  it("habla desde el momento de completar la hoja, después de observar", () => {
    const exercise = (code: string) => EXERCISES.find((item) => item.code === code)!;

    expect(exercise("D3").needs).toMatch(/notaste durante el día/i);
    expect(exercise("D3").steps[0]).not.toMatch(/durante un día completo, pon atención/i);
    expect(exercise("D4").needs).toMatch(/video que grabaste/i);
    expect(exercise("D4").steps.join(" ")).not.toMatch(/déjalo reposar/i);
    expect(exercise("E2").needs).toMatch(/registro de la semana/i);
    expect(exercise("E2").steps.join(" ")).not.toMatch(/cada noche anota|al terminar la semana/i);
    expect(exercise("S1").needs).toMatch(/registro de dos semanas/i);
    expect(exercise("S1").steps.join(" ")).not.toMatch(/durante dos semanas|a las dos semanas/i);
    expect(exercise("EJ1").needs).toMatch(/registro.*semana/i);
    expect(exercise("EJ1").steps[0]).not.toMatch(/cada noche escribe/i);
  });
});
