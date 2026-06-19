
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import KPICards from "../components/Admin/KPICards";
import StaffRegistrationForm from "../components/Admin/StaffRegistrationForm";
import EmployeeList from "../components/Admin/EmployeeList";
import TaskCreateForm from "../components/Admin/TaskCreateForm";
import TaskTable from "../components/Admin/TaskTable";
import TaskEditModal from "../components/Admin/TaskEditModal";
import SearchFilters from "../components/Admin/SearchFilters";
import Toast from "../components/Common/Toast";
import { adminService } from "../services/adminService";
import { useToast } from "../hooks/useToast";
import { Users, PlusCircle, ListTodo, Trophy, Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [kpiStats, setKpiStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast, showToast } = useToast();

  // ─── Pagination state ─────────────────────────────────────
  const [taskPagination, setTaskPagination] = useState({ page: 1, limit: 10, total: 0, hasMore: false });
  const [employeePagination, setEmployeePagination] = useState({ page: 1, limit: 10, total: 0, hasMore: false });
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // ✅ FIX: Use getEmployeesWithStatus instead of getEmployees
      const [employeesData, tasksData, kpiData] = await Promise.all([
        adminService.getEmployeesWithStatus(),
        adminService.getAllTasks(1, 10),
        adminService.getKPIStats(),
      ]);
      
      // Employees - now includes availabilityStatus from backend
      setEmployees(employeesData.data || []);
      setFilteredEmployees(employeesData.data || []);
      setEmployeePagination({
        page: 1,
        limit: 10,
        total: employeesData.summary?.total || 0,
        hasMore: false,
      });

      // Tasks
      setTasks(tasksData.data || []);
      setFilteredTasks(tasksData.data || []);
      setTaskPagination({
        page: tasksData.pagination?.page || 1,
        limit: tasksData.pagination?.limit || 10,
        total: tasksData.pagination?.total || 0,
        hasMore: tasksData.pagination?.hasMore || false,
      });

      setKpiStats(kpiData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ─── Load More Tasks ──────────────────────────────────────
  const loadMoreTasks = async () => {
    if (loadingMore || !taskPagination.hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = taskPagination.page + 1;
      const response = await adminService.getAllTasks(nextPage, 10);
      const newTasks = response.data || [];
      setTasks(prev => [...prev, ...newTasks]);
      setFilteredTasks(prev => [...prev, ...newTasks]);
      setTaskPagination({
        page: response.pagination?.page || nextPage,
        limit: response.pagination?.limit || 10,
        total: response.pagination?.total || 0,
        hasMore: response.pagination?.hasMore || false,
      });
    } catch (error) {
      console.error("Error loading more tasks:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // ─── Load More Employees ──────────────────────────────────
  const loadMoreEmployees = async () => {
    if (loadingMore || !employeePagination.hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = employeePagination.page + 1;
      const response = await adminService.getEmployees(nextPage, 10);
      const newEmployees = response.data || [];
      setEmployees(prev => [...prev, ...newEmployees]);
      setFilteredEmployees(prev => [...prev, ...newEmployees]);
      setEmployeePagination({
        page: response.pagination?.page || nextPage,
        limit: response.pagination?.limit || 10,
        total: response.pagination?.total || 0,
        hasMore: response.pagination?.hasMore || false,
      });
    } catch (error) {
      console.error("Error loading more employees:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // ─── Task Filters ─────────────────────────────────────────
  const handleFilterTasks = (filters) => {
    let result = [...tasks];
    if (filters.search) {
      result = result.filter((task) =>
        task.title?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.priority !== "All") {
      result = result.filter((task) => task.priority === filters.priority);
    }
    if (filters.status !== "All") {
      result = result.filter((task) => task.status === filters.status);
    }
    if (filters.category !== "All") {
      result = result.filter((task) => task.category === filters.category);
    }
    setFilteredTasks(result);
  };

  // ─── Employee Filters ─────────────────────────────────────
  const handleFilterEmployees = (filters) => {
    let result = [...employees];
    if (filters.search) {
      result = result.filter(
        (emp) =>
          emp.fullName?.toLowerCase().includes(filters.search.toLowerCase()) ||
          emp.email?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.department !== "All") {
      result = result.filter((emp) => emp.department === filters.department);
    }
    if (filters.jobRole !== "All") {
      result = result.filter((emp) => emp.jobRole === filters.jobRole);
    }
    if (filters.specialization !== "All") {
      result = result.filter((emp) => emp.specialization === filters.specialization);
    }
    setFilteredEmployees(result);
  };

  // ─── Staff Registration ──────────────────────────────────
  const handleRegisterStaff = async (staffData) => {
    try {
      const response = await adminService.registerStaff(staffData);
      if (response.success) {
        await fetchAllData();
        showToast("Staff member registered successfully!", "success");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Registration failed", "error");
    }
  };

  // ─── Create Task ──────────────────────────────────────────
  const handleCreateTask = async (taskData) => {
    try {
      const response = await adminService.createTask(taskData);
      if (response.success) {
        await fetchAllData();
        showToast("Task created successfully!", "success");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Task creation failed", "error");
    }
  };

  // ─── Edit Task ────────────────────────────────────────────
  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (taskId, updateData) => {
    try {
      const response = await adminService.updateTask(taskId, updateData);
      if (response.success) {
        await fetchAllData();
        showToast("Task updated successfully!", "success");
        setIsEditModalOpen(false);
        setEditingTask(null);
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Task update failed", "error");
    }
  };

  // ─── Delete Task ──────────────────────────────────────────
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const response = await adminService.deleteTask(taskId);
      if (response.success) {
        await fetchAllData();
        showToast("Task deleted successfully!", "success");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "Task deletion failed", "error");
    }
  };

  const bestWorker = kpiStats?.bestWorker;
  const bestWorkerName =
    typeof bestWorker === "object" ? bestWorker?.fullName : bestWorker;

  // ✅ FIX: Use availabilityStatus for filtering, not just status
  const activeEmployees = employees.filter(
    emp => emp.status === "active" && emp.availabilityStatus !== "inactive"
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>
          <p className="text-indigo-100 mt-1">
            Here's what's happening with your task management system today.
          </p>
        </div>

        {/* KPI Section */}
        <KPICards kpi={kpiStats?.kpi} />

        {/* Best Worker Banner */}
        {bestWorkerName &&
          bestWorkerName !== "No performance track records found." && (
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-2xl p-5 border border-amber-200 dark:border-amber-800 flex items-center gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/50 p-3 rounded-xl">
                <Trophy className="w-6 h-6 text-amber-600 dark:text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-400">
                  🏆 Top Performer
                </p>
                <p className="text-xl font-bold text-gray-800 dark:text-white">
                  {bestWorkerName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Highest task completion impact
                </p>
              </div>
            </div>
          )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Staff Management */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Register New Staff
                </h3>
              </div>
              <StaffRegistrationForm
                onSubmit={handleRegisterStaff}
                isLoading={loading}
              />
            </div>

            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <ListTodo className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Employee Roster
                </h3>
                <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                  {filteredEmployees.length} / {employeePagination.total} members
                </span>
              </div>
              {/* ✅ FIX: showAvailability prop enabled to display workload status */}
              <EmployeeList
                employees={filteredEmployees}
                onRefresh={fetchAllData}
                showAvailability={true}
              />
              {employeePagination.hasMore && (
                <button
                  onClick={loadMoreEmployees}
                  disabled={loadingMore}
                  className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    `Load More (${employeePagination.total - filteredEmployees.length} remaining)`
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Task Management */}
          <div className="space-y-6">
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Create New Task
                </h3>
              </div>
              <TaskCreateForm
                employees={activeEmployees}
                onSubmit={handleCreateTask}
                isLoading={loading}
              />
            </div>

            <SearchFilters
              onFilterTasks={handleFilterTasks}
              onFilterEmployees={handleFilterEmployees}
            />
          </div>
        </div>

        {/* Tasks List */}
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
            📋 Tasks {filteredTasks.length > 0 && `(${filteredTasks.length} / ${taskPagination.total})`}
          </h3>
          <TaskTable
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
          {taskPagination.hasMore && (
            <button
              onClick={loadMoreTasks}
              disabled={loadingMore}
              className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading...
                </>
              ) : (
                `Load More (${taskPagination.total - filteredTasks.length} remaining)`
              )}
            </button>
          )}
        </div>
      </div>

      {/* Edit Task Modal */}
      {isEditModalOpen && editingTask && (
        <TaskEditModal
          task={editingTask}
          employees={activeEmployees}
          onSave={handleUpdateTask}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          isLoading={loading}
        />
      )}

      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default AdminDashboard;