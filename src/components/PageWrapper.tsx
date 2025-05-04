// src/components/PageWrapper.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../utils/animations'; // Assuming animations exist
import { cn } from '../utils/cn'; // Assuming cn utility

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // Add base dark background if needed for page content areas
      // This might conflict with specific page backgrounds like Hero or Login
      // Apply dark backgrounds within specific page components if needed instead.
      className={cn(
          "transition-colors duration-300", // Smooth transition
          className
      )}
    >
      {children}
    </motion.div>
  );
}
