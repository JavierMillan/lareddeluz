import { describe, expect, it } from "vitest";
import { chapterFromHash, moveChapter, writeChapterHash } from "./journey";
describe("journey", () => {
  it("normaliza hashes y limita los extremos", () => {
    expect(chapterFromHash("#s")).toBe(2); expect(chapterFromHash("#unknown")).toBe(0);
    expect(moveChapter(0,-1)).toBe(0); expect(moveChapter(6,1)).toBe(6); expect(moveChapter(3,1)).toBe(4);
  });
  it("escribe el hash sin recargar", () => { writeChapterHash("ej"); expect(window.location.hash).toBe("#ej"); });
});
