// src/utils/animations.ts (Ensure it matches this structure)
import { Variants } from 'framer-motion';

export const pageVariants: Variants = { /* ... */ };

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  // USE 'visible' as the target state key
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const containerVariants: Variants = {
  initial: { opacity: 0 },
  // USE 'visible' as the target state key
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const floatingAnimation = { /* ... */ };

// Ensure iconHover is exported
export const iconHover = {
  hover: {
    scale: 1.2,
    rotate: 15,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};

// ... other variants like slideInFromLeft etc. should also use 'visible' if needed
export const slideInFromLeft: Variants = {
  initial: { x: -50, opacity: 0 },
  visible: { /* ... */ },
};
export const slideInFromRight: Variants = {
   initial: { x: 50, opacity: 0 },
   visible: { /* ... */ },
};
export const fadeInUp: Variants = {
    initial: { y: 40, opacity: 0 },
    visible: { /* ... */ },
};
export const hoverScale = { /* ... */ }

// Ensure other necessary variants are present and exported
