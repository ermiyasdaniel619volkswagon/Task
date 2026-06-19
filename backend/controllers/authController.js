
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// ─── In‑memory store for failed login attempts ────────────
const failedAttempts = {};

// ─── Helper: Clean up old entries ─────────────────────────
const cleanupAttempts = () => {
  const now = Date.now();
  for (const ip in failedAttempts) {
    if (now - failedAttempts[ip].timestamp > 15 * 60 * 1000) {
      delete failedAttempts[ip];
    }
  }
};

// ─── Helper: Check if IP is blocked ────────────────────────
const isBlocked = (ip) => {
  cleanupAttempts();
  const entry = failedAttempts[ip];
  if (!entry) return false;
  return entry.count >= 10;
};

// ─── Helper: Record failed attempt ────────────────────────
const recordFailedAttempt = (ip) => {
  cleanupAttempts();
  if (!failedAttempts[ip]) {
    failedAttempts[ip] = { count: 1, timestamp: Date.now() };
  } else {
    failedAttempts[ip].count += 1;
  }
};

// ─── Helper: Reset attempts on successful login ────────────
const resetAttempts = (ip) => {
  delete failedAttempts[ip];
};

// ─── Register ──────────────────────────────────────────────
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, department, jobRole, specialization } =
      req.body;

    if (!fullName || !email || !password || !department || !jobRole || !specialization) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailLower = email.toLowerCase();
    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered." });
    }

    const newUser = await User.create({
      fullName,
      email: emailLower,
      password,
      department,
      jobRole,
      specialization,
      role: "Employee",
      status: "active",
      lastLoginAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful! Please log in. Your account will be deactivated after 4 days of inactivity.",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        jobRole: newUser.jobRole,
        specialization: newUser.specialization,
        status: newUser.status,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during registration.",
      error: error.message,
    });
  }
};

// ─── Login ──────────────────────────────────────────────────
export const loginUser = async (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;

    // ✅ Check if IP is blocked
    if (isBlocked(ip)) {
      return res.status(429).json({
        message: "Too many failed login attempts. Please try again after 15 minutes.",
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    // ❌ Failed attempt – user not found
    if (!user) {
      recordFailedAttempt(ip);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // ❌ Failed attempt – password mismatch
    if (!isMatch) {
      recordFailedAttempt(ip);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Successful login – reset attempts
    resetAttempts(ip);

    // ─── Inactivity check ─────────────────────────────────────
    const now = new Date();
    const fourDaysAgo = new Date(now);
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

    if (user.status === "active" && user.lastLoginAt < fourDaysAgo) {
      user.status = "inactive";
      await user.save();
      return res.status(403).json({
        message: "Your account has been deactivated due to 4 days of inactivity. Please contact your administrator.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: "Your account is not activated. Please contact your administrator.",
      });
    }

    // Update last login
    user.lastLoginAt = now;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        department: user.department,
        jobRole: user.jobRole,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server login processing failure",
      error: error.message,
    });
  }
};

// ─── Logout ─────────────────────────────────────────────────
export const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

// ─── Get User Profile ──────────────────────────────────────
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve profile",
      error: error.message,
    });
  }
};

// ─── Update User Profile ──────────────────────────────────
export const updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, department, jobRole, specialization } = req.body;
    const userId = req.user._id;

    if (email && email !== req.user.email) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
    }

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email.toLowerCase();
    if (department) updateData.department = department;
    if (jobRole) updateData.jobRole = jobRole;
    if (specialization) updateData.specialization = specialization;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};