import { Router } from "express";
import { db } from "../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { z } from "zod";

const r = Router();

r.post("/register", async (req, res, next) => {
  try {
    const RegisterSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(1)
    });
    const parsed = RegisterSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid payload" });
    const { email, password, name } = parsed.data;
    const exists = await db.findUserByEmail(email);
    if (exists) return res.status(409).json({ error: "email exists" });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.createUser({ email, passwordHash, name });
    const token = jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (e) {
    next(e);
  }
});

r.post("/login", async (req, res, next) => {
  try {
    const LoginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8)
    });
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "invalid payload" });
    const { email, password } = parsed.data;
    const user = await db.findUserByEmail(email);
    if (!user) return res.status(401).json({ error: "invalid credentials" });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "invalid credentials" });
    const token = jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (e) {
    next(e);
  }
});

export default r;
