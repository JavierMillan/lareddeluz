import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import { SiteNavigation } from "./SiteNavigation";

it("ofrece un solo acceso al atlas de constelaciones", () => {
  render(<SiteNavigation />);

  const navigation = screen.getByRole("navigation", { name: "Navegación principal" });
  const links = within(navigation).getAllByRole("link");

  expect(links).toHaveLength(1);
  expect(links[0]).toHaveTextContent("Explorar el cielo");
  expect(links[0]).toHaveAttribute("href", "#constelaciones");
  expect(links[0]).toHaveClass("rdl-nav__cta");
});
