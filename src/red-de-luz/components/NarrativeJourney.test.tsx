import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NarrativeJourney } from "./NarrativeJourney";

describe("NarrativeJourney", () => {
  it("explains reflection, nodes and constellations", () => {
    render(<NarrativeJourney onPhaseChange={vi.fn()} />);

    expect(screen.getByRole("heading", { name: /No estás perdido/i })).toBeInTheDocument();
    expect(screen.getByText(/una persona es un nodo/i)).toBeInTheDocument();
    expect(screen.getByText(/proyecto convertido en ecosistema humano/i)).toBeInTheDocument();
  });
});
