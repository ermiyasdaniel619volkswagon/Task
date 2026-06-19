import React, { useState, useEffect } from "react";
import { Users, UserCheck, UserX, Clock, Activity, Briefcase } from "lucide-react";
import { adminService } from "../../services/adminService";
import { useToast } from "../../hooks/useToast";

const EmployeeAvailabilitySummary = () => {
  const [summary, setSummary] = useState({ total: 0, free: 0, busy: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await adminService.getEmployeesWithStatus();
      if (response.success) {
        setSummary(response.summary || { total: 0, free: 0, busy: 0, inactive: 0 });
      }
    } catch (error) {
      showToast("Failed to load employee availability", "error");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Total Employees",
      value: summary.total,
      icon: Users,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
    },
    {
      label: "Available (Free/Light)",
      value: summary.free,
      icon: UserCheck,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
    },
    {
      label: "Busy/Overloaded",
      value: summary.busy,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
    },
    {
      label: "Inactive",
      value: summary.inactive,
      icon: UserX,
      color: "text-gray-500 dark:text-gray-400",
      bg: "bg-gray-50 dark:bg-gray-800/30",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card p-4 animate-pulse bg-gray-100 dark:bg-gray-800 h-20" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Team Availability</h3>
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {summary.total} total
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className={`${stat.bg} p-2 rounded-lg`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {stat.value}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeAvailabilitySummary;