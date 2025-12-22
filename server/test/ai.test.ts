import { describe, it, expect, beforeAll, vi } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";

describe("ai", () => {
  const app = createApp();
  let token = "";
  beforeAll(async () => {
    const email = `ai_${Date.now()}@example.com`;
    const r = await request(app).post("/api/auth/register").send({ email, password: "Passw0rd!", name: "AI" });
    token = r.body.token;
    vi.stubGlobal("fetch", async () => {
      return {
        ok: true,
        json: async () => ({
          choices: [{ message: { content: "Hydrate, rest, and consult a physician if symptoms worsen." } }]
        })
      } as unknown as { ok: boolean; json: () => Promise<{ choices: { message: { content: string } }[] }> };
    });
    process.env.GROQ_API_KEY = "test-key";
  });
  it("symptom-check returns guidance", async () => {
    const r = await request(app).post("/api/ai/symptom-check").set("Authorization", `Bearer ${token}`).send({ text: "fever and headache" });
    expect(r.status).toBe(200);
    expect(r.body.result).toMatch(/Hydrate/);
  });
});
