import express from "express";
import cors from "cors";

import { db } from "./db/db";
import { authMiddleware } from "./middleware/auth.middleware";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);

// Health Check Route
app.get("/", async (_, res) => {
  try {
    await db.query("SELECT 1");
    res.send("Database Connected 🎉");
  } catch (error) {
    console.error(error);
    res.status(500).send("Database Not Connected ❌");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});