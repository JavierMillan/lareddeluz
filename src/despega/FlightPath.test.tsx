import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { FlightPath } from "./FlightPath";
it("expone el capítulo activo y permite elegir una coordenada", async () => {
  const onSelect=vi.fn(); render(<FlightPath activeIndex={2} onSelect={onSelect}/>);
  expect(screen.getByRole("button",{name:"Selecciona, capítulo actual"})).toHaveAttribute("aria-current","step");
  await userEvent.click(screen.getByRole("button",{name:"Planifica"})); expect(onSelect).toHaveBeenCalledWith(3);
});
