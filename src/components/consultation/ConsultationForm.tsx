import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';
import type { Service } from '../../data/services';

interface ConsultationFormProps {
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
  onNext: () => void;
}

export function ConsultationForm({
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
      <h2 className="text-2xl font-semibold text-[#002B5B] mb-6">
        Select Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <motion.div
            key={service.title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-[#E0F0FF] transition-colors">
              <input
                type="checkbox"
                className="form-checkbox text-[#002B5B]"
                checked={selectedServices.includes(service.title)}
                onChange={() => onServiceToggle(service.title)}
              />
              <span className="ml-3">{service.title}</span>
            </label>
          </motion.div>
        ))}
      </div>
      <div className="mt-8">
        <Button
          onClick={onNext}
          disabled={selectedServices.length === 0}
          className="w-full sm:w-auto"
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}
