
import express from "express";
import {
  registerStaff,
  getAllEmployees,
  getAdminKPIDashboard,
  toggleUserActivation,
  getEmployeesWithStatus,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("Admin"));

router.post("/register-staff", registerStaff);
router.get("/employees", getAllEmployees);
router.get("/kpi-stats", getAdminKPIDashboard);
router.put("/activate-user/:id", toggleUserActivation);
router.get("/employees-status", getEmployeesWithStatus);
export default router;