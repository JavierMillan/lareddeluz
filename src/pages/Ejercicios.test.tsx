import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ejercicios from "./Ejercicios";
import { EXERCISES } from "@/despega/exercises";
import { LETTERS } from "@/despega/letters";
import { clearAnswer, saveAnswer } from "@/despega/exerciseStorage";

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

  it("mantiene accesibles e interactivos los desplegables del ejercicio", async () => {
    render(<Ejercicios />);
    await userEvent.click(screen.getByText("D2").closest("button")!);
    const workspace = screen.getByRole("main", { name: /D2 · Ponle nombre a tu creencia/i });
    const instructions = within(workspace).getByText(/Cómo hacerlo/i, { selector: "summary" });

    expect(instructions.closest("details")).toHaveAttribute("open");
    await userEvent.click(instructions);
    expect(instructions.closest("details")).not.toHaveAttribute("open");
    expect(within(workspace).getByText("Qué podrías sentir mientras lo haces")).toBeTruthy();
    expect(within(workspace).getByText("Cómo vas a notar que algo cambió")).toBeTruthy();
  });

  it("E2 registra cada actividad una sola vez con su energia", async () => {
    render(<Ejercicios />);
    await userEvent.click(screen.getByText("E2").closest("button")!);
    const workspace = screen.getByRole("main", { name: /E2 · Auditoría de energía/i });

    expect(within(workspace).getAllByText(/recorre tu registro.*día y hora aproximada/i).length).toBeGreaterThan(0);
    expect(within(workspace).getByRole("textbox", { name: /actividad concreta/i })).toBeTruthy();
    expect(within(workspace).getByRole("combobox", { name: /cómo me dejó/i })).toBeTruthy();

    await userEvent.type(within(workspace).getByRole("textbox", { name: /actividad concreta/i }), "Junta sin propósito");
    await userEvent.selectOptions(within(workspace).getByRole("combobox", { name: /cómo me dejó/i }), "drena");
    await userEvent.click(within(workspace).getByRole("button", { name: "Añadir" }));
    expect(within(workspace).getByText("Junta sin propósito")).toBeTruthy();
    expect(within(workspace).getByText(/1 drena · 0 neutro · 0 recarga/i)).toBeTruthy();
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

  it("D4 convierte la auditoria en tres pasadas sin mover notas", () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=D4");
    render(<Ejercicios />);

    expect(screen.getByRole("heading", { name: /Primera pasada · escucha/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Segunda pasada · observa/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Tres automatismos/i })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Mover .* a /i })).toBeNull();
    expect(screen.getByText(/Anota únicamente lo que se repite/i)).toBeTruthy();
  });

  it("E1 deja elegir una respiracion antes de abrir su registro corporal", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=E1");
    render(<Ejercicios />);

    expect(screen.getByText(/Inhala 4 · retén 4 · exhala 8/i)).toBeTruthy();
    expect(screen.getByRole("radio", { name: /Elegir Respiración de caja/i })).toBeTruthy();
    expect(screen.queryByRole("textbox", { name: /Cómo me dejó 4 · 4 · 8/i })).toBeNull();
    await userEvent.click(screen.getByRole("radio", { name: /Elegir 4 · 4 · 8/i }));
    expect(screen.getByRole("textbox", { name: /Cómo me dejó 4 · 4 · 8/i })).toBeTruthy();
    expect(screen.queryByRole("textbox", { name: /Cómo me dejó Respiración de caja/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /Mover .* a /i })).toBeNull();
  });

  it("D2 concentra la reflexion en tres momentos narrativos", () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=D2");
    render(<Ejercicios />);

    expect(screen.getAllByTestId("belief-moment")).toHaveLength(3);
    expect(screen.getByRole("textbox", { name: /Lo que pasó/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /Lo que aprendí a creer/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /Lo que hoy elijo/i })).toBeTruthy();
  });

  it("ordena la decision antes de la despedida", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=S2");
    render(<Ejercicios />);

    await userEvent.click(screen.getByRole("button", { name: /ejercicio siguiente: S4/i }));
    expect(screen.getByRole("main", { name: /S4 · Se va o se queda/i })).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: /ejercicio siguiente: S3/i }));
    expect(screen.getByRole("main", { name: /S3 · La despedida/i })).toBeTruthy();
    await userEvent.click(screen.getByRole("button", { name: /ejercicio siguiente: P1/i }));
    expect(screen.getByRole("main", { name: /P1 · Escribe a tu súper tú/i })).toBeTruthy();
  });

  it("S3 permite traer lo que la persona decidio soltar en S4", async () => {
    saveAnswer("S4", { leaves: ["Un compromiso que ya cumplió su función"] });
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=S3");
    render(<Ejercicios />);

    expect(screen.queryByText("Un compromiso que ya cumplió su función")).toBeNull();
    await userEvent.click(screen.getByRole("button", { name: /Traer lo que decidí soltar/i }));
    expect(screen.getByText("Un compromiso que ya cumplió su función")).toBeTruthy();
  });

  it("E2 usa una captura compacta y una semana sin contenedor de scroll", () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=E2");
    const { container } = render(<Ejercicios />);

    expect(screen.getByRole("button", { name: "Añadir" })).toBeTruthy();
    expect(screen.getByText("Actividad concreta")).toBeTruthy();
    expect(container.querySelector(".energy-table-scroll")).toBeNull();
    expect(container.querySelector(".energy-days")).toBeTruthy();
  });

  it("P1 termina como una firma editorial sin medidor", () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=P1");
    const { container } = render(<Ejercicios />);

    expect(container.querySelector(".identity-balance")).toBeNull();
    expect(container.querySelector(".identity-signature")).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /Firma esta versión de ti/i })).toBeTruthy();
  });

  it("P3 usa un mapa de territorio inspirado en el ikigai", () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=P3");
    const { container } = render(<Ejercicios />);

    expect(screen.getByRole("heading", { name: /Tu territorio aparece al agrupar/i })).toBeTruthy();
    expect(screen.getAllByTestId("territory-stage")).toHaveLength(3);
    expect(container.querySelector(".territory-core")).toBeNull();
    expect(screen.getByRole("textbox", { name: /Dónde se usa/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /A quién le sirve/i })).toBeTruthy();
    expect(screen.getByRole("textbox", { name: /Quién contrataría por ello/i })).toBeTruthy();
  });

  it("P4 planea tasks contra una capacidad semanal", () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=P4");
    render(<Ejercicios />);

    expect(screen.getByRole("spinbutton", { name: /Capacidad semanal/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /Agregar task/i })).toBeTruthy();
    expect(screen.getByText(/0 de .* puntos planeados/i)).toBeTruthy();
  });

  it("A2 concentra el analisis en tres zonas y una decision", () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=A2");
    render(<Ejercicios />);

    expect(screen.getByRole("heading", { name: /Separa lo que pasó de lo que imaginas/i })).toBeTruthy();
    expect(screen.getAllByTestId("decision-analysis-zone")).toHaveLength(3);
    expect(screen.getByText(/Viendo sólo los hechos y los riesgos reales/i)).toBeTruthy();
  });

  it.each([
    ["D2", /No tienes que resolver tu vida entera/i],
    ["D3", /Lo que dices sin pensarlo/i],
    ["S1", /Lo que cuesta y vale/i],
    ["S2", /Antes de hablar/i],
    ["S3", /Escribe una despedida, no un reporte/i],
    ["S4", /Haz visible lo que se va y lo que se queda/i],
    ["P1", /Escribe desde «soy»/i],
    ["P2", /Convierte identidad en piezas/i],
    ["EJ1", /No todo pendiente pesa igual/i],
    ["EJ2", /Ajustar no es abandonar/i],
    ["G1", /Mira el tramo completo/i],
    ["G2", /Qué necesito recordar de hoy/i],
    ["A1", /No tires el sistema completo/i],
  ])("%s muestra una herramienta propia", (code, landmark) => {
    window.history.replaceState({}, "", `/ejercicios/?ejercicio=${code}`);
    render(<Ejercicios />);
    expect(screen.getByRole("heading", { name: landmark })).toBeTruthy();
  });
});
