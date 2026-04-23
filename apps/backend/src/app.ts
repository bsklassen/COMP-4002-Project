import "dotenv/config";
import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import corsOptions from "../config/cors.js";
import authRoutes from "./api/v1/routes/authRoutes.js";
import battleLogRoutes from "./api/v1/routes/battleLogRoutes.js";
import itemRoutes from "./api/v1/routes/itemRoutes.js";
import enemyRoutes from "./api/v1/routes/enemyRoutes.js";
import userSaveRoutes from "./api/v1/routes/userSaveRoutes.js";
import battleRoutes from "./api/v1/routes/battleRoutes.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Add Clerk middleware - authenticates users via session tokens
app.use(clerkMiddleware());

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", service: "backend" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", battleLogRoutes);
app.use("/api/v1/victory", itemRoutes);
app.use("/api/v1/enemies", enemyRoutes);
app.use("/api/v1/save", userSaveRoutes);
app.use("/api/v1/battles", battleRoutes);

// Fallback
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: (err as Error).message ?? "Internal server error" });
};

app.use(errorHandler);

const PORT = process.env.PORT ?? 4000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}/api/v1/auth`);
  });
}

export default app;
