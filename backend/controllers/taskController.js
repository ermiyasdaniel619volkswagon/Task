
import Task from "../models/Task.js";
import mongoose from "mongoose";
import { createNotification } from "../utils/notificationHelper.js";

// ─── Create Task ────────────────────────────────────────────
export const createTask = async (req, res) => {
  try {
    const { title, description, category, priority, deadline, assignedTo } =
      req.body;

    if (!deadline) {
      return res.status(400).json({
        success: false,
        message: "Deadline is required.",
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    if (deadlineDate < today) {
      return res.status(400).json({
        success: false,
        message: "Deadline cannot be in the past. Please select today or a future date.",
      });
    }

    const targetAssignee =
      assignedTo && mongoose.Types.ObjectId.isValid(assignedTo)
        ? assignedTo
        : null;

    const newTask = await Task.create({
      title,
      description,
      category,
      priority,
      deadline: new Date(deadline),
      assignedTo: targetAssignee,
      creatorId: req.user.id,
      progress: 0,
      draftProgress: 0,
      status: "Pending",
    });

    const fullyHydratedTask = await Task.findById(newTask._id).populate(
      "assignedTo",
      "fullName jobRole department",
    );

    if (assignedTo) {
      await createNotification({
        recipient: assignedTo,
        sender: req.user._id,
        type: "task_assigned",
        title: "New Task Assigned 📋",
        message: `You have been assigned a new task: "${title}".`,
        link: `/my-tasks`,
        metadata: { taskId: newTask._id, taskTitle: title },
      });
    }

    return res.status(201).json({
      success: true,
      data: fullyHydratedTask,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Task creation failed.",
      error: err.message,
    });
  }
};

// ─── Get filtered list of tasks (with pagination) ─────────
export const getTasks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, priority, status, category } = req.query;
    let queryMatrix = {};

    if (req.user.role !== "Admin") {
      queryMatrix.assignedTo = req.user.id;
    }

    if (search) {
      queryMatrix.title = { $regex: search, $options: "i" };
    }
    if (priority) queryMatrix.priority = priority;
    if (status) queryMatrix.status = status;
    if (category) queryMatrix.category = category;

    const total = await Task.countDocuments(queryMatrix);
    const activeTasks = await Task.find(queryMatrix)
      .populate("assignedTo", "fullName jobRole department")
      .sort({ dueDate: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: activeTasks,
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
      message: "Failed to resolve workspace metrics.",
      error: err.message,
    });
  }
};

// ─── Get task stats ─────────────────────────────────────────
export const getTaskStats = async (req, res) => {
  try {
    let balancingScope = {};
    if (req.user.role !== "Admin") {
      balancingScope.assignedTo = new mongoose.Types.ObjectId(req.user.id);
    }

    const liveAggregation = await Task.aggregate([
      { $match: balancingScope },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
          },
        },
      },
    ]);

    const fallbackStats = liveAggregation[0] || {
      total: 0,
      pending: 0,
      completed: 0,
    };

    return res.status(200).json({
      success: true,
      data: fallbackStats,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Stats metric evaluation matrix failed.",
      error: err.message,
    });
  }
};

// ─── Delete Task ────────────────────────────────────────────
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Target task document not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Task document purged from main register systems successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Document destruction routine failed.",
      error: err.message,
    });
  }
};

// ─── Update Task ────────────────────────────────────────────
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      priority,
      category,
      deadline,
      assignedTo,
      status,
      progress,
    } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found." });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (priority !== undefined) updateData.priority = priority;
    if (category !== undefined) updateData.category = category;

    if (deadline !== undefined) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const deadlineDate = new Date(deadline);
      deadlineDate.setHours(0, 0, 0, 0);

      if (deadlineDate < today) {
        return res.status(400).json({
          success: false,
          message: "Deadline cannot be in the past. Please select today or a future date.",
        });
      }
      updateData.deadline = new Date(deadline);
    }

    if (status !== undefined) updateData.status = status;
    if (progress !== undefined)
      updateData.progress = Math.min(100, Math.max(0, progress));
    if (assignedTo !== undefined) updateData.assignedTo = assignedTo;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).populate("assignedTo", "fullName email department jobRole");

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      data: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Task update failed.",
      error: error.message,
    });
  }
};