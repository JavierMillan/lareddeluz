import { afterEach, describe, expect, it, vi } from "vitest";
import { clearAnswer, loadAnswer, saveAnswer } from "./exerciseStorage";

describe("guardado local del cuaderno", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("empieza con una respuesta vacia", () => {
    clearAnswer("TEST-EMPTY");
    expect(loadAnswer("TEST-EMPTY")).toEqual({});
  });

  it("guarda e hidrata una respuesta versionada", () => {
    expect(saveAnswer("TEST-SAVE", { note: "Esto sí importa" })).toEqual({ persisted: true });
    expect(loadAnswer("TEST-SAVE")).toEqual({ note: "Esto sí importa" });
    expect(JSON.parse(localStorage.getItem("despega:exercise:TEST-SAVE:v1")!)).toMatchObject({
      version: 1,
      values: { note: "Esto sí importa" },
    });
  });

  it("borra la respuesta elegida", () => {
    saveAnswer("TEST-CLEAR", { note: "se va" });
    expect(clearAnswer("TEST-CLEAR")).toBe(true);
    expect(loadAnswer("TEST-CLEAR")).toEqual({});
  });

  it("conserva la respuesta en memoria si localStorage falla", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("quota"); });
    expect(saveAnswer("TEST-MEMORY", { note: "sigue aquí" })).toEqual({ persisted: false });
    expect(loadAnswer("TEST-MEMORY")).toEqual({ note: "sigue aquí" });
  });
});
