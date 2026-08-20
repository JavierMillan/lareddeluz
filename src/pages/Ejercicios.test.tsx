import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ejercicios from "./Ejercicios";
import { EXERCISES } from "@/despega/exercises";
import { LETTERS } from "@/despega/letters";
import { clearAnswer } from "@/despega/exerciseStorage";

describe("cuaderno de trabajo", () => {
  beforeEach(() => window.history.replaceState({}, "", "/ejercicios/"));
  afterEach(() => {
    for (const exercise of EXERCISES) clearAnswer(exercise.code);
    localStorage.clear();
  });

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

  it("abre D1 como la lectura directa indicada en el libro principal", async () => {
    render(<Ejercicios />);
    await userEvent.click(screen.getByText("D1").closest("button")!);

    expect(screen.getByRole("main", { name: /D1 · Escúchate/i })).toBeTruthy();
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByText("Los pingüinos de Alaska bailan cumbia los martes.")).toBeTruthy();
    expect(screen.getByText("¿Por qué la escuchaste?")).toBeTruthy();
    expect(screen.getByText(/algo dentro de ti la leyó en voz alta/i)).toBeTruthy();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button", { name: "Comenzar pausa" })).toBeNull();
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
    expect(within(workspace).getByText(/cada noche anota lo que hiciste ese día.*hora aproximada/i)).toBeTruthy();
    expect(within(workspace).getByRole("table", { name: /dónde se te va el día/i })).toBeTruthy();
    expect(within(workspace).getByRole("textbox", { name: "Lunes 06:00" })).toBeTruthy();

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

  it("navega de forma circular entre el primer y el último ejercicio", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=D1");
    render(<Ejercicios />);

    await userEvent.click(screen.getByRole("button", { name: /ejercicio anterior: A2/i }));
    expect(screen.getByRole("main", { name: /A2 · La decisión que traes atorada/i })).toBeTruthy();
    expect(window.location.search).toBe("?ejercicio=A2");

    await userEvent.click(screen.getByRole("button", { name: /ejercicio siguiente: D1/i }));
    expect(screen.getByRole("main", { name: /D1 · Escúchate/i })).toBeTruthy();
    expect(window.location.search).toBe("?ejercicio=D1");
  });

  it("guarda una respuesta pendiente antes de cambiar de ejercicio", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=G2");
    const view = render(<Ejercicios />);

    await userEvent.type(screen.getByRole("textbox", { name: "¿Qué necesito recordar de hoy?" }), "No perder esta idea");
    await userEvent.click(screen.getByRole("button", { name: /ejercicio siguiente: A1/i }));
    await userEvent.click(screen.getByRole("button", { name: /ejercicio anterior: G2/i }));

    expect(screen.getByRole("textbox", { name: "¿Qué necesito recordar de hoy?" })).toHaveValue("No perder esta idea");
    view.unmount();
  });

  it("autoguarda una respuesta y la recupera al volver", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=G2");
    const first = render(<Ejercicios />);
    const note = screen.getByRole("textbox", { name: "¿Qué necesito recordar de hoy?" });
    await userEvent.type(note, "Que sí avancé aunque fuera poco");
    expect(first.container.querySelector(".print-value")).toHaveTextContent("Que sí avancé aunque fuera poco");
    await waitFor(() => expect(screen.getByText("Guardado en este dispositivo")).toBeTruthy(), { timeout: 2000 });
    first.unmount();

    render(<Ejercicios />);
    expect(screen.getByRole("textbox", { name: "¿Qué necesito recordar de hoy?" })).toHaveValue("Que sí avancé aunque fuera poco");
  });
});
