import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';
import { ConsultationForm } from '../components/consultation/ConsultationForm';
import { DateTimePicker } from '../components/consultation/DateTimePicker';
import { UserDetailsForm } from '../components/consultation/UserDetailsForm';
import { scheduleEvent } from '../utils/calendly';
import { services } from '../data/services'; // Import services

export function ConsultationPage() {
  const [step, setStep] = useState<number>(1);

  // State for the steps
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Loading and error states for final scheduling
  const [isScheduling, setIsScheduling] = useState(false);
  const [error, setError] = useState<string>('');

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => setStep((prev) => prev - 1);

  const handleUserDetailsSubmit = async ({
    name,
    email,
    phone,
    notes,
  }: {
    name: string;
    email: string;
    phone: string;
    notes: string;
  }) => {
    setIsScheduling(true);
    setError('');

    try {
      await scheduleEvent({
        email,
        name,
        date: selectedDate,
        time: selectedTime,
        notes,
        selectedServices,
      });
      alert('Consultation scheduled successfully!');
    } catch (err: any) {
      console.error(err);
      setError('Failed to schedule consultation. Please try again.');
    } finally {
      setIsScheduling(false);
    }
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
          {/* Step indicators */}
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

          <AnimatePresence mode="wait">
            {step === 1 && (
              <ConsultationForm
                key="step1"
                services={services}
                selectedServices={selectedServices}
                onServiceToggle={handleServiceToggle}
                onNext={handleNextStep}
              />
            )}
            {step === 2 && (
              <DateTimePicker
                key="step2"
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateChange={setSelectedDate}
                onTimeChange={setSelectedTime}
                onNext={handleNextStep}
                onBack={handlePreviousStep}
              />
            )}
            {step === 3 && (
              <UserDetailsForm
                key="step3"
                onSubmit={handleUserDetailsSubmit}
                onBack={handlePreviousStep}
              />
            )}
          </AnimatePresence>

          {/* Error and loading states */}
          {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
          {isScheduling && (
            <div className="mt-4 text-center">
              Scheduling your consultation...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
