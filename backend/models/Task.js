
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, default: "General" },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    deadline: { type: Date },
    allocatedTime: { type: Number, default: 0 },
    progress: { type: Number, default: 0, min: 0, max: 100 },
    draftProgress: { type: Number, default: 0, min: 0, max: 100 },
    progressLocked: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // 👇 NEW FIELDS
    archived: { type: Boolean, default: false },
    archivedAt: { type: Date },
    archivedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Index for faster queries
TaskSchema.index({ archived: 1, status: 1, createdAt: -1 });

export default mongoose.model("Task", TaskSchema);