
import { api } from "./api";

export const dataManagementService = {
  // ─── Archive ──────────────────────────────────────────────
  archiveCompletedTasks: async (beforeDate, afterDate) => {
    const response = await api.post("/admin/data/archive-tasks", {
      beforeDate,
      afterDate,
    });
    return response.data;
  },

  archiveNotifications: async (daysOld) => {
    const response = await api.post("/admin/data/archive-notifications", {
      daysOld,
    });
    return response.data;
  },

  // ─── Get Archived Data ──────────────────────────────────
  getArchivedData: async (page = 1, limit = 20, type = "all") => {
    const response = await api.get(
      `/admin/data/archived-data?page=${page}&limit=${limit}&type=${type}`
    );
    return response.data;
  },

  // ─── Export ──────────────────────────────────────────────
  exportArchivedData: async (format = "csv", type = "tasks", dateFrom, dateTo) => {
    let url = `/admin/data/export?format=${format}&type=${type}`;
    if (dateFrom) url += `&dateFrom=${dateFrom}`;
    if (dateTo) url += `&dateTo=${dateTo}`;
    const response = await api.get(url, {
      responseType: "blob",
    });
    return response;
  },

  // ─── Restore ──────────────────────────────────────────────
  restoreArchivedTask: async (taskId) => {
    const response = await api.put(`/admin/data/restore-task/${taskId}`);
    return response.data;
  },

  // ─── Permanently Delete Single Task ─────────────────────
  deleteArchivedTask: async (taskId) => {
    const response = await api.delete(`/admin/data/delete-task/${taskId}`);
    return response.data;
  },

  // ─── NEW: Delete All Archived Data ──────────────────────
  deleteAllArchivedData: async (type = "all") => {
    const response = await api.delete("/admin/data/delete-all", {
      data: { type },
    });
    return response.data;
  },
};