
import React from "react";
import { Edit, Trash2 } from "lucide-react";

const getPriorityColor = (priority) => {
  const colors = {
    High: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400",
    Low: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
  };
  return colors[priority] || "bg-gray-100 text-gray-700";
};

const getStatusColor = (status) => {
  const colors = {
    Completed: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
    "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
    Pending: "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 dark:text-gray-500">No tasks created yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400">Title</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400">Assigned To</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400">Priority</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400">Status</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400">Progress</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400">Deadline</th>
            <th className="text-center px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">
                {task.title}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                {task.assignedTo?.fullName || "Unassigned"}
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${task.progress || 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {task.progress || 0}%
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-500">
                {task.deadline ? new Date(task.deadline).toLocaleDateString() : "No date"}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(task)}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-950/50 rounded-lg transition-colors"
                    title="Edit Task"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 rounded-lg transition-colors"
                    title="Delete Task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;