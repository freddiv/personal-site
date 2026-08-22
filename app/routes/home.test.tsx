import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

import Home from "./home";

// Mocking fetch for DigitalTwinChat
global.fetch = vi.fn();

describe("Home Route", () => {
  it("renders the landing page with key sections", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Hero section
    expect(screen.getByText(/Enterprise-grade front ends with an edge/i)).toBeDefined();

    // About section
    expect(screen.getByText(/A builder-leader for serious product surfaces/i)).toBeDefined();

    // Journey section
    expect(screen.getByText(/From legacy rewrites to public science platforms/i)).toBeDefined();

    // Portfolio section
    expect(screen.getByText(/Case studies are ready to plug in/i)).toBeDefined();

    // Digital Twin section
    expect(screen.getByText(/Ask Freddie’s career graph anything/i)).toBeDefined();
  });
});
