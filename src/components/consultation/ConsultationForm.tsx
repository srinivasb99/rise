// src/components/consultation/ConsultationForm.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button'; // Assumes Button handles dark mode
import type { Service } from '../../data/services';
import { cn } from '../../utils/cn'; // Assuming cn utility exists

interface ConsultationFormProps {
  services: Service[]; // Accept services as a prop
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
  onNext: () => void;
}

export function ConsultationForm({
  services,
  selectedServices,
  onServiceToggle,
  onNext
}: ConsultationFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Title with dark mode color */}
      <h2 className="text-2xl font-semibold text-primary dark:text-gray-100 mb-6">
        Which services are you interested in?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <motion.div
            key={service.title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Label container with dark mode styles */}
            <label
              className={cn(
                "flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200",
                "border-gray-300 dark:border-gray-600", // Border color
                "hover:bg-primary-light/50 dark:hover:bg-gray-700/50", // Hover background
                selectedServices.includes(service.title)
                  ? "bg-primary-light border-primary dark:bg-gray-700 dark:border-blue-400 ring-1 ring-primary dark:ring-blue-400" // Selected styles
                  : "bg-white dark:bg-gray-800" // Default background
              )}
            >
              {/* Checkbox - Using accent color for better cross-browser styling */}
              {/* Consider @tailwindcss/forms plugin for more control */}
              <input
                type="checkbox"
                className={cn(
                    "form-checkbox h-5 w-5 rounded border-gray-400 dark:border-gray-500 focus:ring-primary dark:focus:ring-blue-500 focus:ring-offset-0", // Basic styling
                    "text-primary dark:text-blue-500", // Check color
                    "bg-white dark:bg-gray-700" // Background when unchecked
                )}
                checked={selectedServices.includes(service.title)}
                onChange={() => onServiceToggle(service.title)}
              />
              {/* Label text with dark mode color */}
              <span className="ml-3 text-gray-800 dark:text-gray-200 select-none">
                {service.title}
              </span>
            </label>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end"> {/* Add separator and align button right */}
        <Button
          onClick={onNext}
          disabled={selectedServices.length === 0}
          className="sm:w-auto" // Adjust width
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}
