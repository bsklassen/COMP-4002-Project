import "dotenv/config";
import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import corsOptions from "../config/cors.js";
import authRoutes from "./api/v1/routes/authRoutes.js";
import battleLogRoutes from "./api/v1/routes/battleLogRoutes.js";
import itemRoutes from "./api/v1/routes/itemRoutes.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({ status: "ok", service: "backend" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", battleLogRoutes);
app.use("/api/v1/victory", itemRoutes);

// Fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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
