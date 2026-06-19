import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { employeeService } from "../services/employeeService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import { TrendingUp, Clock, CheckCircle, AlertTriangle, Award, Calendar } from "lucide-react";

const TaskInsights = () => {
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
      showToast("Failed to load insights", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── Metrics (Kept Exactly as Original) ──────────────────────────────
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const overdue = tasks.filter(t => t.deadline && new Date(t.deadline) < new Date() && t.status !== "Completed").length;
  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

  // ─── Priority distribution (Kept Exactly as Original) ──────────────
  const priorityCount = { Low: 0, Medium: 0, High: 0 };
  tasks.forEach(t => { if (t.priority) priorityCount[t.priority]++; });
  const priorityData = Object.keys(priorityCount)
    .filter(k => priorityCount[k] > 0)
    .map(k => ({ name: k, value: priorityCount[k] }));

  // Professional color palette: Clean, semantic, and modern
  const PRIORITY_COLORS = ["#10B981", "#F59E0B", "#EF4444"];

  // ─── Status distribution (Kept Exactly as Original) ────────────────
  const statusData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Completed", value: completed },
  ].filter(d => d.value > 0);
  const STATUS_COLORS = ["#F59E0B", "#3B82F6", "#10B981"];

  // ─── Monthly completion trend (Kept Exactly as Original) ──────────
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const trendData = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
    const completedInMonth = tasks.filter(t => {
      if (t.status !== "Completed") return false;
      const c = new Date(t.completedAt || t.updatedAt);
      return c.getFullYear() === d.getFullYear() && c.getMonth() === d.getMonth();
    }).length;
    trendData.push({
      month: monthNames[d.getMonth()] + " " + d.getFullYear().toString().slice(2),
      completed: completedInMonth,
    });
  }

  // ─── Average completion time (Kept Exactly as Original) ─────────────
  const completedWithDates = tasks.filter(t => t.status === "Completed" && t.completedAt);
  let avgDays = 0;
  if (completedWithDates.length > 0) {
    const totalDays = completedWithDates.reduce((sum, t) => {
      const created = new Date(t.createdAt);
      const done = new Date(t.completedAt);
      const diff = Math.ceil((done - created) / (1000 * 60 * 60 * 24));
      return sum + diff;
    }, 0);
    avgDays = (totalDays / completedWithDates.length).toFixed(1);
  }

  // Refined metrics config with premium brand gradients
  const statsCards = [
    { title: "Total Tasks", value: total, icon: TrendingUp, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50/80 dark:bg-blue-500/10", border: "hover:border-blue-300 dark:hover:border-blue-800" },
    { title: "Completed", value: completed, icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50/80 dark:bg-emerald-500/10", border: "hover:border-emerald-300 dark:hover:border-emerald-800" },
    { title: "Pending & Active", value: pending + inProgress, icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50/80 dark:bg-amber-500/10", border: "hover:border-amber-300 dark:hover:border-amber-800" },
    { title: "Overdue", value: overdue, icon: AlertTriangle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50/80 dark:bg-red-500/10", border: "hover:border-red-300 dark:hover:border-red-800" },
  ];

  // Custom polished chart tooltip matching high-end design systems
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 py-3 border border-gray-100 dark:border-gray-800 shadow-xl rounded-xl">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">{payload[0].name || "Tasks"}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].color || payload[0].fill }} />
            {payload[0].value} {payload[0].value === 1 ? 'Task' : 'Tasks'}
          </p>
        </div>
      );
    }
    return null;
  };

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
      <div className="max-w-[1400px] mx-auto space-y-8 p-1">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800/60">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-2.5">
              <span>Task Insights</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Deep analytics and metrics of your performance</p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto bg-gray-100/80 dark:bg-gray-800/60 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 border border-gray-200/40 dark:border-gray-700/40">
            <Calendar className="w-3.5 h-3.5" />
            <span>Rolling 6-Month Period</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, idx) => (
            <div key={idx} className={`group bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${card.border}`}>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{card.title}</p>
                  <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.bg} p-3.5 rounded-xl transition-colors duration-300`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Status Donut Chart */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Task Status Distribution</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Current state of allocated tasks</p>
            </div>
            {statusData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[250px] bg-gray-50/50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">No tasks found</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={68}
                    outerRadius={92}
                    paddingAngle={5}
                    stroke="transparent"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[index % STATUS_COLORS.length]} className="focus:outline-none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '13px', fontWeight: 500 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Priority Donut Chart */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Priority Breakdown</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Categorization of workload severity</p>
            </div>
            {priorityData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[250px] bg-gray-50/50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">No tasks tracked</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    innerRadius={68}
                    outerRadius={92}
                    paddingAngle={5}
                    stroke="transparent"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[index % PRIORITY_COLORS.length]} className="focus:outline-none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '13px', fontWeight: 500 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Monthly Completion Line Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/60 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-base">Monthly Completion Trend</h3>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Velocity and volume of finalized assignments</p>
            </div>
            {trendData.every(d => d.completed === 0) ? (
              <div className="flex flex-col items-center justify-center h-[250px] bg-gray-50/50 dark:bg-gray-800/20 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">No completions logged during this timeframe</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trendData} margin={{ left: -20, right: 10, top: 10 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" className="dark:stroke-gray-800/60" vertical={false} />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <YAxis allowDecimals={false} stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="completed" 
                    stroke="#4F46E5" 
                    strokeWidth={3} 
                    dot={{ fill: '#4F46E5', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Secondary Insights Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="group bg-gradient-to-br from-white to-indigo-50/20 dark:from-gray-900 dark:to-indigo-950/10 border border-gray-200/80 dark:border-gray-800/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl">
                <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Completion Rate</p>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{completionRate}%</p>
              </div>
            </div>
            {/* Contextual indicator bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full mt-4 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${completionRate}%` }} />
            </div>
          </div>

          <div className="group bg-gradient-to-br from-white to-emerald-50/20 dark:from-gray-900 dark:to-emerald-950/10 border border-gray-200/80 dark:border-gray-800/60 rounded-2xl p-6 transition-all duration-300 hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl">
                <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Avg. Turnaround Time</p>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{avgDays || '—'} <span className="text-sm font-medium text-gray-500">days</span></p>
              </div>
            </div>
            {/* Secondary microcopy fallback */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-[18px]">
              {avgDays ? "Average lifecycle duration from initial task creation to resolution status." : "Complete tasks to begin generating velocity metrics."}
            </p>
          </div>
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default TaskInsights;