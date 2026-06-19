import mongoose from "mongoose";
import User from "../models/User.js";

const seedAdminUser = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;

    // Safety check to ensure env variables are loaded properly
    if (!adminEmail) {
      console.log(
        " Seed Warning: ADMIN_EMAIL not found in environment configurations.",
      );
      return;
    }

    // Check if an Admin or any user with this email already exists
    const adminExists = await User.findOne({ email: adminEmail.toLowerCase() });

    if (!adminExists) {
      console.log(
        "🌱 No Master Admin detected. Initializing system auto-seeding...",
      );

      await User.create({
        fullName: process.env.ADMIN_NAME || "System Admin",
        email: adminEmail.toLowerCase(),
        password: process.env.ADMIN_PASSWORD, // Will be auto-hashed by User model hooks
        role: "Admin",
        department: process.env.ADMIN_DEPARTMENT || "HQ",
        jobRole: "System Overseer", // 🧠 Add this fallback
        specialization: "Development", // 🧠 Add this valid enum fallback
        status: "active",
      });

      console.log(` Master Admin account successfully seeded: (${adminEmail})`);
    } else {
      console.log(
        "ℹ System Registry: Master Admin account already provisioned.",
      );
    }
  } catch (error) {
    console.error(
      ` Admin seeding operation encountered an error: ${error.message}`,
    );
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Execute the automated seeding routine immediately upon connection success
    await seedAdminUser();
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
