
import React, { useState } from "react";
import {
  Users,
  Mail,
  Briefcase,
  CheckCircle,
  XCircle,
  RefreshCw,
  Activity,
  Clock,
} from "lucide-react";
import { adminService } from "../../services/adminService";
import { useToast } from "../../hooks/useToast";

const EmployeeList = ({ employees, onRefresh, showAvailability = false }) => {
  const [loading, setLoading] = useState({});
  const { showToast } = useToast();

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    setLoading({ [userId]: true });
    try {
      const response = await adminService.activateUser(userId, newStatus);
      if (response.success) {
        showToast(
          `User ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
          "success"
        );
        if (onRefresh) onRefresh();
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to update status";
      showToast(msg, "error");
    } finally {
      setLoading({});
    }
  };

  const getAvailabilityBadge = (emp) => {
    if (emp.status === "inactive") {
      return {
        label: "⛔ Inactive",
        color: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
      };
    }
    if (emp.activeTasks >= 5) {
      return {
        label: `🔴 Overloaded (${emp.activeTasks})`,
        color: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
      };
    }
    if (emp.activeTasks >= 3) {
      return {
        label: `🟡 Busy (${emp.activeTasks})`,
        color: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
      };
    }
    if (emp.activeTasks > 0) {
      return {
        label: `🟢 Light (${emp.activeTasks})`,
        color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
      };
    }
    return {
      label: "🟢 Free",
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
    };
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="card p-8 text-center">
        <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400 dark:text-gray-500">
          No employees registered yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {employees.map((emp) => {
        const availability = getAvailabilityBadge(emp);
        return (
          <div
            key={emp._id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {emp.fullName?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">
                  {emp.fullName}
                </p>
                {/* Availability Badge */}
                {showAvailability && (
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${availability.color} flex-shrink-0`}>
                    {availability.label}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Mail className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {emp.email}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Briefcase className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {emp.jobRole}
                </span>
                {/* Show task count if available */}
                {showAvailability && emp.activeTasks !== undefined && (
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    {emp.activeTasks} active
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  emp.status === "active"
                    ? "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400"
                }`}
              >
                {emp.status}
              </span>

              <button
                onClick={() => handleToggleStatus(emp._id, emp.status)}
                disabled={loading[emp._id]}
                className={`p-2 rounded-lg transition-colors ${
                  emp.status === "active"
                    ? "bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/30 dark:hover:bg-red-900/40"
                    : "bg-green-50 hover:bg-green-100 text-green-600 dark:bg-green-950/30 dark:hover:bg-green-900/40"
                }`}
                title={emp.status === "active" ? "Deactivate" : "Activate"}
              >
                {loading[emp._id] ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : emp.status === "active" ? (
                  <XCircle className="w-5 h-5" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeList;