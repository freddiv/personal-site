import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes", () => {
    expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
  });

  it("merges tailwind classes and resolves conflicts", () => {
    // twMerge should handle the conflict and keep the last one
    expect(cn("px-2 py-2", "p-4")).toBe("p-4");
  });

  it("handles empty or undefined inputs", () => {
    expect(cn("foo", undefined, null, "")).toBe("foo");
  });
});
