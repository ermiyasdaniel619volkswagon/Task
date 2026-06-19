
import { api } from "./api";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token && response.data.user) {
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    }
    throw new Error("Login failed");
  },

  logout: async () => {
    // Optionally call the backend logout to clear any server-side session
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Ignore backend errors during logout
    }
    localStorage.removeItem("token");
  },

  getProfile: async () => {
    try {
      const response = await api.get("/auth/profile?t=" + Date.now());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (userData) => {
    const response = await api.put("/auth/profile", userData);
    return response.data;
  },
};
