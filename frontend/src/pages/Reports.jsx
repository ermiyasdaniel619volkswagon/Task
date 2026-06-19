import React, { useState, useEffect, useMemo } from "react";
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
import { adminService } from "../services/adminService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import {
  Users,
  UserCheck,
  ClipboardList,
  CheckCircle,
  Clock,
  TrendingUp,
  AlertTriangle,
  Award,
  Search,
  X,
  Mail,
  Briefcase,
  Calendar,
  Activity,
} from "lucide-react";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [employeesData, tasksData] = await Promise.all([
        adminService.getEmployees(),
        adminService.getAllTasks(),
      ]);
      // ✅ Extract the arrays from the response
      setEmployees(employeesData.data || []);
      setTasks(tasksData.data || []);
    } catch (error) {
      showToast("Failed to load reports data", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ─── Metrics ──────────────────────────────────────────────
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === "active").length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;
  const overdueTasks = tasks.filter((t) => {
    if (!t.deadline || t.status === "Completed") return false;
    return new Date(t.deadline) < new Date();
  }).length;
  const completionRate =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  // ─── Employee Performance Metrics ──────────────────────
  const employeeMetrics = useMemo(() => {
    return employees.map((emp) => {
      const assigned = tasks.filter((t) => {
        const id = t.assignedTo?._id || t.assignedTo;
        return id === emp._id;
      });
      const completed = assigned.filter((t) => t.status === "Completed");
      const pending = assigned.filter((t) => t.status === "Pending");
      const overdue = assigned.filter((t) => {
        if (!t.deadline || t.status === "Completed") return false;
        return new Date(t.deadline) < new Date();
      });
      const completionRate =
        assigned.length > 0
          ? ((completed.length / assigned.length) * 100).toFixed(1)
          : 0;

      // Average completion time (days between createdAt and completedAt)
      const completedWithDates = completed.filter((t) => t.completedAt);
      let avgCompletionDays = 0;
      if (completedWithDates.length > 0) {
        const totalDays = completedWithDates.reduce((sum, t) => {
          const created = new Date(t.createdAt);
          const completedDate = new Date(t.completedAt);
          const diffTime = Math.abs(completedDate - created);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return sum + diffDays;
        }, 0);
        avgCompletionDays = (totalDays / completedWithDates.length).toFixed(1);
      }

      return {
        ...emp,
        assigned: assigned.length,
        completed: completed.length,
        pending: pending.length,
        overdue: overdue.length,
        completionRate: `${completionRate}%`,
        avgCompletionDays:
          avgCompletionDays > 0 ? `${avgCompletionDays} days` : "—",
      };
    });
  }, [employees, tasks]);

  // ─── Task List with deadline info ──────────────────────
  const taskList = useMemo(() => {
    return tasks.map((task) => {
      const daysRemaining = task.deadline
        ? Math.ceil(
            (new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24)
          )
        : null;
      return {
        ...task,
        daysRemaining,
        assignedName: task.assignedTo?.fullName || "Unassigned",
      };
    });
  }, [tasks]);

  // ─── Charts Data ──────────────────────────────────────
  const statusData = [
    { name: "Pending", value: pendingTasks },
    { name: "In Progress", value: inProgressTasks },
    { name: "Completed", value: completedTasks },
  ].filter((d) => d.value > 0);
  const STATUS_COLORS = ["#f59e0b", "#3b82f6", "#10b981"];

  const priorityCount = { Low: 0, Medium: 0, High: 0 };
  tasks.forEach((t) => {
    if (t.priority) priorityCount[t.priority]++;
  });
  const priorityData = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  // Workload per employee (top 10)
  const workloadData = employeeMetrics
    .filter((e) => e.assigned > 0)
    .sort((a, b) => b.assigned - a.assigned)
    .slice(0, 10)
    .map((e) => ({
      name: e.fullName,
      tasks: e.assigned,
    }));

  // ─── Search / Filter ──────────────────────────────────
  const filteredEmployees = employeeMetrics.filter(
    (e) =>
      e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredTasks = taskList.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assignedName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ─── Stats Cards ──────────────────────────────────────
  const statsCards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: AlertTriangle,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20",
    },
    {
      title: "Employees",
      value: activeEmployees,
      icon: Users,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20",
    },
    {
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20",
    },
  ];

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
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] p-4 sm:p-6 space-y-8 transition-colors duration-300">
        {/* ─── Header ──────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              System Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Detailed performance &amp; task analytics
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#131926] border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-inner">
            <Activity className="w-4 h-4" />
            <span>Live Data</span>
          </div>
        </div>

        {/* ─── Stats Cards ────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {statsCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-white dark:bg-[#131926] border ${card.bg} shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {card.title}
                </p>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4 tracking-tight">
                {card.value}
              </p>
              <div className="w-full bg-gray-200 dark:bg-gray-800 h-1 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full ${card.color}`}
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── Charts ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 tracking-wide text-sm uppercase">
              <PieChart className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />{" "}
              Task Status
            </h3>
            {statusData.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-12 text-center">
                No tasks
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[index % STATUS_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#fff",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={30}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 tracking-wide text-sm uppercase">
              <BarChart className="w-4 h-4 text-amber-600 dark:text-amber-400" />{" "}
              Task Priority
            </h3>
            {priorityData.every((d) => d.count === 0) ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-12 text-center">
                No tasks
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={priorityData}
                  margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient
                      id="priorityReportGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#4f46e5"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#9ca3af"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    stroke="#9ca3af"
                    fontSize={11}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="url(#priorityReportGrad)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 tracking-wide text-sm uppercase">
              <Users className="w-4 h-4 text-teal-600 dark:text-teal-400" />{" "}
              Workload (Top 10)
            </h3>
            {workloadData.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-12 text-center">
                No assignments
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={workloadData}
                  layout="vertical"
                  margin={{ top: 5, right: 10, left: -25, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    allowDecimals={false}
                    stroke="#9ca3af"
                    fontSize={10}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#9ca3af"
                    fontSize={9}
                    width={60}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderColor: "#374151",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="tasks"
                    fill="#8b5cf6"
                    radius={[0, 6, 6, 0]}
                    barSize={10}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ─── Search ──────────────────────────────────────── */}
        <div className="flex items-center gap-3 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl px-4 py-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by employee name, email, or task title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* ─── Employee Performance Table ────────────────── */}
        <div className="bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Employee Performance
              <span className="ml-auto text-sm font-normal text-gray-500 dark:text-gray-400">
                {filteredEmployees.length} employees
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-[#0b0f19] text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Role</th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Assigned
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Completed
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Pending
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Overdue
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Completion Rate
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Avg. Days
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      No employees match your search.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr
                      key={emp._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                        {emp.fullName}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {emp.email}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {emp.department}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {emp.jobRole}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">
                        {emp.assigned}
                      </td>
                      <td className="px-4 py-3 text-center text-emerald-600 dark:text-emerald-400 font-semibold">
                        {emp.completed}
                      </td>
                      <td className="px-4 py-3 text-center text-amber-600 dark:text-amber-400">
                        {emp.pending}
                      </td>
                      <td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
                        {emp.overdue}
                      </td>
                      <td className="px-4 py-3 text-center text-indigo-600 dark:text-indigo-400 font-bold">
                        {emp.completionRate}
                      </td>
                      <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">
                        {emp.avgCompletionDays}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Task List ────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Task Details
              <span className="ml-auto text-sm font-normal text-gray-500 dark:text-gray-400">
                {filteredTasks.length} tasks
              </span>
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-[#0b0f19] text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Title</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Assigned To
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Priority
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Deadline
                  </th>
                  <th className="px-4 py-3 text-center font-semibold">
                    Days Left
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                    >
                      No tasks match your search.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr
                      key={task._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                        {task.title}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {task.assignedName}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                              : task.priority === "Medium"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                              : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            task.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                              : task.status === "In Progress"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {task.deadline
                          ? new Date(task.deadline).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {task.daysRemaining !== null ? (
                          <span
                            className={
                              task.daysRemaining < 0
                                ? "text-red-500 font-bold"
                                : "text-gray-600 dark:text-gray-300"
                            }
                          >
                            {task.daysRemaining < 0
                              ? `${Math.abs(task.daysRemaining)}d overdue`
                              : `${task.daysRemaining}d`}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                        {task.category || "General"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default Reports;