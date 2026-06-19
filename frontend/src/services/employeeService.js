
import { api } from "./api";

export const employeeService = {
  getDashboardMetrics: async () => {
    const response = await api.get("/employee/dashboard/metrics");
    return response.data;
  },

  getMyTasks: async (page = 1, limit = 10) => {
    const response = await api.get(`/employee/tasks?page=${page}&limit=${limit}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get("/employee/stats");
    return response.data;
  },

  updateTaskStatus: async (taskId, updates) => {
    const response = await api.put(`/employee/tasks/${taskId}/status`, updates);
    return response.data;
  },

  updateDraftProgress: async (taskId, progress) => {
    const response = await api.put(`/employee/tasks/${taskId}/progress`, { progress });
    return response.data;
  },

  lockTaskProgress: async (taskId) => {
    const response = await api.put(`/employee/tasks/${taskId}/lock`);
    return response.data;
  },
};