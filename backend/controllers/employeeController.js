
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import { createNotification } from "../utils/notificationHelper.js";

// ─── Get My Tasks (with pagination) ────────────────────────
export const getMyTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Task.countDocuments({ assignedTo: req.user._id });
    const tasks = await Task.find({
      assignedTo: req.user._id,
    })
      .sort({ deadline: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));

    const formatted = tasks.map((task) => {
      const deadline = task.deadline ? new Date(task.deadline) : null;
      let remainingTime = 0;
      let timeStatus = "No deadline";

      if (deadline) {
        const diffMs = deadline - now;
        const diffHours = diffMs / (1000 * 60 * 60);
        remainingTime = Math.max(0, diffHours);
        timeStatus = remainingTime > 0 ? `${remainingTime.toFixed(1)}h left` : "Overdue";
      }

      return {
        ...task._doc,
        progress: task.draftProgress || 0,
        lockedValue: task.progress || 0,
        remainingTime,
        timeStatus,
        allocatedTime: task.allocatedTime || 0,
      };
    });

    // ─── ✅ CHECK OVERDUE & SEND NOTIFICATIONS ────────────
    for (const task of tasks) {
      if (task.deadline && new Date(task.deadline) < now && task.status !== "Completed" && task.creatorId) {
        const notificationExists = await Notification.findOne({
          recipient: task.creatorId,
          type: "deadline_approaching",
          "metadata.taskId": task._id.toString(),
          createdAt: { $gte: todayStart },
        });

        if (!notificationExists) {
          await createNotification({
            recipient: task.creatorId,
            sender: req.user._id,
            type: "deadline_approaching",
            title: "Task Deadline Passed ⚠️",
            message: `Task "${task.title}" assigned to ${req.user.fullName} is now overdue.`,
            link: `/task-manager?task=${task._id}`,
            metadata: { taskId: task._id, deadline: task.deadline },
          });
        }
      }
    }

    const overdueCount = formatted.filter(t => t.timeStatus === "Overdue").length;

    res.json({
      success: true,
      data: formatted,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
      overdue: overdueCount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Draft Progress ──────────────────────────────────
export const updateDraftProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;

    const task = await Task.findOne({
      _id: id,
      assignedTo: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    if (task.progressLocked && progress < task.progress) {
      return res.status(403).json({
        success: false,
        message: `❌ Cannot go below ${task.progress}% (last sent to admin).`,
      });
    }

    task.draftProgress = Math.min(100, Math.max(0, progress));
    await task.save();

    res.json({
      success: true,
      data: {
        ...task._doc,
        progress: task.draftProgress || 0,
        lockedValue: task.progress || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Lock & Send to Admin ──────────────────────────────────
export const lockTaskProgress = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    if (task.draftProgress <= task.progress) {
      return res.status(400).json({
        success: false,
        message: "No new progress to send. Please increase progress first.",
      });
    }

    task.progress = task.draftProgress;
    task.progressLocked = true;

    if (task.draftProgress === 100) {
      task.status = "Completed";
    }

    await task.save();

    if (task.creatorId) {
      await createNotification({
        recipient: task.creatorId,
        sender: req.user._id,
        type: "progress_updated",
        title: "Progress Update Sent 📊",
        message: `${req.user.fullName} updated progress on "${task.title}" to ${task.draftProgress}%.`,
        link: `/task-manager?task=${task._id}`,
        metadata: { taskId: task._id, progress: task.draftProgress },
      });
    }

    res.json({
      success: true,
      data: {
        ...task._doc,
        progress: task.draftProgress || 0,
        lockedValue: task.progress || 0,
      },
      message: "Progress locked and sent to admin!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Get Employee Stats ────────────────────────────────────
export const getEmployeeStats = async (req, res) => {
  try {
    const total = await Task.countDocuments({ assignedTo: req.user._id });
    const completed = await Task.countDocuments({
      assignedTo: req.user._id,
      status: "Completed",
    });
    const pending = await Task.countDocuments({
      assignedTo: req.user._id,
      status: { $ne: "Completed" },
    });
    const inProgress = await Task.countDocuments({
      assignedTo: req.user._id,
      status: "In Progress",
    });

    res.json({ total, completed, pending, inProgress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── Get Dashboard Metrics ──────────────────────────────────
export const getDashboardMetrics = async (req, res) => {
  try {
    const now = new Date();
    const tasks = await Task.find({ assignedTo: req.user._id });

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const inProgress = tasks.filter((t) => t.status === "In Progress").length;
    const pending = tasks.filter((t) => t.status === "Pending").length;
    const overdue = tasks.filter((t) => {
      if (!t.deadline || t.status === "Completed") return false;
      return new Date(t.deadline) < now;
    }).length;
    const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

    const todayFocus = tasks
      .filter((t) => t.deadline && t.status !== "Completed")
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 3)
      .map((t) => ({
        ...t._doc,
        daysLeft: Math.ceil((new Date(t.deadline) - now) / (1000 * 60 * 60 * 24)),
      }));

    const weeklyActivity = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      const dayTasks = tasks.filter((t) => {
        const completedAt = t.updatedAt;
        if (!completedAt || t.status !== "Completed") return false;
        return new Date(completedAt).toISOString().split("T")[0] === dateStr;
      });
      weeklyActivity.push({
        date: dateStr,
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        completed: dayTasks.length,
      });
    }

    res.json({
      success: true,
      metrics: {
        total,
        completed,
        inProgress,
        pending,
        overdue,
        completionRate: `${completionRate}%`,
      },
      todayFocus,
      weeklyActivity,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Task Status ────────────────────────────────────
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findOne({
      _id: id,
      assignedTo: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    const wasCompleted = task.status === "Completed";
    const newStatus = status;

    task.status = newStatus;
    await task.save();

    if (!wasCompleted && newStatus === "Completed" && task.creatorId) {
      await createNotification({
        recipient: task.creatorId,
        sender: req.user._id,
        type: "task_completed",
        title: "Task Completed ✅",
        message: `${req.user.fullName} has completed the task: "${task.title}".`,
        link: `/task-manager?task=${task._id}`,
        metadata: { taskId: task._id, taskTitle: task.title },
      });
    }

    res.json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};