import { Router } from "express";
import { analyzeSymptoms, extractFeatures } from "../services/ai";
import { requireAuth } from "../middleware/auth";
import { z } from "zod";

const r = Router();

r.post("/symptom-check", requireAuth, async (req, res, next) => {
  try {
    const Schema = z.object({ text: z.string().min(1) });
    const parsed = Schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "text required" });
    const out = await analyzeSymptoms(parsed.data.text);
    res.json(out);
  } catch (e) {
    next(e);
  }
});

r.post("/extract-features", requireAuth, async (req, res, next) => {
  try {
    const Schema = z.object({ text: z.string().min(1) });
    const parsed = Schema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "text required" });
    const out = await extractFeatures(parsed.data.text);
    res.json(out);
  } catch (e) {
    next(e);
  }
});

export default r;
