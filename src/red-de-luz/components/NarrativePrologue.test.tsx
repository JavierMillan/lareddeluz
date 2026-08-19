import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { NarrativePrologue } from "./NarrativePrologue";

it("abre el recorrido con contexto y dos caminos claros", () => {
  render(<NarrativePrologue onPhaseChange={vi.fn()} />);

  expect(screen.getByRole("heading", { name: "Brillar solo cansa." })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Ocupa tu lugar/ })).toHaveAttribute(
    "href", "https://chat.whatsapp.com/LQwZxtrJSmNECZEyIwO9az"
  );
  expect(screen.getByRole("link", { name: /Explorar el cielo/ })).toHaveAttribute("href", "#constelaciones");
});
