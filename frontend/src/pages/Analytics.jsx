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
  LineChart,
  Line,
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
  Calendar,
  Award,
  Activity,
  Zap,
  AlertTriangle,
  PlusCircle,
} from "lucide-react";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { toast, showToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const [employeesData, tasksData] = await Promise.all([
  //       adminService.getEmployees(),
  //       adminService.getAllTasks(),
  //     ]);
  //     setEmployees(employeesData || []);
  //     setTasks(tasksData || []);
  //   } catch (error) {
  //     showToast("Failed to load analytics data", "error");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
    showToast("Failed to load analytics data", "error");
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
    (t) => t.status === "In Progress",
  ).length;
  const completionRate =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  const now = new Date();
  const overdueTasks = tasks.filter((t) => {
    if (!t.deadline || t.status === "Completed") return false;
    return new Date(t.deadline) < now;
  }).length;

  const todayStr = now.toISOString().split("T")[0];
  const dueToday = tasks.filter((t) => {
    if (!t.deadline || t.status === "Completed") return false;
    return new Date(t.deadline).toISOString().split("T")[0] === todayStr;
  }).length;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const newTasks = tasks.filter((t) => new Date(t.createdAt) >= weekAgo).length;

  // ─── Chart Data ──────────────────────────────────────────
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

  const getDaysAgo = (days) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d;
  };

  const taskTimeline = [];
  for (let i = 6; i >= 0; i--) {
    const date = getDaysAgo(i);
    const dateStr = date.toISOString().split("T")[0];
    const dayTasks = tasks.filter((t) => {
      const created = new Date(t.createdAt);
      return created.toISOString().split("T")[0] === dateStr;
    });
    taskTimeline.push({ date: dateStr, created: dayTasks.length });
  }

  const deptCount = {};
  employees.forEach((e) => {
    const dept = e.department || "Unassigned";
    deptCount[dept] = (deptCount[dept] || 0) + 1;
  });
  const deptData = Object.keys(deptCount).map((key) => ({
    name: key,
    count: deptCount[key],
  }));

  const workloadMap = {};
  tasks.forEach((t) => {
    if (t.assignedTo) {
      const id = t.assignedTo._id || t.assignedTo;
      workloadMap[id] = (workloadMap[id] || 0) + 1;
    }
  });
  const workloadData = Object.keys(workloadMap)
    .map((id) => {
      const emp = employees.find((e) => e._id === id);
      return { name: emp?.fullName || "Unknown", tasks: workloadMap[id] };
    })
    .sort((a, b) => b.tasks - a.tasks)
    .slice(0, 10);

  const categoryCount = {};
  tasks.forEach((t) => {
    const cat = t.category || "General";
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });
  const categoryData = Object.keys(categoryCount).map((key) => ({
    name: key,
    count: categoryCount[key],
  }));

  const upcomingTasks = tasks
    .filter((t) => t.deadline && t.status !== "Completed")
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  const performerMap = {};
  tasks
    .filter((t) => t.status === "Completed" && t.assignedTo)
    .forEach((t) => {
      const id = t.assignedTo._id || t.assignedTo;
      performerMap[id] = (performerMap[id] || 0) + 1;
    });
  const topPerformers = Object.keys(performerMap)
    .map((id) => {
      const emp = employees.find((e) => e._id === id);
      return { name: emp?.fullName || "Unknown", completed: performerMap[id] };
    })
    .sort((a, b) => b.completed - a.completed)
    .slice(0, 5);

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
      title: "Active Staff",
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
      <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] text-gray-800 dark:text-gray-100 p-4 sm:p-6 space-y-8 font-sans transition-colors duration-300">
        {/* ─── Header ──────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Paycent + Task Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Real‑time management breakdown & system velocity metrics
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#131926] border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 dark:text-gray-300 shadow-inner">
            <span>📅 Last 7 days</span>
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

        {/* ─── Quick Task Pulse ───────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-4 flex items-center gap-4 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800/60 rounded-2xl shadow-md">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/20">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Due Today
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                {dueToday} Assignments
              </p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800/60 rounded-2xl shadow-md">
            <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Overdue Backlog
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                {overdueTasks} Tasks Critical
              </p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800/60 rounded-2xl shadow-md">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20">
              <PlusCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                New Pipelines (7 Days)
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                +{newTasks} Added
              </p>
            </div>
          </div>
        </div>

        {/* ─── Charts Grid ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6 tracking-wide text-sm uppercase">
              <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />{" "}
              Tasks Status Allocation
            </h3>
            {statusData.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-12 text-center">
                No structural logs found
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
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
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Priority Bar Chart */}
          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6 tracking-wide text-sm uppercase">
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />{" "}
              Task Priority Weight
            </h3>
            {priorityData.every((d) => d.count === 0) ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-12 text-center">
                No task layers configured
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={priorityData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorPriority"
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
                    fill="url(#colorPriority)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Line Chart */}
          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6 tracking-wide text-sm uppercase">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />{" "}
              Velocity Matrix (Last 7 Days)
            </h3>
            {taskTimeline.every((d) => d.created === 0) ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-12 text-center">
                Zero dynamic logs this cycle
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart
                  data={taskTimeline}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    stroke="#9ca3af"
                    fontSize={10}
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
                  <Line
                    type="monotone"
                    dataKey="created"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#8b5cf6", strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Department Bar Chart */}
          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6 tracking-wide text-sm uppercase">
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />{" "}
              Operational Department Spread
            </h3>
            {deptData.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-12 text-center">
                No structural operational metrics
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={deptData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorDept" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="#059669"
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
                    fontSize={10}
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
                    fill="url(#colorDept)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ─── Project Pulse + Team Workload ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 tracking-wide text-sm uppercase">
              <ClipboardList className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />{" "}
              Project Pulse Metrics
            </h3>
            {categoryData.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-6 text-center">
                No specific categories map
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                {categoryData.map((cat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 dark:bg-[#0b0f19] border border-gray-200 dark:border-gray-800/80 rounded-xl flex justify-between items-center transition-all hover:border-gray-300 dark:hover:border-gray-700"
                  >
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {cat.name}
                    </span>
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-200 dark:border-indigo-500/20">
                      {cat.count} Tasks
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 tracking-wide text-sm uppercase">
              <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />{" "}
              Resource Workload Balance
            </h3>
            {workloadData.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-6 text-center">
                No live production loads allocated
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
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
                    fontSize={10}
                    width={80}
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
                    barSize={12}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ─── Upcoming Deadlines + Top Performers ────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 tracking-wide text-sm uppercase">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />{" "}
              Impending Deadlines
            </h3>
            {upcomingTasks.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-8 text-center">
                All targeted tracking is safe
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div
                    key={task._id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0b0f19] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white text-sm tracking-tight">
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        📆 Target cutoff:{" "}
                        {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                        task.priority === "High"
                          ? "bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-500/20"
                          : task.priority === "Medium"
                            ? "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20"
                            : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20"
                      }`}
                    >
                      {task.priority || "Medium"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
            <h3 className="font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4 tracking-wide text-sm uppercase">
              <Award className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />{" "}
              Top Performer Velocity
            </h3>
            {topPerformers.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-500 text-sm py-8 text-center">
                Awaiting log conclusions
              </p>
            ) : (
              <div className="space-y-3">
                {topPerformers.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#0b0f19] border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg text-xs font-black shadow-md">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {p.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1 rounded-md">
                      ✓ {p.completed} Closed
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default Analytics;
