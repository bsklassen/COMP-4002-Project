import "dotenv/config";
import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import corsOptions from "../config/cors.ts";
import authRoutes from "./api/v1/routes/authRoutes.ts";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

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
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}/api/v1/auth`);
});

export default app;
