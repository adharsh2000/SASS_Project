"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import SmoothExpandCard from "@/components/common/SmoothExpandCard";

const WelcomePage = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(true);

  // useEffect(() => {
  //   // Ensure this runs only in the client-side
  //   if (typeof window !== "undefined") {
  //     console.log("🟡 Next.js Client Hydration Started...");

  //     // When full page (including assets) is loaded
  //     const handleLoad = () => {
  //       console.log("✅ Next.js Fully Loaded!");
  //       setTimeout(() => {
  //         setIsContentLoading(false);
  //       }, 100);
  //     };

  //     // Detect full load event
  //     window.addEventListener("load", handleLoad);

  //     return () => {
  //       window.removeEventListener("load", handleLoad);
  //     };
  //   }
  // }, []);

  useEffect(() => {
    if (document.readyState !== 'complete') {
      const handler = () => {
        console.log('load');
        setIsPageLoading(false);
      };
      window.addEventListener('load', handler);

      return () => {
        window.removeEventListener('load', handler);
      };
    } else {
      const timeout = window.setTimeout(() => {
        console.log('timeout');
        setIsPageLoading(false);
      }, 0);
      return () => window.clearTimeout(timeout);
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
      <SmoothExpandCard isContentLoading={isContentLoading}>
        <div className="space-y-2">
          <p className="text-lg font-medium">John Doe</p>
          <p className="text-gray-600">5q9lM@example.com</p>
          <p className="text-gray-600">123 Main St, Anytown, USA</p>
          <p className="text-gray-600">123-456-7890</p>
        </div>
      </SmoothExpandCard>
    </div>
  );
};

export default WelcomePage;
