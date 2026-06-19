// // import React, { useState, useEffect } from "react";
// // import Layout from "../components/Layout/Layout";
// // import { useAuth } from "../hooks/useAuth";
// // import { api } from "../services/api";
// // import { useToast } from "../hooks/useToast";
// // import Toast from "../components/Common/Toast";

// // const SPECIALIZATIONS = [
// //   "Development",
// //   "Testing",
// //   "Database",
// //   "Deployment",
// //   "Design",
// //   "Documentation",
// // ];

// // const Profile = () => {
// //   const { user, setUser } = useAuth();
// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     email: "",
// //     department: "",
// //     jobRole: "",
// //     specialization: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const { toast, showToast } = useToast();

// //   useEffect(() => {
// //     if (user) {
// //       setFormData({
// //         fullName: user.fullName || "",
// //         email: user.email || "",
// //         department: user.department || "",
// //         jobRole: user.jobRole || "",
// //         specialization: user.specialization || "",
// //       });
// //     }
// //   }, [user]);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     try {
// //       const response = await api.put("/auth/profile", formData);
// //       if (response.data.success) {
// //         setUser(response.data.user);
// //         showToast("Profile updated successfully!", "success");
// //       }
// //     } catch (error) {
// //       const msg = error.response?.data?.message || "Update failed";
// //       showToast(msg, "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Layout>
// //       <div className="max-w-2xl mx-auto">
// //         <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
// //           Edit Profile
// //         </h1>
// //         <form onSubmit={handleSubmit} className="space-y-4 card p-6">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //               Full Name
// //             </label>
// //             <input
// //               type="text"
// //               name="fullName"
// //               value={formData.fullName}
// //               onChange={handleChange}
// //               className="input-field w-full"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //               Email
// //             </label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               className="input-field w-full"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //               Department
// //             </label>
// //             <input
// //               type="text"
// //               name="department"
// //               value={formData.department}
// //               onChange={handleChange}
// //               className="input-field w-full"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //               Job Role
// //             </label>
// //             <input
// //               type="text"
// //               name="jobRole"
// //               value={formData.jobRole}
// //               onChange={handleChange}
// //               className="input-field w-full"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
// //               Specialization
// //             </label>
// //             <select
// //               name="specialization"
// //               value={formData.specialization}
// //               onChange={handleChange}
// //               className="input-field w-full"
// //               required
// //             >
// //               {SPECIALIZATIONS.map((spec) => (
// //                 <option key={spec} value={spec}>
// //                   {spec}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="btn-primary w-full flex items-center justify-center"
// //           >
// //             {loading ? "Saving..." : "Save Changes"}
// //           </button>
// //         </form>
// //       </div>
// //       <Toast show={toast.show} message={toast.message} type={toast.type} />
// //     </Layout>
// //   );
// // };

// // export default Profile;

// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout/Layout";
// import { useAuth } from "../hooks/useAuth";
// import { api } from "../services/api";
// import { useToast } from "../hooks/useToast";
// import Toast from "../components/Common/Toast";
// import { Star, FileText, Users } from "lucide-react";

// const SPECIALIZATIONS = [
//   "Development",
//   "Testing",
//   "Database",
//   "Deployment",
//   "Design",
//   "Documentation",
// ];

// const Profile = () => {
//   const { user, setUser } = useAuth();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     department: "",
//     jobRole: "",
//     specialization: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const { toast, showToast } = useToast();

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         fullName: user.fullName || "",
//         email: user.email || "",
//         department: user.department || "",
//         jobRole: user.jobRole || "",
//         specialization: user.specialization || "",
//       });
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await api.put("/auth/profile", formData);
//       if (response.data.success) {
//         setUser(response.data.user);
//         showToast("Profile updated successfully!", "success");
//       }
//     } catch (error) {
//       const msg = error.response?.data?.message || "Update failed";
//       showToast(msg, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Extract dynamically generated username handle or fallback if empty
//   const handleName = formData.fullName 
//     ? `@${formData.fullName.toLowerCase().replace(/\s+/g, "_")}` 
//     : "@user";

//   return (
//     <Layout>
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
//           Account Profile Workspace
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
//           {/* ================= LEFT SIDE: DYNAMIC PROFILE VIEWER ================= */}
//           <div className="md:col-span-5 lg:col-span-4">
//             <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800">
              
//               {/* Profile Avatar Frame */}
//               <div className="flex justify-center mb-5">
//                 <div className="w-24 h-24 rounded-full bg-teal-50 dark:bg-zinc-800 flex items-center justify-center border border-teal-700/20 overflow-hidden shadow-inner">
//                   <svg viewBox="0 0 24 24" className="w-14 h-14 text-teal-900 dark:text-teal-400 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
//                   </svg>
//                 </div>
//               </div>

//               {/* Identity Details */}
//               <div className="text-center mb-6">
//                 <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
//                   {formData.fullName || "New User"}
//                 </h2>
//                 <p className="text-sm text-gray-400 dark:text-gray-500 font-medium truncate mt-0.5">
//                   {handleName}
//                 </p>
//               </div>

//               {/* Functional Attributes Row */}
//               <div className="grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-zinc-800 pt-5 text-center px-1">
//                 <div>
//                   <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900 dark:text-white truncate px-1">
//                     <Star className="w-4 h-4 text-gray-900 dark:text-white fill-current shrink-0" /> 
//                     <span className="truncate">{formData.specialization || "None"}</span>
//                   </div>
//                   <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 font-medium uppercase tracking-wider">Focus</p>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900 dark:text-white truncate px-1">
//                     <FileText className="w-4 h-4 text-gray-900 dark:text-white shrink-0" /> 
//                     <span className="truncate">{formData.jobRole || "None"}</span>
//                   </div>
//                   <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 font-medium uppercase tracking-wider">Role</p>
//                 </div>
//                 <div>
//                   <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900 dark:text-white truncate px-1">
//                     <Users className="w-4 h-4 text-gray-900 dark:text-white shrink-0" /> 
//                     <span className="truncate">{formData.department || "None"}</span>
//                   </div>
//                   <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 font-medium uppercase tracking-wider">Dept</p>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* ================= RIGHT SIDE: EDIT PROFILE FORM ================= */}
//           <div className="md:col-span-7 lg:col-span-8 bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800">
//             <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
//               Edit Live Attributes
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
//                     Department
//                   </label>
//                   <input
//                     type="text"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
//                     Job Role
//                   </label>
//                   <input
//                     type="text"
//                     name="jobRole"
//                     value={formData.jobRole}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
//                   Specialization
//                 </label>
//                 <select
//                   name="specialization"
//                   value={formData.specialization}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-transparent dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
//                   required
//                 >
//                   {SPECIALIZATIONS.map((spec) => (
//                     <option key={spec} value={spec} className="dark:bg-zinc-900">
//                       {spec}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl py-2.5 text-sm transition shadow-sm flex items-center justify-center disabled:opacity-50"
//               >
//                 {loading ? "Saving System Settings..." : "Save Changes"}
//               </button>
//             </form>
//           </div>

//         </div>
//       </div>
//       <Toast show={toast.show} message={toast.message} type={toast.type} />
//     </Layout>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { useToast } from "../hooks/useToast";
import Toast from "../components/Common/Toast";
import { Star, FileText, Users } from "lucide-react";

const SPECIALIZATIONS = [
  "Development",
  "Testing",
  "Database",
  "Deployment",
  "Design",
  "Documentation",
];

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    jobRole: "",
    specialization: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast, showToast } = useToast();

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        department: user.department || "",
        jobRole: user.jobRole || "",
        specialization: user.specialization || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put("/auth/profile", formData);
      if (response.data.success) {
        setUser(response.data.user);
        showToast("Profile updated successfully!", "success");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Update failed";
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleName = formData.fullName 
    ? `@${formData.fullName.toLowerCase().replace(/\s+/g, "_")}` 
    : "@user";

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
          Account Profile Workspace
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT SIDE: DYNAMIC PROFILE VIEWER ================= */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="bg-white dark:bg-[#11131c]/50 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800/60">
              
              {/* Profile Avatar Frame */}
              <div className="flex justify-center mb-5">
                <div className="w-24 h-24 rounded-full bg-teal-50/50 dark:bg-slate-800/40 flex items-center justify-center border border-teal-700/20 dark:border-teal-500/20 overflow-hidden shadow-inner">
                  <svg viewBox="0 0 24 24" className="w-14 h-14 text-teal-700 dark:text-teal-400 mt-1" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </div>

              {/* Identity Details */}
              <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 truncate">
                  {formData.fullName || "New User"}
                </h2>
                <p className="text-sm text-gray-400 dark:text-slate-400 font-medium truncate mt-0.5">
                  {handleName}
                </p>
              </div>

              {/* Functional Attributes Row */}
              <div className="grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-slate-800/80 pt-5 text-center px-1">
                <div>
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900 dark:text-slate-200 truncate px-1">
                    <Star className="w-4 h-4 text-gray-700 dark:text-teal-400 fill-current shrink-0" /> 
                    <span className="truncate">{formData.specialization || "None"}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5 font-medium uppercase tracking-wider">Focus</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900 dark:text-slate-200 truncate px-1">
                    <FileText className="w-4 h-4 text-gray-700 dark:text-teal-400 shrink-0" /> 
                    <span className="truncate">{formData.jobRole || "None"}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5 font-medium uppercase tracking-wider">Role</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900 dark:text-slate-200 truncate px-1">
                    <Users className="w-4 h-4 text-gray-700 dark:text-teal-400 shrink-0" /> 
                    <span className="truncate">{formData.department || "None"}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5 font-medium uppercase tracking-wider">Dept</p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE: EDIT PROFILE FORM ================= */}
          <div className="md:col-span-7 lg:col-span-8 bg-white dark:bg-[#11131c]/50 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800/60">
            <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-4">
              Edit Live Attributes
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-transparent dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-transparent dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-transparent dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1">
                    Job Role
                  </label>
                  <input
                    type="text"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-transparent dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 bg-transparent dark:text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  {SPECIALIZATIONS.map((spec) => (
                    <option key={spec} value={spec} className="bg-white dark:bg-[#11131c] text-gray-900 dark:text-slate-200">
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl py-2.5 text-sm transition shadow-sm flex items-center justify-center disabled:opacity-50"
              >
                {loading ? "Saving System Settings..." : "Save Changes"}
              </button>
            </form>
          </div>

        </div>
      </div>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </Layout>
  );
};

export default Profile;