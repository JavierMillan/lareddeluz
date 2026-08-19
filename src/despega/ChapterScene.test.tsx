import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { LETTERS } from "./letters";
import { ChapterScene } from "./ChapterScene";
it("conecta narrativa, glifo e instrumento",()=>{render(<ChapterScene letter={LETTERS[2]} index={2}/>); expect(screen.getByRole("heading",{name:/No es lo que cuesta/i})).toHaveFocus(); expect(screen.getByTestId("letter-instrument")).toHaveAttribute("data-letter","s"); expect(screen.getByTestId("despega-scale")).toBeInTheDocument();});
