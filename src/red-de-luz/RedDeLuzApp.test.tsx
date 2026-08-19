import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { RedDeLuzApp } from "./RedDeLuzApp";

describe("RedDeLuzApp", () => {
  it("conecta el recorrido, el atlas y los destinos correctos", async () => {
    const user = userEvent.setup();
    render(<RedDeLuzApp />);

    expect(screen.getByTestId("brand-logo")).toHaveAttribute("src", "/assets/logo.png");
    expect(screen.getByRole("link", { name: /ocupa tu lugar/i })).toHaveAttribute(
      "href",
      "https://chat.whatsapp.com/LQwZxtrJSmNECZEyIwO9az",
    );
    expect(screen.getByRole("heading", { name: /encuentra dónde crecer/i })).toBeInTheDocument();

    const club = screen.getByRole("button", { name: "Club de Lectura" });
    await user.click(club);

    expect(screen.getByRole("dialog", { name: "Club de Lectura" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /entrar al club de lectura/i })).toHaveAttribute(
      "href",
      "https://chat.whatsapp.com/BxRf4AsM93G7DocbbtQGF7",
    );

    await user.click(screen.getByRole("button", { name: /cerrar enfoque/i }));
    await waitFor(() => expect(club).toHaveFocus());
  });
});
