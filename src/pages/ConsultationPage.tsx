// src/pages/ConsultationPage.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, MessageSquare, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { Button } from '../components/Button'; // Assumes Button handles dark mode
// Import consultation step components (assumes they handle their own dark mode)
import { ConsultationForm } from '../components/consultation/ConsultationForm';
import { DateTimePicker } from '../components/consultation/DateTimePicker';
import { UserDetailsForm } from '../components/consultation/UserDetailsForm';
// Utils and Data
import { scheduleEvent } from '../utils/calendly'; // Assuming this function exists and works
import { services } from '../data/services'; // Import services data
import { PageWrapper } from '../components/PageWrapper'; // Import PageWrapper
import { cn } from '../utils/cn'; // Assuming cn utility exists

export function ConsultationPage() {
  const [step, setStep] = useState<number>(1);

  // State for the steps
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>(''); // Store the full ISO time string from Calendly/DateTimePicker

  // Loading and error states for final scheduling
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState<boolean>(false);
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
    setScheduleSuccess(false);

    if (!selectedTime || !selectedDate) {
        setError('Invalid date or time selected.');
        setIsScheduling(false);
        return;
    }

    try {
      // Assuming scheduleEvent handles the API call to Calendly or your backend
      await scheduleEvent({
        email,
        name,
        phone, // Pass phone if your scheduleEvent uses it
        date: selectedDate, // YYYY-MM-DD
        time: selectedTime, // Full ISO string or just time part? Ensure scheduleEvent expects the correct format
        notes,
        selectedServices,
      });
      setScheduleSuccess(true);
      // Optionally reset form or redirect after success
      // setStep(1);
      // setSelectedServices([]);
      // setSelectedDate('');
      // setSelectedTime('');
    } catch (err: any) {
      console.error("Scheduling Error:", err);
      setError(err.message || 'Failed to schedule consultation. Please try again or contact support.');
    } finally {
      setIsScheduling(false);
    }
  };

  // Helper function for step indicator class
  const getStepIndicatorClasses = (index: number): string => {
    const isActive = index <= step;
    return cn(
      "flex items-center transition-colors duration-300",
      isActive ? "text-primary dark:text-blue-300" : "text-gray-400 dark:text-gray-500"
    );
  };

  const getStepCircleClasses = (index: number): string => {
     const isActive = index <= step;
     return cn(
        "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
        isActive ? "bg-primary text-white dark:bg-blue-500 dark:text-white" : "bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
     );
  };

  return (
    <PageWrapper className="bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="pt-16"> {/* Offset for fixed navbar */}

        {/* Top Banner Section */}
        <div className="bg-primary-light dark:bg-gray-900 py-16 sm:py-24 transition-colors duration-300"> {/* Dark bg */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Dark mode text */}
              <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-gray-100">Schedule a Consultation</h1>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Let's discuss how our tailored digital solutions can help transform your business.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* Card Container */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 transition-colors duration-300">
            {/* Step indicators */}
            <div className="flex justify-between items-center mb-8 sm:mb-10 pb-6 border-b border-gray-200 dark:border-gray-700">
              {[
                  { index: 1, icon: MessageSquare, label: 'Services' },
                  { index: 2, icon: Calendar, label: 'Schedule' },
                  { index: 3, icon: Users, label: 'Details' }
              ].map(({ index, icon: Icon, label }) => (
                <motion.div
                  key={index}
                  className={getStepIndicatorClasses(index)}
                  whileHover={index > step ? { scale: 1.05 } : undefined} // Hover effect only for future steps
                >
                  <div className={getStepCircleClasses(index)}>
                     <Icon className="w-4 h-4" />
                  </div>
                  <span className="ml-2 font-medium hidden sm:inline">{label}</span> {/* Hide label on small screens */}
                </motion.div>
              ))}
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              {!scheduleSuccess && step === 1 && ( // Show steps only if not successful yet
                <ConsultationForm
                  key="step1"
                  services={services}
                  selectedServices={selectedServices}
                  onServiceToggle={handleServiceToggle}
                  onNext={handleNextStep}
                />
              )}
              {!scheduleSuccess && step === 2 && (
                <DateTimePicker
                  key="step2"
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateChange={setSelectedDate}
                  onTimeChange={setSelectedTime} // Pass handler to update time state
                  onNext={handleNextStep}
                  onBack={handlePreviousStep}
                />
              )}
              {!scheduleSuccess && step === 3 && (
                <UserDetailsForm
                  key="step3"
                  onSubmit={handleUserDetailsSubmit}
                  onBack={handlePreviousStep}
                  // Pass isLoading state if UserDetailsForm accepts it to disable its own submit button
                />
              )}
            </AnimatePresence>

            {/* Scheduling Status / Success Message */}
            <div className="mt-6 min-h-[2rem]"> {/* Reserve space for messages */}
                {error && !isScheduling && !scheduleSuccess && (
                     <div className="text-red-600 dark:text-red-400 text-center text-sm flex items-center justify-center gap-2">
                        <AlertCircle className="w-5 h-5"/> {error}
                     </div>
                )}
                {isScheduling && (
                    <div className="text-gray-600 dark:text-gray-400 text-center text-sm">
                        Scheduling your consultation... Please wait.
                    </div>
                )}
                {scheduleSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-4 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded-lg"
                    >
                         <h3 className="font-semibold text-green-800 dark:text-green-200 text-lg">Consultation Scheduled!</h3>
                         <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                             Thank you, {name}! You'll receive a confirmation email shortly. {/* You might need to get name from state */}
                         </p>
                         {/* Optional: Add button to schedule another or go to dashboard */}
                          <Button onClick={() => window.location.reload()} variant="outline" size="sm" className="mt-4">
                            Schedule Another
                          </Button>
                    </motion.div>
                )}
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
