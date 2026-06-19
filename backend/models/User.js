import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Employee"],
      default: "Employee",
    },
    department: { type: String, required: true },
    jobRole: { type: String, required: true },
    specialization: {
      type: String,
      enum: [
        "Development",
        "Testing",
        "Database",
        "Deployment",
        "Design",
        "Documentation",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    lastLoginAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// ✅ Correct pre-save hook – no 'next' argument, just async function
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Optional: compare method
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);
