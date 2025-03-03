"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Preloader() {
  const pathname = usePathname(); // Detects route changes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Start loading
    const timeout = setTimeout(() => setLoading(false), 100); // Simulate delay

    return () => clearTimeout(timeout);
  }, [pathname]); // Runs when route changes

  if (!loading) return null; // Hide when loading is false

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-black z-50">
      <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}
