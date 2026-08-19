import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Despega from "./Despega";
vi.mock("@/components/ui/particles",()=>({Particles:()=>null}));
it("entra al mapa de vuelo sin una secuencia sticky",()=>{render(<Despega/>); expect(screen.getByRole("link",{name:"Conseguir DESPEGA"})).toHaveAttribute("href",expect.stringContaining("wa.me")); expect(screen.getByRole("region",{name:"Método DESPEGA"})).toBeInTheDocument(); expect(document.querySelector(".sticky")).not.toBeInTheDocument();});
