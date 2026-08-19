import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { NarrativePrologue } from "./NarrativePrologue";

it("cuenta vacío, vínculo y constelación en ese orden", () => {
  render(<NarrativePrologue onPhaseChange={vi.fn()} />);

  const headings = screen.getAllByRole("heading").map((node) => node.textContent);
  expect(headings).toEqual([
    "Brillar solo cansa.",
    "No te falta luz.Te falta dónde conectarla.",
    "Una misión compartidacambia la forma del cielo.",
  ]);
  expect(screen.getByRole("link", { name: "Entender la red" })).toHaveAttribute(
    "href",
    "#vinculo"
  );
});
