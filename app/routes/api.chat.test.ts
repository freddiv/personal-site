import fs from "node:fs";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { action, loader } from "./api.chat";

describe("api.chat route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.OPENROUTER_API_KEY = "test-key";
    vi.stubGlobal("fetch", vi.fn());
    vi.spyOn(fs, "readFileSync").mockReturnValue("");
  });

  it("loader returns model info", async () => {
    const response = await loader();
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.model).toBeDefined();
  });

  it("action returns 405 for non-POST requests", async () => {
    const request = new Request("http://localhost/api/chat", { method: "GET" });
    const response = await action({ request, params: {}, context: {} } as any);
    expect(response.status).toBe(405);
  });

  it("action returns 400 if no messages provided", async () => {
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [] }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await action({ request, params: {}, context: {} } as any);
    const data = await response.json();
    expect(response.status).toBe(400);
    expect(data.error).toBe("A message is required.");
  });

  it("action returns 500 if API key is missing", async () => {
    delete process.env.OPENROUTER_API_KEY;
    // Also need to ensure readEnvFile fails or returns undefined
    // For this test we assume .env doesn't exist in test env or doesn't have the key
    
    const request = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await action({ request, params: {}, context: {} } as any);
    const data = await response.json();
    expect(response.status).toBe(500);
    expect(data.error).toContain("Missing OpenRouter API key");
  });
});
