export const TASK_PRIORITIES = ["Low", "Medium", "High"];
export const TASK_CATEGORIES = [
  "Development",
  "Testing",
  "Meeting",
  "Documentation",
  "Design",
];
export const TASK_STATUSES = ["Pending", "In Progress", "Completed"];
export const SPECIALIZATIONS = [
  "Development",
  "Testing",
  "Database",
  "Deployment",
  "Design",
  "Documentation",
];

export const getPriorityColor = (priority) => {
  const colors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };
  return colors[priority] || "bg-gray-100 text-gray-700";
};

export const getStatusColor = (status) => {
  const colors = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Pending: "bg-orange-100 text-orange-700",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
};
