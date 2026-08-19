import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConstellationAtlas } from "./ConstellationAtlas";

describe("ConstellationAtlas", () => {
  it("opens the selected ecosystem and exposes suspended VitalBeat", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<ConstellationAtlas onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: /Club de Lectura/ }));
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "lectura" }), expect.any(HTMLElement));
    expect(screen.getByRole("button", { name: /VitalBeat, suspendida/ })).toBeInTheDocument();
  });

  it("moves focus through the sky with arrow keys", async () => {
    const user = userEvent.setup();
    render(<ConstellationAtlas onSelect={vi.fn()} />);

    const despega = screen.getByRole("button", { name: /DESPEGA/ });
    despega.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("button", { name: /De tu Mente al Mundo/ })).toHaveFocus();
  });
});
