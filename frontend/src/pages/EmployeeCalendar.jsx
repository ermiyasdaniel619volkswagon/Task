import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { employeeService } from "../services/employeeService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import { Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const EmployeeCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
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

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const getTasksForDate = (day, month, year) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((t) => {
      if (!t.deadline) return false;
      const taskDate = new Date(t.deadline);
      const taskDateStr = `${taskDate.getFullYear()}-${String(taskDate.getMonth() + 1).padStart(2, "0")}-${String(taskDate.getDate()).padStart(2, "0")}`;
      return taskDateStr === dateStr;
    });
  };

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

  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" });
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  // ─── Tasks for the selected month ────────────────────────
  const monthTasks = tasks.filter((t) => {
    if (!t.deadline) return false;
    const d = new Date(t.deadline);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const completedMonthTasks = monthTasks.filter((t) => t.status === "Completed");
  const pendingMonthTasks = monthTasks.filter((t) => t.status !== "Completed");

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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📅 Calendar</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {monthTasks.length} tasks in {monthName} {currentYear}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              {monthName} {currentYear}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={goToToday}
              className="ml-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        {/* ─── Month Stats ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Tasks</p>
              <p className="text-xl font-bold text-gray-800 dark:text-white">{monthTasks.length}</p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{completedMonthTasks.length}</p>
            </div>
          </div>
          <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{pendingMonthTasks.length}</p>
            </div>
          </div>
        </div>

        {/* ─── Calendar Grid ────────────────────────────────── */}
        <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-2"
              >
                {day}
              </div>
            ))}
            {daysArray.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square p-1" />;
              }

              const isToday = day === todayDate && currentMonth === todayMonth && currentYear === todayYear;
              const tasksForDay = getTasksForDate(day, currentMonth, currentYear);
              const hasTasks = tasksForDay.length > 0;
              const hasCompleted = tasksForDay.some((t) => t.status === "Completed");
              const hasPending = tasksForDay.some((t) => t.status !== "Completed");

              return (
                <div
                  key={day}
                  className={`aspect-square p-1 rounded-lg transition-all ${
                    isToday ? "ring-2 ring-indigo-500 ring-inset" : ""
                  } ${hasTasks ? "hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer" : ""}`}
                  onMouseEnter={() => setSelectedDate({ day, month: currentMonth, year: currentYear })}
                  onMouseLeave={() => setSelectedDate(null)}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <span
                      className={`text-sm font-medium ${
                        isToday ? "text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {day}
                    </span>
                    {hasTasks && (
                      <div className="flex gap-0.5 mt-0.5">
                        {hasPending && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                        {hasCompleted && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                      </div>
                    )}
                  </div>

                  {/* ─── Tooltip ────────────────────────────── */}
                  {selectedDate &&
                    selectedDate.day === day &&
                    selectedDate.month === currentMonth &&
                    selectedDate.year === currentYear &&
                    hasTasks && (
                      <div className="absolute z-10 mt-1 w-48 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg pointer-events-none">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          {new Date(currentYear, currentMonth, day).toLocaleDateString()}
                        </p>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {tasksForDay.map((task) => (
                            <div key={task._id} className="text-xs flex items-center justify-between">
                              <span className="truncate text-gray-800 dark:text-white">{task.title}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                  task.status === "Completed"
                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                                }`}
                              >
                                {task.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              );
            })}
          </div>

          {/* ─── Legend ────────────────────────────────────── */}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Completed</span>
            </div>
          </div>
        </div>

        {/* ─── Upcoming Tasks for Selected Month ───────────── */}
        <div className="card p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-white flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            Upcoming Deadlines ({monthName})
          </h3>
          {pendingMonthTasks.length === 0 ? (
            <p className="text-gray-400 dark:text-gray-500 text-sm py-2 text-center">
              No pending tasks this month. Great job! 🎉
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pendingMonthTasks
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .slice(0, 6)
                .map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                      {task.title}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No date"}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default EmployeeCalendar;