import React from "react";
import { motion } from "motion/react";

const SmoothExpandCard = ({
  isContentLoading,
  children,
}: {
  isContentLoading: boolean;
  children?: React.ReactNode;
}) => {
  return (
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
        children
      )}
    </motion.div>
  );
};

export default SmoothExpandCard;
