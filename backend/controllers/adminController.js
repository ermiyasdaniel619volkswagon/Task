
import User from "../models/User.js";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import { createNotification } from "../utils/notificationHelper.js";

// ─── Get all registered employees (with pagination) ────────
export const getAllEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments({ role: "Employee" });
    const employees = await User.find({ role: "Employee" })
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: employees,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employees.",
      error: err.message,
    });
  }
};

// ─── Register a new employee ────────────────────────────────
export const registerStaff = async (req, res) => {
  try {
    const { fullName, email, password, department, jobRole, specialization } =
      req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      department,
      jobRole,
      specialization,
      role: "Employee",
      status: "active",
    });

    // Return full updated list with pagination
    const page = 1;
    const limit = 10;
    const total = await User.countDocuments({ role: "Employee" });
    const updatedRoster = await User.find({ role: "Employee" })
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.status(201).json({
      success: true,
      message: "Staff registered successfully.",
      employees: updatedRoster,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: total > limit,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Registration failed.",
      error: err.message,
    });
  }
};

// ─── Get KPI Dashboard Metrics ─────────────────────────────
export const getAdminKPIDashboard = async (req, res) => {
  try {
    const now = new Date();

    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const overdueTasks = await Task.countDocuments({
      deadline: { $lt: now },
      status: { $ne: "Completed" },
    });

    const taskCompletionRate =
      totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : "0.0";

    const topWorkerAggregation = await Task.aggregate([
      { $match: { status: "Completed" } },
      { $group: { _id: "$assignedTo", performanceCount: { $sum: 1 } } },
      { $sort: { performanceCount: -1 } },
      { $limit: 1 },
    ]);

    let bestWorkerData = null;
    if (topWorkerAggregation.length > 0 && topWorkerAggregation[0]._id) {
      const workerProfile = await User.findById(
        topWorkerAggregation[0]._id,
      ).select("fullName email department jobRole");
      if (workerProfile) {
        bestWorkerData = {
          fullName: workerProfile.fullName,
          email: workerProfile.email,
          department: workerProfile.department,
          jobRole: workerProfile.jobRole,
          completedCount: topWorkerAggregation[0].performanceCount,
        };
      }
    }

    return res.status(200).json({
      success: true,
      kpi: {
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks,
        taskCompletionRate: `${taskCompletionRate}%`,
      },
      bestWorker: bestWorkerData || "No performance track records found.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to compile KPI metrics.",
      error: err.message,
    });
  }
};

// ─── Activate or deactivate a user ─────────────────────────
export const toggleUserActivation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be 'active' or 'inactive'.",
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.role === "Admin" && req.user.id === id) {
      return res.status(403).json({
        success: false,
        message: "You cannot change your own status.",
      });
    }

    const oldStatus = user.status;
    user.status = status;
    await user.save();

    if (oldStatus === "active" && status === "inactive") {
      await createNotification({
        recipient: user._id,
        sender: req.user._id,
        type: "account_deactivated",
        title: "Account Deactivated ⚠️",
        message: `Your account has been deactivated by ${req.user.fullName}. Please contact your administrator.`,
        link: "/login",
      });
    }

    const updatedUser = await User.findById(id).select("-password");

    return res.status(200).json({
      success: true,
      message: `User ${status === "active" ? "activated" : "deactivated"} successfully.`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Activation error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user status.",
      error: error.message,
    });
  }
};

// ─── Get Employees with Workload Status ────────────────────
export const getEmployeesWithStatus = async (req, res) => {
  try {
    const employees = await User.find({ role: "Employee" })
      .select("-password")
      .sort({ createdAt: -1 });

    // Get all tasks grouped by assigned employee
    const allTasks = await Task.find({});
    
    const taskCountMap = {};
    const activeTaskCountMap = {};
    
    allTasks.forEach(task => {
      const assigneeId = task.assignedTo?.toString();
      if (assigneeId) {
        // Total tasks
        taskCountMap[assigneeId] = (taskCountMap[assigneeId] || 0) + 1;
        
        // Active tasks (not completed)
        if (task.status !== "Completed") {
          activeTaskCountMap[assigneeId] = (activeTaskCountMap[assigneeId] || 0) + 1;
        }
      }
    });

    const employeesWithStatus = employees.map(emp => {
      const totalTasks = taskCountMap[emp._id.toString()] || 0;
      const activeTasks = activeTaskCountMap[emp._id.toString()] || 0;
      
      // Determine status
      let availabilityStatus = "free";
      let statusLabel = "🟢 Free";
      let statusColor = "text-emerald-600 dark:text-emerald-400";
      let bgColor = "bg-emerald-50 dark:bg-emerald-950/30";
      
      if (emp.status === "inactive") {
        availabilityStatus = "inactive";
        statusLabel = "⛔ Inactive";
        statusColor = "text-gray-400";
        bgColor = "bg-gray-50 dark:bg-gray-800/30";
      } else if (activeTasks >= 5) {
        availabilityStatus = "overloaded";
        statusLabel = "🔴 Overloaded";
        statusColor = "text-red-600 dark:text-red-400";
        bgColor = "bg-red-50 dark:bg-red-950/30";
      } else if (activeTasks >= 3) {
        availabilityStatus = "busy";
        statusLabel = "🟡 Busy";
        statusColor = "text-amber-600 dark:text-amber-400";
        bgColor = "bg-amber-50 dark:bg-amber-950/30";
      } else if (activeTasks > 0) {
        availabilityStatus = "light";
        statusLabel = "🟢 Light Load";
        statusColor = "text-emerald-600 dark:text-emerald-400";
        bgColor = "bg-emerald-50 dark:bg-emerald-950/30";
      } else {
        availabilityStatus = "free";
        statusLabel = "🟢 Free";
        statusColor = "text-emerald-600 dark:text-emerald-400";
        bgColor = "bg-emerald-50 dark:bg-emerald-950/30";
      }
      
      return {
        ...emp._doc,
        totalTasks,
        activeTasks,
        availabilityStatus,
        statusLabel,
        statusColor,
        bgColor,
      };
    });

    return res.status(200).json({
      success: true,
      data: employeesWithStatus,
      summary: {
        total: employees.length,
        free: employeesWithStatus.filter(e => e.availabilityStatus === "free" || e.availabilityStatus === "light").length,
        busy: employeesWithStatus.filter(e => e.availabilityStatus === "busy" || e.availabilityStatus === "overloaded").length,
        inactive: employeesWithStatus.filter(e => e.availabilityStatus === "inactive").length,
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employee status.",
      error: err.message,
    });
  }
};