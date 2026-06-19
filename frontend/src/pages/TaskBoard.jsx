
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { employeeService } from "../services/employeeService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import { Clock, CheckCircle, AlertTriangle, Lock, PlayCircle } from "lucide-react";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await employeeService.getMyTasks();
      setTasks(response.data || []);
    } catch (error) {
      showToast("Failed to load tasks", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await employeeService.updateTaskStatus(taskId, { status: newStatus });
      showToast(`Task moved to ${newStatus}`, "success");
      fetchData();
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update status";
      showToast(msg, "error");
    }
  };

  const columns = [
    {
      id: "Pending",
      title: "To Do",
      icon: Clock,
      color: "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
    },
    {
      id: "In Progress",
      title: "In Progress",
      icon: PlayCircle,
      color: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
    },
    {
      id: "Completed",
      title: "Completed",
      icon: CheckCircle,
      color: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
    },
  ];

  const getTasksByStatus = (status) => tasks.filter((t) => t.status === status);

  // ─── Debug: Log task statuses ─────────────────────────────
  useEffect(() => {
    if (tasks.length > 0) {
      console.log("📋 TaskBoard - Task status breakdown:");
      console.log(`  Pending: ${tasks.filter(t => t.status === "Pending").length}`);
      console.log(`  In Progress: ${tasks.filter(t => t.status === "In Progress").length}`);
      console.log(`  Completed: ${tasks.filter(t => t.status === "Completed").length}`);
    }
  }, [tasks]);

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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📋 Task Board</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm -mt-4">
          Click buttons to move tasks across statuses. Locked tasks cannot be moved.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {columns.map((col) => {
            const colTasks = getTasksByStatus(col.id);
            return (
              <div
                key={col.id}
                className={`card p-4 border-2 ${col.color} bg-white dark:bg-gray-800`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <col.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {col.title}
                  </h3>
                  <span className="ml-auto text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">
                    {colTasks.length}
                  </span>
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                  {colTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-400 dark:text-gray-500">
                      <col.icon className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-xs text-center">No tasks in {col.title}</p>
                    </div>
                  ) : (
                    colTasks.map((task) => {
                      const isLocked = task.progressLocked || false;
                      const isCompleted = task.status === "Completed";
                      const canModify = !isLocked && !isCompleted;

                      return (
                        <div
                          key={task._id}
                          className={`p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow ${
                            isLocked ? "opacity-75" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 dark:text-white text-sm">
                                {task.title}
                              </p>
                              {task.description && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {task.description}
                                </p>
                              )}
                            </div>
                            {isLocked && !isCompleted && (
                              <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0 ml-2">
                                <Lock className="w-3 h-3" /> Locked
                              </span>
                            )}
                            {isCompleted && (
                              <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 px-2 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0 ml-2">
                                <CheckCircle className="w-3 h-3" /> Done
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center justify-between mt-2 gap-1">
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
                            <div className="flex gap-1">
                              {col.id !== "Pending" && (
                                <button
                                  onClick={() => updateTaskStatus(task._id, "Pending")}
                                  disabled={!canModify}
                                  className={`text-xs px-2 py-0.5 rounded ${
                                    canModify
                                      ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                  }`}
                                  title={!canModify ? "Task is locked or completed" : "Move to To Do"}
                                >
                                  ←
                                </button>
                              )}
                              {col.id !== "In Progress" && col.id !== "Completed" && (
                                <button
                                  onClick={() => updateTaskStatus(task._id, "In Progress")}
                                  disabled={!canModify}
                                  className={`text-xs px-2 py-0.5 rounded ${
                                    canModify
                                      ? "bg-blue-100 hover:bg-blue-200 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 text-blue-700 dark:text-blue-400"
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                  }`}
                                  title={!canModify ? "Task is locked or completed" : "Move to In Progress"}
                                >
                                  ▶
                                </button>
                              )}
                              {col.id !== "Completed" && (
                                <button
                                  onClick={() => updateTaskStatus(task._id, "Completed")}
                                  disabled={!canModify}
                                  className={`text-xs px-2 py-0.5 rounded ${
                                    canModify
                                      ? "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                  }`}
                                  title={!canModify ? "Task is locked or completed" : "Move to Completed"}
                                >
                                  ✓
                                </button>
                              )}
                              {col.id === "Completed" && (
                                <button
                                  onClick={() => updateTaskStatus(task._id, "Pending")}
                                  disabled={isLocked}
                                  className={`text-xs px-2 py-0.5 rounded ${
                                    !isLocked
                                      ? "bg-amber-100 hover:bg-amber-200 dark:bg-amber-500/20 dark:hover:bg-amber-500/30 text-amber-700 dark:text-amber-400"
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                                  }`}
                                  title={isLocked ? "Cannot reopen locked task" : "Reopen task"}
                                >
                                  ↺
                                </button>
                              )}
                            </div>
                          </div>
                          {task.deadline && (
                            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                              Due: {new Date(task.deadline).toLocaleDateString()}
                            </div>
                          )}
                          {isLocked && !isCompleted && (
  <div className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1">
    <Lock className="w-3 h-3" />
    Locked – go to "Progress Report" to increase and send update.
  </div>
)}
                          {/* ─── Show progress percentage ─── */}
                          <div className="mt-2 flex items-center gap-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${
                                  isCompleted ? "bg-emerald-500" : "bg-blue-500"
                                }`}
                                style={{ width: `${task.progress || 0}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {task.progress || 0}%
                            </span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default TaskBoard;