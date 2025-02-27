"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// const themes = ["default", "blue", "green", "red"];


const themes = [
  { name: "default", color: "#ffffff" }, // White
  { name: "blue", color: "#3b82f6" }, // Blue
  { name: "green", color: "#10b981" }, // Green
  { name: "red", color: "#ef4444" }, // Red
];

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");

  // Load saved theme & mode from localStorage
  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem("selectedTheme") || "default";
    const savedMode = localStorage.getItem("selectedMode") || systemTheme;

    document.documentElement.classList.add(`theme-${savedTheme}`);
    setCurrentTheme(savedTheme);
    setTheme(savedMode as string);
  }, [setTheme, systemTheme]);

  const changeTheme = (newTheme: string) => {
    if (!mounted) return;

    document.documentElement.classList.forEach((cls) => {
      if (cls.startsWith("theme-"))
        document.documentElement.classList.remove(cls);
    });

    document.documentElement.classList.add(`theme-${newTheme}`);
    setCurrentTheme(newTheme);
    localStorage.setItem("selectedTheme", newTheme);
  };

  const toggleMode = () => {
    const newMode = theme === "dark" ? "light" : "dark";
    setTheme(newMode);
    localStorage.setItem("selectedMode", newMode);
  };

  // Prevent UI flickering by hiding content until mounted
  if (!mounted) return null;

  return (
    <div className="flex space-x-4 items-center p-4">
      {/* Light/Dark Toggle */}
      <button onClick={toggleMode} className="p-2 rounded border">
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Theme Selector */}
      <div className="flex space-x-2">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className={`w-10 h-10 rounded cursor-pointer border-2 opacity-50 hover:opacity-100 ${
              currentTheme === theme.name ? "border-black opacity-100" : "border-transparent"
            }`}
            style={{ backgroundColor: theme.color }}
            onClick={() => changeTheme(theme.name)}
          />
        ))}
      </div>
    </div>
  );
}
