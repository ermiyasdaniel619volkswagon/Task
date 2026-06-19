
// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   Target,
//   Heart,
//   Shield,
//   LayoutDashboard,
//   ClipboardList,
//   BarChart3,
//   Clock,
//   CheckCircle,
//   TrendingUp,
//   Users,
//   Bell,
// } from "lucide-react";
// import PublicNavbar from "../components/PublicNavbar";

// const About = () => {
//   const values = [
//     {
//       icon: Target,
//       title: "Our Mission",
//       description:
//         "To help teams work smarter with simple, powerful task management tools that make collaboration easy and productivity visible.",
//     },
//     {
//       icon: Heart,
//       title: "Our Vision",
//       description:
//         "To become the trusted task management platform for businesses in Ethiopia and beyond.",
//     },
//     {
//       icon: Shield,
//       title: "Our Commitment",
//       description:
//         "We are committed to providing a secure, reliable, and easy-to-use platform that respects your data and privacy.",
//     },
//   ];

//   const features = [
//     {
//       icon: TrendingUp,
//       title: "Progress Tracking",
//       description:
//         "Employees update their progress with a simple slider. Admins see updates only when progress is finalized.",
//     },
//     {
//       icon: CheckCircle,
//       title: "Task Completion",
//       description:
//         "Mark tasks as done, track completion rates, and get notified instantly when work is finished.",
//     },
//     {
//       icon: Users,
//       title: "Admin Control",
//       description:
//         "Admins have full visibility into tasks, employee performance, and team workload from one dashboard.",
//     },
//     {
//       icon: LayoutDashboard,
//       title: "Smart Dashboard",
//       description:
//         "Get a clear overview of tasks, deadlines, and team performance. Both admins and employees get tailored views.",
//     },
//     {
//       icon: ClipboardList,
//       title: "Task Management",
//       description:
//         "Create, assign, and track tasks easily. Set priorities, deadlines, and monitor progress in real-time.",
//     },
//     {
//       icon: BarChart3,
//       title: "Reports & Analytics",
//       description:
//         "Make better decisions with clear reports on team performance and task completion rates.",
//     },
//     {
//       icon: Bell,
//       title: "Real-Time Notifications",
//       description:
//         "Stay updated with instant notifications when tasks are assigned, completed, or progress is sent.",
//     },
//     {
//       icon: Clock,
//       title: "Deadline Management",
//       description:
//         "Set deadlines, track remaining time, and get alerted when tasks are approaching their due dates.",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19]">
//       <PublicNavbar />

//       {/* ─── Hero ───────────────────────────────────────────── */}
//       <section className="py-16 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
//         <div className="max-w-4xl mx-auto text-center text-white">
//           <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-4">
//             <LayoutDashboard className="w-4 h-4" />
//             <span className="text-sm font-medium">TaskFlow Platform</span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
//             About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">TaskFlow</span>
//           </h1>
//           <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
//             Simple task management for modern teams.
//           </p>
//         </div>
//       </section>

//       {/* ─── What is TaskFlow ───────────────────────────────── */}
//       <section className="py-16 px-4 bg-white dark:bg-gray-900">
//         <div className="max-w-4xl mx-auto text-center">
//           <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
//             What is TaskFlow?
//           </span>
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
//             Simplify Task Management
//           </h2>
//           <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
//             TaskFlow helps teams collaborate, track progress, and get work done.
//             Whether you're managing a small team or a large organization, TaskFlow
//             gives you the tools you need to stay organized and productive.
//           </p>
//           <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">
//             With real-time progress tracking, role-based access, and clear analytics,
//             TaskFlow makes task management simple and effective.
//           </p>
//         </div>
//       </section>

//       {/* ─── Core Features ──────────────────────────────────── */}
//       <section className="py-16 px-4 bg-gray-50 dark:bg-[#0b0f19]">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//               How TaskFlow Works
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
//               Three simple steps to manage your tasks effectively.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
//             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
//               <div className="inline-flex p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl mb-4">
//                 <TrendingUp className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
//                 1. Track Progress
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
//                 Update progress with a simple slider. Send updates to admins when
//                 you're ready. Progress only moves forward.
//               </p>
//             </div>

//             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
//               <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl mb-4">
//                 <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
//                 2. Complete Tasks
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
//                 Mark tasks as done when finished. Admins get notified instantly.
//                 Reopen tasks if needed.
//               </p>
//             </div>

//             <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
//               <div className="inline-flex p-4 bg-purple-50 dark:bg-purple-500/10 rounded-2xl mb-4">
//                 <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
//                 3. Monitor & Report
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
//                 Admins see all tasks, team performance, and workload in one place.
//                 Generate reports to track progress.
//               </p>
//             </div>
//           </div>

//           {/* ─── All Features ────────────────────────────────── */}
//           <div className="mt-8">
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">
//               All Features
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {features.map((feature, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
//                 >
//                   <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg flex-shrink-0">
//                     <feature.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-gray-800 dark:text-white">
//                       {feature.title}
//                     </h4>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── Workflow ───────────────────────────────────────── */}
//       <section className="py-16 px-4 bg-white dark:bg-gray-900">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//               Simple Workflow
//             </h2>
//             <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
//               Three steps from start to finish.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//                 1
//               </div>
//               <h3 className="font-bold text-gray-800 dark:text-white">Assign</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                 Admins create and assign tasks.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//                 2
//               </div>
//               <h3 className="font-bold text-gray-800 dark:text-white">Work & Update</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                 Employees work and send updates.
//               </p>
//             </div>
//             <div className="text-center">
//               <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//                 3
//               </div>
//               <h3 className="font-bold text-gray-800 dark:text-white">Monitor</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                 Admins track and generate reports.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ─────────────────────────────────────────────── */}
//       <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
//         <div className="max-w-4xl mx-auto text-center text-white">
//           <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
//           <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
//             Join teams using TaskFlow to manage their tasks efficiently.
//           </p>
//           <Link
//             to="/register"
//             className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
//           >
//             Register
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default About;
import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Heart,
  Shield,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Bell,
} from "lucide-react";
import PublicNavbar from "../components/PublicNavbar";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To help teams work smarter with simple, powerful task management tools that make collaboration easy and productivity visible.",
    },
    {
      icon: Heart,
      title: "Our Vision",
      description:
        "To become the trusted task management platform for businesses in Ethiopia and beyond.",
    },
    {
      icon: Shield,
      title: "Our Commitment",
      description:
        "We are committed to providing a secure, reliable, and easy-to-use platform that respects your data and privacy.",
    },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Employees update their progress with a simple slider. Admins see updates only when progress is finalized.",
    },
    {
      icon: CheckCircle,
      title: "Task Completion",
      description:
        "Mark tasks as done, track completion rates, and get notified instantly when work is finished.",
    },
    {
      icon: Users,
      title: "Admin Control",
      description:
        "Admins have full visibility into tasks, employee performance, and team workload from one dashboard.",
    },
    {
      icon: LayoutDashboard,
      title: "Smart Dashboard",
      description:
        "Get a clear overview of tasks, deadlines, and team performance. Both admins and employees get tailored views.",
    },
    {
      icon: ClipboardList,
      title: "Task Management",
      description:
        "Create, assign, and track tasks easily. Set priorities, deadlines, and monitor progress in real-time.",
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description:
        "Make better decisions with clear reports on team performance and task completion rates.",
    },
    {
      icon: Bell,
      title: "Real-Time Notifications",
      description:
        "Stay updated with instant notifications when tasks are assigned, completed, or progress is sent.",
    },
    {
      icon: Clock,
      title: "Deadline Management",
      description:
        "Set deadlines, track remaining time, and get alerted when tasks are approaching their due dates.",
    },
  ];

  // Function to handle navigation to Home page with register section
  const handleRegisterClick = () => {
    // Navigate to home page with auth-section
    window.location.href = '/#auth-section';
    // Small delay to ensure the page loads and then click the register button if needed
    setTimeout(() => {
      // Check if we're on the home page and try to switch to register
      const registerButton = document.querySelector('[data-switch-to-register]');
      if (registerButton) {
        registerButton.click();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19]">
      <PublicNavbar />

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-4">
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-sm font-medium">TaskFlow Platform</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">TaskFlow</span>
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Simple task management for modern teams.
          </p>
        </div>
      </section>

      {/* ─── What is TaskFlow ───────────────────────────────── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
            What is TaskFlow?
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Simplify Task Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            TaskFlow helps teams collaborate, track progress, and get work done.
            Whether you're managing a small team or a large organization, TaskFlow
            gives you the tools you need to stay organized and productive.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mt-4">
            With real-time progress tracking, role-based access, and clear analytics,
            TaskFlow makes task management simple and effective.
          </p>
        </div>
      </section>

      {/* ─── Core Features ──────────────────────────────────── */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              How TaskFlow Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
              Three simple steps to manage your tasks effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl mb-4">
                <TrendingUp className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                1. Track Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Update progress with a simple slider. Send updates to admins when
                you're ready. Progress only moves forward.
              </p>
            </div>

            <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl mb-4">
                <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                2. Complete Tasks
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Mark tasks as done when finished. Admins get notified instantly.
                Reopen tasks if needed.
              </p>
            </div>

            <div className="card p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex p-4 bg-purple-50 dark:bg-purple-500/10 rounded-2xl mb-4">
                <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                3. Monitor & Report
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Admins see all tasks, team performance, and workload in one place.
                Generate reports to track progress.
              </p>
            </div>
          </div>

          {/* ─── All Features ────────────────────────────────── */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">
              All Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Workflow ───────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Simple Workflow
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
              Three steps from start to finish.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                1
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white">Assign</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Admins create and assign tasks.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                2
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white">Work & Update</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Employees work and send updates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                3
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white">Monitor</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Admins track and generate reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join teams using TaskFlow to manage their tasks efficiently.
          </p>
          {/* 👇 Updated: Link to Home page with auth-section */}
          <Link
            to="/#auth-section"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
          >
            Get Started
            <span className="text-indigo-600">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;