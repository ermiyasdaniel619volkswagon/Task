// // import mongoose from "mongoose";
// // import User from "../models/User.js";

// // const seedAdminUser = async () => {
// //   try {
// //     const adminEmail = process.env.ADMIN_EMAIL;

// //     // Safety check to ensure env variables are loaded properly
// //     if (!adminEmail) {
// //       console.log(
// //         " Seed Warning: ADMIN_EMAIL not found in environment configurations.",
// //       );
// //       return;
// //     }

// //     // Check if an Admin or any user with this email already exists
// //     const adminExists = await User.findOne({ email: adminEmail.toLowerCase() });

// //     if (!adminExists) {
// //       console.log(
// //         "🌱 No Master Admin detected. Initializing system auto-seeding...",
// //       );

// //       await User.create({
// //         fullName: process.env.ADMIN_NAME || "System Admin",
// //         email: adminEmail.toLowerCase(),
// //         password: process.env.ADMIN_PASSWORD, // Will be auto-hashed by User model hooks
// //         role: "Admin",
// //         department: process.env.ADMIN_DEPARTMENT || "HQ",
// //         jobRole: "System Overseer", // 🧠 Add this fallback
// //         specialization: "Development", // 🧠 Add this valid enum fallback
// //         status: "active",
// //       });

// //       console.log(` Master Admin account successfully seeded: (${adminEmail})`);
// //     } else {
// //       console.log(
// //         "ℹ System Registry: Master Admin account already provisioned.",
// //       );
// //     }
// //   } catch (error) {
// //     console.error(
// //       ` Admin seeding operation encountered an error: ${error.message}`,
// //     );
// //   }
// // };

// // const connectDB = async () => {
// //   try {
// //     const conn = await mongoose.connect(process.env.MONGO_URI);
// //     console.log(`MongoDB Connected: ${conn.connection.host}`);

// //     // Execute the automated seeding routine immediately upon connection success
// //     await seedAdminUser();
// //   } catch (error) {
// //     console.error(`Database Connection Error: ${error.message}`);
// //     process.exit(1);
// //   }
// // };

// // export default connectDB;

// import mongoose from "mongoose";
// import User from "../models/User.js";

// // ✅ Connection caching for Vercel serverless
// let cachedConnection = null;
// let isSeedingDone = false;

// const seedAdminUser = async () => {
//   try {
//     // ✅ Prevent multiple seeding attempts
//     if (isSeedingDone) {
//       console.log("✅ Admin seeding already completed in this session");
//       return;
//     }

//     const adminEmail = process.env.ADMIN_EMAIL;

//     // Safety check to ensure env variables are loaded properly
//     if (!adminEmail) {
//       console.log("⚠️ Seed Warning: ADMIN_EMAIL not found in environment configurations.");
//       return;
//     }

//     // Check if an Admin or any user with this email already exists
//     const adminExists = await User.findOne({ email: adminEmail.toLowerCase() });

//     if (!adminExists) {
//       console.log("🌱 No Master Admin detected. Initializing system auto-seeding...");

//       await User.create({
//         fullName: process.env.ADMIN_NAME || "System Admin",
//         email: adminEmail.toLowerCase(),
//         password: process.env.ADMIN_PASSWORD, // Will be auto-hashed by User model hooks
//         role: "Admin",
//         department: process.env.ADMIN_DEPARTMENT || "HQ",
//         jobRole: "System Overseer",
//         specialization: "Development",
//         status: "active",
//       });

//       console.log(`✅ Master Admin account successfully seeded: (${adminEmail})`);
//       isSeedingDone = true;
//     } else {
//       console.log("ℹ️ System Registry: Master Admin account already provisioned.");
//       isSeedingDone = true;
//     }
//   } catch (error) {
//     console.error(`❌ Admin seeding operation encountered an error: ${error.message}`);
//     // ✅ Don't throw error, just log it - seeding failure shouldn't crash the app
//   }
// };

// // ✅ MAIN CONNECT FUNCTION - Vercel Optimized
// const connectDB = async () => {
//   try {
//     // ✅ Return cached connection if exists
//     if (cachedConnection) {
//       console.log("✅ Using cached MongoDB connection");
//       return cachedConnection;
//     }

//     console.log("🔄 Establishing new MongoDB connection...");
    
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // ⏱️ 5 seconds timeout
//       socketTimeoutMS: 45000, // ⏱️ 45 seconds
//     });

//     cachedConnection = conn;
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

//     // ✅ Run seeding only in development or if explicitly needed
//     if (process.env.NODE_ENV !== "production") {
//       await seedAdminUser();
//     } else {
//       // ✅ In production, check admin exists but don't seed automatically
//       // (or seed only if SEED_ADMIN=true)
//       if (process.env.SEED_ADMIN === "true") {
//         await seedAdminUser();
//       } else {
//         console.log("ℹ️ Production mode: Skipping admin auto-seeding");
//         console.log("ℹ️ To seed admin, set SEED_ADMIN=true environment variable");
//       }
//     }

//     return conn;
//   } catch (error) {
//     console.error(`❌ Database Connection Error: ${error.message}`);
//     // ✅ DON'T exit process - throw error for proper handling
//     throw new Error(`MongoDB connection failed: ${error.message}`);
//   }
// };

// // ✅ Helper function to check connection status
// export const getConnectionStatus = () => {
//   return {
//     isConnected: cachedConnection !== null,
//     connectionState: cachedConnection ? mongoose.connection.readyState : 0,
//     host: cachedConnection ? cachedConnection.connection.host : null
//   };
// };

// // ✅ Function to manually seed admin (can be called from API)
// export const seedAdminManually = async () => {
//   try {
//     await connectDB();
//     await seedAdminUser();
//     return { success: true, message: "Admin seeding completed" };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// };

// export default connectDB;



import mongoose from "mongoose";
import User from "../models/User.js";

// ✅ Connection caching for Vercel serverless
let cachedConnection = null;
let isSeedingDone = false;

const seedAdminUser = async () => {
  try {
    // ✅ Prevent multiple seeding attempts
    if (isSeedingDone) {
      console.log("✅ Admin seeding already completed in this session");
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL;

    // Safety check to ensure env variables are loaded properly
    if (!adminEmail) {
      console.log("⚠️ Seed Warning: ADMIN_EMAIL not found in environment configurations.");
      return;
    }

    // Check if an Admin or any user with this email already exists
    const adminExists = await User.findOne({ email: adminEmail.toLowerCase() });

    if (!adminExists) {
      console.log("🌱 No Master Admin detected. Initializing system auto-seeding...");

      await User.create({
        fullName: process.env.ADMIN_NAME || "System Admin",
        email: adminEmail.toLowerCase(),
        password: process.env.ADMIN_PASSWORD, // Will be auto-hashed by User model hooks
        role: "Admin",
        department: process.env.ADMIN_DEPARTMENT || "HQ",
        jobRole: "System Overseer",
        specialization: "Development",
        status: "active",
      });

      console.log(`✅ Master Admin account successfully seeded: (${adminEmail})`);
      isSeedingDone = true;
    } else {
      console.log("ℹ️ System Registry: Master Admin account already provisioned.");
      isSeedingDone = true;
    }
  } catch (error) {
    console.error(`❌ Admin seeding operation encountered an error: ${error.message}`);
    // ✅ Don't throw error, just log it - seeding failure shouldn't crash the app
  }
};

// ✅ MAIN CONNECT FUNCTION - Vercel Optimized (Deprecated properties removed)
const connectDB = async () => {
  try {
    // ✅ Return cached connection if exists
    if (cachedConnection) {
      console.log("✅ Using cached MongoDB connection");
      return cachedConnection;
    }

    console.log("🔄 Establishing new MongoDB connection...");
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // ⏱️ 5 seconds timeout
      socketTimeoutMS: 45000, // ⏱️ 45 seconds
    });

    cachedConnection = conn;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // ✅ Run seeding only in development or if explicitly needed
    if (process.env.NODE_ENV !== "production") {
      await seedAdminUser();
    } else {
      // ✅ In production, check admin exists but don't seed automatically
      // (or seed only if SEED_ADMIN=true)
      if (process.env.SEED_ADMIN === "true") {
        await seedAdminUser();
      } else {
        console.log("ℹ️ Production mode: Skipping admin auto-seeding");
        console.log("ℹ️ To seed admin, set SEED_ADMIN=true environment variable");
      }
    }

    return conn;
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    // ✅ DON'T exit process - throw error for proper handling
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
};

// ✅ Helper function to check connection status
export const getConnectionStatus = () => {
  return {
    isConnected: cachedConnection !== null,
    connectionState: cachedConnection ? mongoose.connection.readyState : 0,
    host: cachedConnection ? cachedConnection.connection.host : null
  };
};

// ✅ Function to manually seed admin (can be called from API)
export const seedAdminManually = async () => {
  try {
    await connectDB();
    await seedAdminUser();
    return { success: true, message: "Admin seeding completed" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default connectDB;