
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { dataManagementService } from "../services/dataManagementService";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import DeleteConfirmModal from "../components/Admin/DeleteConfirmModal";
import {
  Archive,
  Download,
  Trash2,
  RefreshCw,
  Calendar,
  FileText,
  FileSpreadsheet,
  FileJson,
  File,
  Loader2,
  Eye,
  RotateCw,
  AlertCircle,
} from "lucide-react";

const DataManagement = () => {
  const [loading, setLoading] = useState(false);
  const [archiving, setArchiving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [archivedData, setArchivedData] = useState({ tasks: [], notifications: [] });
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, hasMore: false });
  const [totals, setTotals] = useState({ tasks: 0, notifications: 0 });
  const [viewType, setViewType] = useState("all");
  const { toast, showToast } = useToast();

  // ─── Delete Modal State ──────────────────────────────────
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState("all");
  const [selectedExportFormat, setSelectedExportFormat] = useState("csv");

  // ─── Archive Settings ─────────────────────────────────────
  const [archiveTaskDays, setArchiveTaskDays] = useState(30);
  const [archiveNotifDays, setArchiveNotifDays] = useState(30);

  useEffect(() => {
    loadArchivedData();
  }, []);

  const loadArchivedData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await dataManagementService.getArchivedData(page, 20, viewType);
      if (response.success) {
        setArchivedData({
          tasks: response.data?.tasks || [],
          notifications: response.data?.notifications || [],
        });
        setPagination({
          page: response.pagination?.page || 1,
          limit: response.pagination?.limit || 20,
          total: response.pagination?.total || 0,
          hasMore: response.pagination?.hasMore || false,
        });
        setTotals({
          tasks: response.totals?.tasks || 0,
          notifications: response.totals?.notifications || 0,
        });
      }
    } catch (error) {
      showToast("Failed to load archived data", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading || !pagination.hasMore) return;
    await loadArchivedData(pagination.page + 1);
  };

  // ─── Archive Tasks ─────────────────────────────────────────
  const handleArchiveTasks = async () => {
    if (!window.confirm(`Archive all completed tasks older than ${archiveTaskDays} days?`)) return;
    setArchiving(true);
    try {
      const beforeDate = new Date();
      beforeDate.setDate(beforeDate.getDate() - archiveTaskDays);
      const response = await dataManagementService.archiveCompletedTasks(beforeDate.toISOString());
      if (response.success) {
        showToast(`✅ ${response.archivedCount} tasks archived!`, "success");
        await loadArchivedData(1);
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Archive failed", "error");
    } finally {
      setArchiving(false);
    }
  };

  // ─── Archive Notifications ─────────────────────────────────
  const handleArchiveNotifications = async () => {
    if (!window.confirm(`Archive all read notifications older than ${archiveNotifDays} days?`)) return;
    setArchiving(true);
    try {
      const response = await dataManagementService.archiveNotifications(archiveNotifDays);
      if (response.success) {
        showToast(`✅ ${response.archivedCount} notifications archived!`, "success");
        await loadArchivedData(1);
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Archive failed", "error");
    } finally {
      setArchiving(false);
    }
  };

  // ─── Export ────────────────────────────────────────────────
  const handleExport = async (format) => {
    setExporting(true);
    try {
      const response = await dataManagementService.exportArchivedData(
        format,
        viewType,
        null,
        null
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      const ext = format === "csv" ? "csv" : format === "json" ? "json" : format === "excel" ? "xlsx" : "pdf";
      link.setAttribute("download", `archived_data.${ext}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast(`✅ Data exported as ${format.toUpperCase()}!`, "success");
    } catch (error) {
      showToast("Export failed", "error");
    } finally {
      setExporting(false);
    }
  };

  // ─── Restore Task ──────────────────────────────────────────
  const handleRestore = async (taskId) => {
    if (!window.confirm("Restore this task?")) return;
    try {
      const response = await dataManagementService.restoreArchivedTask(taskId);
      if (response.success) {
        showToast("✅ Task restored!", "success");
        await loadArchivedData(1);
      }
    } catch (error) {
      showToast("Restore failed", "error");
    }
  };

  // ─── Delete Single Task ───────────────────────────────────
  const handleDeleteSingle = async (taskId) => {
    if (!window.confirm("⚠️ Permanently delete this task? This cannot be undone!")) return;
    try {
      const response = await dataManagementService.deleteArchivedTask(taskId);
      if (response.success) {
        showToast("🗑️ Task permanently deleted", "success");
        await loadArchivedData(1);
      }
    } catch (error) {
      showToast("Delete failed", "error");
    }
  };

  // ─── Delete All Archived Data ─────────────────────────────
  const handleDeleteAll = () => {
    if (totals.tasks === 0 && totals.notifications === 0) {
      showToast("No archived data to delete.", "warning");
      return;
    }
    setDeleteType("all");
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async (shouldExport) => {
    setDeleting(true);
    try {
      if (shouldExport) {
        // Export with selected format before deletion
        showToast(`📤 Exporting data as ${selectedExportFormat.toUpperCase()} before deletion...`, "info");
        await handleExport(selectedExportFormat);
      }

      // Delete all archived data
      const response = await dataManagementService.deleteAllArchivedData("all");
      if (response.success) {
        showToast(
          `🗑️ Deleted ${response.deletedCount?.tasks || 0} tasks and ${response.deletedCount?.notifications || 0} notifications.`,
          "success"
        );
        await loadArchivedData(1);
      }
    } catch (error) {
      showToast("Delete operation failed", "error");
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setDeleteType("all");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* ─── Header ──────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              📦 Data Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm -mt-1">
              Archive, export, and manage old data to keep your system clean.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Archive className="w-4 h-4" />
            <span>{totals.tasks + totals.notifications} archived items</span>
          </div>
        </div>

        {/* ─── Archive Controls ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Archive Tasks */}
          <div className="card p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Archive className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Archive Completed Tasks
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Move completed tasks older than the specified number of days to archive.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Older than (days)
                </label>
                <input
                  type="number"
                  value={archiveTaskDays}
                  onChange={(e) => setArchiveTaskDays(parseInt(e.target.value) || 30)}
                  min="1"
                  max="365"
                  className="input-field w-full"
                />
              </div>
              <button
                onClick={handleArchiveTasks}
                disabled={archiving}
                className="btn-primary flex items-center gap-2"
              >
                {archiving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Archive className="w-4 h-4" />
                )}
                Archive Tasks
              </button>
            </div>
          </div>

          {/* Archive Notifications */}
          <div className="card p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Archive className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Archive Old Notifications
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Archive read notifications older than the specified number of days.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Older than (days)
                </label>
                <input
                  type="number"
                  value={archiveNotifDays}
                  onChange={(e) => setArchiveNotifDays(parseInt(e.target.value) || 30)}
                  min="1"
                  max="365"
                  className="input-field w-full"
                />
              </div>
              <button
                onClick={handleArchiveNotifications}
                disabled={archiving}
                className="btn-primary bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
              >
                {archiving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Archive className="w-4 h-4" />
                )}
                Archive Notifications
              </button>
            </div>
          </div>

          {/* Delete All Archived Data */}
          <div className="card p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Delete Archived Data
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Permanently delete all archived data. You can export before deletion.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDeleteAll}
                disabled={deleting || (totals.tasks === 0 && totals.notifications === 0)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete All Archived Data
              </button>
              <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
                {totals.tasks + totals.notifications} items
              </span>
            </div>
          </div>
        </div>

        {/* ─── Export Controls ─────────────────────────────── */}
        <div className="card p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Export Archived Data</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Download archived data for record-keeping and audit purposes.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleExport("csv")}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-500/20 dark:hover:bg-blue-500/30 text-blue-700 dark:text-blue-400 rounded-lg transition-colors"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              CSV
            </button>
            <button
              onClick={() => handleExport("excel")}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 dark:bg-green-500/20 dark:hover:bg-green-500/30 text-green-700 dark:text-green-400 rounded-lg transition-colors"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
              Excel
            </button>
            <button
              onClick={() => handleExport("json")}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-500/20 dark:hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-400 rounded-lg transition-colors"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileJson className="w-4 h-4" />}
              JSON
            </button>
            <button
              onClick={() => handleExport("pdf")}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/30 text-red-700 dark:text-red-400 rounded-lg transition-colors"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <File className="w-4 h-4" />}
              PDF
            </button>
          </div>
        </div>

        {/* ─── Archived Data View ──────────────────────────── */}
        <div className="card p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Archived Data</h3>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={viewType}
                onChange={(e) => { setViewType(e.target.value); loadArchivedData(1); }}
                className="input-field w-auto min-w-[140px]"
              >
                <option value="all">All Data</option>
                <option value="tasks">Tasks Only</option>
                <option value="notifications">Notifications Only</option>
              </select>
              <button
                onClick={() => loadArchivedData(1)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {loading && pagination.page === 1 ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : (archivedData.tasks.length === 0 && archivedData.notifications.length === 0) ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Archive className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No archived data</p>
              <p className="text-sm">Archive tasks or notifications to see them here.</p>
            </div>
          ) : (
            <>
              {/* Archived Tasks */}
              {archivedData.tasks.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <Archive className="w-4 h-4 text-indigo-600" />
                    Archived Tasks ({archivedData.tasks.length})
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400">
                        <tr>
                          <th className="px-3 py-2 text-left">Title</th>
                          <th className="px-3 py-2 text-left">Assigned To</th>
                          <th className="px-3 py-2 text-left">Status</th>
                          <th className="px-3 py-2 text-left">Archived</th>
                          <th className="px-3 py-2 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {archivedData.tasks.map((task) => (
                          <tr key={task._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-3 py-2 text-gray-800 dark:text-white">{task.title}</td>
                            <td className="px-3 py-2 text-gray-600 dark:text-gray-400">
                              {task.assignedTo?.fullName || "Unassigned"}
                            </td>
                            <td className="px-3 py-2">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400">
                                {task.status}
                              </span>
                            </td>
                            <td className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                              {new Date(task.archivedAt).toLocaleDateString()}
                            </td>
                            <td className="px-3 py-2 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => handleRestore(task._id)}
                                  className="p-1 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/50 rounded transition-colors"
                                  title="Restore"
                                >
                                  <RotateCw className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteSingle(task._id)}
                                  className="p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50 rounded transition-colors"
                                  title="Delete Permanently"
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
                </div>
              )}

              {/* Archived Notifications */}
              {archivedData.notifications.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <Archive className="w-4 h-4 text-purple-600" />
                    Archived Notifications ({archivedData.notifications.length})
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {archivedData.notifications.map((notif) => (
                      <div
                        key={notif._id}
                        className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {notif.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            To: {notif.recipient?.fullName || "Unknown"} • {new Date(notif.archivedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {notif.read ? "Read" : "Unread"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Load More */}
              {pagination.hasMore && (
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    `Load More (${pagination.total - (pagination.page * pagination.limit)} remaining)`
                  )}
                </button>
              )}
            </>
          )}
        </div>

        {/* ─── Info Notice ──────────────────────────────────── */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
              📌 Data Management Tips
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              • Archived data is excluded from all dashboards and reports.
              <br />
              • You can restore archived tasks if needed.
              <br />
              • Permanently deleted data cannot be recovered.
              <br />
              • Export data regularly for audit and compliance purposes.
              <br />
              • <strong>Deleting archived data</strong> allows you to choose export format (CSV, Excel, JSON, or PDF).
            </p>
          </div>
        </div>
      </div>

      {/* ─── Delete Confirmation Modal ──────────────────────── */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        onFormatSelect={setSelectedExportFormat}
        type={deleteType}
        isLoading={deleting}
        totalItems={totals.tasks + totals.notifications}
      />

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default DataManagement;