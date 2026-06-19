import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { createNotification } from "../utils/notificationHelper.js";

// ─── Archive Completed Tasks ────────────────────────────────
export const archiveCompletedTasks = async (req, res) => {
  try {
    const { beforeDate, afterDate } = req.body;
    const adminId = req.user._id;

    // Build query
    let query = { status: "Completed", archived: false };
    if (beforeDate) {
      query.completedAt = { ...query.completedAt, $lte: new Date(beforeDate) };
    }
    if (afterDate) {
      query.completedAt = { ...query.completedAt, $gte: new Date(afterDate) };
    }

    // If no date filters, default to tasks completed more than 30 days ago
    if (!beforeDate && !afterDate) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query.completedAt = { $lte: thirtyDaysAgo };
    }

    const tasks = await Task.find(query);
    const count = tasks.length;

    if (count === 0) {
      return res.status(200).json({
        success: true,
        message: "No completed tasks found to archive.",
        archivedCount: 0,
      });
    }

    // Archive each task
    const archivedIds = [];
    for (const task of tasks) {
      task.archived = true;
      task.archivedAt = new Date();
      task.archivedBy = adminId;
      await task.save();
      archivedIds.push(task._id);
    }

    // Send notification to admin
    await createNotification({
      recipient: adminId,
      sender: adminId,
      type: "progress_updated",
      title: "Tasks Archived 📦",
      message: `${count} completed tasks have been archived successfully.`,
      link: `/data-management`,
      metadata: { archivedCount: count, archivedIds },
    });

    return res.status(200).json({
      success: true,
      message: `${count} completed tasks archived successfully.`,
      archivedCount: count,
      archivedIds,
    });
  } catch (error) {
    console.error("Archive tasks error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to archive tasks.",
      error: error.message,
    });
  }
};

// ─── Archive Old Notifications ──────────────────────────────
export const archiveNotifications = async (req, res) => {
  try {
    const { daysOld } = req.body;
    const adminId = req.user._id;
    const days = daysOld || 30;

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const notifications = await Notification.find({
      read: true,
      archived: false,
      createdAt: { $lte: cutoffDate },
    });

    const count = notifications.length;

    if (count === 0) {
      return res.status(200).json({
        success: true,
        message: "No old notifications found to archive.",
        archivedCount: 0,
      });
    }

    for (const notification of notifications) {
      notification.archived = true;
      notification.archivedAt = new Date();
      notification.archivedBy = adminId;
      await notification.save();
    }

    await createNotification({
      recipient: adminId,
      sender: adminId,
      type: "progress_updated",
      title: "Notifications Archived 📦",
      message: `${count} old notifications have been archived.`,
      link: `/data-management`,
      metadata: { archivedCount: count },
    });

    return res.status(200).json({
      success: true,
      message: `${count} old notifications archived successfully.`,
      archivedCount: count,
    });
  } catch (error) {
    console.error("Archive notifications error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to archive notifications.",
      error: error.message,
    });
  }
};

// ─── Get Archived Data ──────────────────────────────────────
export const getArchivedData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const type = req.query.type || "all"; // 'tasks', 'notifications', 'all'

    let result = { tasks: [], notifications: [] };
    let totalTasks = 0;
    let totalNotifications = 0;

    // Get archived tasks
    if (type === "all" || type === "tasks") {
      const taskQuery = { archived: true };
      totalTasks = await Task.countDocuments(taskQuery);
      const tasks = await Task.find(taskQuery)
        .populate("assignedTo", "fullName email")
        .populate("archivedBy", "fullName email")
        .sort({ archivedAt: -1 })
        .skip(skip)
        .limit(limit);
      result.tasks = tasks;
    }

    // Get archived notifications
    if (type === "all" || type === "notifications") {
      const notifQuery = { archived: true };
      totalNotifications = await Notification.countDocuments(notifQuery);
      const notifications = await Notification.find(notifQuery)
        .populate("recipient", "fullName email")
        .populate("sender", "fullName email")
        .populate("archivedBy", "fullName email")
        .sort({ archivedAt: -1 })
        .skip(skip)
        .limit(limit);
      result.notifications = notifications;
    }

    return res.status(200).json({
      success: true,
      data: result,
      pagination: {
        total: totalTasks + totalNotifications,
        page,
        limit,
        totalPages: Math.ceil((totalTasks + totalNotifications) / limit),
        hasMore: page * limit < totalTasks + totalNotifications,
      },
      totals: {
        tasks: totalTasks,
        notifications: totalNotifications,
      },
    });
  } catch (error) {
    console.error("Get archived data error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch archived data.",
      error: error.message,
    });
  }
};

// ─── Export Archived Data ───────────────────────────────────
export const exportArchivedData = async (req, res) => {
  try {
    const { format, type, dateFrom, dateTo } = req.query;
    const exportFormat = format || "csv";
    const dataType = type || "tasks"; // 'tasks', 'notifications', 'all'

    let tasks = [];
    let notifications = [];

    // Build date filter
    const dateFilter = {};
    if (dateFrom) dateFilter.$gte = new Date(dateFrom);
    if (dateTo) dateFilter.$lte = new Date(dateTo);

    // Fetch data
    if (dataType === "all" || dataType === "tasks") {
      const taskQuery = { archived: true };
      if (dateFrom || dateTo) {
        taskQuery.archivedAt = dateFilter;
      }
      tasks = await Task.find(taskQuery)
        .populate("assignedTo", "fullName email")
        .populate("archivedBy", "fullName email")
        .sort({ archivedAt: -1 });
    }

    if (dataType === "all" || dataType === "notifications") {
      const notifQuery = { archived: true };
      if (dateFrom || dateTo) {
        notifQuery.archivedAt = dateFilter;
      }
      notifications = await Notification.find(notifQuery)
        .populate("recipient", "fullName email")
        .populate("sender", "fullName email")
        .populate("archivedBy", "fullName email")
        .sort({ archivedAt: -1 });
    }

    // ─── Generate CSV ──────────────────────────────────────
    if (exportFormat === "csv") {
      let csvRows = [];
      let headers = [];

      if (dataType === "all" || dataType === "tasks") {
        headers = [
          "Type",
          "Title/Message",
          "Assigned To",
          "Status",
          "Priority",
          "Deadline",
          "Archived At",
          "Archived By",
        ];
        csvRows = tasks.map((t) => ({
          Type: "Task",
          "Title/Message": t.title,
          "Assigned To": t.assignedTo?.fullName || "Unassigned",
          Status: t.status,
          Priority: t.priority,
          Deadline: t.deadline ? new Date(t.deadline).toLocaleDateString() : "N/A",
          "Archived At": new Date(t.archivedAt).toLocaleString(),
          "Archived By": t.archivedBy?.fullName || "System",
        }));

        notifications.forEach((n) => {
          csvRows.push({
            Type: "Notification",
            "Title/Message": n.title,
            "Assigned To": n.recipient?.fullName || "Unknown",
            Status: n.read ? "Read" : "Unread",
            Priority: "N/A",
            Deadline: "N/A",
            "Archived At": new Date(n.archivedAt).toLocaleString(),
            "Archived By": n.archivedBy?.fullName || "System",
          });
        });
      }

      // Convert to CSV string
      const headersStr = Object.keys(csvRows[0] || {}).join(",");
      const rowsStr = csvRows.map((row) =>
        Object.values(row).join(",")
      ).join("\n");
      const csv = headersStr + "\n" + rowsStr;

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=archived_data_${new Date().toISOString().split("T")[0]}.csv`
      );
      return res.status(200).send(csv);
    }

    // ─── Generate JSON ─────────────────────────────────────
    if (exportFormat === "json") {
      const data = {
        exportedAt: new Date().toISOString(),
        exportedBy: req.user.fullName,
        tasks,
        notifications,
      };
      res.setHeader("Content-Type", "application/json");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=archived_data_${new Date().toISOString().split("T")[0]}.json`
      );
      return res.status(200).json(data);
    }

    // ─── Generate Excel (XLSX) ────────────────────────────
    if (exportFormat === "excel") {
      try {
        const XLSX = await import("xlsx");
        const workbook = XLSX.utils.book_new();

        const taskData = tasks.map((t) => ({
          "Task Title": t.title,
          "Assigned To": t.assignedTo?.fullName || "Unassigned",
          Status: t.status,
          Priority: t.priority,
          Deadline: t.deadline ? new Date(t.deadline).toLocaleDateString() : "N/A",
          "Archived At": new Date(t.archivedAt).toLocaleString(),
          "Archived By": t.archivedBy?.fullName || "System",
        }));

        const notifData = notifications.map((n) => ({
          "Notification Title": n.title,
          "Recipient": n.recipient?.fullName || "Unknown",
          "Read": n.read ? "Yes" : "No",
          "Archived At": new Date(n.archivedAt).toLocaleString(),
          "Archived By": n.archivedBy?.fullName || "System",
        }));

        const ws1 = XLSX.utils.json_to_sheet(taskData);
        const ws2 = XLSX.utils.json_to_sheet(notifData);

        XLSX.utils.book_append_sheet(workbook, ws1, "Archived Tasks");
        XLSX.utils.book_append_sheet(workbook, ws2, "Archived Notifications");

        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=archived_data_${new Date().toISOString().split("T")[0]}.xlsx`
        );
        return res.status(200).send(buffer);
      } catch (error) {
        console.error("Excel export error:", error);
        return res.status(500).json({
          success: false,
          message: "Excel export requires xlsx package. Please install: npm install xlsx",
        });
      }
    }

    // ─── Generate PDF ──────────────────────────────────────
    if (exportFormat === "pdf") {
      try {
        const PDFDocument = await import("pdfkit");
        const doc = new PDFDocument.default({
          size: "A4",
          margins: { top: 50, bottom: 50, left: 50, right: 50 },
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=archived_data_${new Date().toISOString().split("T")[0]}.pdf`
        );
        doc.pipe(res);

        // Header
        doc
          .fontSize(20)
          .font("Helvetica-Bold")
          .text("Archived Data Report", { align: "center" });
        doc
          .fontSize(10)
          .font("Helvetica")
          .text(`Generated: ${new Date().toLocaleString()}`, { align: "center" });
        doc
          .text(`Exported By: ${req.user.fullName}`, { align: "center" });
        doc.moveDown();

        // Tasks
        doc.fontSize(14).font("Helvetica-Bold").text("Archived Tasks");
        doc.moveDown(0.5);

        if (tasks.length === 0) {
          doc.fontSize(10).font("Helvetica").text("No archived tasks.");
        } else {
          tasks.slice(0, 100).forEach((t, i) => {
            doc
              .fontSize(9)
              .font("Helvetica")
              .text(
                `${i + 1}. ${t.title} - Assigned to: ${t.assignedTo?.fullName || "Unassigned"} - ` +
                `Status: ${t.status} - Archived: ${new Date(t.archivedAt).toLocaleDateString()}`
              );
          });
          if (tasks.length > 100) {
            doc.text(`... and ${tasks.length - 100} more tasks.`);
          }
        }

        doc.moveDown();

        // Notifications
        doc.fontSize(14).font("Helvetica-Bold").text("Archived Notifications");
        doc.moveDown(0.5);

        if (notifications.length === 0) {
          doc.fontSize(10).font("Helvetica").text("No archived notifications.");
        } else {
          notifications.slice(0, 100).forEach((n, i) => {
            doc
              .fontSize(9)
              .font("Helvetica")
              .text(
                `${i + 1}. ${n.title} - Recipient: ${n.recipient?.fullName || "Unknown"} - ` +
                `Read: ${n.read ? "Yes" : "No"} - Archived: ${new Date(n.archivedAt).toLocaleDateString()}`
              );
          });
          if (notifications.length > 100) {
            doc.text(`... and ${notifications.length - 100} more notifications.`);
          }
        }

        doc.end();
        return;
      } catch (error) {
        console.error("PDF export error:", error);
        return res.status(500).json({
          success: false,
          message: "PDF export requires pdfkit package. Please install: npm install pdfkit",
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: "Unsupported export format. Use csv, json, excel, or pdf.",
    });
  } catch (error) {
    console.error("Export error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to export data.",
      error: error.message,
    });
  }
};

// ─── Restore Archived Task ──────────────────────────────────
export const restoreArchivedTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, archived: true });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Archived task not found.",
      });
    }

    task.archived = false;
    task.archivedAt = null;
    task.archivedBy = null;
    await task.save();

    await createNotification({
      recipient: req.user._id,
      sender: req.user._id,
      type: "progress_updated",
      title: "Task Restored 🔄",
      message: `Task "${task.title}" has been restored from archive.`,
      link: `/task-manager?task=${task._id}`,
      metadata: { taskId: task._id },
    });

    return res.status(200).json({
      success: true,
      message: "Task restored successfully.",
      data: task,
    });
  } catch (error) {
    console.error("Restore task error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to restore task.",
      error: error.message,
    });
  }
};

// ─── Permanently Delete Archived Task ──────────────────────
export const deleteArchivedTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, archived: true });
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Archived task not found.",
      });
    }

    await task.deleteOne();

    await createNotification({
      recipient: req.user._id,
      sender: req.user._id,
      type: "progress_updated",
      title: "Task Permanently Deleted 🗑️",
      message: `Task "${task.title}" has been permanently deleted from the system.`,
      link: `/data-management`,
      metadata: { taskId: id },
    });

    return res.status(200).json({
      success: true,
      message: "Task permanently deleted.",
    });
  } catch (error) {
    console.error("Delete archived task error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete task.",
      error: error.message,
    });
  }
};

// ─── Delete All Archived Data (with optional export) ──────
export const deleteAllArchivedData = async (req, res) => {
  try {
    const { type } = req.body; // 'tasks', 'notifications', 'all'
    const adminId = req.user._id;

    let deletedCount = { tasks: 0, notifications: 0 };

    // Delete archived tasks
    if (type === "all" || type === "tasks") {
      const result = await Task.deleteMany({ archived: true });
      deletedCount.tasks = result.deletedCount || 0;
    }

    // Delete archived notifications
    if (type === "all" || type === "notifications") {
      const result = await Notification.deleteMany({ archived: true });
      deletedCount.notifications = result.deletedCount || 0;
    }

    // Send notification to admin
    await createNotification({
      recipient: adminId,
      sender: adminId,
      type: "progress_updated",
      title: "Archived Data Deleted 🗑️",
      message: `${deletedCount.tasks} tasks and ${deletedCount.notifications} notifications have been permanently deleted.`,
      link: `/data-management`,
      metadata: deletedCount,
    });

    return res.status(200).json({
      success: true,
      message: `Deleted ${deletedCount.tasks} tasks and ${deletedCount.notifications} notifications.`,
      deletedCount,
    });
  } catch (error) {
    console.error("Delete archived data error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete archived data.",
      error: error.message,
    });
  }
};