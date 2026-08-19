import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Breath, Edge, Tremble, Weigh } from "./Mechanics";
describe("chapter instruments", () => {
  it("activa una respiración guiada", async()=>{render(<Breath/>); await userEvent.click(screen.getByRole("button",{name:"Comenzar una respiración"})); expect(screen.getByRole("status")).toHaveTextContent(/inhala/i);});
  it("separa los pesos sin traslaciones verticales",async()=>{render(<Weigh/>); await userEvent.click(screen.getByRole("button",{name:/grupo de mensajes/i})); expect(screen.getByTestId("despega-scale")).toHaveAttribute("data-tilt","drains");});
  it("resuelve el audio y el umbral",async()=>{const view=render(<Tremble/>); await userEvent.click(screen.getByRole("button",{name:"Mandar el audio"})); expect(screen.getByRole("status")).toHaveTextContent("Mandado. No pasó nada."); view.unmount(); render(<Edge/>); await userEvent.click(screen.getByRole("button",{name:"Cruzar el umbral"})); expect(screen.getByTestId("despega-threshold")).toHaveAttribute("data-crossed","true");});
});
