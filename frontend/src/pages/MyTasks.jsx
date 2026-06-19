
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { employeeService } from "../services/employeeService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import {
  Clock,
  CheckCircle,
  Lock,
  Search,
  X,
  AlertCircle,
  Calendar,
  Timer,
  Flag,
  PlayCircle,
  ListTodo,
  TrendingUp,
  Loader2,
} from "lucide-react";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const { toast, showToast } = useToast();

  // ─── Pagination state ─────────────────────────────────────
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, hasMore: false });

  // ─── Filter state ─────────────────────────────────────────
  const [filters, setFilters] = useState({
    search: "",
    priority: "All",
    status: "All",
    category: "All",
  });

  const PRIORITIES = ["All", "Low", "Medium", "High"];
  const STATUSES = ["All", "Pending", "In Progress", "Completed"];
  const CATEGORIES = ["All", "Development", "Testing", "Meeting", "Documentation", "Design"];

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tasks, filters]);

  const fetchTasks = async (page = 1) => {
    try {
      const response = await employeeService.getMyTasks(page, 10);
      const newTasks = response.data || [];
      setTasks(prev => page === 1 ? newTasks : [...prev, ...newTasks]);
      setFilteredTasks(prev => page === 1 ? newTasks : [...prev, ...newTasks]);
      setTotalTasks(response.total || 0);
      setPagination({
        page: response.pagination?.page || 1,
        limit: response.pagination?.limit || 10,
        total: response.pagination?.total || 0,
        hasMore: response.pagination?.hasMore || false,
      });
    } catch (error) {
      showToast("Failed to load tasks", "error");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreTasks = async () => {
    if (loadingMore || !pagination.hasMore) return;
    setLoadingMore(true);
    await fetchTasks(pagination.page + 1);
  };

  const applyFilters = () => {
    let result = [...tasks];
    if (filters.search) {
      result = result.filter((t) =>
        t.title?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.priority !== "All") {
      result = result.filter((t) => t.priority === filters.priority);
    }
    if (filters.status !== "All") {
      result = result.filter((t) => t.status === filters.status);
    }
    if (filters.category !== "All") {
      result = result.filter((t) => t.category === filters.category);
    }
    setFilteredTasks(result);
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      priority: "All",
      status: "All",
      category: "All",
    });
  };

  const handleStartProgress = async (taskId) => {
    try {
      const response = await employeeService.updateTaskStatus(taskId, { status: "In Progress" });
      if (response.success) {
        showToast("✅ Task started!", "success");
        await fetchTasks(1);
      } else {
        showToast(response.message || "Failed to start task", "error");
      }
    } catch (error) {
      console.error("Start progress error:", error);
      const msg = error.response?.data?.message || "Failed to start task";
      showToast(msg, "error");
    }
  };

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const due = new Date(deadline);
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const pendingCount = tasks.filter((t) => t.status === "Pending").length;
  const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const overdueCount = tasks.filter((t) => {
    if (!t.deadline || t.status === "Completed") return false;
    return new Date(t.deadline) < new Date();
  }).length;

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
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📋 My Tasks</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Total: <span className="font-bold text-indigo-600 dark:text-indigo-400">{totalTasks}</span> tasks
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <ListTodo className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{tasks.length}</p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{pendingCount}</p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <PlayCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">In Progress</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{inProgressCount}</p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Overdue</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">{overdueCount}</p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="input-field pl-9 w-full"
              />
            </div>
            <select
              value={filters.priority}
              onChange={(e) => handleFilterChange("priority", e.target.value)}
              className="input-field w-auto min-w-[120px]"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="input-field w-auto min-w-[120px]"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="input-field w-auto min-w-[120px]"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" /> Clear
            </button>
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length === 0 ? (
          <div className="card p-12 text-center text-gray-500 dark:text-gray-400">
            No tasks found matching your filters.
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const isCompleted = task.status === "Completed";
                const isLocked = task.progressLocked || false;
                const daysLeft = task.deadline ? getDaysRemaining(task.deadline) : null;
                const isOverdue = daysLeft !== null && daysLeft < 0;

                const priorityColors = {
                  High: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/20",
                  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
                  Low: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-200 dark:border-green-500/20",
                };

                const priorityIcons = {
                  High: <AlertCircle className="w-3.5 h-3.5" />,
                  Medium: <Flag className="w-3.5 h-3.5" />,
                  Low: <CheckCircle className="w-3.5 h-3.5" />,
                };

                return (
                  <div
                    key={task._id}
                    className="card p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                            {task.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full border ${priorityColors[task.priority] || priorityColors.Medium} flex items-center gap-1`}
                          >
                            {priorityIcons[task.priority] || priorityIcons.Medium}
                            {task.priority}
                          </span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">
                            {task.category || "General"}
                          </span>
                          {isLocked && !isCompleted && (
                            <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-3 h-3" /> Locked
                            </span>
                          )}
                          {isCompleted && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Done
                            </span>
                          )}
                        </div>

                        {task.description && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {task.description}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Status: <span className="font-medium">{task.status}</span>
                          </span>
                          {task.deadline && (
                            <span className={`flex items-center gap-1 ${isOverdue ? "text-red-500" : ""}`}>
                              <Calendar className="w-3 h-3" />
                              Deadline: {new Date(task.deadline).toLocaleDateString()}
                              {daysLeft !== null && (
                                <span className="font-medium">
                                  {isOverdue ? `(Overdue by ${Math.abs(daysLeft)}d)` : `(${daysLeft}d left)`}
                                </span>
                              )}
                            </span>
                          )}
                          {task.allocatedTime > 0 && (
                            <span className="flex items-center gap-1">
                              <Timer className="w-3 h-3" />
                              Allocated: {task.allocatedTime}h
                            </span>
                          )}
                          {task.remainingTime !== undefined && task.deadline && (
                            <span className={`flex items-center gap-1 ${task.remainingTime < 0 ? "text-red-500" : ""}`}>
                              <TrendingUp className="w-3 h-3" />
                              Remaining: {task.remainingTime.toFixed(1)}h
                            </span>
                          )}
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {task.status === "Pending" && !isLocked && (
                            <button
                              onClick={() => handleStartProgress(task._id)}
                              className="flex items-center gap-1 text-xs bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <PlayCircle className="w-3.5 h-3.5" />
                              Start Progress
                            </button>
                          )}
                          {isLocked && !isCompleted && (
                            <span className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Locked – send new update from Dashboard
                            </span>
                          )}
                          {isLocked && isCompleted && (
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Completed & Locked
                            </span>
                          )}
                          {!isLocked && isCompleted && (
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Completed
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            {pagination.hasMore && (
              <button
                onClick={loadMoreTasks}
                disabled={loadingMore}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  `Load More (${pagination.total - tasks.length} remaining)`
                )}
              </button>
            )}
          </>
        )}
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default MyTasks;