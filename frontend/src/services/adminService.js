
import { api } from "./api";

export const adminService = {
  getEmployees: async (page = 1, limit = 10) => {
    const response = await api.get(`/admin/employees?page=${page}&limit=${limit}`);
    return response.data;
  },

  registerStaff: async (staffData) => {
    const response = await api.post("/admin/register-staff", staffData);
    return response.data;
  },

  getKPIStats: async () => {
    const response = await api.get("/admin/kpi-stats");
    return response.data;
  },

  getAllTasks: async (page = 1, limit = 10) => {
    const response = await api.get(`/tasks?page=${page}&limit=${limit}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post("/tasks", taskData);
    return response.data;
  },

  updateTask: async (taskId, updates) => {
    const response = await api.put(`/tasks/${taskId}`, updates);
    return response.data;
  },

  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  activateUser: async (userId, status) => {
    const response = await api.put(`/admin/activate-user/${userId}`, { status });
    return response.data;
  },

  // 👇 NEW: Get employees with workload status
  getEmployeesWithStatus: async () => {
    const response = await api.get("/admin/employees-status");
    return response.data;
  },
};