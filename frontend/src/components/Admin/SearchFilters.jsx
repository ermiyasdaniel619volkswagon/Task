import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

const TASK_PRIORITIES = ["All", "Low", "Medium", "High"];
const TASK_STATUSES = ["All", "Pending", "In Progress", "Completed"];
const TASK_CATEGORIES = [
  "All",
  "Development",
  "Testing",
  "Meeting",
  "Documentation",
  "Design",
];

const EMPLOYEE_DEPARTMENTS = [
  "All",
  "Engineering",
  "QA",
  "Management",
  "Design",
  "Documentation",
];
const EMPLOYEE_JOB_ROLES = [
  "All",
  "Senior Developer",
  "Junior Developer",
  "Tester",
  "Designer",
  "Manager",
];
const EMPLOYEE_SPECIALIZATIONS = [
  "All",
  "Development",
  "Testing",
  "Database",
  "Deployment",
  "Design",
  "Documentation",
];

const SearchFilters = ({ onFilterTasks, onFilterEmployees }) => {
  const [taskFilters, setTaskFilters] = useState({
    search: "",
    priority: "All",
    status: "All",
    category: "All",
  });

  const [employeeFilters, setEmployeeFilters] = useState({
    search: "",
    department: "All",
    jobRole: "All",
    specialization: "All",
  });

  const handleTaskFilterChange = (key, value) => {
    const newFilters = { ...taskFilters, [key]: value };
    setTaskFilters(newFilters);
    onFilterTasks(newFilters);
  };

  const handleEmployeeFilterChange = (key, value) => {
    const newFilters = { ...employeeFilters, [key]: value };
    setEmployeeFilters(newFilters);
    onFilterEmployees(newFilters);
  };

  const clearAllFilters = () => {
    const emptyTask = {
      search: "",
      priority: "All",
      status: "All",
      category: "All",
    };
    const emptyEmployee = {
      search: "",
      department: "All",
      jobRole: "All",
      specialization: "All",
    };
    setTaskFilters(emptyTask);
    setEmployeeFilters(emptyEmployee);
    onFilterTasks(emptyTask);
    onFilterEmployees(emptyEmployee);
  };

  return (
    <div className="card p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-600" />
          Search & Filter
        </h3>
        <button
          onClick={clearAllFilters}
          className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <X className="w-4 h-4" />
          Clear All
        </button>
      </div>

      {/* Task Filters */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Tasks
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={taskFilters.search}
              onChange={(e) => handleTaskFilterChange("search", e.target.value)}
              className="input-field pl-9 w-full"
            />
          </div>
          <select
            value={taskFilters.priority}
            onChange={(e) => handleTaskFilterChange("priority", e.target.value)}
            className="input-field w-full"
          >
            {TASK_PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            value={taskFilters.status}
            onChange={(e) => handleTaskFilterChange("status", e.target.value)}
            className="input-field w-full"
          >
            {TASK_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={taskFilters.category}
            onChange={(e) => handleTaskFilterChange("category", e.target.value)}
            className="input-field w-full"
          >
            {TASK_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Filters */}
      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Employees
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              value={employeeFilters.search}
              onChange={(e) =>
                handleEmployeeFilterChange("search", e.target.value)
              }
              className="input-field pl-9 w-full"
            />
          </div>
          <select
            value={employeeFilters.department}
            onChange={(e) =>
              handleEmployeeFilterChange("department", e.target.value)
            }
            className="input-field w-full"
          >
            {EMPLOYEE_DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={employeeFilters.jobRole}
            onChange={(e) =>
              handleEmployeeFilterChange("jobRole", e.target.value)
            }
            className="input-field w-full"
          >
            {EMPLOYEE_JOB_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <select
            value={employeeFilters.specialization}
            onChange={(e) =>
              handleEmployeeFilterChange("specialization", e.target.value)
            }
            className="input-field w-full"
          >
            {EMPLOYEE_SPECIALIZATIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
