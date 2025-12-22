import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";

describe("records", () => {
  const app = createApp();
  let token = "";
  it("creates and lists records", async () => {
    const email = `rec_${Date.now()}@example.com`;
    const r = await request(app).post("/api/auth/register").send({ email, password: "Passw0rd!", name: "Rec" });
    token = r.body.token;
    const c = await request(app).post("/api/records").set("Authorization", `Bearer ${token}`).send({ type: "vitals", title: "Weekly Summary", data: { bpm: 72 } });
    expect(c.status).toBe(201);
    const l = await request(app).get("/api/records").set("Authorization", `Bearer ${token}`);
    expect(l.status).toBe(200);
    expect(Array.isArray(l.body.records)).toBe(true);
    expect(l.body.records.length).toBeGreaterThan(0);
  });
});
