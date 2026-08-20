import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ejercicios from "./Ejercicios";
import { EXERCISES } from "@/despega/exercises";
import { LETTERS } from "@/despega/letters";

describe("cuaderno de trabajo", () => {
  beforeEach(() => window.history.replaceState({}, "", "/ejercicios/"));
  afterEach(() => localStorage.clear());

  it("lista los 20 ejercicios repartidos en las 7 coordenadas", () => {
    render(<Ejercicios />);
    for (const exercise of EXERCISES) expect(screen.getByText(exercise.code)).toBeTruthy();
    for (const letter of LETTERS) {
      expect(EXERCISES.filter((item) => item.letter === letter.id)).toHaveLength(letter.exercises);
    }
  });

  it("ofrece el cuaderno completo para descargar", () => {
    const { container } = render(<Ejercicios />);
    const links = [...container.querySelectorAll('a[href="/assets/despega-workbook.pdf"]')];
    expect(links.length).toBeGreaterThan(0);
    expect(links.some((link) => link.hasAttribute("download"))).toBe(true);
  });

  it("abre D1 como pausa de pantalla completa sin textbox ni PDF", async () => {
    render(<Ejercicios />);
    await userEvent.click(screen.getByText("D1").closest("button")!);

    expect(screen.getByRole("main", { name: /D1 · Escúchate/i })).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByText(/descargar esta hoja/i)).toBeNull();
    expect(window.location.search).toBe("?ejercicio=D1");
  });

  it("E2 permite capturar momentos en tres categorias", async () => {
    render(<Ejercicios />);
    await userEvent.click(screen.getByText("E2").closest("button")!);
    const workspace = screen.getByRole("main", { name: /E2 · Auditoría de energía/i });

    expect(within(workspace).getByRole("heading", { name: "Me drena" })).toBeTruthy();
    expect(within(workspace).getByRole("heading", { name: "Neutro" })).toBeTruthy();
    expect(within(workspace).getByRole("heading", { name: "Me recarga" })).toBeTruthy();

    await userEvent.type(within(workspace).getByRole("textbox", { name: "Agregar a Me drena" }), "Junta sin propósito");
    await userEvent.click(within(workspace).getByRole("button", { name: "Agregar en Me drena" }));
    expect(within(workspace).getByText("Junta sin propósito")).toBeTruthy();
  });

  it("abre una hoja directamente desde su URL y vuelve al indice", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=P4");
    render(<Ejercicios />);

    expect(screen.getByRole("main", { name: /P4 · Diseña tu primer miniviaje/i })).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: /volver al índice/i }));
    expect(screen.getByRole("heading", { name: /Los 20 ejercicios/i })).toBeTruthy();
    expect(window.location.search).toBe("");
  });

  it("autoguarda una respuesta y la recupera al volver", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=G2");
    const first = render(<Ejercicios />);
    const note = screen.getByRole("textbox", { name: "¿Qué necesito recordar de hoy?" });
    await userEvent.type(note, "Que sí avancé aunque fuera poco");
    await waitFor(() => expect(screen.getByText("Guardado en este dispositivo")).toBeTruthy(), { timeout: 2000 });
    first.unmount();

    render(<Ejercicios />);
    expect(screen.getByRole("textbox", { name: "¿Qué necesito recordar de hoy?" })).toHaveValue("Que sí avancé aunque fuera poco");
  });
});
