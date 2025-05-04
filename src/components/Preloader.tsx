// src/components/Preloader.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Import theme context
import { cn } from '../utils/cn'; // Assuming cn utility exists

// Define animation variants for the text pulsing effect
const textPulseVariants: Variants = {
  initial: {
    opacity: 0.6,
    scale: 0.98,
  },
  animate: {
    opacity: [0.6, 1, 0.6], // Pulse opacity
    scale: [0.98, 1.02, 0.98], // Pulse scale slightly
    transition: {
      duration: 1.7, // Pulse cycle duration
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// Define variants for the container fade-out
const containerVariants: Variants = {
    initial: { opacity: 1 },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.4, // Faster fade-out duration
            ease: 'easeOut'
        }
    }
};

export const Preloader: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  // Note: useTheme hook is kept in case you want to adjust text color differently in future,
  // but currently text color uses brand primary which should work on both backgrounds.
  // const { theme } = useTheme();

  useEffect(() => {
    // Control how long the preloader stays on screen (Reduced Timing)
    const preloaderDuration = 1800; // e.g., 1.8 seconds (in ms)
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, preloaderDuration);

    // Prevent body scroll while preloader is active
    document.body.style.overflow = 'hidden';

    // Cleanup function
    return () => {
      clearTimeout(timer);
      // Restore body scroll when preloader is removed
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          key="preloader"
          className={cn(
            "fixed inset-0 z-[9999]", // Full screen overlay, highest z-index
            "flex items-center justify-center", // Center the text
            "bg-primary-light dark:bg-gray-950", // Background colors respecting theme
            "transition-colors duration-300" // Smooth background color transition
          )}
          variants={containerVariants} // Use variants for exit animation
          initial="initial"
          exit="exit" // Trigger exit animation
        >
          {/* Animated Text Container */}
          <motion.h1
            className={cn(
                "text-4xl sm:text-5xl md:text-6xl font-extrabold", // Increased text size
                "text-primary dark:text-primary-light" // Use brand colors for text (adjust dark if needed)
            )}
            variants={textPulseVariants} // Apply pulsing animation
            initial="initial"
            animate="animate"
          >
            Rise Online
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
