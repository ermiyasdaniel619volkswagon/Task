;
import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats,
  // getCategoryStats,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Enforce authentication context parsing engine on all routes down-tree
router.use(protect);

// Statistics routes (placed before /:id so they aren't treated as IDs)
router.get("/stats", authorizeRoles("Admin"), getTaskStats);
// router.get("/category-stats", authorizeRoles("Admin"), getCategoryStats);

// Root routes
router
  .route("/")
  .get(authorizeRoles("Admin"), getTasks)
  .post(authorizeRoles("Admin"), createTask);

// Instance routes
router
  .route("/:id")
  .put(authorizeRoles("Admin"), updateTask)
  .delete(authorizeRoles("Admin"), deleteTask);

export default router;
