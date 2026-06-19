import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import {
  archiveCompletedTasks,
  archiveNotifications,
  getArchivedData,
  exportArchivedData,
  restoreArchivedTask,
  deleteArchivedTask,
   deleteAllArchivedData,
} from "../controllers/dataManagementController.js";

const router = express.Router();

// All routes require Admin
router.use(protect);
router.use(authorizeRoles("Admin"));

// Archive
router.post("/archive-tasks", archiveCompletedTasks);
router.post("/archive-notifications", archiveNotifications);

// View Archived
router.get("/archived-data", getArchivedData);

// Export
router.get("/export", exportArchivedData);

// Restore / Delete
router.put("/restore-task/:id", restoreArchivedTask);
router.delete("/delete-task/:id", deleteArchivedTask);
router.delete("/delete-all", deleteAllArchivedData);
export default router;