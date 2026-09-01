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

  it("E2 captura un tramo recurrente en una sola vez", async () => {
    render(<Ejercicios />);
    await userEvent.click(screen.getByText("E2").closest("button")!);
    const workspace = screen.getByRole("main", { name: /E2 · Auditoría de energía/i });

    // Los dias son un teclado visible, no un desplegable de uno a la vez.
    expect(within(workspace).getByRole("checkbox", { name: "Lunes" })).toBeTruthy();
    expect(within(workspace).getByRole("checkbox", { name: "Domingo" })).toBeTruthy();
    // Entre semana viene preseleccionado: es el caso mas comun.
    expect(within(workspace).getByRole("checkbox", { name: "Miércoles" })).toBeChecked();
    expect(within(workspace).getByRole("checkbox", { name: "Sábado" })).not.toBeChecked();

    await userEvent.type(within(workspace).getByRole("textbox", { name: /actividad concreta/i }), "Junta sin propósito");
    await userEvent.selectOptions(within(workspace).getByRole("combobox", { name: /cómo me dejó/i }), "drena");
    await userEvent.click(within(workspace).getByRole("button", { name: "Añadir" }));

    // Un bloque, no cinco entradas: lunes a viernes 09:00-18:00 son 45 h.
    expect(within(workspace).getByText("Junta sin propósito")).toBeTruthy();
    expect(within(workspace).getByText(/Lunes a Viernes · 09:00–18:00 · 45 h por semana/i)).toBeTruthy();
    expect(within(workspace).getByText(/45 h drenan/i)).toBeTruthy();
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

  it("E2 ofrece atajos de semana y respeta el area tactil de los dias", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=E2");
    const { container } = render(<Ejercicios />);

    await userEvent.click(screen.getByRole("button", { name: "Fin de semana" }));
    expect(screen.getByRole("checkbox", { name: "Sábado" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Lunes" })).not.toBeChecked();

    // La grilla de 7 columnas con scroll horizontal quedo fuera.
    expect(container.querySelector(".energy-table-scroll")).toBeNull();
    expect(container.querySelector(".energy-days")).toBeNull();
    expect(container.querySelector(".energy-days-picker")).toBeTruthy();
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
  it("E2 dice qué falta en vez de ignorar el clic", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=E2");
    render(<Ejercicios />);
    const workspace = screen.getByRole("main", { name: /E2 · Auditoría de energía/i });
    const add = within(workspace).getByRole("button", { name: "Añadir" });

    // Sin actividad: el boton no puede quedarse mudo.
    await userEvent.click(add);
    expect(within(workspace).getByText(/escribe qué actividad/i)).toBeTruthy();

    // Con actividad pero sin dias marcados.
    await userEvent.type(within(workspace).getByRole("textbox", { name: /actividad concreta/i }), "Traslado");
    for (const day of ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]) {
      await userEvent.click(within(workspace).getByRole("checkbox", { name: day }));
    }
    await userEvent.click(add);
    expect(within(workspace).getByText(/marca al menos un día/i)).toBeTruthy();

    // Rango invertido: fin antes que inicio.
    await userEvent.click(within(workspace).getByRole("checkbox", { name: "Lunes" }));
    const to = within(workspace).getByLabelText("Hora de fin");
    await userEvent.clear(to);
    await userEvent.type(to, "07:00");
    await userEvent.click(add);
    expect(within(workspace).getByText(/posterior a la de inicio/i)).toBeTruthy();

    // Ya corregido: entra y el aviso se limpia.
    await userEvent.clear(to);
    await userEvent.type(to, "10:00");
    await userEvent.click(add);
    expect(within(workspace).getByText("Traslado")).toBeTruthy();
    expect(within(workspace).queryByText(/posterior a la de inicio/i)).toBeNull();
  });

  it("distingue el guardado fallido del exitoso", async () => {
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=G2");
    const { container } = render(<Ejercicios />);
    await userEvent.type(screen.getByRole("textbox", { name: "¿Qué necesito recordar de hoy?" }), "algo");
    await waitFor(() => expect(container.querySelector(".save-state")).toHaveAttribute("data-state", "saved"));
  });
  it("S1 permite mover una ficha entre las dos columnas", async () => {
    saveAnswer("E2", { drena: ["Junta sin propósito"] });
    window.history.replaceState({}, "", "/ejercicios/?ejercicio=S1");
    render(<Ejercicios />);

    await userEvent.click(screen.getByRole("button", { name: /Traer lo que marqué como drenaje/i }));
    expect(screen.getByText(/Llegaron 1 de E2/i)).toBeTruthy();

    // Todo cae en "no devuelve": tiene que poder pasar al otro lado.
    const toReturns = screen.getByRole("button", { name: /Mover "Junta sin propósito" a ← Sí vale/i });
    await userEvent.click(toReturns);
    expect(screen.getByRole("button", { name: /Mover "Junta sin propósito" a No devuelve →/i })).toBeTruthy();

    // Y de regreso, sin perder el texto.
    await userEvent.click(screen.getByRole("button", { name: /Mover "Junta sin propósito" a No devuelve →/i }));
    expect(screen.getByRole("button", { name: /Mover "Junta sin propósito" a ← Sí vale/i })).toBeTruthy();
  });
});
