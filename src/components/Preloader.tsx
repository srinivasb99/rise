// src/components/Preloader.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

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
  // const { theme } = useTheme(); // Kept in case needed later

  // Effect for the timer to hide the preloader
  useEffect(() => {
    // Control how long the preloader stays on screen
    const preloaderDuration = 1800; // 1.8 seconds
    const timer = setTimeout(() => {
      setShowPreloader(false);
      // Restore scroll slightly BEFORE the animation ends,
      // ensuring it's available as soon as content might be visible.
      // Alternatively, use the second useEffect below which is more direct.
      // document.body.style.overflow = ''; // Can put it here or in separate effect
    }, preloaderDuration);

    return () => clearTimeout(timer); // Clear timeout on unmount
  }, []); // Runs only once on mount

  // Effect to manage body scroll based on preloader visibility
  useEffect(() => {
    if (showPreloader) {
      // Prevent body scroll while preloader is active
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll IMMEDIATELY when showPreloader becomes false
      // This allows scrolling even during the exit animation
      document.body.style.overflow = '';
    }

    // Cleanup function for safety: Ensure scroll is restored if component unmounts unexpectedly
    // while still visible (less likely with this setup, but good practice).
    return () => {
        // Check if it was hidden before unmounting, just in case
        if (document.body.style.overflow === 'hidden') {
             document.body.style.overflow = '';
        }
    };
  }, [showPreloader]); // This effect runs whenever showPreloader changes

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
                "text-4xl sm:text-5xl md:text-6xl font-extrabold", // Text size
                "text-primary dark:text-primary-light" // Use brand colors for text
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
