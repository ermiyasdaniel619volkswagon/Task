
// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout";
// import { useNotifications } from "../context/NotificationContext";
// import { useToast } from "../hooks/useToast";
// import Toast from "../components/Common/Toast";
// import { Bell, CheckCircle, Clock, UserX, Flag, Loader2 } from "lucide-react";
// import { notificationService } from "../services/notificationService";

// const Notifications = () => {
//   const { unreadCount, markAsRead, markAllAsRead, fetchNotifications } = useNotifications();
//   const { toast, showToast } = useToast();
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, hasMore: false });

//   useEffect(() => {
//     loadNotifications();
//   }, []);

//   const loadNotifications = async (page = 1) => {
//     try {
//       const response = await notificationService.getMyNotifications(page, 10);
//       const newData = response.data || [];
//       setNotifications(prev => page === 1 ? newData : [...prev, ...newData]);
//       setPagination({
//         page: response.pagination?.page || 1,
//         limit: response.pagination?.limit || 10,
//         total: response.pagination?.total || 0,
//         hasMore: response.pagination?.hasMore || false,
//       });
//     } catch (error) {
//       console.error("Failed to load notifications:", error);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   const loadMore = async () => {
//     if (loadingMore || !pagination.hasMore) return;
//     setLoadingMore(true);
//     await loadNotifications(pagination.page + 1);
//   };

//   const handleMarkAsRead = async (id) => {
//     try {
//       await markAsRead(id);
//       showToast("Marked as read", "success");
//       // Update local state
//       setNotifications(prev =>
//         prev.map(n => n._id === id ? { ...n, read: true } : n)
//       );
//     } catch (error) {
//       showToast("Failed to mark as read", "error");
//     }
//   };

//   const handleMarkAllAsRead = async () => {
//     try {
//       await markAllAsRead();
//       showToast("All marked as read", "success");
//       setNotifications(prev =>
//         prev.map(n => ({ ...n, read: true }))
//       );
//     } catch (error) {
//       showToast("Failed to mark all as read", "error");
//     }
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case "task_assigned":
//         return <Flag className="w-5 h-5 text-blue-500" />;
//       case "task_completed":
//         return <CheckCircle className="w-5 h-5 text-emerald-500" />;
//       case "progress_updated":
//         return <Clock className="w-5 h-5 text-indigo-500" />;
//       case "account_deactivated":
//         return <UserX className="w-5 h-5 text-red-500" />;
//       default:
//         return <Bell className="w-5 h-5 text-gray-500" />;
//     }
//   };

//   const formatTime = (date) => {
//     const now = new Date();
//     const diff = now - new Date(date);
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(diff / 3600000);
//     const days = Math.floor(diff / 86400000);

//     if (minutes < 1) return "Just now";
//     if (minutes < 60) return `${minutes}m ago`;
//     if (hours < 24) return `${hours}h ago`;
//     return `${days}d ago`;
//   };

//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex items-center justify-center h-96">
//           <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800 dark:text-white">🔔 Notifications</h1>
//             <p className="text-gray-600 dark:text-gray-400 text-sm -mt-1">
//               {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
//             </p>
//           </div>
//           {unreadCount > 0 && (
//             <button
//               onClick={handleMarkAllAsRead}
//               className="flex items-center gap-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-400 rounded-lg transition-colors"
//             >
//               <CheckCircle className="w-4 h-4" />
//               Mark all read
//             </button>
//           )}
//         </div>

//         {notifications.length === 0 ? (
//           <div className="card p-12 text-center text-gray-500 dark:text-gray-400">
//             <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
//             <p className="text-lg font-medium">No notifications</p>
//             <p className="text-sm">You'll see notifications here when something happens.</p>
//           </div>
//         ) : (
//           <>
//             <div className="space-y-3">
//               {notifications.map((n) => (
//                 <div
//                   key={n._id}
//                   className={`card p-4 bg-white dark:bg-gray-800 border ${
//                     n.read
//                       ? "border-gray-200 dark:border-gray-700"
//                       : "border-indigo-200 dark:border-indigo-800 shadow-md"
//                   }`}
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="flex-shrink-0 mt-1">{getIcon(n.type)}</div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2">
//                         <p className="font-semibold text-gray-800 dark:text-white">
//                           {n.title}
//                         </p>
//                         {!n.read && (
//                           <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 px-2 py-0.5 rounded-full">
//                             New
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
//                         {n.message}
//                       </p>
//                       <div className="flex items-center gap-4 mt-2">
//                         <span className="text-xs text-gray-400 dark:text-gray-500">
//                           {formatTime(n.createdAt)}
//                         </span>
//                         {n.sender && (
//                           <span className="text-xs text-gray-400 dark:text-gray-500">
//                             From: {n.sender.fullName}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                     {!n.read && (
//                       <button
//                         onClick={() => handleMarkAsRead(n._id)}
//                         className="flex-shrink-0 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
//                       >
//                         Mark read
//                       </button>
//                     )}
//                     {n.read && (
//                       <span className="flex-shrink-0 text-xs text-gray-400 dark:text-gray-500">
//                         ✓ Read
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Load More */}
//             {pagination.hasMore && (
//               <button
//                 onClick={loadMore}
//                 disabled={loadingMore}
//                 className="w-full py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2"
//               >
//                 {loadingMore ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Loading...
//                   </>
//                 ) : (
//                   `Load More (${pagination.total - notifications.length} remaining)`
//                 )}
//               </button>
//             )}
//           </>
//         )}
//       </div>
//       <Toast show={toast.show} message={toast.message} type={toast.type} />
//     </Layout>
//   );
// };

// export default Notifications;
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNotifications } from "../context/NotificationContext";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import { Bell, CheckCircle, Clock, UserX, Flag, Loader2 } from "lucide-react";
import { notificationService } from "../services/notificationService";

const Notifications = () => {
  const { unreadCount, markAsRead, markAllAsRead, fetchNotifications } = useNotifications();
  const { toast, showToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, hasMore: false });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async (page = 1) => {
    try {
      const response = await notificationService.getMyNotifications(page, 10);
      const newData = response.data || [];
      setNotifications(prev => page === 1 ? newData : [...prev, ...newData]);
      setPagination({
        page: response.pagination?.page || 1,
        limit: response.pagination?.limit || 10,
        total: response.pagination?.total || 0,
        hasMore: response.pagination?.hasMore || false,
      });
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore || !pagination.hasMore) return;
    setLoadingMore(true);
    await loadNotifications(pagination.page + 1);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
      showToast("Marked as read", "success");
      setNotifications(prev =>
        prev.map(n => n._id === id ? { ...n, read: true } : n)
      );
    } catch (error) {
      showToast("Failed to mark as read", "error");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      showToast("All marked as read", "success");
      setNotifications(prev =>
        prev.map(n => ({ ...n, read: true }))
      );
    } catch (error) {
      showToast("Failed to mark all as read", "error");
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "task_assigned":
        return <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />;
      case "task_completed":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />;
      case "progress_updated":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 flex-shrink-0" />;
      case "account_deactivated":
        return <UserX className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />;
      default:
        return <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />;
    }
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full px-2 sm:px-4 md:px-6">
        <div className="max-w-full space-y-4 sm:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Notifications</span>
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/30 text-indigo-700 dark:text-indigo-400 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Notification List */}
          {notifications.length === 0 ? (
            <div className="card p-8 sm:p-12 text-center text-gray-500 dark:text-gray-400">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-base sm:text-lg font-medium">No notifications</p>
              <p className="text-xs sm:text-sm">You'll see notifications here when something happens.</p>
            </div>
          ) : (
            <>
              <div className="space-y-2 sm:space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n._id}
                    className={`card p-3 sm:p-4 bg-white dark:bg-gray-800 border ${
                      n.read
                        ? "border-gray-200 dark:border-gray-700"
                        : "border-indigo-200 dark:border-indigo-800 shadow-md"
                    } hover:shadow-md transition-shadow w-full`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 md:gap-4 w-full">
                      {/* Top row: Icon + Content on mobile */}
                      <div className="flex items-start gap-2 sm:gap-3 w-full min-w-0">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-0.5">
                          {getIcon(n.type)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                            <p className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white break-words">
                              {n.title}
                            </p>
                            {!n.read && (
                              <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 px-2 py-0.5 rounded-full flex-shrink-0">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 break-words">
                            {n.message}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                            <span className="text-xs text-gray-400 dark:text-gray-500 flex-shrink-0">
                              {formatTime(n.createdAt)}
                            </span>
                            {n.sender && (
                              <span className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[120px] sm:max-w-[200px]">
                                From: {n.sender.fullName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Button - moves below on mobile */}
                      <div className="flex-shrink-0 sm:ml-2 mt-2 sm:mt-0">
                        {!n.read ? (
                          <button
                            onClick={() => handleMarkAsRead(n._id)}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline whitespace-nowrap w-full sm:w-auto text-center"
                          >
                            Mark read
                          </button>
                        ) : (
                          <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                            ✓ Read
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {pagination.hasMore && (
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="w-full py-2.5 sm:py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Load More ({pagination.total - notifications.length} remaining)</span>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default Notifications;