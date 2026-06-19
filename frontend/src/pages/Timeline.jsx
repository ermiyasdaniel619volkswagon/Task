import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { employeeService } from "../services/employeeService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Timeline = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTask, setExpandedTask] = useState(null);
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

  const toggleExpand = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const due = new Date(deadline);
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const sortedTasks = [...tasks]
    .filter((t) => t.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

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
        {/* ─── Header ──────────────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">⏱️ Task Timeline</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm -mt-1">
            Chronological view of all your task deadlines.
          </p>
        </div>

        {/* ─── Stats ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total with Deadlines</p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{sortedTasks.length}</p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Overdue</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">
                {sortedTasks.filter((t) => {
                  const days = getDaysRemaining(t.deadline);
                  return days !== null && days < 0 && t.status !== "Completed";
                }).length}
              </p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {sortedTasks.filter((t) => t.status === "Completed").length}
              </p>
            </div>
          </div>
        </div>

        {/* ─── Timeline ────────────────────────────────────── */}
        {sortedTasks.length === 0 ? (
          <div className="card p-12 text-center text-gray-500 dark:text-gray-400">
            No tasks with deadlines assigned.
          </div>
        ) : (
          <div className="relative border-l-2 border-indigo-300 dark:border-indigo-700 ml-4 space-y-6 pl-8">
            {sortedTasks.map((task, idx) => {
              const daysLeft = getDaysRemaining(task.deadline);
              const isOverdue = daysLeft !== null && daysLeft < 0;
              const isCompleted = task.status === "Completed";
              const isExpanded = expandedTask === task._id;

              let statusColor = "border-indigo-500 bg-indigo-500";
              if (isCompleted) statusColor = "border-emerald-500 bg-emerald-500";
              else if (isOverdue) statusColor = "border-red-500 bg-red-500";

              return (
                <div key={task._id} className="relative">
                  <div
                    className={`absolute -left-10 top-1 w-5 h-5 rounded-full border-2 ${statusColor}`}
                  />
                  <div
                    className={`card p-4 bg-white dark:bg-gray-800 border ${
                      isCompleted
                        ? "border-emerald-200 dark:border-emerald-800"
                        : isOverdue
                        ? "border-red-200 dark:border-red-800"
                        : "border-gray-200 dark:border-gray-700"
                    } hover:shadow-lg transition-shadow cursor-pointer`}
                    onClick={() => toggleExpand(task._id)}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-800 dark:text-white">
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
                          {isCompleted && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Done
                            </span>
                          )}
                          {isOverdue && !isCompleted && (
                            <span className="text-xs bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Overdue
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No date"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {daysLeft !== null
                              ? isOverdue
                                ? `${Math.abs(daysLeft)}d overdue`
                                : `${daysLeft}d left`
                              : "No deadline"}
                          </span>
                          <span>
                            Status: <span className="font-medium">{task.status}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                          {task.progress || 0}%
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* ─── Expanded Details ──────────────────── */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        {task.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {task.description}
                          </p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          {task.allocatedTime > 0 && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <Clock className="w-4 h-4 text-gray-400" />
                              Allocated Time: <span className="font-medium">{task.allocatedTime}h</span>
                            </div>
                          )}
                          {task.remainingTime !== undefined && (
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                              <Clock className="w-4 h-4 text-gray-400" />
                              Remaining Time: <span className="font-medium">{task.remainingTime.toFixed(1)}h</span>
                            </div>
                          )}
                          {task.progressLocked && (
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                              <CheckCircle className="w-4 h-4" />
                              Locked – sent to admin
                            </div>
                          )}
                        </div>
                      </div>
                    )}
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

export default Timeline;