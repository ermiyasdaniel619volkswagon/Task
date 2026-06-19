
import React, { useState } from "react";
import { X, AlertTriangle, Download, Trash2, FileText, FileSpreadsheet, FileJson, File } from "lucide-react";

const EXPORT_FORMATS = [
  { id: "csv", label: "CSV", icon: FileText, color: "text-blue-600 dark:text-blue-400" },
  { id: "excel", label: "Excel", icon: FileSpreadsheet, color: "text-green-600 dark:text-green-400" },
  { id: "json", label: "JSON", icon: FileJson, color: "text-yellow-600 dark:text-yellow-400" },
  { id: "pdf", label: "PDF", icon: File, color: "text-red-600 dark:text-red-400" },
];

const DeleteConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  onFormatSelect, 
  type, 
  isLoading,
  totalItems 
}) => {
  const [selectedFormat, setSelectedFormat] = useState("csv");

  if (!isOpen) return null;

  const typeLabel = type === "all" ? "All Archived Data" : type === "tasks" ? "Archived Tasks" : "Archived Notifications";

  const handleConfirm = (shouldExport) => {
    if (shouldExport) {
      // Export first with selected format, then delete
      onFormatSelect(selectedFormat);
    }
    onConfirm(shouldExport);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Permanently Delete
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Warning */}
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-sm text-red-700 dark:text-red-300">
              <strong>⚠️ Warning:</strong> This action will permanently delete all archived data. This cannot be undone.
            </p>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              You are about to delete: <strong>{typeLabel}</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total items: <strong>{totalItems || 0}</strong>
            </p>
          </div>

          {/* Export Format Selection */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Choose export format (if you want to export before deletion):
            </p>
            <div className="grid grid-cols-2 gap-2">
              {EXPORT_FORMATS.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    selectedFormat === format.id
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <format.icon className={`w-4 h-4 ${format.color}`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {format.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => handleConfirm(true)}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export ({selectedFormat.toUpperCase()}) & Delete
                </>
              )}
            </button>

            <button
              onClick={() => handleConfirm(false)}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  No, Just Delete
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;