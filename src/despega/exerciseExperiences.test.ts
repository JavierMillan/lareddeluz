import { describe, expect, it } from "vitest";
import { EXERCISES } from "./exercises";
import { EXPERIENCE_BY_CODE, answerToBlocks } from "./exerciseExperiences";

describe("experiencias del cuaderno", () => {
  it("configura explicitamente los 20 ejercicios", () => {
    expect(Object.keys(EXPERIENCE_BY_CODE).sort()).toEqual(EXERCISES.map((item) => item.code).sort());
  });

  it("D1 es una pausa sin campos ni PDF", () => {
    expect(EXPERIENCE_BY_CODE.D1).toMatchObject({ kind: "pause", duration: 10, downloadable: false });
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
    });
    expect(blocks[0].lines[0]).toBe("Durante las próximas 2 semanas voy a publicar, sintiendo curiosidad, dedicándole 3 mañanas.");
  });
});
