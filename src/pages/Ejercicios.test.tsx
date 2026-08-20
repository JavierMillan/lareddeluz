import { describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ejercicios from "./Ejercicios";
import { EXERCISES } from "@/despega/exercises";
import { LETTERS } from "@/despega/letters";

describe("cuaderno de trabajo", () => {
  it("lista los 20 ejercicios repartidos en las 7 coordenadas", () => {
    render(<Ejercicios />);
    for (const exercise of EXERCISES) {
      expect(screen.getByText(exercise.code)).toBeTruthy();
    }
    // el reparto coincide con el que ya declara letters.ts
    for (const letter of LETTERS) {
      const count = EXERCISES.filter((item) => item.letter === letter.id).length;
      expect(count).toBe(letter.exercises);
    }
  });

  it("ofrece el cuaderno completo para descargar", () => {
    const { container } = render(<Ejercicios />);
    const links = [...container.querySelectorAll('a[href="/assets/despega-workbook.pdf"]')];
    expect(links.length).toBeGreaterThan(0);
    expect(links.some((a) => a.hasAttribute("download"))).toBe(true);
  });

  it("abre la hoja de un ejercicio con sus pasos reales del cuaderno", async () => {
    render(<Ejercicios />);
    await userEvent.click(screen.getByText("D2").closest("button")!);
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: "Ponle nombre a tu creencia" })).toBeTruthy();
    // los campos son los pasos del libro, no inventados
    const d2 = EXERCISES.find((item) => item.code === "D2")!;
    expect(within(dialog).getAllByRole("textbox")).toHaveLength(d2.steps.length);
    expect(within(dialog).getByText(`1. ${d2.steps[0]}`)).toBeTruthy();
  });

  it("solo deja descargar la hoja cuando el lector escribio algo", async () => {
    render(<Ejercicios />);
    await userEvent.click(screen.getByText("D1").closest("button")!);
    const dialog = screen.getByRole("dialog");
    const button = within(dialog).getByRole("button", { name: /descargarla/i });
    expect(button).toBeDisabled();
    await userEvent.type(within(dialog).getAllByRole("textbox")[0], "esa voz otra vez");
    expect(within(dialog).getByRole("button", { name: /descargar esta hoja/i })).toBeEnabled();
  });

  it("cierra la hoja con Escape", async () => {
    render(<Ejercicios />);
    await userEvent.click(screen.getByText("G1").closest("button")!);
    expect(screen.getByRole("dialog")).toBeTruthy();
    await userEvent.keyboard("{Escape}");
    // AnimatePresence lo mantiene montado durante la salida
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
