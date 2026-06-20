
// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import db from "./config/db.js";
// // import cookieParser from "cookie-parser";
// // import "dotenv/config";
// // import authRoutes from "./routes/authRoutes.js";
// // import taskRoutes from "./routes/taskRoutes.js";
// // import adminRoutes from "./routes/adminRoutes.js";
// // import employeeRoutes from "./routes/employeeRoutes.js";
// // import notificationRoutes from "./routes/notificationRoutes.js"; // ✅ Already imported
// // import dataManagementRoutes from "./routes/dataManagementRoutes.js";

// // const app = express();

// // app.use(
// //   cors({
// //     origin: [
// //       "http://localhost:5174",
// //       "http://localhost:5173",
// //       "https://task-mangment-dashbord-tzr4.vercel.app",
// //     ],
// //     credentials: true,
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //     allowedHeaders: ["Content-Type", "Authorization"],
// //   })
// // );
// // app.use(express.json());
// // app.use(cookieParser());

// // db();

// // app.use("/api/auth", authRoutes);
// // app.use("/api/tasks", taskRoutes);
// // app.use("/api/admin", adminRoutes);
// // app.use("/api/employee", employeeRoutes);
// // app.use("/api/notifications", notificationRoutes); // ✅ Already mounted
// // app.use("/api/admin/data", dataManagementRoutes);
// // app.get("/", (req, res) => {
// //   res.send("Task Management API engine is active...");
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Application tracking active on port ${PORT}`);
// // });

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import "dotenv/config";
// import connectDB from "./config/db.js"; // ✅ Import the fixed version
// import authRoutes from "./routes/authRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import employeeRoutes from "./routes/employeeRoutes.js";
// import notificationRoutes from "./routes/notificationRoutes.js";
// import dataManagementRoutes from "./routes/dataManagementRoutes.js";

// const app = express();

// // CORS Configuration
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:5174",
//   "https://task-mangment-dashbord-tzr4.vercel.app"
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// // ✅ Middleware to ensure DB connection before handling requests
// app.use(async (req, res, next) => {
//   try {
//     await connectDB(); // Will use cached connection if available
//     next();
//   } catch (error) {
//     console.error("Database connection failed:", error.message);
//     res.status(503).json({
//       success: false,
//       message: "Database service unavailable. Please try again later."
//     });
//   }
// });

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/employee", employeeRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/admin/data", dataManagementRoutes);

// // Health check endpoint
// app.get("/api/health", async (req, res) => {
//   try {
//     await connectDB();
//     res.status(200).json({
//       status: "success",
//       message: "API is running",
//       database: "connected",
//       timestamp: new Date().toISOString(),
//       environment: process.env.NODE_ENV || "development"
//     });
//   } catch (error) {
//     res.status(503).json({
//       status: "error",
//       message: "Database not connected",
//       timestamp: new Date().toISOString()
//     });
//   }
// });

// app.get("/", (req, res) => {
//   res.send("Task Management API engine is active...");
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: "Something went wrong!",
//     error: process.env.NODE_ENV === "production" ? {} : err.message
//   });
// });

// // For Vercel serverless deployment
// export default app;

// // For local development
// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/db.js"; // ✅ Points to your fixed version
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dataManagementRoutes from "./routes/dataManagementRoutes.js";

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://task-mangment-dashbord-tzr4.vercel.app",
  "https://task-ezu8.vercel.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB(); // Will use cached connection if available
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(503).json({
      success: false,
      message: "Database service unavailable. Please try again later."
    });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin/data", dataManagementRoutes);

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.status(200).json({
      status: "success",
      message: "API is running",
      database: "connected",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      message: "Database not connected",
      timestamp: new Date().toISOString()
    });
  }
});

app.get("/", (req, res) => {
  res.send("Task Management API engine is active...");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "production" ? {} : err.message
  });
});

// For Vercel serverless deployment
export default app;

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}