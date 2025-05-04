// src/components/consultation/DateTimePicker.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button'; // Assumes Button handles dark mode
import { Clock, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { getAvailableTimeSlots } from '../../utils/calendly'; // Assuming this exists
import { cn } from '../../utils/cn'; // Assuming cn utility exists

interface DateTimePickerProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onNext,
  onBack
}: DateTimePickerProps) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      setError('');
      setAvailableSlots([]); // Clear previous slots immediately
      onTimeChange(''); // Clear selected time when date changes
      getAvailableTimeSlots(selectedDate)
        .then(slots => {
          setAvailableSlots(slots);
          if (slots.length === 0) {
              setError('No available times found for this date.'); // Set error if no slots
          }
        })
        .catch(error => {
          console.error('Error fetching time slots:', error);
          setError('Could not fetch available times. Please try again or select another date.');
        })
        .finally(() => setLoading(false));
    } else {
      // Reset when date is cleared
      setAvailableSlots([]);
      setError('');
      onTimeChange('');
    }
    // Added onTimeChange to dependency array to reset time when date changes
  }, [selectedDate, onTimeChange]);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ensure comparison is date-only
  const minDate = today.toISOString().split('T')[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Title with dark mode color */}
      <h2 className="text-2xl font-semibold text-primary dark:text-gray-100 mb-6">
        Choose Date & Time
      </h2>
      <div className="space-y-6">
        {/* Date Input */}
        <div>
          {/* Label with dark mode color */}
          <label htmlFor="consultation-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Date
          </label>
          <input
            id="consultation-date"
            type="date"
            className={cn(
              "w-full p-3 border rounded-lg focus:ring-2 focus:ring-offset-0", // Base styles
              "border-gray-300 dark:border-gray-600", // Border
              "bg-white dark:bg-gray-700", // Background
              "text-gray-900 dark:text-gray-100", // Text color
              "focus:ring-primary dark:focus:ring-blue-500", // Focus ring
              "focus:border-primary dark:focus:border-blue-500", // Focus border
              "dark:[color-scheme:dark]" // Hint for browser to use dark date picker UI if supported
            )}
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            min={minDate} // Prevent selecting past dates
          />
        </div>

        {/* Time Slot Selection */}
        {/* Loading State */}
        {loading && (
          <div className="text-center py-4 text-gray-600 dark:text-gray-400">Loading available times...</div>
        )}
        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-4 text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
             <AlertCircle className="w-5 h-5" /> {error}
          </div>
        )}
        {/* No Slots State (handled by error state now) */}
        {/* {!loading && !error && selectedDate && availableSlots.length === 0 && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">No available times for this date.</div>
        )} */}

        {/* Available Slots */}
        {!loading && !error && availableSlots.length > 0 && (
          <div>
            {/* Label with dark mode color */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Available Time
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {availableSlots.map((time) => {
                const timeString = new Date(time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true // Use AM/PM format
                });
                const isSelected = selectedTime === time;

                return (
                  <motion.button
                    key={time}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={cn(
                        "p-3 rounded-lg border text-sm sm:text-base flex items-center justify-center gap-2 transition-colors duration-150",
                        "border-gray-300 dark:border-gray-600", // Base border
                        isSelected
                        ? 'bg-primary text-white dark:bg-blue-500 dark:text-white border-primary dark:border-blue-500 font-medium ring-1 ring-primary dark:ring-blue-500' // Selected state
                        : 'bg-white dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-primary-light/50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500' // Default state
                    )}
                    onClick={() => onTimeChange(time)}
                  >
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    {timeString}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime || loading || error} // Disable if no date/time or loading/error
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}
