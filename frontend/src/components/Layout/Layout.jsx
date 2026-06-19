
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   Menu,
// //   Search,
// //   Sun,
// //   Moon,
// //   LogOut,
// //   User,
// //   ChevronDown,
// // } from "lucide-react";
// // import Sidebar from "./Sidebar";
// // import NotificationDropdown from "../Common/NotificationDropdown";
// // import { useAuth } from "../../hooks/useAuth";

// // const Layout = ({ children }) => {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [dropdownOpen, setDropdownOpen] = useState(false);
// //   const [darkMode, setDarkMode] = useState(() => {
// //     const saved = localStorage.getItem("darkMode");
// //     return saved ? JSON.parse(saved) : false;
// //   });
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   // Persist dark mode
// //   useEffect(() => {
// //     localStorage.setItem("darkMode", JSON.stringify(darkMode));
// //     if (darkMode) {
// //       document.documentElement.classList.add("dark");
// //     } else {
// //       document.documentElement.classList.remove("dark");
// //     }
// //   }, [darkMode]);

// //   const handleLogout = async () => {
// //     await logout();
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-950">
// //       {/* Sidebar – passes user role for role‑based menu */}
// //       <Sidebar
// //         isOpen={sidebarOpen}
// //         setIsOpen={setSidebarOpen}
// //         role={user?.role}
// //         darkMode={darkMode}
// //         setDarkMode={setDarkMode}
// //       />

// //       {/* Main content */}
// //       <div className="flex-1 flex flex-col overflow-hidden">
// //         <header className="flex-shrink-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
// //           <div className="flex items-center justify-between px-6 py-3">
// //             <div className="flex items-center gap-4">
// //               <button
// //                 onClick={() => setSidebarOpen(true)}
// //                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
// //               >
// //                 <Menu size={20} className="text-gray-600 dark:text-gray-400" />
// //               </button>

// //               <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-1.5">
// //                 <Search
// //                   size={18}
// //                   className="text-gray-400 dark:text-gray-500"
// //                 />
// //                 <input
// //                   type="text"
// //                   placeholder="Search tasks, employees..."
// //                   className="bg-transparent border-none focus:outline-none text-sm px-2 w-64 text-gray-700 dark:text-gray-300 placeholder:text-gray-400"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-3">
// //               {/* ✅ Replace static Bell with NotificationDropdown */}
// //               <NotificationDropdown />

// //               <button
// //                 onClick={() => setDarkMode(!darkMode)}
// //                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
// //               >
// //                 {darkMode ? (
// //                   <Sun size={20} className="text-yellow-500" />
// //                 ) : (
// //                   <Moon size={20} className="text-gray-600" />
// //                 )}
// //               </button>

// //               <div className="relative">
// //                 <button
// //                   onClick={() => setDropdownOpen(!dropdownOpen)}
// //                   className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
// //                 >
// //                   <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
// //                     <span className="text-white font-semibold text-sm">
// //                       {(user?.fullName || "U").charAt(0).toUpperCase()}
// //                     </span>
// //                   </div>
// //                   <ChevronDown
// //                     size={16}
// //                     className={`text-gray-500 transition-transform duration-200 ${
// //                       dropdownOpen ? "rotate-180" : ""
// //                     }`}
// //                   />
// //                 </button>

// //                 {dropdownOpen && (
// //                   <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
// //                     <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
// //                       <p className="text-sm font-semibold text-gray-800 dark:text-white">
// //                         {user?.fullName || "User"}
// //                       </p>
// //                       <p className="text-xs text-gray-500 dark:text-gray-400">
// //                         {user?.email}
// //                       </p>
// //                       <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
// //                         {user?.role}
// //                       </p>
// //                     </div>

// //                     <button
// //                       onClick={() => {
// //                         setDropdownOpen(false);
// //                         navigate("/profile");
// //                       }}
// //                       className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
// //                     >
// //                       <User size={16} />
// //                       Profile
// //                     </button>

// //                     <button
// //                       onClick={handleLogout}
// //                       className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
// //                     >
// //                       <LogOut size={16} />
// //                       Logout
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Layout;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Menu,
//   Search,
//   Sun,
//   Moon,
//   LogOut,
//   User,
//   ChevronDown,
// } from "lucide-react";
// import Sidebar from "./Sidebar";
// import NotificationDropdown from "../Common/NotificationDropdown";
// import { useAuth } from "../../hooks/useAuth";

// const Layout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(() => {
//     const saved = localStorage.getItem("darkMode");
//     return saved ? JSON.parse(saved) : false;
//   });
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   // Persist dark mode
//   useEffect(() => {
//     localStorage.setItem("darkMode", JSON.stringify(darkMode));
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   const handleLogout = async () => {
//     await logout();
//     // 👇 CHANGE: Navigate to home page instead of login
//     navigate("/", { replace: true });
//   };

//   return (
//     <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-950">
//       {/* Sidebar – passes user role for role‑based menu */}
//       <Sidebar
//         isOpen={sidebarOpen}
//         setIsOpen={setSidebarOpen}
//         role={user?.role}
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//       />

//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="flex-shrink-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
//           <div className="flex items-center justify-between px-6 py-3">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               >
//                 <Menu size={20} className="text-gray-600 dark:text-gray-400" />
//               </button>

//               <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-1.5">
//                 <Search
//                   size={18}
//                   className="text-gray-400 dark:text-gray-500"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search tasks, employees..."
//                   className="bg-transparent border-none focus:outline-none text-sm px-2 w-64 text-gray-700 dark:text-gray-300 placeholder:text-gray-400"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* ✅ Replace static Bell with NotificationDropdown */}
//               <NotificationDropdown />

//               <button
//                 onClick={() => setDarkMode(!darkMode)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//               >
//                 {darkMode ? (
//                   <Sun size={20} className="text-yellow-500" />
//                 ) : (
//                   <Moon size={20} className="text-gray-600" />
//                 )}
//               </button>

//               <div className="relative">
//                 <button
//                   onClick={() => setDropdownOpen(!dropdownOpen)}
//                   className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 >
//                   <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
//                     <span className="text-white font-semibold text-sm">
//                       {(user?.fullName || "U").charAt(0).toUpperCase()}
//                     </span>
//                   </div>
//                   <ChevronDown
//                     size={16}
//                     className={`text-gray-500 transition-transform duration-200 ${
//                       dropdownOpen ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {dropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
//                     <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
//                       <p className="text-sm font-semibold text-gray-800 dark:text-white">
//                         {user?.fullName || "User"}
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400">
//                         {user?.email}
//                       </p>
//                       <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
//                         {user?.role}
//                       </p>
//                     </div>

//                     <button
//                       onClick={() => {
//                         setDropdownOpen(false);
//                         navigate("/profile");
//                       }}
//                       className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       <User size={16} />
//                       Profile
//                     </button>

//                     <button
//                       onClick={handleLogout}
//                       className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                     >
//                       <LogOut size={16} />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Sun,
  Moon,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import Sidebar from "./Sidebar";
import NotificationDropdown from "../Common/NotificationDropdown";
import { useAuth } from "../../hooks/useAuth";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    await logout();
    // ✅ Navigate to Home page instead of login
    navigate("/", { replace: true });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Sidebar – passes user role for role‑based menu */}
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        role={user?.role}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex-shrink-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu size={20} className="text-gray-600 dark:text-gray-400" />
              </button>

              <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-1.5">
                <Search
                  size={18}
                  className="text-gray-400 dark:text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Search tasks, employees..."
                  className="bg-transparent border-none focus:outline-none text-sm px-2 w-64 text-gray-700 dark:text-gray-300 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* NotificationDropdown */}
              <NotificationDropdown />

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {darkMode ? (
                  <Sun size={20} className="text-yellow-500" />
                ) : (
                  <Moon size={20} className="text-gray-600" />
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">
                      {(user?.fullName || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {user?.fullName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                        {user?.role}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <User size={16} />
                      Profile
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;