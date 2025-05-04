// src/components/Preloader.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTheme } from '../context/ThemeContext'; // Import theme context
import { cn } from '../utils/cn'; // Assuming cn utility exists

// Define animation variants for the logo
const logoVariants: Variants = {
  initial: {
    opacity: 0.5,
    scale: 0.9,
  },
  animate: {
    opacity: [0.5, 1, 0.5], // Fade in and out slightly
    scale: [0.9, 1.05, 0.9], // Pulse effect
    transition: {
      duration: 1.8, // Duration of one pulse cycle
      ease: "easeInOut",
      repeat: Infinity, // Repeat indefinitely
    },
  },
};

export const Preloader: React.FC = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    // Control how long the preloader stays on screen
    const preloaderDuration = 2200; // Slightly shorter duration (in ms)
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, preloaderDuration);

    // Optional: Prevent body scroll while preloader is active
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      // Restore body scroll when preloader is removed
      document.body.style.overflow = '';
    };
  }, []);

  // Determine SVG fill color based on the current theme
  const svgFillColor = theme === 'dark' ? '#FFFFFF' : '#002B5B';

  return (
    <AnimatePresence>
      {showPreloader && (
        <motion.div
          className={cn(
            "fixed inset-0 z-[9999]", // Ensure it's on top
            "flex items-center justify-center", // Center content
            "bg-primary-light dark:bg-gray-950", // Background colors
            "transition-colors duration-300" // Smooth theme transition
          )}
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }} // Fade out the whole container
          transition={{ duration: 0.5, ease: 'easeOut' }} // Smooth exit fade
        >
          {/* Animated Logo Container */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            className="w-32 h-32 sm:w-40 sm:h-40" // Adjust size as needed
          >
            {/* Rise Online Solutions Logo SVG (Paste your validated SVG code here) */}
            <svg
              className="w-full h-full" // Make SVG fill the container
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1796 1004" // Use correct viewBox
              preserveAspectRatio="xMidYMid meet"
              fill={svgFillColor} // Dynamically set fill color
            >
              <g transform="translate(0.000000,1004.000000) scale(0.100000,-0.100000)" stroke="none">
                 {/* --- PASTE ALL YOUR CORRECTED <path> ELEMENTS HERE --- */}
                 <path d="M7525 6501 c-130 -23 -159 -33 -282 -97 ... rest of path data ... -500 1z"/>
                 <path d="M13270 6319 c-106 -22 -346 -80 -357 -87 ... rest of path data ... -136 3z"/>
                 {/* ... include ALL other <path> elements ... */}
                  <path d="M10059 6220 c-106 -12 -292 -77 -383 -134 ... rest of path data ... 153 -34z"/>
                  <path d="M1197 6192 c-136 -3 -150 -9 -128 -50 ... rest of path data ... 286 -9z"/>
                  <path d="M3381 6193 c-30 -6 -90 -43 -114 -71 ... rest of path data ... -154 22z"/>
                  <path d="M14026 6188 c-54 -15 -121 -84 -136 -140 ... rest of path data ... -245 120z"/>
                  <path d="M3340 5570 c-228 -46 -270 -57 -272 -73 ... rest of path data ... -205 -39z"/>
                  <path d="M13968 5565 c-113 -23 -213 -45 -222 -48 ... rest of path data ... -279 -26z"/>
                  <path d="M4392 5589 c-162 -21 -310 -100 -381 -203 ... rest of path data ... -188 -1z"/>
                  <path d="M5644 5591 c-85 -14 -152 -41 -229 -92 ... rest of path data ... 270 162z"/>
                  <path d="M15447 5590 c-103 -13 -160 -40 -270 -130 ... rest of path data ... -78 -4z"/>
                  <path d="M16760 5591 c-190 -27 -378 -168 -461 -346 ... rest of path data ... 176 5z"/>
                  <path d="M11700 5575 c-30 -7 -122 -27 -205 -44 ... rest of path data ... -140 90z"/>
                  <path d="M7144 3584 c-28 -13 -59 -33 -69 -44 ... rest of path data ... -178 0z"/>
                  <path d="M11189 3586 c-68 -37 -99 -78 -99 -132 ... rest of path data ... -183 2z"/>
                  <path d="M7665 3586 c-16 -7 -51 -36 -77 -64 ... rest of path data ... 97 -50z"/>
                  <path d="M8574 3586 c-3 -8 -4 -112 -2 -233 ... rest of path data ... -33 -8z"/>
                  <path d="M10015 3581 c-115 -52 -178 -216 -142 -368 ... rest of path data ... 169 3z"/>
                  <path d="M10528 3593 c-20 -5 -26 -73 -23 -278 ... rest of path data ... -54 5z"/>
                  <path d="M8152 3293 l3 -298 165 0 165 0 ... rest of path data ... 41 0 2 -297z"/>
                  <path d="M9112 3563 c3 -27 5 -28 63 -29 ... rest of path data ... 218 2 3 -27z"/>
                  <path d="M9658 3528 c-7 -96 -8 -490 -1 -515 ... rest of path data ... -4 -62z"/>
                 {/* --- END OF PATH ELEMENTS --- */}
              </g>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
