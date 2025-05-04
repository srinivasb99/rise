// src/components/consultation/UserDetailsForm.tsx
import React, { useState } from 'react'; // Added useState for loading state
import { motion } from 'framer-motion';
import { Button } from '../Button'; // Assumes Button handles dark mode
import { cn } from '../../utils/cn'; // Assuming cn utility exists

interface UserDetailsFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => Promise<void> | void; // Allow onSubmit to be async for potential API calls
  onBack: () => void;
}

export function UserDetailsForm({ onSubmit, onBack }: UserDetailsFormProps) {
  const [isLoading, setIsLoading] = useState(false); // Add loading state for submission

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading true on submit
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      notes: formData.get('notes') as string,
    };

    try {
      // Allow onSubmit to be async
      await Promise.resolve(onSubmit(data));
      // If onSubmit resolves without error, assume success (or handle success state if needed)
    } catch (error) {
      console.error("Submission error:", error);
      // Handle submission error display if needed
    } finally {
      setIsLoading(false); // Set loading false after submission attempt
    }
  };

  // Helper function for input classes
  const inputClasses = cn(
      "w-full p-3 border rounded-lg focus:ring-2 focus:ring-offset-0 text-sm sm:text-base", // Base styles + size
      "border-gray-300 dark:border-gray-600", // Border
      "bg-white dark:bg-gray-700", // Background
      "text-gray-900 dark:text-gray-100", // Text color
      "placeholder-gray-400 dark:placeholder-gray-500", // Placeholder color
      "focus:ring-primary dark:focus:ring-blue-500", // Focus ring
      "focus:border-primary dark:focus:border-blue-500", // Focus border
      "disabled:opacity-50" // Disabled state
  );

   // Helper function for label classes
   const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      {/* Title with dark mode color */}
      <h2 className="text-2xl font-semibold text-primary dark:text-gray-100 mb-6">
        Your Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6"> {/* Adjusted spacing */}
        {/* Name Input */}
        <div>
          <label htmlFor="name" className={labelClasses}>Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className={inputClasses}
            placeholder="e.g. Jane Doe"
            disabled={isLoading}
          />
        </div>
        {/* Email Input */}
        <div>
          <label htmlFor="email" className={labelClasses}>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className={inputClasses}
            placeholder="e.g. jane.doe@example.com"
            disabled={isLoading}
          />
        </div>
        {/* Phone Input */}
        <div>
          <label htmlFor="phone" className={labelClasses}>Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            required
            className={inputClasses}
            placeholder="e.g. (555) 123-4567"
            disabled={isLoading}
          />
        </div>
        {/* Notes Textarea */}
        <div>
          <label htmlFor="notes" className={labelClasses}>Additional Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className={inputClasses}
            placeholder="Any specific requirements or questions?"
            disabled={isLoading}
          />
        </div>
        {/* Navigation/Submit Buttons */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto order-2 sm:order-1" // Back button below on mobile
            disabled={isLoading}
          >
            Back
          </Button>
          <Button
             type="submit"
             className="w-full sm:w-auto order-1 sm:order-2" // Submit button above on mobile
             disabled={isLoading}
          >
            {isLoading ? 'Scheduling...' : 'Schedule Consultation'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
