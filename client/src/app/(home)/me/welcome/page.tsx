"use client";
import React from "react";
import { motion } from "motion/react";

const WelcomePage = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary transition duration-300 ease-in-out">
      <h1 className="text-3xl font-bold underline">Welcome to Next.js!</h1>
      <p className="text-2xl font-semibold">This is a Next.js app.</p>

      {/* Smooth Expanding Div */}
      <motion.div
        className="w-full max-w-md overflow-hidden bg-white shadow-md rounded-lg mt-4 p-4"
        initial={{ height: "auto", opacity: 0 }}
        animate={{
          height: isLoading ? 50 : "auto",
          opacity: isLoading ? 0.5 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {isLoading ? (
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
