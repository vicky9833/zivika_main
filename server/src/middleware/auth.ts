import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";
import { AuthedRequest } from "../types";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : "";
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const verified = jwt.verify(token, env.jwtSecret);
    const payload = typeof verified === "string"
      ? (JSON.parse(verified) as JwtPayload & { email?: string })
      : (verified as JwtPayload & { email?: string });
    (req as AuthedRequest).user = { id: String(payload.sub), email: String(payload.email ?? "") };
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}
