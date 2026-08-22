import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./badge";

describe("Badge component", () => {
  it("renders correctly with default props", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-primary");
  });

  it("applies variant classes correctly", () => {
    render(<Badge variant="signal">Active</Badge>);
    const badge = screen.getByText("Active");
    expect(badge.className).toContain("bg-[var(--color-edge-soft)]");
  });
});
