import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';
import { Clock } from 'lucide-react';
import { getAvailableTimeSlots } from '../../utils/calendly';

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

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      getAvailableTimeSlots(selectedDate)
        .then(slots => setAvailableSlots(slots))
        .catch(error => console.error('Error fetching time slots:', error))
        .finally(() => setLoading(false));
    }
  }, [selectedDate]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-[#002B5B] mb-6">
        Choose Date & Time
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:ring-[#002B5B] focus:border-[#002B5B]"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading available times...</div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableSlots.map((time) => (
                <motion.button
                  key={time}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg border ${
                    selectedTime === time
                      ? 'bg-[#002B5B] text-white'
                      : 'hover:bg-[#E0F0FF]'
                  }`}
                  onClick={() => onTimeChange(time)}
                >
                  <Clock className="w-4 h-4 inline-block mr-2" />
                  {new Date(time).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit'
                  })}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}
