
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import Toast from "../components/Common/Toast";
import { employeeService } from "../services/employeeService";
import { useToast } from "../hooks/useToast";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  TrendingUp,
  Send,
  Lock,
  Calendar,
} from "lucide-react";

const ProgressReport = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await employeeService.getMyTasks();
      setTasks(response.data || []);
    } catch (error) {
      showToast("Failed to load tasks", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleProgressChange = async (taskId, newProgress, lockedValue) => {
    // 🔒 Never allow below locked value
    if (newProgress < lockedValue) {
      showToast(`❌ Cannot go below ${lockedValue}% (last sent to admin).`, "warning");
      return;
    }
    try {
      await employeeService.updateDraftProgress(taskId, newProgress);
      showToast("Draft progress updated! ✅", "success");
      fetchTasks();
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update progress", "error");
    }
  };

  const handleLockProgress = async (taskId, currentProgress, lockedValue) => {
    // ✅ Only send if progress > locked value (there is new progress)
    if (currentProgress <= lockedValue) {
      showToast("No new progress to send. Please increase progress first.", "warning");
      return;
    }
    try {
      await employeeService.lockTaskProgress(taskId);
      showToast("Progress locked and sent to admin!", "success");
      fetchTasks();
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to lock progress", "error");
    }
  };

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const due = new Date(deadline);
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status !== "Completed").length;
  const completionRate = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📊 Progress & Reporting</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm -mt-1">
            Adjust your progress and send updates to your admin.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{totalTasks}</p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{completedTasks}</p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{pendingTasks}</p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-xl">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Completion</p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{completionRate}%</p>
            </div>
          </div>
        </div>

        {/* Task List with Progress Slider */}
        {tasks.length === 0 ? (
          <div className="card p-12 text-center text-gray-500 dark:text-gray-400">
            No tasks assigned yet.
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCompleted = task.status === "Completed";
              const isLocked = task.progressLocked || false;
              const currentProgress = task.progress || 0;
              const lockedValue = task.lockedValue || 0; // ✅ Last sent value
              const canModify = !isCompleted;
              const hasNewProgress = currentProgress > lockedValue;
              const isMaxedOut = lockedValue === 100 && isLocked;

              const daysLeft = task.deadline ? getDaysRemaining(task.deadline) : null;
              const isOverdue = daysLeft !== null && daysLeft < 0;

              return (
                <div
                  key={task._id}
                  className="card p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Title & Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                          {task.title}
                        </h3>
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
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">
                          {task.category || "General"}
                        </span>
                        {isLocked && !isCompleted && (
                          <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Locked at {lockedValue}%
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

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Status: <span className="font-medium">{task.status}</span></span>
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
                      </div>

                      {/* ─── Progress Slider ──────────────────── */}
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="flex-1 min-w-[150px]">
                          <input
                            type="range"
                            min={isLocked ? lockedValue : 0}
                            max="100"
                            value={currentProgress}
                            onChange={(e) => {
                              const newVal = parseInt(e.target.value);
                              if (!canModify) return;
                              handleProgressChange(task._id, newVal, lockedValue);
                            }}
                            disabled={!canModify || isMaxedOut}
                            className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 ${
                              !canModify || isMaxedOut ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            style={{ accentColor: isCompleted ? "#10b981" : "#6366f1" }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[40px]">
                          {currentProgress}%
                        </span>

                        {/* ─── Send Update Button ──────────────── */}
                        {!isCompleted && (
                          <button
                            onClick={() => handleLockProgress(task._id, currentProgress, lockedValue)}
                            disabled={!hasNewProgress || !canModify}
                            className={`flex items-center gap-1 text-sm px-4 py-1.5 rounded-lg transition-colors ${
                              hasNewProgress && canModify
                                ? "bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-400"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            <Send className="w-4 h-4" />
                            Send Update
                          </button>
                        )}
                        {isLocked && !isCompleted && (
                          <span className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Sent to admin
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Completed
                          </span>
                        )}
                      </div>

                      {/* Help text */}
                      {isLocked && !isCompleted && !isMaxedOut && (
                        <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                          🔒 Locked at {lockedValue}%. You can only increase above {lockedValue}%.
                        </p>
                      )}
                      {isLocked && !isCompleted && isMaxedOut && (
                        <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
                          ✅ You've reached 100%! Task is complete.
                        </p>
                      )}
                      {!isLocked && !isCompleted && (
                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                          {hasNewProgress
                            ? "✅ Ready to send! Click 'Send Update' to finalize for admin."
                            : "⬆ Increase progress above 0% to enable 'Send Update'."}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default ProgressReport;