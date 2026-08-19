import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConstellationFigure } from "./ConstellationFigure";

describe("ConstellationFigure", () => {
  it("renders a named Aquila figure with its stars", () => {
    render(<ConstellationFigure figure="aquila" label="Aquila" />);

    const figure = screen.getByRole("img", { name: "Aquila" });
    expect(figure).toHaveAttribute("data-figure", "aquila");
    expect(figure.querySelectorAll("circle").length).toBeGreaterThan(5);
  });
});
