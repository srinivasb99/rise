import { Variants } from 'framer-motion';

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  // Changed 'animate' to 'visible' for consistency with other examples if using whileInView
  // If you are using initial/animate directly, keep 'animate'
  visible: { // or use 'animate' if not using whileInView
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15, // Adjusted damping slightly
    },
  },
  // You might want an exit state for items if the container uses AnimatePresence
  // exit: { opacity: 0, y: -10 },
};


export const containerVariants: Variants = {
  initial: { opacity: 0 },
  // Changed 'animate' to 'visible' for consistency
  visible: { // or use 'animate' if not using whileInView
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2, // Slightly reduced delay
    },
  },
};

export const floatingAnimation = {
  // initial: { y: 0 }, // Often not needed if defined in motion component itself
  animate: {
    y: [-8, 8, -8], // Slightly reduced float distance
    transition: {
      duration: 7, // Slightly longer duration
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Added the missing iconHover export
export const iconHover = {
  // Note: This variant structure is typically used with whileHover="hover"
  // The key 'hover' is the target state name.
  hover: {
    scale: 1.2,
    rotate: 15, // Changed rotation to 15 degrees for a subtler effect
    transition: {
      type: "spring",
      stiffness: 300, // Slightly increased stiffness
      damping: 15
    }
  }
};


export const scaleAnimation = { // Keep if used elsewhere
  initial: { scale: 0.9, opacity: 0.5 }, // Added opacity
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const slideInFromLeft: Variants = {
  initial: { x: -50, opacity: 0 }, // Reduced distance
  visible: { // Changed to visible
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const slideInFromRight: Variants = {
  initial: { x: 50, opacity: 0 }, // Reduced distance
  visible: { // Changed to visible
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export const fadeInUp: Variants = {
  initial: { y: 40, opacity: 0 }, // Reduced distance
  visible: { // Changed to visible
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// You might also want a general hover scale variant
export const hoverScale = {
    hover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 15 }
    }
}
