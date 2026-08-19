import { describe, expect, it } from "vitest";
import { CONSTELLATIONS } from "./constellations";

describe("CONSTELLATIONS", () => {
  it("declara el cielo actual con figuras y destinos propios", () => {
    const active = CONSTELLATIONS.filter((item) => item.status === "active");

    expect(CONSTELLATIONS.map((item) => item.id)).toEqual([
      "despega",
      "dtmm",
      "ingles",
      "lectura",
      "vitalbeat",
    ]);
    expect(active.every((item) => item.figure.length > 0)).toBe(true);
    expect(active.find((item) => item.id === "dtmm")?.cta.href).toBe(
      "https://detumentealmundo.lareddeluz.com/"
    );
    expect(active.find((item) => item.id === "ingles")?.cta.href).toBe(
      "https://chat.whatsapp.com/Iw8zFKhkPVaFTGHrMPtTWi"
    );
    expect(active.find((item) => item.id === "lectura")?.cta.href).toBe(
      "https://chat.whatsapp.com/BxRf4AsM93G7DocbbtQGF7"
    );
  });

  it("mantiene VitalBeat visible pero sin enlace", () => {
    const vitalBeat = CONSTELLATIONS.find((item) => item.id === "vitalbeat");

    expect(vitalBeat).toMatchObject({ status: "suspended" });
    expect("cta" in vitalBeat!).toBe(false);
  });
});
