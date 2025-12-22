import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai";
import authRoutes from "./routes/auth";
import recordRoutes from "./routes/records";
import wearableRoutes from "./routes/wearables";
import systemRoutes from "./routes/system";
import { errorHandler } from "./middleware/errorHandler";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.use("/api/auth", authRoutes);
  app.use("/api/ai", aiRoutes);
  app.use("/api/records", recordRoutes);
  app.use("/api/wearables", wearableRoutes);
  app.use("/api", systemRoutes);
  app.use(errorHandler);
  return app;
}
