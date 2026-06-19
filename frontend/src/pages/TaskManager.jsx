
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import TaskTable from "../components/Admin/TaskTable";
import { adminService } from "../services/adminService";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    adminService.getAllTasks().then((response) => {
      // ✅ Extract the array from the response
      setTasks(response.data || []);
    });
  }, []);

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">All Tasks</h1>
        <div className="card p-6">
          <TaskTable tasks={tasks} />
        </div>
      </div>
    </Layout>
  );
};

export default TaskManager;