
// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   // ❌ If no user, redirect to login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // ✅ If user exists, render the children
//   return children;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  // ✅ If no user, redirect to Home page (not login)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ If user exists, render the children
  return children;
};

export default ProtectedRoute;