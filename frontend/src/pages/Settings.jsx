// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout/Layout";
// import { useTheme } from "../context/ThemeContext";
// import {
//   Sun,
//   Moon,
//   Palette,
//   Type,
//   Maximize,
//   Eye,
//   AlignJustify,
//   Zap,
//   LayoutGrid,
//   Check,
//   RotateCcw,
// } from "lucide-react";
// import Toast from "../components/Common/Toast";
// import { useToast } from "../hooks/useToast";

// const Settings = () => {
//   const { settings, updateSettings } = useTheme();
//   const { toast, showToast } = useToast();
//   const [localSettings, setLocalSettings] = useState(settings);

//   useEffect(() => {
//     setLocalSettings(settings);
//   }, [settings]);

//   const handleChange = (key, value) => {
//     const updated = { ...localSettings, [key]: value };
//     setLocalSettings(updated);
//     updateSettings(updated);
//     showToast("Setting updated successfully", "success");
//   };

//   const resetToDefaults = () => {
//     const defaults = {
//       darkMode: false,
//       primaryColor: "#6366f1",
//       fontSize: "medium",
//       borderRadius: "medium",
//       brightness: 100,
//       fontFamily: "sans",
//       compact: false,
//       animationSpeed: "normal",
//     };
//     setLocalSettings(defaults);
//     updateSettings(defaults);
//     showToast("Settings reset to defaults", "success");
//   };

//   const colorOptions = [
//     { name: "Indigo", value: "#6366f1" },
//     { name: "Blue", value: "#3b82f6" },
//     { name: "Green", value: "#10b981" },
//     { name: "Red", value: "#ef4444" },
//     { name: "Orange", value: "#f59e0b" },
//     { name: "Purple", value: "#8b5cf6" },
//     { name: "Pink", value: "#ec4899" },
//     { name: "Teal", value: "#14b8a6" },
//   ];

//   const SettingSection = ({ title, icon: Icon, children }) => (
//     <div className="bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl p-6">
//       <div className="flex items-center gap-3 mb-5">
//         <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
//         <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
//       </div>
//       <div className="space-y-4">{children}</div>
//     </div>
//   );

//   const ToggleButton = ({ label, value, onChange }) => (
//     <button
//       onClick={() => onChange(!value)}
//       className={`relative w-12 h-6 rounded-full transition-colors ${
//         value ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
//       }`}
//     >
//       <span
//         className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
//           value ? "translate-x-6" : ""
//         }`}
//       />
//     </button>
//   );

//   const RadioGroup = ({ label, options, value, onChange }) => (
//     <div>
//       <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//         {label}
//       </p>
//       <div className="flex gap-2 flex-wrap">
//         {options.map((opt) => (
//           <button
//             key={opt.value}
//             onClick={() => onChange(opt.value)}
//             className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
//               value === opt.value
//                 ? "bg-primary text-white"
//                 : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//             }`}
//           >
//             {opt.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );

//   const ColorPicker = () => (
//     <div>
//       <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//         Primary Color
//       </p>
//       <div className="flex flex-wrap gap-3 items-center">
//         {colorOptions.map((color) => (
//           <button
//             key={color.value}
//             onClick={() => handleChange("primaryColor", color.value)}
//             className={`w-8 h-8 rounded-full border-2 transition-all ${
//               localSettings.primaryColor === color.value
//                 ? "border-black dark:border-white scale-110"
//                 : "border-transparent"
//             }`}
//             style={{ backgroundColor: color.value }}
//             title={color.name}
//           />
//         ))}
//         <input
//           type="color"
//           value={localSettings.primaryColor}
//           onChange={(e) => handleChange("primaryColor", e.target.value)}
//           className="w-8 h-8 p-0 border-0 cursor-pointer bg-transparent"
//         />
//       </div>
//     </div>
//   );

//   const BrightnessSlider = () => (
//     <div>
//       <div className="flex items-center justify-between">
//         <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
//           Brightness
//         </p>
//         <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
//           {localSettings.brightness}%
//         </span>
//       </div>
//       <input
//         type="range"
//         min="80"
//         max="120"
//         value={localSettings.brightness}
//         onChange={(e) => handleChange("brightness", parseInt(e.target.value))}
//         className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
//       />
//       <div className="flex justify-between text-xs text-gray-400">
//         <span>80%</span>
//         <span>100%</span>
//         <span>120%</span>
//       </div>
//     </div>
//   );

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] p-4 sm:p-6 transition-colors duration-300">
//         <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-5">
//           <div>
//             <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
//               Appearance Settings
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
//               Customize the look and feel of your workspace
//             </p>
//           </div>
//           <button
//             onClick={resetToDefaults}
//             className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
//           >
//             <RotateCcw className="w-4 h-4" />
//             Reset to Default
//           </button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
//           {/* Theme */}
//           <SettingSection title="Theme" icon={Palette}>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-700 dark:text-gray-300">
//                 Dark Mode
//               </span>
//               <ToggleButton
//                 value={localSettings.darkMode}
//                 onChange={(val) => handleChange("darkMode", val)}
//               />
//             </div>
//           </SettingSection>

//           {/* Color */}
//           <SettingSection title="Color" icon={Sun}>
//             <ColorPicker />
//           </SettingSection>

//           {/* Font Size */}
//           <SettingSection title="Typography" icon={Type}>
//             <RadioGroup
//               label="Font Size"
//               options={[
//                 { label: "Small", value: "small" },
//                 { label: "Medium", value: "medium" },
//                 { label: "Large", value: "large" },
//               ]}
//               value={localSettings.fontSize}
//               onChange={(val) => handleChange("fontSize", val)}
//             />
//             <RadioGroup
//               label="Font Family"
//               options={[
//                 { label: "Sans", value: "sans" },
//                 { label: "Serif", value: "serif" },
//                 { label: "Mono", value: "monospace" },
//               ]}
//               value={localSettings.fontFamily}
//               onChange={(val) => handleChange("fontFamily", val)}
//             />
//           </SettingSection>

//           {/* Border Radius */}
//           <SettingSection title="Shape" icon={Maximize}>
//             <RadioGroup
//               label="Border Radius"
//               options={[
//                 { label: "Sharp", value: "sharp" },
//                 { label: "Medium", value: "medium" },
//                 { label: "Rounded", value: "rounded" },
//               ]}
//               value={localSettings.borderRadius}
//               onChange={(val) => handleChange("borderRadius", val)}
//             />
//           </SettingSection>

//           {/* Brightness */}
//           <SettingSection title="Display" icon={Eye}>
//             <BrightnessSlider />
//           </SettingSection>

//           {/* Animation Speed */}
//           <SettingSection title="Performance" icon={Zap}>
//             <RadioGroup
//               label="Animation Speed"
//               options={[
//                 { label: "Fast", value: "fast" },
//                 { label: "Normal", value: "normal" },
//                 { label: "Slow", value: "slow" },
//               ]}
//               value={localSettings.animationSpeed}
//               onChange={(val) => handleChange("animationSpeed", val)}
//             />
//           </SettingSection>

//           {/* Compact Mode */}
//           <SettingSection title="Layout" icon={LayoutGrid}>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-700 dark:text-gray-300">
//                 Compact Mode
//               </span>
//               <ToggleButton
//                 value={localSettings.compact}
//                 onChange={(val) => handleChange("compact", val)}
//               />
//             </div>
//             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//               Reduces spacing and padding for a denser interface
//             </p>
//           </SettingSection>

//           {/* Additional Settings */}
//           <SettingSection title="Additional" icon={AlignJustify}>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   Sidebar Position
//                 </span>
//                 <span className="text-sm text-gray-400">Left (fixed)</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-700 dark:text-gray-300">
//                   Notifications
//                 </span>
//                 <span className="text-sm text-gray-400">Enabled</span>
//               </div>
//             </div>
//           </SettingSection>
//         </div>

//         {/* Live Preview */}
//         <div className="mt-6 p-6 bg-white dark:bg-[#131926] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl">
//           <h3 className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
//             <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//             Live Preview
//           </h3>
//           <div className="flex flex-wrap gap-4 items-center">
//             <button className="px-6 py-2 bg-primary text-white rounded-lg shadow-md hover:shadow-lg transition-all">
//               Primary Button
//             </button>
//             <button className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all">
//               Secondary Button
//             </button>
//             <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
//               <span className="text-sm text-gray-700 dark:text-gray-300">
//                 Sample card with border-radius
//               </span>
//             </div>
//             <span
//               className={`text-sm font-medium ${
//                 localSettings.fontSize === "small"
//                   ? "text-xs"
//                   : localSettings.fontSize === "large"
//                     ? "text-lg"
//                     : "text-sm"
//               }`}
//             >
//               This text changes with font size
//             </span>
//           </div>
//         </div>
//       </div>
//       <Toast show={toast.show} message={toast.message} type={toast.type} />
//     </Layout>
//   );
// };

// export default Settings;
