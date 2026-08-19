import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePageVisibility } from "./usePageVisibility";

describe("usePageVisibility", () => {
  it("tracks whether the document is visible", () => {
    const { result } = renderHook(() => usePageVisibility());

    expect(result.current).toBe(true);

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    act(() => document.dispatchEvent(new Event("visibilitychange")));

    expect(result.current).toBe(false);
  });
});
