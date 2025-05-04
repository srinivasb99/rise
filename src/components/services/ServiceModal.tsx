// src/components/services/ServiceModal.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { Button } from '../Button'; // Assumes Button handles dark mode
import type { Service } from '../../data/services'; // Assuming type exists
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn'; // Assuming cn utility exists

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

// Modal animation variants (adjust timings as needed)
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring", // Using spring for a bouncier feel
      damping: 20,
      stiffness: 300,
      when: "beforeChildren", // Animate children after modal appears
      staggerChildren: 0.05 // Stagger children slightly
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

// Content item animation variants
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 150, damping: 20 }
  }
};

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  if (!service) return null; // Don't render if no service is selected

  const Icon = service.icon;

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/60 dark:bg-black/75 z-[100] flex items-center justify-center p-4" // Increased z-index, added dark opacity
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Close on overlay click
      >
        {/* Modal Content Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          className={cn(
            "bg-white dark:bg-gray-800", // Light/dark backgrounds
            "rounded-xl shadow-2xl", // Styling
            "max-w-2xl w-full max-h-[90vh] overflow-y-auto", // Size and scroll
            "flex flex-col", // Ensure vertical layout
            "transition-colors duration-300" // Smooth theme transition
          )}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {/* Modal Header */}
          <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-700 relative flex-shrink-0"> {/* Dark border */}
            {/* Close Button */}
            <motion.button
              className="absolute right-4 top-4 sm:right-5 sm:top-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-all" // Added padding, bg on hover
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              aria-label="Close modal" // Accessibility
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
            {/* Icon and Title */}
            <motion.div variants={contentVariants} className="flex items-start sm:items-center gap-3 sm:gap-4 pr-8"> {/* Adjust gap/padding */}
              <span className={cn(
                  "rounded-lg inline-flex p-3 shadow",
                  "bg-primary-light text-primary", // Use theme colors
                  "dark:bg-gray-700 dark:text-blue-300" // Dark mode styles
              )}>
                <Icon className="h-6 w-6 sm:h-8 sm:h-8" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-primary dark:text-gray-100 mt-1 sm:mt-0">{service.title}</h2>{/* Dark text */}
            </motion.div>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-6 flex-grow"> {/* Added flex-grow */}
            {/* Overview */}
            <motion.div variants={contentVariants}>
              <h3 className="text-lg font-semibold text-primary dark:text-gray-200 mb-2 sm:mb-3">Overview</h3> {/* Dark text */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{service.description}</p> {/* Dark text */}
            </motion.div>

            {/* Key Features */}
            {service.features && service.features.length > 0 && (
              <motion.div variants={contentVariants}>
                <h3 className="text-lg font-semibold text-primary dark:text-gray-200 mb-2 sm:mb-3">Key Features</h3> {/* Dark text */}
                <ul className="space-y-2 sm:space-y-3">
                  {service.features.map((feature, index) => (
                    <motion.li
                      key={`feature-${index}`} // Use index for key if feature isn't unique
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }} // Stagger animation
                      className="flex items-center text-sm sm:text-base text-gray-600 dark:text-gray-300" // Dark text
                    >
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Process Steps */}
            {service.process && service.process.length > 0 && (
              <motion.div variants={contentVariants}>
                <h3 className="text-lg font-semibold text-primary dark:text-gray-200 mb-3 sm:mb-4">Process</h3> {/* Dark text */}
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <motion.div
                      key={`process-${index}`} // Use index for key
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + index * 0.07 }} // Stagger animation
                      className="flex items-start gap-3 sm:gap-4"
                    >
                      {/* Step Number Circle */}
                      <div className={cn(
                          "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 font-medium text-sm",
                          "bg-primary-light text-primary", // Light mode
                          "dark:bg-blue-900/50 dark:text-blue-300" // Dark mode
                      )}>
                        {index + 1}
                      </div>
                      {/* Step Text */}
                      <div>
                        <h4 className="font-medium text-primary dark:text-gray-200 text-sm sm:text-base">{step.title}</h4> {/* Dark text */}
                        <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p> {/* Dark text */}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

           {/* Modal Footer with Buttons */}
            <motion.div
                variants={contentVariants}
                className="p-5 sm:p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl" // Dark border/bg
            >
                 {/* Use Button components which handle their own dark mode */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
                    <Button variant="outline" onClick={onClose} className="w-full sm:w-auto order-2 sm:order-1">
                        Close
                    </Button>
                    <Link to="/consultation" className="w-full sm:w-auto order-1 sm:order-2">
                         <Button className="w-full"> {/* Primary button full width on mobile */}
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                         </Button>
                    </Link>
                </div>
            </motion.div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
