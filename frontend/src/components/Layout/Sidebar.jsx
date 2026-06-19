
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  Calendar,
  FileText,
  Settings,
  X,
  User,
  Clock,
  TrendingUp,
  ListTodo,
  Send,
  Activity,
  Bell, 
  Archive// 👈 Added for Notifications
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen, role, darkMode, setDarkMode }) => {
  // Admin menu items
  const adminItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard }, // ✅ Changed from "/" to "/dashboard"
    { path: "/team-members", label: "Team Members", icon: Users },
    { path: "/task-manager", label: "Task Manager", icon: ClipboardList },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/calendar", label: "Calendar", icon: Calendar },
    { path: "/reports", label: "Reports", icon: FileText },
    { path: "/notifications", label: "Notifications", icon: Bell }, 
     { path: "/profile", label: "Profile", icon: User },// 👈 Added
    // { path: "/settings", label: "Settings", icon: Settings },
    // In adminItems, add:
{ path: "/data-management", label: "Data Management", icon: Archive },
  ];

  // Employee menu items
  const employeeItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard }, // ✅ Changed from "/" to "/dashboard"
    { path: "/my-tasks", label: "My Tasks", icon: ListTodo },
    { path: "/task-board", label: "Task Board", icon: ClipboardList },
    { path: "/progress-report", label: "Progress Report", icon: Send },
    { path: "/employee-calendar", label: "Calendar", icon: Calendar },
    { path: "/timeline", label: "Timeline", icon: Activity },
    { path: "/task-insights", label: "Insights", icon: BarChart3 },
    { path: "/productivity-heatmap", label: "Heatmap", icon: TrendingUp },
    { path: "/notifications", label: "Notifications", icon: Bell }, // 👈 Added
    { path: "/profile", label: "Profile", icon: User },
    // { path: "/settings", label: "Settings", icon: Settings },
  ];

  const items = role === "Admin" ? adminItems : employeeItems;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto lg:flex lg:flex-col lg:h-screen`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 w-9 h-9 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-gray-800 dark:text-white">
              TaskFlow
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;