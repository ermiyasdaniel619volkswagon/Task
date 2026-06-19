import React, { createContext, useState, useContext, useEffect } from "react";

const defaultSettings = {
  darkMode: false,
  primaryColor: "#6366f1",
  fontSize: "medium",
  borderRadius: "medium",
  brightness: 100,
  fontFamily: "sans",
  compact: false,
  animationSpeed: "normal",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("themeSettings");
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch {
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  useEffect(() => {
    localStorage.setItem("themeSettings", JSON.stringify(settings));
    applyTheme(settings);
  }, [settings]);

  const applyTheme = (s) => {
    const root = document.documentElement;
    // Dark mode
    if (s.darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Primary color
    root.style.setProperty("--primary-color", s.primaryColor);
    // Brightness
    root.style.setProperty("--brightness", s.brightness / 100);
    // Font size
    let fontSize = "16px";
    if (s.fontSize === "small") fontSize = "14px";
    else if (s.fontSize === "large") fontSize = "18px";
    root.style.setProperty("--font-size", fontSize);
    // Border radius
    let radius = "0.5rem";
    if (s.borderRadius === "sharp") radius = "0";
    else if (s.borderRadius === "rounded") radius = "1rem";
    root.style.setProperty("--border-radius", radius);
    // Font family
    let fontFamily = "Inter, sans-serif";
    if (s.fontFamily === "serif") fontFamily = "Georgia, serif";
    else if (s.fontFamily === "monospace")
      fontFamily = "Courier New, monospace";
    root.style.setProperty("--font-family", fontFamily);
    // Compact mode
    if (s.compact) {
      root.style.setProperty("--spacing-scale", "0.75");
    } else {
      root.style.setProperty("--spacing-scale", "1");
    }
    // Animation speed
    let duration = "0.3s";
    if (s.animationSpeed === "fast") duration = "0.1s";
    else if (s.animationSpeed === "slow") duration = "0.6s";
    root.style.setProperty("--animation-duration", duration);

    // Apply brightness to body
    document.body.style.filter = `brightness(${s.brightness / 100})`;
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
