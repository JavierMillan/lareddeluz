import { describe, expect, it } from "vitest";
import { buildExercisePdfString } from "./exercisePdf";
import { EXERCISES } from "./exercises";



describe("hoja de ejercicio en PDF", () => {
  it("produce un PDF valido con la respuesta del lector", () => {
    const exercise = EXERCISES.find((item) => item.code === "D2")!;
    const pdf = (buildExercisePdfString(exercise, {
      "Tu creencia, en una frase": "No puedo pedir ayuda sin quedar mal",
    }));

    expect(pdf.startsWith("%PDF-1.4")).toBe(true);
    expect(pdf.trimEnd().endsWith("%%EOF")).toBe(true);
    // la tabla xref debe declarar los 6 objetos + el libre
    expect(pdf).toContain("xref\n0 7");
    expect(pdf).toMatch(/startxref\n\d+/);
    // el offset de startxref tiene que apuntar a la palabra xref
    const startxref = Number(pdf.match(/startxref\n(\d+)/)![1]);
    expect(pdf.slice(startxref, startxref + 4)).toBe("xref");
    // y lo que escribio el lector va dentro
    expect(pdf).toContain("No puedo pedir ayuda sin quedar mal");
  });

  it("codifica los acentos en WinAnsi, no los pierde", () => {
    const exercise = EXERCISES.find((item) => item.code === "P1")!;
    const pdf = (buildExercisePdfString(exercise, { "Mi super yo": "Soy el que sí se atreve" }));
    // "sí" -> la i acentuada va como octal \355
    expect(pdf).toContain("s\\355");
    expect(pdf).not.toContain("s�");
  });

  it("escapa parentesis, que romperian el string del PDF", () => {
    const exercise = EXERCISES[0];
    const pdf = (buildExercisePdfString(exercise, { Nota: "algo (entre parentesis) aqui" }));
    expect(pdf).toContain("algo \\(entre parentesis\\) aqui");
  });

  it("omite las respuestas vacias", () => {
    const exercise = EXERCISES[0];
    const pdf = (buildExercisePdfString(exercise, { Llena: "con texto", Vacia: "   " }));
    expect(pdf).toContain("LLENA");
    expect(pdf).not.toContain("VACIA");
  });
});
