import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CONSTELLATIONS } from "../data/constellations";
import { ConstellationFocus } from "./ConstellationFocus";

describe("ConstellationFocus", () => {
  it("shows the contextual CTA and closes with Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ConstellationFocus selected={CONSTELLATIONS[0]} onClose={onClose} />);

    expect(screen.getByRole("dialog", { name: "DESPEGA" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Recorrer el método" })).toHaveAttribute("href", "/despega/");
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("keeps suspended VitalBeat informational", () => {
    render(<ConstellationFocus selected={CONSTELLATIONS[4]} onClose={vi.fn()} />);
    expect(screen.getByText("Suspendida por ahora")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
