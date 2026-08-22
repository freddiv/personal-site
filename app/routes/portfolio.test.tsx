import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

import Portfolio from "./portfolio";

describe("Portfolio Route", () => {
  it("renders the portfolio page and project cards", () => {
    render(
      <MemoryRouter>
        <Portfolio />
      </MemoryRouter>
    );

    // Page title/headline
    expect(
      screen.getByText(/A case-study system for architecture work that usually stays invisible/i)
    ).toBeDefined();

    // Roadmap section
    expect(screen.getByText(/Ready for the next layer/i)).toBeDefined();

    // Check if some project from profile context is rendered
    // The buttons have aria-label="Open [Project Name]"
    expect(screen.getAllByLabelText(/Open/i).length).toBeGreaterThan(0);
  });
});
