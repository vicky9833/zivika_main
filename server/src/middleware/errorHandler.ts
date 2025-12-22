import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  logger.error({ err });
  const e = err as { status?: number; message?: string };
  res.status(e.status || 500).json({ error: e.message || "Internal Server Error" });
}
