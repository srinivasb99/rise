import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';

interface UserDetailsFormProps {
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => void;
  onBack: () => void;
}

export function UserDetailsForm({ onSubmit, onBack }: UserDetailsFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      notes: formData.get('notes') as string,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-2xl font-semibold text-[#002B5B] mb-6">
        Your Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full p-3 border rounded-lg focus:ring-[#002B5B] focus:border-[#002B5B]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full p-3 border rounded-lg focus:ring-[#002B5B] focus:border-[#002B5B]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            required
            className="w-full p-3 border rounded-lg focus:ring-[#002B5B] focus:border-[#002B5B]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            rows={4}
            className="w-full p-3 border rounded-lg focus:ring-[#002B5B] focus:border-[#002B5B]"
          />
        </div>
        <div className="mt-8 flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Schedule Consultation
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
