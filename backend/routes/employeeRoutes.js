
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMyTasks,
  updateTaskStatus,
  updateDraftProgress,
  lockTaskProgress,
  getEmployeeStats,
  getDashboardMetrics,
} from "../controllers/employeeController.js";

const router = express.Router();

router.use(protect);

// ─── Dashboard ─────────────────────────────────────────────
router.get("/dashboard/metrics", getDashboardMetrics);

// ─── Tasks ─────────────────────────────────────────────────
router.get("/tasks", getMyTasks);
router.get("/stats", getEmployeeStats);

// ─── Task Actions ──────────────────────────────────────────
router.put("/tasks/:id/status", updateTaskStatus);
router.put("/tasks/:id/progress", updateDraftProgress);
router.put("/tasks/:id/lock", lockTaskProgress);

// ✅ FIX: Use export default
export default router;