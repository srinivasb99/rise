// src/components/Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Calendar, ArrowRight, Sparkles, Rocket, Target } from 'lucide-react';
import { cn } from '../utils/cn'; // Assuming cn utility

// ... (floatingAnimation remains the same)
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function Hero() {
  // Define colors for reuse and easier dark mode switching
  const primaryColor = "#002B5B";
  const secondaryBg = "#E0F0FF";
  const darkPrimaryColor = "#ADD8E6"; // Example: Light blue for dark text
  const darkSecondaryBg = "#001F3F"; // Example: Dark blue background

  return (
    // Update background
    <div className={cn(
        "relative pt-24 overflow-hidden",
        `bg-[${secondaryBg}] dark:bg-[${darkSecondaryBg}]` // Dynamic background
    )}>
      {/* Floating Icons - adjust color/opacity for dark mode */}
       <motion.div
        className="absolute top-20 right-10 text-[#002B5B] opacity-10 dark:text-blue-300 dark:opacity-5"
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
      >
        <Sparkles className="w-24 h-24" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-10 text-[#002B5B] opacity-10 dark:text-blue-300 dark:opacity-5"
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      >
        <Target className="w-32 h-32" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          {/* Rocket Icon */}
          <motion.div /* ... animation props */ className="mb-8">
            <Rocket className={cn("mx-auto h-16 w-16", `text-[${primaryColor}] dark:text-[${darkPrimaryColor}]`)} />
          </motion.div>

          {/* Heading */}
          <motion.div /* ... animation props */ className="space-y-4 mb-8">
             <h1 className={cn(
                 "text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl leading-tight",
                 `text-[${primaryColor}] dark:text-gray-100` // Adjust dark text color
             )}>
               <span className="block mb-2">Elevate Your</span>
                {/* Gradient might need adjustment or simplification for dark mode */}
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#002B5B] to-[#0056b3] dark:from-blue-300 dark:to-blue-500 pb-2">
                 Digital Presence
                </span>
             </h1>
          </motion.div>

          {/* Paragraph */}
          <motion.p /* ... animation props */
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl dark:text-gray-400"
          >
            Transform your business with cutting-edge web solutions. We deliver innovative digital strategies that drive growth and engagement.
          </motion.p>

          {/* Buttons */}
          <motion.div /* ... animation props */
            className="mt-8 max-w-md mx-auto sm:flex sm:justify-center sm:gap-4"
          >
             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button /* ... props */ >
                 <Calendar className="h-5 w-5" />
                 <span>Schedule Now</span>
               </Button>
             </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               <Button variant="outline" /* ... props */ >
                 <span>Learn More</span>
                 <ArrowRight className="h-5 w-5" />
               </Button>
             </motion.div>
          </motion.div>
        </motion.div>
      </div>

       {/* Bottom Curve SVG - adjust fill */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className={cn("w-full h-12 fill-current", `text-[#001F3F] dark:text-gray-900`)} viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0 48h1440V0c-624 23-936 23-1440 0v48z" />
        </svg>
      </div>
    </div>
  );
}
