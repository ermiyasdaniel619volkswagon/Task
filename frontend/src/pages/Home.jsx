// // // import React from "react";
// // // import { Link } from "react-router-dom";
// // // import {
// // //   ArrowRight,
// // //   LayoutDashboard,
// // //   ClipboardList,
// // //   BarChart3,
// // //   Users,
// // //   CheckCircle,
// // //   Clock,
// // //   TrendingUp,
// // //   Zap,
// // //   Shield,
// // // } from "lucide-react";
// // // import PublicNavbar from "../components/PublicNavbar";

// // // const Home = () => {
// // //   return (
// // //     <div className="min-h-screen bg-white dark:bg-[#0b0f19]">
// // //       <PublicNavbar />

// // //       {/* ─── Hero Section ──────────────────────────────────── */}
// // //       <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
// // //         <div className="absolute inset-0 opacity-20">
// // //           <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
// // //           <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
// // //           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500 rounded-full blur-3xl" />
// // //         </div>
// // //         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// // //             <div>
// // //               <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium mb-6">
// // //                 <LayoutDashboard className="w-4 h-4" />
// // //                 TaskFlow Platform
// // //               </span>
// // //               <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
// // //                 Smart Task Management <br />
// // //                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
// // //                   For Modern Teams
// // //                 </span>
// // //               </h1>
// // //               <p className="text-xl text-indigo-200 max-w-lg mb-8">
// // //                 Track progress, manage tasks, and boost productivity with our
// // //                 intelligent task management platform.
// // //               </p>
// // //               <div className="flex flex-wrap gap-4">
// // //                 <Link
// // //                   to="/register"
// // //                   className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
// // //                 >
// // //                   Register
// // //                   <ArrowRight className="w-5 h-5" />
// // //                 </Link>
// // //                 <Link
// // //                   to="/about"
// // //                   className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
// // //                 >
// // //                   Learn More
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-white text-center">
// // //                 <ClipboardList className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
// // //                 <h3 className="text-2xl font-bold">Track</h3>
// // //                 <p className="text-sm text-indigo-200">Monitor task progress</p>
// // //               </div>
// // //               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-white text-center">
// // //                 <CheckCircle className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
// // //                 <h3 className="text-2xl font-bold">Complete</h3>
// // //                 <p className="text-sm text-indigo-200">Finish tasks on time</p>
// // //               </div>
// // //               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-white text-center">
// // //                 <BarChart3 className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
// // //                 <h3 className="text-2xl font-bold">Analyze</h3>
// // //                 <p className="text-sm text-indigo-200">Measure performance</p>
// // //               </div>
// // //               <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-white text-center">
// // //                 <Users className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
// // //                 <h3 className="text-2xl font-bold">Collaborate</h3>
// // //                 <p className="text-sm text-indigo-200">Work as a team</p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ─── Features Section ──────────────────────────────── */}
// // //       <section className="py-20 px-4 bg-gray-50 dark:bg-[#0b0f19]">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="text-center mb-16">
// // //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
// // //               Everything You Need to Stay Productive
// // //             </h2>
// // //             <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
// // //               Powerful features designed to help your team collaborate, track progress, and achieve goals.
// // //             </p>
// // //           </div>
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // //             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
// // //               <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl w-fit mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
// // //                 <LayoutDashboard className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
// // //               </div>
// // //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// // //                 Intuitive Dashboard
// // //               </h3>
// // //               <p className="text-gray-600 dark:text-gray-400">
// // //                 Get a bird's-eye view of all your tasks, deadlines, and team performance at a glance.
// // //               </p>
// // //             </div>
// // //             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
// // //               <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl w-fit mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
// // //                 <ClipboardList className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
// // //               </div>
// // //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// // //                 Task Management
// // //               </h3>
// // //               <p className="text-gray-600 dark:text-gray-400">
// // //                 Create, assign, and track tasks with ease. Set priorities, deadlines, and monitor progress.
// // //               </p>
// // //             </div>
// // //             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
// // //               <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl w-fit mb-4 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
// // //                 <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
// // //               </div>
// // //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// // //                 Analytics & Reports
// // //               </h3>
// // //               <p className="text-gray-600 dark:text-gray-400">
// // //                 Make data-driven decisions with detailed reports on team performance and task completion.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ─── How It Works ──────────────────────────────────── */}
// // //       <section className="py-20 px-4 bg-white dark:bg-gray-900">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="text-center mb-16">
// // //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
// // //               How TaskFlow Works
// // //             </h2>
// // //             <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
// // //               A simple three-step process to manage your tasks efficiently.
// // //             </p>
// // //           </div>
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// // //             <div className="text-center">
// // //               <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
// // //                 1
// // //               </div>
// // //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// // //                 Create & Assign
// // //               </h3>
// // //               <p className="text-gray-600 dark:text-gray-400">
// // //                 Admins create tasks, set deadlines, and assign them to team members.
// // //               </p>
// // //             </div>
// // //             <div className="text-center">
// // //               <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
// // //                 2
// // //               </div>
// // //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// // //                 Track & Update
// // //               </h3>
// // //               <p className="text-gray-600 dark:text-gray-400">
// // //                 Employees work on tasks, update progress, and send updates to admins.
// // //               </p>
// // //             </div>
// // //             <div className="text-center">
// // //               <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
// // //                 3
// // //               </div>
// // //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// // //                 Monitor & Complete
// // //               </h3>
// // //               <p className="text-gray-600 dark:text-gray-400">
// // //                 Admins track progress, review completed tasks, and generate reports.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ─── Key Features ──────────────────────────────────── */}
// // //       <section className="py-20 px-4 bg-gray-50 dark:bg-[#0b0f19]">
// // //         <div className="max-w-7xl mx-auto">
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
// // //             <div>
// // //               <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
// // //                 Key Features
// // //               </span>
// // //               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
// // //                 Built for Modern Teams
// // //               </h2>
// // //               <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
// // //                 TaskFlow combines powerful features with an intuitive interface to
// // //                 help your team work smarter, not harder.
// // //               </p>
// // //               <div className="space-y-4">
// // //                 <div className="flex items-start gap-3">
// // //                   <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
// // //                   <div>
// // //                     <h4 className="font-semibold text-gray-800 dark:text-white">
// // //                       Role-Based Access
// // //                     </h4>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// // //                       Secure access for admins, employees, and managers.
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-start gap-3">
// // //                   <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
// // //                   <div>
// // //                     <h4 className="font-semibold text-gray-800 dark:text-white">
// // //                       Real-Time Updates
// // //                     </h4>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// // //                       See progress updates instantly as your team works.
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-start gap-3">
// // //                   <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
// // //                   <div>
// // //                     <h4 className="font-semibold text-gray-800 dark:text-white">
// // //                       Deadline Management
// // //                     </h4>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// // //                       Never miss a deadline with automatic reminders and alerts.
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <Link
// // //                 to="/about"
// // //                 className="inline-flex items-center gap-2 mt-6 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
// // //               >
// // //                 Learn More About TaskFlow
// // //                 <ArrowRight className="w-4 h-4" />
// // //               </Link>
// // //             </div>
// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
// // //                 <LayoutDashboard className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-3" />
// // //                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
// // //                   Smart Dashboard
// // //                 </p>
// // //               </div>
// // //               <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
// // //                 <TrendingUp className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-3" />
// // //                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
// // //                   Progress Tracking
// // //                 </p>
// // //               </div>
// // //               <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
// // //                 <Users className="w-12 h-12 text-amber-600 dark:text-amber-400 mb-3" />
// // //                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
// // //                   Team Collaboration
// // //                 </p>
// // //               </div>
// // //               <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
// // //                 <CheckCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-3" />
// // //                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
// // //                   Task Completion
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* ─── CTA Section ──────────────────────────────────── */}
// // //       <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
// // //         <div className="max-w-4xl mx-auto text-center text-white">
// // //           <h2 className="text-3xl md:text-4xl font-bold mb-4">
// // //             Ready to Get Started?
// // //           </h2>
// // //           <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
// // //             Join teams already using TaskFlow to manage their tasks efficiently.
// // //           </p>
// // //           <div className="flex flex-wrap justify-center gap-4">
// // //             <Link
// // //               to="/register"
// // //               className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
// // //             >
// // //               Register
// // //               <ArrowRight className="w-5 h-5" />
// // //             </Link>
// // //             <Link
// // //               to="/about"
// // //               className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
// // //             >
// // //               Learn More
// // //             </Link>
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // };

// // // export default Home;
// // import React from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   ArrowRight,
// //   LayoutDashboard,
// //   ClipboardList,
// //   BarChart3,
// //   Users,
// //   CheckCircle,
// //   Clock,
// //   TrendingUp,
// //   Zap,
// //   Shield,
// //   LogIn,
// // } from "lucide-react";
// // import PublicNavbar from "../components/PublicNavbar";

// // const Home = () => {
// //   return (
// //     <div className="min-h-screen bg-white dark:bg-[#0b0f19]">
// //       <PublicNavbar />

// //       {/* ─── Hero Section ──────────────────────────────────── */}
// //       <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
// //         <div className="absolute inset-0 opacity-20">
// //           <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
// //           <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
// //           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500 rounded-full blur-3xl" />
// //         </div>
// //         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// //             <div>
// //               <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium mb-6">
// //                 <LayoutDashboard className="w-4 h-4" />
// //                 TaskFlow Platform
// //               </span>
// //               <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
// //                 Smart Task Management <br />
// //                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
// //                   For Modern Teams
// //                 </span>
// //               </h1>
// //               <p className="text-xl text-indigo-200 max-w-lg mb-8">
// //                 Track progress, manage tasks, and boost productivity with our
// //                 intelligent task management platform.
// //               </p>
// //               <div className="flex flex-wrap gap-4">
// //                 <Link
// //                   to="/register"
// //                   className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
// //                 >
// //                   Get Started
// //                   <ArrowRight className="w-5 h-5" />
// //                 </Link>
// //                 <Link
// //                   to="/about"
// //                   className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
// //                 >
// //                   Learn More
// //                 </Link>
// //               </div>
// //             </div>
            
// //             {/* ─── Login Card ──────────────────────────────────── */}
// //             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-white">
// //               <div className="flex items-center gap-3 mb-6">
// //                 <div className="p-2 bg-yellow-400/20 rounded-xl">
// //                   <LogIn className="w-6 h-6 text-yellow-400" />
// //                 </div>
// //                 <h3 className="text-2xl font-bold">Welcome Back!</h3>
// //               </div>
// //               <p className="text-indigo-200 mb-6">
// //                 Already have an account? Sign in to access your dashboard and manage your tasks.
// //               </p>
// //               <Link
// //                 to="/login"
// //                 className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
// //               >
// //                 <LogIn className="w-5 h-5" />
// //                 Login to Your Account
// //               </Link>
// //               <div className="mt-4 text-center">
// //                 <span className="text-sm text-indigo-200">
// //                   Don't have an account?{" "}
// //                   <Link to="/register" className="text-yellow-400 hover:underline font-medium">
// //                     Register here
// //                   </Link>
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ─── Features Section ──────────────────────────────── */}
// //       <section className="py-20 px-4 bg-gray-50 dark:bg-[#0b0f19]">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
// //               Everything You Need to Stay Productive
// //             </h2>
// //             <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
// //               Powerful features designed to help your team collaborate, track progress, and achieve goals.
// //             </p>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
// //               <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl w-fit mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
// //                 <LayoutDashboard className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// //                 Intuitive Dashboard
// //               </h3>
// //               <p className="text-gray-600 dark:text-gray-400">
// //                 Get a bird's-eye view of all your tasks, deadlines, and team performance at a glance.
// //               </p>
// //             </div>
// //             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
// //               <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl w-fit mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
// //                 <ClipboardList className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// //                 Task Management
// //               </h3>
// //               <p className="text-gray-600 dark:text-gray-400">
// //                 Create, assign, and track tasks with ease. Set priorities, deadlines, and monitor progress.
// //               </p>
// //             </div>
// //             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
// //               <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl w-fit mb-4 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
// //                 <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// //                 Analytics & Reports
// //               </h3>
// //               <p className="text-gray-600 dark:text-gray-400">
// //                 Make data-driven decisions with detailed reports on team performance and task completion.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ─── How It Works ──────────────────────────────────── */}
// //       <section className="py-20 px-4 bg-white dark:bg-gray-900">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="text-center mb-16">
// //             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
// //               How TaskFlow Works
// //             </h2>
// //             <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
// //               A simple three-step process to manage your tasks efficiently.
// //             </p>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             <div className="text-center">
// //               <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
// //                 1
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// //                 Create & Assign
// //               </h3>
// //               <p className="text-gray-600 dark:text-gray-400">
// //                 Admins create tasks, set deadlines, and assign them to team members.
// //               </p>
// //             </div>
// //             <div className="text-center">
// //               <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
// //                 2
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// //                 Track & Update
// //               </h3>
// //               <p className="text-gray-600 dark:text-gray-400">
// //                 Employees work on tasks, update progress, and send updates to admins.
// //               </p>
// //             </div>
// //             <div className="text-center">
// //               <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
// //                 3
// //               </div>
// //               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
// //                 Monitor & Complete
// //               </h3>
// //               <p className="text-gray-600 dark:text-gray-400">
// //                 Admins track progress, review completed tasks, and generate reports.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ─── Key Features ──────────────────────────────────── */}
// //       <section className="py-20 px-4 bg-gray-50 dark:bg-[#0b0f19]">
// //         <div className="max-w-7xl mx-auto">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
// //             <div>
// //               <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
// //                 Key Features
// //               </span>
// //               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
// //                 Built for Modern Teams
// //               </h2>
// //               <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
// //                 TaskFlow combines powerful features with an intuitive interface to
// //                 help your team work smarter, not harder.
// //               </p>
// //               <div className="space-y-4">
// //                 <div className="flex items-start gap-3">
// //                   <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
// //                   <div>
// //                     <h4 className="font-semibold text-gray-800 dark:text-white">
// //                       Role-Based Access
// //                     </h4>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// //                       Secure access for admins, employees, and managers.
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
// //                   <div>
// //                     <h4 className="font-semibold text-gray-800 dark:text-white">
// //                       Real-Time Updates
// //                     </h4>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// //                       See progress updates instantly as your team works.
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
// //                   <div>
// //                     <h4 className="font-semibold text-gray-800 dark:text-white">
// //                       Deadline Management
// //                     </h4>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">
// //                       Never miss a deadline with automatic reminders and alerts.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //               <Link
// //                 to="/about"
// //                 className="inline-flex items-center gap-2 mt-6 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
// //               >
// //                 Learn More About TaskFlow
// //                 <ArrowRight className="w-4 h-4" />
// //               </Link>
// //             </div>
// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
// //                 <LayoutDashboard className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-3" />
// //                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
// //                   Smart Dashboard
// //                 </p>
// //               </div>
// //               <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
// //                 <TrendingUp className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-3" />
// //                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
// //                   Progress Tracking
// //                 </p>
// //               </div>
// //               <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
// //                 <Users className="w-12 h-12 text-amber-600 dark:text-amber-400 mb-3" />
// //                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
// //                   Team Collaboration
// //                 </p>
// //               </div>
// //               <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
// //                 <CheckCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-3" />
// //                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
// //                   Task Completion
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ─── CTA Section ──────────────────────────────────── */}
// //       <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
// //         <div className="max-w-4xl mx-auto text-center text-white">
// //           <h2 className="text-3xl md:text-4xl font-bold mb-4">
// //             Ready to Get Started?
// //           </h2>
// //           <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
// //             Join teams already using TaskFlow to manage their tasks efficiently.
// //           </p>
// //           <div className="flex flex-wrap justify-center gap-4">
// //             <Link
// //               to="/register"
// //               className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
// //             >
// //               Create Account
// //               <ArrowRight className="w-5 h-5" />
// //             </Link>
// //             <Link
// //               to="/login"
// //               className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
// //             >
// //               <LogIn className="w-5 h-5" />
// //               Sign In
// //             </Link>
// //           </div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ArrowRight,
//   LayoutDashboard,
//   ClipboardList,
//   BarChart3,
//   Users,
//   CheckCircle,
//   Clock,
//   TrendingUp,
//   Zap,
//   Shield,
//   LogIn,
//   User,
// } from "lucide-react";
// import PublicNavbar from "../components/PublicNavbar";
// import LoginForm from "../components/Auth/LoginForm";
// import { useAuth } from "../hooks/useAuth";
// import { api } from "../services/api";

// const SPECIALIZATIONS = [
//   "Development",
//   "Testing",
//   "Database",
//   "Deployment",
//   "Design",
//   "Documentation",
// ];

// const Home = () => {
//   const { login } = useAuth();
//   const navigate = useNavigate();
  
//   // Login state
//   const [loginError, setLoginError] = useState(null);
//   const [isLoginLoading, setIsLoginLoading] = useState(false);

//   // Register state
//   const [showRegister, setShowRegister] = useState(false);
//   const [registerData, setRegisterData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     department: "",
//     jobRole: "",
//     specialization: "Development",
//   });
//   const [registerError, setRegisterError] = useState(null);
//   const [registerSuccess, setRegisterSuccess] = useState(false);
//   const [isRegisterLoading, setIsRegisterLoading] = useState(false);

//   // Handle login using the LoginForm component's onSubmit
//   const handleLogin = async (email, password) => {
//     setIsLoginLoading(true);
//     setLoginError(null);
//     try {
//       await login(email, password);
//       navigate("/dashboard");
//     } catch (err) {
//       const message =
//         err.response?.data?.message ||
//         err.message ||
//         "Login failed. Please check your credentials.";
//       setLoginError(message);
//     } finally {
//       setIsLoginLoading(false);
//     }
//   };

//   const handleRegisterChange = (e) => {
//     setRegisterData({ ...registerData, [e.target.name]: e.target.value });
//     setRegisterError(null);
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setIsRegisterLoading(true);
//     setRegisterError(null);
//     setRegisterSuccess(false);
//     try {
//       const response = await api.post("/auth/register", registerData);
//       if (response.data.success) {
//         setRegisterSuccess(true);
//         setRegisterData({
//           fullName: "",
//           email: "",
//           password: "",
//           department: "",
//           jobRole: "",
//           specialization: "Development",
//         });
//         // Switch back to login after 2 seconds
//         setTimeout(() => {
//           setShowRegister(false);
//           setRegisterSuccess(false);
//         }, 2000);
//       }
//     } catch (err) {
//       const message =
//         err.response?.data?.message || "Registration failed. Please try again.";
//       setRegisterError(message);
//     } finally {
//       setIsRegisterLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white dark:bg-[#0b0f19]">
//       <PublicNavbar />

//       {/* ─── Hero Section ──────────────────────────────────── */}
//       <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
//           <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500 rounded-full blur-3xl" />
//         </div>
//         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             {/* Left - Content */}
//             <div>
//               <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium mb-6">
//                 <LayoutDashboard className="w-4 h-4" />
//                 TaskFlow Platform
//               </span>
//               <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
//                 Smart Task Management <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
//                   For Modern Teams
//                 </span>
//               </h1>
//               <p className="text-xl text-indigo-200 max-w-lg mb-8">
//                 Track progress, manage tasks, and boost productivity with our
//                 intelligent task management platform.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <button
//                   onClick={() => setShowRegister(!showRegister)}
//                   className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
//                 >
//                   {showRegister ? "Switch to Login" : "Get Started"}
//                   <ArrowRight className="w-5 h-5" />
//                 </button>
//                 <Link
//                   to="/about"
//                   className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
//                 >
//                   Learn More
//                 </Link>
//               </div>
//             </div>

//             {/* Right - Auth Card */}
//             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
//               {!showRegister ? (
//                 // ─── LOGIN FORM (using LoginForm component) ──
//                 <>
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="p-2 bg-yellow-400/20 rounded-xl">
//                       <LogIn className="w-6 h-6 text-yellow-400" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-white">Welcome Back!</h3>
//                   </div>
                  
//                   <LoginForm 
//                     onSubmit={handleLogin}
//                     isLoading={isLoginLoading}
//                     error={loginError}
//                   />

//                   <div className="mt-4 text-center">
//                     <span className="text-sm text-indigo-200">
//                       Don't have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setShowRegister(true);
//                           setLoginError(null);
//                         }}
//                         className="text-yellow-400 hover:underline font-medium"
//                       >
//                         Register here
//                       </button>
//                     </span>
//                   </div>

//                   <p className="text-xs text-center text-indigo-300/60 mt-3">
//                     Demo: admin@admin.com / 123456
//                   </p>
//                 </>
//               ) : (
//                 // ─── REGISTER FORM ────────────────────────────
//                 <>
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="p-2 bg-yellow-400/20 rounded-xl">
//                       <User className="w-6 h-6 text-yellow-400" />
//                     </div>
//                     <h3 className="text-2xl font-bold text-white">Create Account</h3>
//                   </div>

//                   {registerSuccess && (
//                     <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl text-sm mb-4">
//                       ✅ Registration successful! Please log in.
//                       <br />
//                       Your account will be deactivated after 4 days of inactivity.
//                     </div>
//                   )}

//                   {registerError && (
//                     <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm mb-4">
//                       ⚠️ {registerError}
//                     </div>
//                   )}

//                   <form onSubmit={handleRegister} className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
//                     <div>
//                       <label className="block text-sm font-medium text-indigo-200 mb-1">
//                         Full Name
//                       </label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
//                         <input
//                           type="text"
//                           name="fullName"
//                           value={registerData.fullName}
//                           onChange={handleRegisterChange}
//                           className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
//                           placeholder="John Doe"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-indigo-200 mb-1">
//                         Email
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
//                         <input
//                           type="email"
//                           name="email"
//                           value={registerData.email}
//                           onChange={handleRegisterChange}
//                           className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
//                           placeholder="john@example.com"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-indigo-200 mb-1">
//                         Password
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
//                         <input
//                           type="password"
//                           name="password"
//                           value={registerData.password}
//                           onChange={handleRegisterChange}
//                           className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
//                           placeholder="••••••••"
//                           required
//                           minLength="6"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-indigo-200 mb-1">
//                         Department
//                       </label>
//                       <div className="relative">
//                         <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
//                         <input
//                           type="text"
//                           name="department"
//                           value={registerData.department}
//                           onChange={handleRegisterChange}
//                           className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
//                           placeholder="Engineering"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-indigo-200 mb-1">
//                         Job Role
//                       </label>
//                       <div className="relative">
//                         <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
//                         <input
//                           type="text"
//                           name="jobRole"
//                           value={registerData.jobRole}
//                           onChange={handleRegisterChange}
//                           className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
//                           placeholder="Senior Developer"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-indigo-200 mb-1">
//                         Specialization
//                       </label>
//                       <div className="relative">
//                         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300 pointer-events-none" />
//                         <select
//                           name="specialization"
//                           value={registerData.specialization}
//                           onChange={handleRegisterChange}
//                           className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all appearance-none"
//                           required
//                         >
//                           {SPECIALIZATIONS.map((spec) => (
//                             <option key={spec} value={spec} className="text-gray-900">
//                               {spec}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={isRegisterLoading}
//                       className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-indigo-900 font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
//                     >
//                       {isRegisterLoading ? (
//                         <>
//                           <span className="w-5 h-5 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin" />
//                           Registering...
//                         </>
//                       ) : (
//                         "Create Account"
//                       )}
//                     </button>

//                     <p className="text-sm text-center text-indigo-200">
//                       Already have an account?{" "}
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setShowRegister(false);
//                           setRegisterError(null);
//                           setRegisterSuccess(false);
//                         }}
//                         className="text-yellow-400 hover:underline font-medium"
//                       >
//                         Sign in
//                       </button>
//                     </p>
//                   </form>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── Features Section ──────────────────────────────── */}
//       <section className="py-20 px-4 bg-gray-50 dark:bg-[#0b0f19]">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//               Everything You Need to Stay Productive
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
//               Powerful features designed to help your team collaborate, track progress, and achieve goals.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
//               <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl w-fit mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
//                 <LayoutDashboard className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//                 Intuitive Dashboard
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Get a bird's-eye view of all your tasks, deadlines, and team performance at a glance.
//               </p>
//             </div>
//             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
//               <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl w-fit mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
//                 <ClipboardList className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//                 Task Management
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Create, assign, and track tasks with ease. Set priorities, deadlines, and monitor progress.
//               </p>
//             </div>
//             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
//               <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl w-fit mb-4 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
//                 <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//                 Analytics & Reports
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Make data-driven decisions with detailed reports on team performance and task completion.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── How It Works ──────────────────────────────────── */}
//       <section className="py-20 px-4 bg-white dark:bg-gray-900">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//               How TaskFlow Works
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
//               A simple three-step process to manage your tasks efficiently.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
//                 1
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//                 Create & Assign
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Admins create tasks, set deadlines, and assign them to team members.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
//                 2
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//                 Track & Update
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Employees work on tasks, update progress, and send updates to admins.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
//                 3
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//                 Monitor & Complete
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Admins track progress, review completed tasks, and generate reports.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── Key Features ──────────────────────────────────── */}
//       <section className="py-20 px-4 bg-gray-50 dark:bg-[#0b0f19]">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div>
//               <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
//                 Key Features
//               </span>
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
//                 Built for Modern Teams
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
//                 TaskFlow combines powerful features with an intuitive interface to
//                 help your team work smarter, not harder.
//               </p>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="font-semibold text-gray-800 dark:text-white">
//                       Role-Based Access
//                     </h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Secure access for admins, employees, and managers.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="font-semibold text-gray-800 dark:text-white">
//                       Real-Time Updates
//                     </h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       See progress updates instantly as your team works.
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <h4 className="font-semibold text-gray-800 dark:text-white">
//                       Deadline Management
//                     </h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       Never miss a deadline with automatic reminders and alerts.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//               <Link
//                 to="/about"
//                 className="inline-flex items-center gap-2 mt-6 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
//               >
//                 Learn More About TaskFlow
//                 <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
//                 <LayoutDashboard className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-3" />
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
//                   Smart Dashboard
//                 </p>
//               </div>
//               <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
//                 <TrendingUp className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-3" />
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
//                   Progress Tracking
//                 </p>
//               </div>
//               <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
//                 <Users className="w-12 h-12 text-amber-600 dark:text-amber-400 mb-3" />
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
//                   Team Collaboration
//                 </p>
//               </div>
//               <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
//                 <CheckCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-3" />
//                 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
//                   Task Completion
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA Section ──────────────────────────────────── */}
//       <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
//         <div className="max-w-4xl mx-auto text-center text-white">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to Get Started?
//           </h2>
//           <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
//             Join teams already using TaskFlow to manage their tasks efficiently.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <button
//               onClick={() => {
//                 setShowRegister(true);
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//               }}
//               className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
//             >
//               Create Account
//               <ArrowRight className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => {
//                 setShowRegister(false);
//                 window.scrollTo({ top: 0, behavior: "smooth" });
//               }}
//               className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
//             >
//               <LogIn className="w-5 h-5" />
//               Sign In
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Users,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Shield,
  LogIn,
  User,
  Mail,
  Lock,
  Building2,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import PublicNavbar from "../components/PublicNavbar";
import LoginForm from "../components/Auth/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

const SPECIALIZATIONS = [
  "Development",
  "Testing",
  "Database",
  "Deployment",
  "Design",
  "Documentation",
];

const Home = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Login state
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // Register state
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
    jobRole: "",
    specialization: "Development",
  });
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  // Handle login using the LoginForm component's onSubmit
  const handleLogin = async (email, password) => {
    setIsLoginLoading(true);
    setLoginError(null);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please check your credentials.";
      setLoginError(message);
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setRegisterError(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError(null);
    setRegisterSuccess(false);
    try {
      const response = await api.post("/auth/register", registerData);
      if (response.data.success) {
        setRegisterSuccess(true);
        setRegisterData({
          fullName: "",
          email: "",
          password: "",
          department: "",
          jobRole: "",
          specialization: "Development",
        });
        // Switch back to login after 2 seconds
        setTimeout(() => {
          setShowRegister(false);
          setRegisterSuccess(false);
        }, 2000);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setRegisterError(message);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19]">
      <PublicNavbar />

      {/* ─── Hero Section ──────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 text-white text-sm font-medium mb-6">
                <LayoutDashboard className="w-4 h-4" />
                TaskFlow Platform
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Smart Task Management <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  For Modern Teams
                </span>
              </h1>
              <p className="text-xl text-indigo-200 max-w-lg mb-8">
                Track progress, manage tasks, and boost productivity with our
                intelligent task management platform.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    setShowRegister(!showRegister);
                    document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
                >
                  {showRegister ? "Switch to Login" : "Get Started"}
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* ─── Right - Auth Card with ID for navigation ─── */}
            <div id="auth-section" className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              {!showRegister ? (
                // ─── LOGIN FORM (using LoginForm component) ──
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-400/20 rounded-xl">
                      <LogIn className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Welcome Back!</h3>
                  </div>
                  
                  <LoginForm 
                    onSubmit={handleLogin}
                    isLoading={isLoginLoading}
                    error={loginError}
                  />

                  <div className="mt-4 text-center">
                    <span className="text-sm text-indigo-200">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setShowRegister(true);
                          setLoginError(null);
                        }}
                        className="text-yellow-400 hover:underline font-medium"
                      >
                        Register here
                      </button>
                    </span>
                  </div>

                  <p className="text-xs text-center text-indigo-300/60 mt-3">
                    Demo: admin@admin.com / 123456
                  </p>
                </>
              ) : (
                // ─── REGISTER FORM ────────────────────────────
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-400/20 rounded-xl">
                      <User className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Create Account</h3>
                  </div>

                  {registerSuccess && (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl text-sm mb-4">
                      ✅ Registration successful! Please log in.
                      <br />
                      Your account will be deactivated after 4 days of inactivity.
                    </div>
                  )}

                  {registerError && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm mb-4">
                      ⚠️ {registerError}
                    </div>
                  )}

                  <form onSubmit={handleRegister} className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
                        <input
                          type="text"
                          name="fullName"
                          value={registerData.fullName}
                          onChange={handleRegisterChange}
                          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
                        <input
                          type="email"
                          name="email"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
                        <input
                          type="password"
                          name="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          placeholder="••••••••"
                          required
                          minLength="6"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Department
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
                        <input
                          type="text"
                          name="department"
                          value={registerData.department}
                          onChange={handleRegisterChange}
                          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          placeholder="Engineering"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Job Role
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
                        <input
                          type="text"
                          name="jobRole"
                          value={registerData.jobRole}
                          onChange={handleRegisterChange}
                          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          placeholder="Senior Developer"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-200 mb-1">
                        Specialization
                      </label>
                      <div className="relative">
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300 pointer-events-none" />
                        <select
                          name="specialization"
                          value={registerData.specialization}
                          onChange={handleRegisterChange}
                          className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all appearance-none"
                          required
                        >
                          {SPECIALIZATIONS.map((spec) => (
                            <option key={spec} value={spec} className="text-gray-900">
                              {spec}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isRegisterLoading}
                      className="w-full py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-indigo-900 font-semibold rounded-xl transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {isRegisterLoading ? (
                        <>
                          <span className="w-5 h-5 border-2 border-indigo-900 border-t-transparent rounded-full animate-spin" />
                          Registering...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>

                    <p className="text-sm text-center text-indigo-200">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setShowRegister(false);
                          setRegisterError(null);
                          setRegisterSuccess(false);
                        }}
                        className="text-yellow-400 hover:underline font-medium"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Section ──────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Everything You Need to Stay Productive
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Powerful features designed to help your team collaborate, track progress, and achieve goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl w-fit mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                <LayoutDashboard className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Intuitive Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get a bird's-eye view of all your tasks, deadlines, and team performance at a glance.
              </p>
            </div>
            <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl w-fit mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20 transition-colors">
                <ClipboardList className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Task Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create, assign, and track tasks with ease. Set priorities, deadlines, and monitor progress.
              </p>
            </div>
            <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group">
              <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl w-fit mb-4 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20 transition-colors">
                <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Analytics & Reports
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Make data-driven decisions with detailed reports on team performance and task completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── How It Works ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              How TaskFlow Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              A simple three-step process to manage your tasks efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Create & Assign
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Admins create tasks, set deadlines, and assign them to team members.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Track & Update
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Employees work on tasks, update progress, and send updates to admins.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                Monitor & Complete
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Admins track progress, review completed tasks, and generate reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Key Features ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                Key Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                Built for Modern Teams
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                TaskFlow combines powerful features with an intuitive interface to
                help your team work smarter, not harder.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Role-Based Access
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Secure access for admins, employees, and managers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Real-Time Updates
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      See progress updates instantly as your team works.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Deadline Management
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Never miss a deadline with automatic reminders and alerts.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 mt-6 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Learn More About TaskFlow
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
                <LayoutDashboard className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-3" />
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                  Smart Dashboard
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950/50 dark:to-teal-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
                <TrendingUp className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mb-3" />
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                  Progress Tracking
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
                <Users className="w-12 h-12 text-amber-600 dark:text-amber-400 mb-3" />
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                  Team Collaboration
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-950/50 dark:to-cyan-950/50 rounded-2xl p-6 aspect-square flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
                <CheckCircle className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-3" />
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
                  Task Completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ──────────────────────────────────── */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join teams already using TaskFlow to manage their tasks efficiently.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setShowRegister(true);
                document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setShowRegister(false);
                document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;