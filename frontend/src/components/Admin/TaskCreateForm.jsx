
import React, { useState } from "react";
import { PlusCircle, Flag, Calendar, Tag, User } from "lucide-react";

const TASK_PRIORITIES = ["Low", "Medium", "High"];
const TASK_CATEGORIES = ["Development", "Testing", "Meeting", "Documentation", "Design"];

const TaskCreateForm = ({ employees, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Development",
    deadline: "",
    assignedTo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.assignedTo) {
      alert("Please select an employee to assign this task.");
      return;
    }
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      category: "Development",
      deadline: "",
      assignedTo: "",
    });
  };

  // ✅ Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="Task Title"
          required
        />
      </div>

      <div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input-field resize-none"
          rows="3"
          placeholder="Task Description"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="relative">
          <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-field pl-10 appearance-none"
          >
            {TASK_PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field pl-10 appearance-none"
          >
            {TASK_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="relative col-span-2">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="input-field pl-10"
            min={today} // ✅ Prevent past dates
            required
          />
        </div>

        <div className="relative col-span-2">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="input-field pl-10 appearance-none"
            required
          >
            <option value="">Select an employee...</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.fullName} ({emp.department})
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700"
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <PlusCircle className="w-4 h-4" />
            Create Task
          </>
        )}
      </button>
    </form>
  );
};

export default TaskCreateForm;