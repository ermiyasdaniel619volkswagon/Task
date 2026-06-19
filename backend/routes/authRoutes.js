
import express from "express";
import {
  loginUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authLimiter, registerLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public routes
router.post("/register", registerLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/logout", logoutUser); // Public, but no harm

// Protected routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;
