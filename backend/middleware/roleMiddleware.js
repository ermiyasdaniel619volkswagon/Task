export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // req.user is populated earlier by the protect middleware
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: Role '${req.user?.role || "Guest"}' is not authorized to access this resource`,
      });
    }
    next();
  };
};
