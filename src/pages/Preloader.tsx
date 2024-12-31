import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Preloader = ({ onFinish }: { onFinish: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 2000); // 2-second duration for the animation
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    isVisible && (
      <motion.div
        className="fixed inset-0 bg-[#002B5B] flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-white"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          Rise Online Solutions
        </motion.h1>
      </motion.div>
    )
  );
};

export default Preloader;
