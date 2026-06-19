

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

const PublicNavbar = () => {
  const { user } = useAuth();
  const { settings, updateSettings } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = settings.darkMode;

  const toggleDarkMode = () => {
    updateSettings({ darkMode: !darkMode });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 w-9 h-9 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-bold text-xl text-gray-800 dark:text-white">
              TaskFlow
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              About
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                {/* ✅ Keep Login link - goes to Home page auth section */}
                <Link
                  to="/#auth-section"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Login
                </Link>
                {/* ❌ REMOVED Register button */}
              </>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-4">
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {user ? (
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                {/* ✅ Keep Login link - goes to Home page auth section */}
                <Link
                  to="/#auth-section"
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                {/* ❌ REMOVED Register button */}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;