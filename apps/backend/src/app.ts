import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "../config/cors";
import battleLogRoutes from "./api/v1/routes/battleLogRoutes";
import errorHandler from "./api/v1/middleware/errorHandler";
 
// Initialize express application
const app: Express = express();
 
// Allow use of .env variables
dotenv.config();
 
// Add morgan middleware, combined format logs info about each HTTP request
app.use(morgan("combined"));
 
// Allow express to parse json
app.use(express.json());
 
// Add Cross-Origin Resource Sharing middleware
// This will refuse requests from origins that do not fulfill corsOptions requirements
app.use(cors(corsOptions));
 
// Listen for requests on root and send simple text response
app.get("/", (_req, res) => {
    res.send("Got response from COMP-4002 backend!");
});
 
// Use battle log routes
app.use("/api/v1", battleLogRoutes);
 
// Error handler catches errors as last element in middleware chain
app.use(errorHandler);
 
export default app;