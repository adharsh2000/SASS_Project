"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const themes = ["default", "blue", "green", "red"];

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("default");

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeTheme = (newTheme: string) => {
    if (!mounted) return;

    // Remove all previous theme classes
    document.documentElement.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) document.documentElement.classList.remove(cls);
    });

    // Apply the new theme class
    document.documentElement.classList.add(`theme-${newTheme}`);
    setCurrentTheme(newTheme);

    // Ensure the `light` or `dark` class is present (fixes issue in light mode)
    if (resolvedTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  if (!mounted) return <div className="w-8 h-8"></div>; // Prevents hydration issues

  return (
    <div className="flex space-x-4 items-center p-4">
      {/* Light/Dark Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded border"
      >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Theme Selector */}
      <select
        className="p-2 border rounded"
        value={currentTheme}
        onChange={(e) => changeTheme(e.target.value)}
      >
        {themes.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)} Theme
          </option>
        ))}
      </select>
    </div>
  );
}
