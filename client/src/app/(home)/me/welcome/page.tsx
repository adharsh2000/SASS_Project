"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const WelcomePage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(true);

  useEffect(() => {
    // Ensure this runs only in the client-side
    if (typeof window !== "undefined") {
      console.log("🟡 Next.js Client Hydration Started...");

      // When full page (including assets) is loaded
      const handleLoad = () => {
        console.log("✅ Next.js Fully Loaded!");
        setTimeout(() => {
          setIsContentLoading(false);
        },100)
      };

      // Detect full load event
      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, []);

  useEffect(() => {
    // Simulate data fetching (e.g., API call)
    setTimeout(() => {
      setIsContentLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-secondary transition duration-300 ease-in-out">
      {/* 🔹 Top Progress Loader */}
      <AnimatePresence>
        {isPageLoading && (
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <h1 className="text-3xl font-bold underline">Welcome to Next.js!</h1>
      <p className="text-2xl font-semibold">This is a Next.js app.</p>

      {/* 🔹 Expanding Content Box */}
      <motion.div
        className="w-full max-w-md overflow-hidden bg-white shadow-md rounded-lg mt-4 p-4"
        initial={{ height: 50, opacity: 0 }}
        animate={{
          height: isContentLoading ? 50 : "auto",
          opacity: isContentLoading ? 0.5 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {isContentLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-2">
            <p className="text-lg font-medium">John Doe</p>
            <p className="text-gray-600">5q9lM@example.com</p>
            <p className="text-gray-600">123 Main St, Anytown, USA</p>
            <p className="text-gray-600">123-456-7890</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WelcomePage;
