// src/components/services/ServiceCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button'; // Assumes Button handles dark mode
import type { Service } from '../../data/services'; // Assuming type definition exists
import { itemVariants, iconHover } from '../../utils/animations'; // Assuming animations exist, added iconHover
import { cn } from '../../utils/cn'; // Import cn utility

interface ServiceCardProps {
  service: Service;
  index: number; // Used for animation delay
  onLearnMore: (service: Service) => void;
}

export function ServiceCard({ service, index, onLearnMore }: ServiceCardProps) {
  const Icon = service.icon;

  // Determine animation delay based on index
  const baseDelay = index * 0.1;

  return (
    <motion.div
      variants={itemVariants} // Apply item animation variant
      // Removed initial/animate from here as the parent motion.div in ServicesPage handles stagger
      whileHover={{ y: -6, scale: 1.02 }} // Consistent hover effect
      className={cn(
        "bg-white dark:bg-gray-800", // Light and dark backgrounds
        "p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-2xl", // Padding, rounding, shadow
        "transition-all duration-300", // Smooth transitions for hover and color
        "flex flex-col", // Ensure flex column layout
        "dark:border dark:border-gray-700" // Subtle border in dark mode
      )}
    >
      {/* Icon and Title Row */}
      <motion.div
        className="flex items-center mb-4" // Added margin-bottom
        // Simplified animation - applied by parent stagger
      >
        {/* Icon with background */}
        <motion.div
          className="flex-shrink-0"
          variants={iconHover} // Use iconHover variant from previous examples if desired
          whileHover="hover" // Apply hover animation to icon container
        >
          <span className={cn(
            "rounded-lg inline-flex p-3 shadow",
            "bg-primary-light text-primary", // Using defined theme colors
            "dark:bg-gray-700 dark:text-blue-300" // Dark mode icon bg/color
          )}>
            <Icon className="h-6 w-6" />
          </span>
        </motion.div>
        {/* Title */}
        <div className="ml-4 sm:ml-5">
          <h3 className="text-lg sm:text-xl font-semibold text-primary dark:text-gray-100 line-clamp-1"> {/* Dark text, limit lines */}
            {service.title}
          </h3>
        </div>
      </motion.div>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-5 line-clamp-3 flex-grow"> {/* Allow description to grow, limit lines */}
        {service.description}
      </p>

      {/* Features List (Assuming features exist in your Service type) */}
      {service.features && service.features.length > 0 && (
        <motion.ul className="space-y-2 mb-6"> {/* Adjusted spacing */}
          {service.features.slice(0, 3).map((feature, featureIndex) => ( // Show max 3 features
            <motion.li
              key={featureIndex} // Use index if feature strings aren't unique
              // Animate each feature list item
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: baseDelay + (featureIndex * 0.05) + 0.1 }} // Stagger feature animation slightly after card appears
              className="flex items-center text-sm text-gray-600 dark:text-gray-400"
            >
              {/* Bullet point with dark mode color */}
              <div className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-blue-400 mr-2 flex-shrink-0"></div>
              <span className="line-clamp-1">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* Learn More Button */}
      <motion.div
        className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50" // Separator line, push button to bottom
        // Animate button appearance slightly later
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: baseDelay + 0.3 }}
      >
        <Button
          variant="outline"
          size="sm" // Use consistent small size
          className="w-full" // Make button full width
          onClick={() => onLearnMore(service)}
        >
          Learn More
        </Button>
      </motion.div>
    </motion.div>
  );
}
