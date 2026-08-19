import { describe, expect, it } from "vitest";
import { CONSTELLATIONS } from "./constellations";

describe("CONSTELLATIONS", () => {
  it("declara tres constelaciones activas con CTA propio", () => {
    const active = CONSTELLATIONS.filter((item) => item.status === "active");

    expect(active.map((item) => item.id)).toEqual(["despega", "dtmm", "ingles"]);
    expect(active.map((item) => item.cta.label)).toEqual([
      "Recorrer el método",
      "Explorar las clases",
      "Entrar a las sesiones",
    ]);
  });

  it("mantiene VitalBeat visible pero sin enlace", () => {
    const vitalBeat = CONSTELLATIONS.find((item) => item.id === "vitalbeat");

    expect(vitalBeat).toMatchObject({ status: "suspended" });
    expect("cta" in vitalBeat!).toBe(false);
  });
});
