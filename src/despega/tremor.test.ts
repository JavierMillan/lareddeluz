import { describe, expect, it } from "vitest";
import { tremorOffset } from "./tremor";

describe("tremorOffset", () => {
  it("stays still without intensity", () => {
    expect(tremorOffset(240, 0)).toBe(0);
  });

  it("returns a bounded oscillation", () => {
    const offset = tremorOffset(240, 1.6);
    expect(Math.abs(offset)).toBeLessThanOrEqual(1.6);
  });
});
