
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Toast from "../components/Common/Toast";
import { employeeService } from "../services/employeeService";
import { useToast } from "../hooks/useToast";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Calendar,
  ArrowRight,
} from "lucide-react";

const EmployeeDashboard = () => {
  const [metrics, setMetrics] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
    overdue: 0,
    completionRate: "0%",
  });
  const [todayFocus, setTodayFocus] = useState([]);
  const [weeklyActivity, setWeeklyActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast, showToast } = useToast();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await employeeService.getDashboardMetrics();
      if (response.success) {
        setMetrics(response.metrics);
        setTodayFocus(response.todayFocus || []);
        setWeeklyActivity(response.weeklyActivity || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      showToast("Failed to load dashboard", "error");
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getMotivation = () => {
    const rate = parseFloat(metrics.completionRate);
    if (rate === 0) return "Start your journey today! Every step counts.";
    if (rate < 30) return "Keep pushing! You're building momentum.";
    if (rate < 60) return "Great progress! Stay consistent.";
    if (rate < 80) return "You're on fire! Almost there.";
    return "Outstanding! You're a productivity superstar! 🌟";
  };

  const statsCards = [
    {
      title: "Total Tasks",
      value: metrics.total,
      icon: ClipboardList,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      title: "Completed",
      value: metrics.completed,
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      title: "In Progress",
      value: metrics.inProgress,
      icon: TrendingUp,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-500/10",
    },
    {
      title: "Overdue",
      value: metrics.overdue,
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-500/10",
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* ─── Greeting ──────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {getGreeting()} 👋
              </h1>
              <p className="text-indigo-100 mt-1 text-sm">{getMotivation()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20 text-center">
              <p className="text-xs text-indigo-100">Completion Rate</p>
              <p className="text-2xl font-bold">{metrics.completionRate}</p>
            </div>
          </div>
        </div>

        {/* ─── Stats Cards ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsCards.map((card, idx) => (
            <div
              key={idx}
              className="card p-5 hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className={`${card.bg} p-3 rounded-xl`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {card.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Today's Focus ────────────────────────────────── */}
        <div className="card p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-semibold text-gray-800 dark:text-white">Today's Focus</h3>
          </div>
          {todayFocus.length === 0 ? (
            <p className="text-gray-400 dark:text-gray-500 text-sm py-4 text-center">
              No upcoming tasks. Enjoy your day! 🎉
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {todayFocus.map((task) => (
                <div
                  key={task._id}
                  className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 dark:text-white text-sm truncate">
                      {task.title}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                          : task.priority === "Medium"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                          : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  {task.deadline && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                      {task.daysLeft !== undefined && (
                        <span className={task.daysLeft < 0 ? "text-red-500" : ""}>
                          {task.daysLeft < 0
                            ? ` (Overdue)`
                            : ` (${task.daysLeft}d left)`}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── Weekly Activity Chart ────────────────────────── */}
        <div className="card p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-4 text-sm">
            <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Weekly Activity (Completed Tasks)
          </h3>
          {weeklyActivity.every((d) => d.completed === 0) ? (
            <p className="text-gray-400 dark:text-gray-500 text-sm py-4 text-center">
              No completed tasks this week. Keep going!
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis allowDecimals={false} stroke="#9ca3af" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151", color: "#fff" }}
                />
                <Bar dataKey="completed" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default EmployeeDashboard;