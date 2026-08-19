import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SkyField } from "./SkyField";

describe("SkyField", () => {
  it("expone la fase narrativa sin anunciar el SVG decorativo", () => {
    const { rerender } = render(<SkyField phase="void" active />);
    const field = screen.getByTestId("sky-field");

    expect(field).toHaveAttribute("aria-hidden", "true");
    expect(field).toHaveAttribute("data-phase", "void");

    rerender(<SkyField phase="ecosystem" active />);
    expect(field).toHaveAttribute("data-phase", "ecosystem");
  });
});
