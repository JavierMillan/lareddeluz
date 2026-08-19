import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { ChapterJourney } from "./ChapterJourney";
it("permite avanzar, volver, elegir y usar teclado",async()=>{
  window.history.replaceState(null,"","#d"); render(<ChapterJourney/>);
  expect(screen.getByRole("heading",{name:/No sabes cuándo/i})).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button",{name:/Siguiente: Envía calma/i})); expect(window.location.hash).toBe("#e");
  fireEvent.keyDown(window,{key:"ArrowRight"}); expect(await screen.findByRole("heading",{name:/No es lo que cuesta/i})).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button",{name:"Descubre"})); expect(window.location.hash).toBe("#d");
});
