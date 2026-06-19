
import rateLimit from "express-rate-limit";

// ─── General limiter for all auth routes ──────────────────
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 failed attempts per IP
  skipSuccessfulRequests: true, // ✅ Don't count successful requests
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Stricter limiter for registration ────────────────────
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 registration attempts per hour per IP
  skipSuccessfulRequests: true, // ✅ Don't count successful registrations
  message: {
    success: false,
    message: "Too many registration attempts. Please try again later.",
  },
});