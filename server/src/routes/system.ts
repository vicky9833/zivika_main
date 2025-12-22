import { Router } from "express";
import client from "prom-client";

const r = Router();

const registry = new client.Registry();
client.collectDefaultMetrics({ register: registry });

r.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

r.get("/metrics", async (_req, res) => {
  res.setHeader("Content-Type", registry.contentType);
  res.send(await registry.metrics());
});

export default r;
