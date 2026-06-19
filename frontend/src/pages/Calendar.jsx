
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { adminService } from "../services/adminService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  CheckCircle,
  ListTodo,
} from "lucide-react";

const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState(null);
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const tasksData = await adminService.getAllTasks();
      // ✅ Extract the array from the response
      setTasks(tasksData.data || []);
    } catch (error) {
      showToast("Failed to load calendar data", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ─── Helpers ──────────────────────────────────────────────
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay(); // 0=Sun, 6=Sat
  };

  const getTasksForDate = (day, month, year) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((t) => {
      if (!t.deadline) return false;
      const taskDate = new Date(t.deadline);
      const taskDateStr = `${taskDate.getFullYear()}-${String(taskDate.getMonth() + 1).padStart(2, "0")}-${String(taskDate.getDate()).padStart(2, "0")}`;
      return taskDateStr === dateStr && t.status !== "Completed";
    });
  };

  const getDaysRemaining = (deadline) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(deadline);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-500";
      case "In Progress":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  // ─── Navigation ──────────────────────────────────────────
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  };

  // ─── Compute days ────────────────────────────────────────
  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  // ─── Stats for current month ─────────────────────────────
  const tasksThisMonth = tasks.filter((t) => {
    if (!t.deadline) return false;
    const d = new Date(t.deadline);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const overdueThisMonth = tasksThisMonth.filter((t) => {
    const diff = getDaysRemaining(t.deadline);
    return diff < 0;
  });

  // ─── Build calendar grid ─────────────────────────────────
  const daysArray = [];
  // empty cells for first week
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  // ─── Render ──────────────────────────────────────────────
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96 bg-gray-50 dark:bg-[#0b0f19]">
          <div className="w-12 h-12 border-4 border-indigo-200 dark:border-indigo-500/20 border-t-indigo-600 dark:border-t-indigo-500 rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] p-4 sm:p-6 space-y-6 transition-colors duration-300">
        {/* ─── Header ──────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Calendar Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Overview of task deadlines and schedule
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#131926] border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-inner">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {monthName} {currentYear}
            </span>
          </div>
        </div>

        {/* ─── Stats summary ───────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/20">
              <ListTodo className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tasks this month
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {tasksThisMonth.length}
              </p>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md flex items-center gap-3">
            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/20">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Overdue
              </p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">
                {overdueThisMonth.length}
              </p>
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md flex items-center gap-3">
            <div className="p-2 bg-green-50 dark:bg-green-500/10 rounded-xl border border-green-200 dark:border-green-500/20">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Completed
              </p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                {
                  tasks
                    .filter((t) => t.status === "Completed" && t.deadline)
                    .filter((t) => {
                      const d = new Date(t.deadline);
                      return (
                        d.getMonth() === currentMonth &&
                        d.getFullYear() === currentYear
                      );
                    }).length
                }
              </p>
            </div>
          </div>
        </div>

        {/* ─── Calendar Navigation ────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevMonth}
              className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {monthName} {currentYear}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md"
          >
            Today
          </button>
        </div>

        {/* ─── Calendar Grid ──────────────────────────────── */}
        <div className="bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-[#0b0f19]"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800">
            {daysArray.map((day, index) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="aspect-square bg-gray-50 dark:bg-[#0b0f19] p-1"
                  />
                );
              }

              const isToday =
                day === todayDate &&
                currentMonth === todayMonth &&
                currentYear === todayYear;

              const tasksForDay = getTasksForDate(
                day,
                currentMonth,
                currentYear
              );
              const hasTasks = tasksForDay.length > 0;
              const isOverdue = tasksForDay.some(
                (t) => getDaysRemaining(t.deadline) < 0
              );

              return (
                <div
                  key={day}
                  className={`relative aspect-square bg-white dark:bg-[#0b0f19] p-2 transition-colors ${
                    isToday ? "ring-2 ring-indigo-500 ring-inset" : ""
                  } hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-default`}
                  onMouseEnter={() =>
                    setHoveredDay({
                      day,
                      month: currentMonth,
                      year: currentYear,
                    })
                  }
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span
                      className={`text-sm font-semibold ${
                        isToday
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {day}
                    </span>
                    {hasTasks && (
                      <div className="flex gap-0.5 mt-1">
                        {tasksForDay.slice(0, 3).map((t, idx) => (
                          <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full ${getTaskStatusColor(
                              t.status
                            )}`}
                          />
                        ))}
                        {tasksForDay.length > 3 && (
                          <span className="text-[8px] font-bold text-gray-500 dark:text-gray-400">
                            +{tasksForDay.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ─── Tooltip ────────────────────────────── */}
                  {hoveredDay &&
                    hoveredDay.day === day &&
                    hoveredDay.month === currentMonth &&
                    hoveredDay.year === currentYear && (
                      <div className="absolute z-10 left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl pointer-events-none">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          {new Date(
                            currentYear,
                            currentMonth,
                            day
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        {hasTasks ? (
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {tasksForDay.map((task) => {
                              const daysLeft = getDaysRemaining(task.deadline);
                              let daysText = "";
                              if (daysLeft > 0)
                                daysText = `${daysLeft} days left`;
                              else if (daysLeft === 0) daysText = "Due today!";
                              else
                                daysText = `Overdue by ${Math.abs(
                                  daysLeft
                                )} days`;

                              return (
                                <div
                                  key={task._id}
                                  className="text-xs border-b border-gray-100 dark:border-gray-700 pb-1 last:border-0"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium text-gray-800 dark:text-white">
                                      {task.title}
                                    </span>
                                    <span
                                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
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
                                  <div className="flex items-center gap-1 mt-0.5 text-gray-500 dark:text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-[10px]">
                                      {daysText}
                                    </span>
                                    <span
                                      className={`ml-1 w-1.5 h-1.5 rounded-full ${getTaskStatusColor(
                                        task.status
                                      )}`}
                                    />
                                    <span className="text-[10px] capitalize">
                                      {task.status}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400 dark:text-gray-500 italic py-2 text-center">
                            No tasks allocated
                          </div>
                        )}
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── Upcoming deadlines (next 7 days) ───────────── */}
        <div className="bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-5">
          <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Upcoming Deadlines (Next 7 Days)
          </h3>
          {tasks
            .filter((t) => {
              if (!t.deadline || t.status === "Completed") return false;
              const diff = getDaysRemaining(t.deadline);
              return diff >= 0 && diff <= 7;
            })
            .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
            .slice(0, 7).length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm py-2">
              No upcoming deadlines in the next 7 days.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tasks
                .filter((t) => {
                  if (!t.deadline || t.status === "Completed") return false;
                  const diff = getDaysRemaining(t.deadline);
                  return diff >= 0 && diff <= 7;
                })
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .slice(0, 7)
                .map((task) => {
                  const daysLeft = getDaysRemaining(task.deadline);
                  return (
                    <div
                      key={task._id}
                      className="p-3 bg-gray-50 dark:bg-[#0b0f19] border border-gray-200 dark:border-gray-800 rounded-xl"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800 dark:text-white text-sm">
                          {task.title}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            daysLeft === 0
                              ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                              : daysLeft <= 2
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                          }`}
                        >
                          {daysLeft === 0 ? "Today" : `${daysLeft}d`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default Calendar;