import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Breath, Compass, Edge, Scars, SuperYou, Tremble, Weigh } from "./Mechanics";
import { WEIGH } from "./letters";

describe("chapter instruments", () => {
  it("respira sin pedir permiso: no hay boton de arranque", () => {
    render(<Breath />);
    expect(screen.queryByRole("button")).toBeNull();
    // la palabra cambia cada 2.4s, asi que no puede vivir en un live region
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByText(/tu cuerpo también participa/i)).toBeTruthy();
  });

  it("la brujula deriva sola y solo se puede sostener", async () => {
    render(<Compass />);
    // no hay slider: el capitulo es sobre haber soltado el timon
    expect(screen.queryByRole("slider")).toBeNull();
    const dial = screen.getByRole("button", { name: /sostén/i });
    expect(dial).toHaveAttribute("aria-pressed", "false");
    await userEvent.pointer({ keys: "[MouseLeft>]", target: dial });
    expect(dial).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/se queda quieta mientras la sostienes/i)).toBeTruthy();
  });

  it("pesa un item a la vez, sin imprimir la respuesta", async () => {
    render(<Weigh />);
    // la clasificacion no puede estar visible antes de que el lector decida
    expect(screen.queryByText(/^cuesta y vale$/i, { selector: "small" })).toBeNull();
    expect(screen.getByText(WEIGH[0].text)).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: "Drena" }));
    expect(screen.queryByText(WEIGH[0].text)).toBeNull();
    expect(screen.getByText(WEIGH[1].text)).toBeTruthy();
  });

  it("en planifica escribe el lector, no el autor", async () => {
    render(<SuperYou />);
    const field = screen.getByRole("textbox", { name: /súper tú/i });
    await userEvent.type(field, "el que no se calla");
    expect(field).toHaveValue("el que no se calla");
    // las lineas de Javi siguen ahi, pero como evidencia
    expect(screen.getByText(/así lo escribió él/i)).toBeTruthy();
  });

  it("el audio se manda y la onda sigue viva", async () => {
    render(<Tremble />);
    await userEvent.click(screen.getByRole("button", { name: "Lo mando" }));
    expect(screen.getByRole("status")).toHaveTextContent(/nadie contestó todavía/i);
    // nada de botones deshabilitados: el capitulo no se cierra
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("guarda expone el par activo de forma accesible", async () => {
    render(<Scars />);
    const switches = screen.getAllByRole("button", { name: /par \d de \d/i });
    expect(switches[0]).toHaveAttribute("aria-current", "true");
    await userEvent.click(switches[1]);
    expect(switches[1]).toHaveAttribute("aria-current", "true");
    expect(switches[0]).not.toHaveAttribute("aria-current");
  });

  it("cruzar el umbral no lo da por terminado", async () => {
    render(<Edge />);
    await userEvent.click(screen.getByRole("button", { name: "Salto" }));
    expect(screen.getByTestId("despega-threshold")).toHaveAttribute("data-crossed", "true");
    expect(screen.getByRole("status")).toHaveTextContent(/el jalón sigue ahí/i);
    expect(screen.queryByRole("button")).toBeNull();
  });
});
