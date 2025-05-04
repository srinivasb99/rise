// src/components/Services.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Search, PenTool, MessageSquare, Globe, BarChart3, Zap, CheckCircle, CheckIcon, Users, Briefcase, LineChart, Rocket, Award, ShieldCheck, Layers, Smartphone, Lock, BarChart, Heart, X
} from 'lucide-react';
import { cn } from '../utils/cn'; // Assuming cn utility

// ... (animations remain the same)
const containerVariants = { /* ... */ };
const itemVariants = { /* ... */ };
const iconHover = { /* ... */ };
const modalVariants = { /* ... */ };

// Update Modal Component for Dark Mode
const Modal = ({ isOpen, onClose, title, content, Icon }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        // Overlay
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Content - Add dark mode styles */}
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="modal-title"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg relative max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]"
            variants={modalVariants} initial="hidden" animate="visible" exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose} aria-label="Close Modal"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            > <X className="w-6 h-6" /> </button>

            {/* Modal Header */}
            <div className="flex items-center mb-4">
              {Icon && <Icon className="w-8 h-8 text-[#002B5B] dark:text-blue-400 mr-3" />}
              <h2 id="modal-title" className="text-2xl font-bold text-[#002B5B] dark:text-gray-100">{title}</h2>
            </div>

            {/* Modal Body - Update text colors */}
            <div className="text-gray-700 dark:text-gray-300 space-y-6">
              {/* Overview */}
              {content.overview && (
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Overview</h3>
                  <p>{content.overview}</p>
                </div>
              )}

              {/* Key Features */}
              {content.keyFeatures && content.keyFeatures.length > 0 && (
                <div>
                   <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Features</h3>
                   <ul className="space-y-1">
                    {content.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                         {/* Check icon color might not need change if green is ok on dark */}
                        <CheckIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

               {/* Process Steps */}
               {content.process && content.process.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Process</h3>
                  <ul className="space-y-3">
                    {content.process.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        {/* Adjust step circle colors */}
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{step.name}</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing */}
              {content.pricing && (
                  <div>
                      <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Pricing</h3>
                      <p>{content.pricing}</p>
                  </div>
              )}
              {/* Add more sections if needed */}

              {/* Modal Footer Buttons - Leverage updated Button component */}
              <div className="flex flex-wrap gap-2 justify-start pt-4 border-t border-gray-200 dark:border-gray-700">
                 {content.buttons?.map((button, index) => (
                  button.action === 'close' ? (
                    <Button key={index} onClick={onClose} variant="outline" size="sm">{button.label}</Button>
                  ) : (
                    <a key={index} href={button.link} target={button.external ? "_blank" : "_self"} rel={button.external ? "noopener noreferrer" : ""}>
                       <Button variant="primary" size="sm">{button.label}</Button>
                    </a>
                  )
                ))}
                {/* Default close button */}
                {!content.buttons?.some(b => b.action === 'close') && (
                    <Button onClick={onClose} variant="outline" size="sm">Close</Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// ... (services, stats, workflowSteps data remains the same)
const services = [ /* ... your service data ... */ ];
const workflowSteps = [ /* ... your workflow data ... */ ];

export function Services() {
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: {}, Icon: null });
  // ... (openModal, closeModal functions remain the same)
   const openModal = (title, content, Icon) => {
    setModalData({ isOpen: true, title, content, Icon });
  };
  const closeModal = () => {
    setModalData({ isOpen: false, title: '', content: {}, Icon: null });
  };


  return (
    // Update main background
    <div className="py-24 bg-[#001F3F] dark:bg-gray-950 w-full">
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24"
        initial="hidden" animate="visible" variants={containerVariants}
      >
        {/* Section Title - Update text colors */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-extrabold text-white dark:text-gray-100 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 dark:text-gray-400">
            Comprehensive digital solutions to help your business thrive online.
          </p>
        </motion.div>

        {/* Services Section */}
        <motion.div className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
          {services.map((service) => {
            const Icon = service.icon;
            const SecondaryIcon = service.secondaryIcon;
            return (
              // Update service card styles
              <motion.div
                key={service.title} variants={itemVariants} whileHover={{ y: -5 }}
                className="relative group bg-[#003366] dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => openModal(service.title, service.detailed, service.icon)}
              >
                {/* Update secondary icon appearance */}
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                   <SecondaryIcon className="w-20 h-20 text-white dark:text-gray-500" />
                </div>
                {/* Update primary icon background */}
                 <motion.span
                  className="rounded-lg inline-flex p-3 bg-[#004080] dark:bg-gray-700 text-white dark:text-blue-300 group-hover:bg-[#00509E] dark:group-hover:bg-gray-600 transition-colors duration-300 mb-4 block"
                  variants={iconHover} whileHover="hover"
                > <Icon className="h-6 w-6" aria-hidden="true" /> </motion.span>
                 {/* Update text colors */}
                <div>
                  <h3 className="text-xl font-bold text-white dark:text-gray-100">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-300 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Workflow Section */}
        <motion.div
          className="w-full mt-24 py-12 px-4 sm:px-6 lg:px-8" // Removed redundant bg color
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}
        >
           {/* Update title color */}
           <motion.h3 className="text-2xl font-extrabold text-white dark:text-gray-100 text-center mb-12" variants={itemVariants}>
            Our Workflow
          </motion.h3>
          <motion.div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants}>
            {workflowSteps.map((step) => (
              // Update workflow card styles
              <motion.div
                key={step.step} variants={itemVariants} whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center bg-[#004080] dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => openModal(step.step, step.detailed, step.icon)}
              >
                {/* Update icon background and color */}
                 <motion.span
                  className="rounded-full bg-[#00509E] dark:bg-gray-700 p-3 mb-4"
                  variants={iconHover} whileHover="hover"
                > <step.icon className="w-12 h-12 text-white dark:text-blue-300" /> </motion.span>
                 {/* Update text colors */}
                <h4 className="text-lg font-bold text-white dark:text-gray-100">{step.step}</h4>
                <p className="text-gray-300 dark:text-gray-400 mt-2">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal Instance */}
      <Modal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        content={modalData.content}
        Icon={modalData.Icon}
      />
    </div>
  );
}
