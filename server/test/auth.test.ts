import { describe, it, expect } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";

describe("auth", () => {
  const app = createApp();
  it("registers and logs in", async () => {
    const email = `user_${Date.now()}@example.com`;
    const r = await request(app).post("/api/auth/register").send({ email, password: "Passw0rd!", name: "User" });
    expect(r.status).toBe(200);
    expect(r.body.token).toBeTruthy();
    const l = await request(app).post("/api/auth/login").send({ email, password: "Passw0rd!" });
    expect(l.status).toBe(200);
    expect(l.body.token).toBeTruthy();
  });
});
