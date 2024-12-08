import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';

const services = [
  'Website Development',
  'SEO & Digital Marketing',
  'Branding & Strategy',
  'Content & Social Media',
  'Mobile App Development',
  'Cybersecurity',
  'Analytics & Reporting',
  'Digital Transformation',
];

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

export function ConsultationPage() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      services: selectedServices,
      date: selectedDate,
      time: selectedTime,
    });
  };

  return (
    <div className="pt-16">
      <div className="bg-[#E0F0FF] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-[#002B5B]">Schedule a Consultation</h1>
            <p className="mt-4 text-xl text-gray-600">
              Let's discuss how we can help transform your business
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className={`flex items-center ${i <= step ? 'text-[#002B5B]' : 'text-gray-400'}`}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step ? 'bg-[#002B5B] text-white' : 'bg-gray-200'
                  }`}
                >
                  {i === 1 && <MessageSquare className="w-4 h-4" />}
                  {i === 2 && <Calendar className="w-4 h-4" />}
                  {i === 3 && <Users className="w-4 h-4" />}
                </div>
                <span className="ml-2 font-medium">
                  {i === 1 && 'Services'}
                  {i === 2 && 'Schedule'}
                  {i === 3 && 'Details'}
                </span>
              </motion.div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-semibold text-[#002B5B] mb-6">
                  Select Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service) => (
                    <motion.div
                      key={service}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-[#E0F0FF] transition-colors">
                        <input
                          type="checkbox"
                          className="form-checkbox text-[#002B5B]"
                          checked={selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                        />
                        <span className="ml-3">{service}</span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
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
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {timeSlots.map((time) => (
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
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className="w-4 h-4 inline-block mr-2" />
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-semibold text-[#002B5B] mb-6">
                  Your Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:ring-[#002B5B] focus:border-[#002B5B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border rounded-lg focus:ring-[#002B5B] focus:border-[#002B5B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 border rounded-lg focus:ring-[#002B5B] focus:border-[#002B5B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      className="w-full p-3 border rounded-lg focus:ring-[#002B5B] focus:border-[#002B5B]"
                      rows={4}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep((prev) => prev - 1)}
                >
                  Previous
                </Button>
              )}
              <Button
                type="button"
                onClick={() => {
                  if (step < 3) {
                    setStep((prev) => prev + 1);
                  } else {
                    handleSubmit;
                  }
                }}
              >
                {step === 3 ? 'Schedule Consultation' : 'Next'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
