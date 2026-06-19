
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { employeeService } from "../services/employeeService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import { Calendar, Clock, CheckCircle, AlertTriangle, Layers } from "lucide-react";

const TaskTimeline = () => {
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

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const due = new Date(deadline);
    const diff = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // ✅ Sort tasks by deadline (Kept Exactly as Original)
  const sortedTasks = [...tasks]
    .filter((t) => t.deadline)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
            <div className="absolute w-8 h-8 bg-indigo-50 dark:bg-indigo-950 rounded-full" />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[1100px] mx-auto space-y-8 p-1">
        {/* Header Section */}
        <div className="pb-4 border-b border-gray-100 dark:border-gray-800/60">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            ⏱️ Task Timeline
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Chronological roadmap of tracking checkpoints and assignments.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="group bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/60 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50/80 dark:bg-blue-500/10 rounded-xl">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total with Deadlines</p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-0.5">{sortedTasks.length}</p>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/60 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-red-300 dark:hover:border-red-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50/80 dark:bg-red-500/10 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Overdue</p>
                <p className="text-2xl font-extrabold text-red-600 dark:text-red-400 mt-0.5">
                  {sortedTasks.filter((t) => {
                    const days = getDaysRemaining(t.deadline);
                    return days !== null && days < 0 && t.status !== "Completed";
                  }).length}
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/60 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50/80 dark:bg-emerald-500/10 rounded-xl">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Completed</p>
                <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {sortedTasks.filter((t) => t.status === "Completed").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Engine Container */}
        {sortedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
            <Layers className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">No tasks with active deadlines assigned.</p>
          </div>
        ) : (
          <div className="relative border-l-[3px] border-indigo-100 dark:border-gray-800 ml-6 space-y-6 pl-8 py-2">
            {sortedTasks.map((task, idx) => {
              const daysLeft = getDaysRemaining(task.deadline);
              const isOverdue = daysLeft !== null && daysLeft < 0;
              const isCompleted = task.status === "Completed";

              let dotColor = "bg-indigo-500 ring-indigo-100 dark:ring-indigo-950/50";
              let cardBorderClass = "border-gray-200/80 dark:border-gray-800/60 hover:border-indigo-300 dark:hover:border-indigo-900";
              
              if (isCompleted) {
                dotColor = "bg-emerald-500 ring-emerald-100 dark:ring-emerald-950/50";
                cardBorderClass = "border-emerald-200/60 dark:border-emerald-950/40 bg-emerald-50/[0.02] hover:border-emerald-400";
              } else if (isOverdue) {
                dotColor = "bg-red-500 ring-red-100 dark:ring-red-950/50";
                cardBorderClass = "border-red-200/60 dark:border-red-950/40 bg-red-50/[0.02] hover:border-red-400";
              }

              return (
                <div key={task._id || idx} className="relative group/node">
                  {/* Outer Timeline Dot Anchor */}
                  <div className={`absolute -left-[41px] top-4 w-4 h-4 rounded-full border-2 border-white dark:border-gray-950 ${dotColor} ring-4 transition-all duration-300 group-hover/node:scale-125 z-10`} />
                  
                  {/* Content Module */}
                  <div className={`bg-white dark:bg-gray-900 border rounded-2xl p-5 shadow-sm transition-all duration-300 hover:shadow-md ${cardBorderClass}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-gray-900 dark:text-white text-base tracking-tight">
                            {task.title}
                          </h3>
                          
                          {/* Tags Array */}
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${
                            task.priority === "High"
                              ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                              : task.priority === "Medium"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                              : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          }`}>
                            {task.priority}
                          </span>
                          
                          <span className="text-[11px] font-semibold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md text-gray-500 dark:text-gray-400">
                            {task.category || "General"}
                          </span>

                          {isCompleted && (
                            <span className="text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> DONE
                            </span>
                          )}
                          {isOverdue && !isCompleted && (
                            <span className="text-[11px] font-bold bg-red-500/10 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> OVERDUE
                            </span>
                          )}
                        </div>

                        {/* Interactive Footer Meta Nodes */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-gray-400 dark:text-gray-500">
                          <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {task.deadline ? new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : "No date"}
                          </span>
                          
                          <span className={`flex items-center gap-1.5 font-semibold ${
                            isCompleted ? "text-emerald-600 dark:text-emerald-500" : isOverdue ? "text-red-600 dark:text-red-500" : "text-indigo-600 dark:text-indigo-400"
                          }`}>
                            <Clock className="w-3.5 h-3.5" />
                            {daysLeft !== null
                              ? isOverdue
                                ? `${Math.abs(daysLeft)}d overdue`
                                : `${daysLeft}d remaining`
                              : "No deadline"}
                          </span>
                          
                          <span className="bg-gray-50 dark:bg-gray-800/40 px-2 py-0.5 rounded text-[11px]">
                            Status: <span className="font-semibold text-gray-700 dark:text-gray-300">{task.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Micro Progress View Ring/Badge */}
                      <div className="flex items-center self-end sm:self-center bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2 sm:text-center min-w-[70px] justify-center">
                        <span className="text-sm font-extrabold text-gray-800 dark:text-gray-200 tracking-tight">
                          {task.progress || 0}%
                        </span>
                      </div>
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

export default TaskTimeline;