import { describe, expect, it } from "vitest";

import { journey, portfolioSeeds, profile, specialties } from "./profile";

describe("profile content", () => {
  it("keeps Freddie's core professional identity visible", () => {
    expect(profile.name).toBe("Freddie Valone");
    expect(profile.title).toContain("Front-end Architect");
    expect(profile.email).toContain("@");
  });

  it("has enough structured content for the landing page", () => {
    expect(journey.length).toBeGreaterThanOrEqual(4);
    expect(portfolioSeeds.length).toBeGreaterThanOrEqual(4);
    expect(specialties).toContain("React Router v7");
  });
});
