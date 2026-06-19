
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import EmployeeList from "../components/Admin/EmployeeList";
import EmployeeAvailabilitySummary from "../components/Admin/EmployeeAvailabilitySummary";
import { adminService } from "../services/adminService";
import { useAuth } from "../hooks/useAuth";

const TeamMembers = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === "Admin") {
      fetchEmployees();
    }
  }, [user]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      // ✅ Use the status endpoint to get availability data
      const response = await adminService.getEmployeesWithStatus();
      if (response.success) {
        setEmployees(response.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Team Members</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm -mt-1">
            View team availability and workload status
          </p>
        </div>

        {/* Availability Summary */}
        <EmployeeAvailabilitySummary />

        {/* Employee List with Availability */}
        <div className="card p-6">
          <EmployeeList
            employees={employees}
            onRefresh={fetchEmployees}
            showAvailability={true}
            loading={loading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TeamMembers;