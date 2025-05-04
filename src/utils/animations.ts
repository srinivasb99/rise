// src/utils/animations.ts
import { Variants } from 'framer-motion';

// For overall page transitions (used with AnimatePresence in App.tsx)
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    // x: '-100vw', // Example: Slide in from left
    // scale: 0.95, // Example: Scale up
     y: 20, // Example: Fade up
  },
  animate: { // Use 'animate' here as it's often used directly by AnimatePresence/Routes
    opacity: 1,
    // x: 0,
    // scale: 1,
     y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      // duration: 0.5, // Can use duration or spring
      when: "beforeChildren", // Animate parent before children
      staggerChildren: 0.1, // Stagger children animations
    },
  },
  exit: {
    opacity: 0,
    // x: '100vw', // Example: Slide out to right
    // scale: 0.95,
     y: -20, // Example: Fade down
    transition: {
      // duration: 0.3,
      ease: "easeInOut"
    },
  },
};

// For individual items within a staggered container (often used with initial/visible)
export const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  visible: { // Use 'visible' for viewport or direct animate triggers
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// For containers that stagger their children (often used with initial/visible)
export const containerVariants: Variants = {
  initial: { opacity: 1 }, // Container itself might be visible initially
  visible: { // Target state for children animation
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Time between each child animation starts
      delayChildren: 0.2, // Wait before starting the first child
    },
  },
};

// For floating/bobbing elements
export const floatingAnimation = {
  animate: { // Only need animate state for infinite loop
    y: ["0%", "-5%", "0%", "5%", "0%"], // Bobbing motion path
    transition: {
      duration: 5, // Duration of one full cycle
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// For icon hover effects (used with whileHover="hover")
export const iconHover: Variants = {
  hover: { // The state name triggered by whileHover
    scale: 1.2,
    rotate: 15,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

// For sliding elements in from the left (use with initial/whileInView/animate)
export const slideInFromLeft: Variants = {
  initial: { x: -50, opacity: 0 },
  visible: { // Target state
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// For sliding elements in from the right (use with initial/whileInView/animate)
export const slideInFromRight: Variants = {
   initial: { x: 50, opacity: 0 },
   visible: { // Target state
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// For fading elements up (use with initial/whileInView/animate)
export const fadeInUp: Variants = {
    initial: { y: 40, opacity: 0 },
    visible: { // Target state
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        // Can add delay here if needed: delay: 0.1
      },
    },
};

// For general hover scale effect (used with whileHover="hover")
export const hoverScale: Variants = {
    hover: { // The state name triggered by whileHover
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 15 }
    }
};

// Simple fade in variant
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5 }
    }
}
