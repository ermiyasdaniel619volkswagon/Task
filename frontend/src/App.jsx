
// import React, { useEffect } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminDashboard from "./pages/AdminDashboard";
// import EmployeeDashboard from "./pages/EmployeeDashboard";
// import Profile from "./pages/Profile";
// import TeamMembers from "./pages/TeamMembers";
// import TaskManager from "./pages/TaskManager";
// import Analytics from "./pages/Analytics";
// import Calendar from "./pages/Calendar";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
// import MyTasks from "./pages/MyTasks";
// import TaskBoard from "./pages/TaskBoard";
// import TaskTimeline from "./pages/TaskTimeline";
// import TaskInsights from "./pages/TaskInsights";
// import ProductivityHeatmap from "./pages/ProductivityHeatmap";
// import ProgressReport from "./pages/ProgressReport";
// import EmployeeCalendar from "./pages/EmployeeCalendar";
// import Timeline from "./pages/Timeline";
// import Notifications from "./pages/Notifications";
// import ProtectedRoute from "./components/Common/ProtectedRoute";
// import { useAuth } from "./hooks/useAuth";
// import DataManagement from "./pages/DataManagement";

// // ─── Role‑based wrappers ──────────────────────────────────
// const AdminRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (user?.role !== "Admin") {
//     return <Navigate to="/dashboard" replace />;
//   }
//   return children;
// };

// const EmployeeRoute = ({ children }) => {
//   const { user } = useAuth();
//   if (user?.role !== "Employee") {
//     return <Navigate to="/dashboard" replace />;
//   }
//   return children;
// };

// function App() {
//   const { user, loading } = useAuth();

//   useEffect(() => {
//     const savedDarkMode = localStorage.getItem("darkMode");
//     if (savedDarkMode && JSON.parse(savedDarkMode)) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
//           <p className="text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       {/* ─── PUBLIC ROUTES ────────────────────────────────── */}
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<About />} />
//       {/* <Route path="/contact" element={<Contact />} /> // ❌ REMOVED */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* ─── PRIVATE ROUTES ────────────────────────────────── */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             {user?.role === "Admin" ? <AdminDashboard /> : <EmployeeDashboard />}
//           </ProtectedRoute>
//         }
//       />

//       {/* Shared routes */}
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//   path="/data-management"
//   element={
//     <ProtectedRoute>
//       <AdminRoute>
//         <DataManagement />
//       </AdminRoute>
//     </ProtectedRoute>
//   }
// />
//       <Route
//         path="/analytics"
//         element={
//           <ProtectedRoute>
//             <Analytics />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/calendar"
//         element={
//           <ProtectedRoute>
//             <Calendar />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/settings"
//         element={
//           <ProtectedRoute>
//             <Settings />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/notifications"
//         element={
//           <ProtectedRoute>
//             <Notifications />
//           </ProtectedRoute>
//         }
//       />

//       {/* Admin-only routes */}
//       <Route
//         path="/team-members"
//         element={
//           <ProtectedRoute>
//             <AdminRoute>
//               <TeamMembers />
//             </AdminRoute>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/task-manager"
//         element={
//           <ProtectedRoute>
//             <AdminRoute>
//               <TaskManager />
//             </AdminRoute>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/reports"
//         element={
//           <ProtectedRoute>
//             <AdminRoute>
//               <Reports />
//             </AdminRoute>
//           </ProtectedRoute>
//         }
//       />

//       {/* Employee-only routes */}
//       <Route
//         path="/my-tasks"
//         element={
//           <ProtectedRoute>
//             <EmployeeRoute>
//               <MyTasks />
//             </EmployeeRoute>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/task-board"
//         element={
//           <ProtectedRoute>
//             <EmployeeRoute>
//               <TaskBoard />
//             </EmployeeRoute>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/task-timeline"
//         element={
//           <ProtectedRoute>
//             <EmployeeRoute>
//               <TaskTimeline />
//             </EmployeeRoute>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/task-insights"
//         element={
//           <ProtectedRoute>
//             <EmployeeRoute>
//               <TaskInsights />
//             </EmployeeRoute>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/productivity-heatmap"
//         element={
//           <ProtectedRoute>
//             <EmployeeRoute>
//               <ProductivityHeatmap />
//             </EmployeeRoute>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/progress-report"
//         element={
//           <ProtectedRoute>
//             <EmployeeRoute>
//               <ProgressReport />
//             </EmployeeRoute>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/employee-calendar"
//         element={
//           <ProtectedRoute>
//             <EmployeeRoute>
//               <EmployeeCalendar />
//             </EmployeeRoute>
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/timeline"
//         element={
//           <ProtectedRoute>
//             <EmployeeRoute>
//               <Timeline />
//             </EmployeeRoute>
//           </ProtectedRoute>
//         }
//       />

//       {/* ─── CATCH-ALL ──────────────────────────────────────── */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
// import Login from "./pages/Login"; // ❌ REMOVED
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Profile from "./pages/Profile";
import TeamMembers from "./pages/TeamMembers";
import TaskManager from "./pages/TaskManager";
import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";
import MyTasks from "./pages/MyTasks";
import TaskBoard from "./pages/TaskBoard";
import TaskTimeline from "./pages/TaskTimeline";
import TaskInsights from "./pages/TaskInsights";
import ProductivityHeatmap from "./pages/ProductivityHeatmap";
import ProgressReport from "./pages/ProgressReport";
import EmployeeCalendar from "./pages/EmployeeCalendar";
import Timeline from "./pages/Timeline";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import DataManagement from "./pages/DataManagement";

// ─── Role‑based wrappers ──────────────────────────────────
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const EmployeeRoute = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== "Employee") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode && JSON.parse(savedDarkMode)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* ─── PUBLIC ROUTES ────────────────────────────────── */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/login" element={<Login />} /> */} {/* ❌ REMOVED */}
      <Route path="/register" element={<Register />} /> {/* ✅ Keep this */}

      {/* ─── PRIVATE ROUTES ────────────────────────────────── */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {user?.role === "Admin" ? <AdminDashboard /> : <EmployeeDashboard />}
          </ProtectedRoute>
        }
      />

      {/* Shared routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/data-management"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <DataManagement />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      {/* Admin-only routes */}
      <Route
        path="/team-members"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <TeamMembers />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/task-manager"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <TaskManager />
            </AdminRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <Reports />
            </AdminRoute>
          </ProtectedRoute>
        }
      />

      {/* Employee-only routes */}
      <Route
        path="/my-tasks"
        element={
          <ProtectedRoute>
            <EmployeeRoute>
              <MyTasks />
            </EmployeeRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/task-board"
        element={
          <ProtectedRoute>
            <EmployeeRoute>
              <TaskBoard />
            </EmployeeRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/task-timeline"
        element={
          <ProtectedRoute>
            <EmployeeRoute>
              <TaskTimeline />
            </EmployeeRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/task-insights"
        element={
          <ProtectedRoute>
            <EmployeeRoute>
              <TaskInsights />
            </EmployeeRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/productivity-heatmap"
        element={
          <ProtectedRoute>
            <EmployeeRoute>
              <ProductivityHeatmap />
            </EmployeeRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/progress-report"
        element={
          <ProtectedRoute>
            <EmployeeRoute>
              <ProgressReport />
            </EmployeeRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee-calendar"
        element={
          <ProtectedRoute>
            <EmployeeRoute>
              <EmployeeCalendar />
            </EmployeeRoute>
          </ProtectedRoute>
        }
      />
      <Route
        path="/timeline"
        element={
          <ProtectedRoute>
            <EmployeeRoute>
              <Timeline />
            </EmployeeRoute>
          </ProtectedRoute>
        }
      />

      {/* ─── CATCH-ALL ──────────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;