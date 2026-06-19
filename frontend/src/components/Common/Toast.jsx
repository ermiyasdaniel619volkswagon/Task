import React from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

const Toast = ({ show, message, type }) => {
  if (!show) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <XCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  const bgColors = {
    success:
      "bg-green-50 border-green-200 dark:bg-green-950/50 dark:border-green-800",
    error: "bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-800",
    info: "bg-blue-50 border-blue-200 dark:bg-blue-950/50 dark:border-blue-800",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border animate-slide-up ${bgColors[type] || bgColors.success}`}
    >
      {icons[type] || icons.success}
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {message}
      </span>
    </div>
  );
};

export default Toast;
