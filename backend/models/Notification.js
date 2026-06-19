
// import mongoose from "mongoose";

// const NotificationSchema = new mongoose.Schema(
//   {
//     recipient: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     type: {
//       type: String,
//       enum: [
//         "task_assigned",
//         "task_completed",
//         "progress_updated",
//         "account_deactivated",
//         "deadline_approaching", // ✅ NEW
//       ],
//       required: true,
//     },
//     title: { type: String, required: true },
//     message: { type: String, required: true },
//     link: { type: String },
//     read: { type: Boolean, default: false },
//     readAt: { type: Date },
//     metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
//   },
//   { timestamps: true }
// );

// NotificationSchema.index({ recipient: 1, read: 1, createdAt: -1 });

// export default mongoose.model("Notification", NotificationSchema);
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: [
        "task_assigned",
        "task_completed",
        "progress_updated",
        "account_deactivated",
        "deadline_approaching",
      ],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String },
    read: { type: Boolean, default: false },
    readAt: { type: Date },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    // 👇 NEW FIELDS
    archived: { type: Boolean, default: false },
    archivedAt: { type: Date },
    archivedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

NotificationSchema.index({ recipient: 1, read: 1, archived: 1, createdAt: -1 });

export default mongoose.model("Notification", NotificationSchema);