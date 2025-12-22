import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { db } from "../lib/db";
import { AuthedRequest } from "../types";
import { z } from "zod";

const r = Router();

r.post("/ingest", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const userId = req.user.id;
    const Schema = z.object({
      source: z.string().min(1),
      payload: z.unknown()
    });
    const parsed = Schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid payload" });
    const sample = await db.ingestWearable({ userId, source: parsed.data.source, payload: parsed.data.payload });
    res.status(201).json({ sample });
  } catch (e) {
    next(e);
  }
});

export default r;
