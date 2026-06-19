import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; //for local development
// const API_URL =
//   import.meta.env.VITE_API_URL ||
//   "https://task-mangment-dashbord-rbx1.vercel.app/api"; // for production deployment

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor – attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor – just reject; redirect is handled in AuthContext/ProtectedRoute
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If we get a 401, we'll let the calling code handle it.
    // We DO NOT redirect here to avoid reload loops.
    return Promise.reject(error);
  },
);
