
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import db from "./config/db.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"; // ✅ Already imported
import dataManagementRoutes from "./routes/dataManagementRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://task-mangment-dashbord-tzr4.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());

db();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/notifications", notificationRoutes); // ✅ Already mounted
app.use("/api/admin/data", dataManagementRoutes);
app.get("/", (req, res) => {
  res.send("Task Management API engine is active...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Application tracking active on port ${PORT}`);
});