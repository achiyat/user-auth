// server/src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDatabase } from "./config/db";
import authRoutes from "./services/auth/auth.routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
connectToDatabase();

// Routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
