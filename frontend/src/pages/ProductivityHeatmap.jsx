
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { employeeService } from "../services/employeeService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import { Calendar, TrendingUp } from "lucide-react";

const ProductivityHeatmap = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await employeeService.getMyTasks();
      // ✅ Extract the array from the response
      setTasks(response.data || []);
    } catch (error) {
      showToast("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── Build calendar heatmap ──────────────────────────────
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const completed = tasks.filter((t) => {
      if (t.status !== "Completed") return false;
      const completedDate = t.completedAt || t.updatedAt;
      if (!completedDate) return false;
      return new Date(completedDate).toISOString().split("T")[0] === dateStr;
    }).length;
    days.push({ day: d, count: completed });
  }

  const getColor = (count) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800";
    if (count === 1) return "bg-indigo-200 dark:bg-indigo-800";
    if (count === 2) return "bg-indigo-400 dark:bg-indigo-600";
    if (count >= 3) return "bg-indigo-600 dark:bg-indigo-400";
    return "bg-gray-100 dark:bg-gray-800";
  };

  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  const totalCompleted = tasks.filter((t) => t.status === "Completed").length;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">🔥 Productivity Heatmap</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm -mt-4">
          Daily completed tasks for {monthName} {year}
        </p>

        <div className="card p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalCompleted}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Total tasks completed this month
              </p>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-1"
              >
                {day}
              </div>
            ))}
            {days.map((d, idx) => (
              <div
                key={idx}
                className={`aspect-square rounded-lg ${
                  d ? getColor(d.count) : "bg-transparent"
                } flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors`}
              >
                {d ? d.day : ""}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
            <span>Less</span>
            <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded" />
            <div className="w-4 h-4 bg-indigo-200 dark:bg-indigo-800 rounded" />
            <div className="w-4 h-4 bg-indigo-400 dark:bg-indigo-600 rounded" />
            <div className="w-4 h-4 bg-indigo-600 dark:bg-indigo-400 rounded" />
            <span>More</span>
          </div>
        </div>

        <div className="card p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Streak & Insights
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {totalCompleted === 0
              ? "Complete your first task to start a streak!"
              : "You're making great progress! Keep the momentum going."}
          </p>
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default ProductivityHeatmap;