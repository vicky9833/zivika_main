import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { db } from "../lib/db";
import { AuthedRequest } from "../types";
import { z } from "zod";

const r = Router();

r.get("/", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const userId = req.user.id;
    const records = await db.listRecords(userId);
    res.json({ records });
  } catch (e) {
    next(e);
  }
});

r.post("/", requireAuth, async (req: AuthedRequest, res, next) => {
  try {
    const userId = req.user.id;
    const Schema = z.object({
      type: z.string().min(1),
      title: z.string().min(1),
      data: z.unknown().optional()
    });
    const parsed = Schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid payload" });
    const rec = await db.createRecord({ userId, type: parsed.data.type, title: parsed.data.title, data: parsed.data.data ?? {} });
    res.status(201).json({ record: rec });
  } catch (e) {
    next(e);
  }
});

export default r;
