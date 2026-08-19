import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ConstellationObservatory } from "./ConstellationObservatory";

describe("ConstellationObservatory", () => {
  it("cambia de portal con teclado y muestra el CTA correcto", async () => {
    const user = userEvent.setup();
    render(<ConstellationObservatory />);
    const despega = screen.getByRole("tab", { name: /DESPEGA/ });

    despega.focus();
    await user.keyboard("{ArrowRight}");

    expect(
      screen.getByRole("tab", { name: /De tu Mente al Mundo/ })
    ).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("link", { name: /Explorar las clases/ })).toBeVisible();
  });

  it("presenta VitalBeat como suspendida y sin CTA", async () => {
    const user = userEvent.setup();
    render(<ConstellationObservatory />);

    await user.click(screen.getByRole("tab", { name: /VitalBeat/ }));

    expect(screen.getAllByText("Constelación suspendida")).not.toHaveLength(0);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
