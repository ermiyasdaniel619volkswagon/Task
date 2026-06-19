import jwt from "jsonwebtoken";
import User from "../models/User.js"; // Assuming your User schema path

// Verify JWT Token and Hydrate Request User
export const protect = async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, access token missing." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return res
        .status(404)
        .json({ message: "User account no longer exists." });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized, signature validation failed." });
  }
};

// Enforce Role-Based Access Control (RBAC)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access Forbidden: Role '${req.user?.role || "Guest"}' lacks sufficient privileges.`,
      });
    }
    next();
  };
};
