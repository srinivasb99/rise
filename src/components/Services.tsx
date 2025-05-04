// src/components/Services.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Search, PenTool, MessageSquare, Globe, BarChart3, Zap, CheckCircle, CheckIcon, Users, Briefcase, LineChart, Rocket, Award, ShieldCheck, Layers, Smartphone, Lock, BarChart, Heart, X
} from 'lucide-react';
import { Button } from './Button'; // Assuming Button has dark mode
import { cn } from '../utils/cn'; // Assuming cn utility

// --- Animation Variants --- (Keep as they are)
const containerVariants = { /* ... */ };
const itemVariants = { /* ... */ };
const iconHover = { /* ... */ };
const modalVariants = { /* ... */ };

// --- Reusable Modal Component (Updated with Dark Mode) ---
const Modal = ({ isOpen, onClose, title, content, Icon }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        // Overlay with dark mode adjustment
        <motion.div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Content Card */}
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="modal-title"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl relative max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]" // Added dark bg
            variants={modalVariants} initial="hidden" animate="visible" exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose} aria-label="Close Modal"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            > <X className="w-6 h-6" /> </button>

            {/* Modal Header */}
            <div className="flex items-center mb-5 pr-8"> {/* Added padding right */}
              {Icon && <Icon className="w-8 h-8 text-primary dark:text-blue-400 mr-3 flex-shrink-0" />} {/* Dark icon color */}
              <h2 id="modal-title" className="text-2xl font-bold text-primary dark:text-gray-100">{title}</h2> {/* Dark title color */}
            </div>

            {/* Modal Body */}
            <div className="text-gray-700 dark:text-gray-300 space-y-5"> {/* Dark base text color */}
              {/* Overview */}
              {content.overview && (
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Overview</h3>
                  <p className="text-sm sm:text-base">{content.overview}</p>
                </div>
              )}
              {/* Key Features */}
              {content.keyFeatures && content.keyFeatures.length > 0 && (
                <div>
                   <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Features</h3>
                   <ul className="space-y-1.5">
                    {content.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                         <CheckIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" /> {/* Check icon color OK on dark */}
                        <span className="text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Process */}
               {content.process && content.process.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Process</h3>
                  <ul className="space-y-3">
                    {content.process.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                         {/* Dark step number style */}
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-light text-primary dark:bg-blue-900/50 dark:text-blue-300 font-bold flex-shrink-0 text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{step.name}</span>
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
                      <p className="text-sm sm:text-base">{content.pricing}</p>
                  </div>
              )}
              {/* Additional Info */}
              {content.additionalInfo && (
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Additional Information</h3>
                  <p className="text-sm sm:text-base">{content.additionalInfo}</p>
                </div>
              )}

              {/* Modal Footer Buttons */}
              <div className="flex flex-wrap gap-2 justify-start pt-5 border-t border-gray-200 dark:border-gray-700">
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


// --- Data Arrays --- (Keep as they are)
const services = [ /* ... your service data ... */ ];
const workflowSteps = [ /* ... your workflow data ... */ ];

// --- Main Services Component ---
export function Services() { // Renamed from ServicesPage if this is the component version
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: {}, Icon: null });

  const openModal = (title, content, Icon) => {
    setModalData({ isOpen: true, title, content, Icon });
  };
  const closeModal = () => {
    setModalData({ isOpen: false, title: '', content: {}, Icon: null });
  };

  return (
    // Main container with dark background
    <div className="py-24 bg-primary dark:bg-gray-950 w-full transition-colors duration-300">
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24" // Added responsive spacing
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} // Adjusted viewport
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div className="text-center" variants={itemVariants}>
           {/* Dark mode text */}
          <h2 className="text-3xl font-extrabold text-white dark:text-gray-100 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300 dark:text-gray-400">
            Comprehensive digital solutions to help your business thrive online.
          </p>
        </motion.div>

        {/* Services Section */}
        <motion.div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
          {services.map((service) => {
            const Icon = service.icon;
            const SecondaryIcon = service.secondaryIcon;
            return (
              // Service Card Styling for dark mode
              <motion.div
                key={service.title} variants={itemVariants} whileHover={{ y: -5 }}
                className={cn(
                    "relative group p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer",
                    "bg-[#003366] dark:bg-gray-800" // Card background
                )}
                onClick={() => openModal(service.title, service.detailed, service.icon)}
              >
                {/* Secondary Icon Styling */}
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-15 dark:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300">
                   <SecondaryIcon className="w-20 h-20 text-white/50 dark:text-gray-500" /> {/* Adjusted colors */}
                </div>
                {/* Primary Icon */}
                 <motion.span
                  className={cn(
                      "rounded-lg inline-flex p-3 text-white group-hover:text-white transition-colors duration-300 mb-4 block",
                      "bg-[#004080] dark:bg-gray-700 dark:text-blue-300", // Icon background/color
                      "group-hover:bg-[#00509E] dark:group-hover:bg-gray-600" // Hover background
                  )}
                  variants={iconHover} whileHover="hover"
                > <Icon className="h-6 w-6" aria-hidden="true" /> </motion.span>
                {/* Text Content */}
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
          className="w-full pt-12" // Removed redundant bg, added padding top
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}
        >
           {/* Title Dark Mode */}
           <motion.h3 className="text-2xl font-extrabold text-white dark:text-gray-100 text-center mb-12" variants={itemVariants}>
            Our Workflow
          </motion.h3>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants}>
            {workflowSteps.map((step) => (
              // Workflow Card Styling for Dark Mode
              <motion.div
                key={step.step} variants={itemVariants} whileHover={{ y: -5 }}
                className={cn(
                    "flex flex-col items-center text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer",
                    "bg-[#004080] dark:bg-gray-800" // Card background
                )}
                onClick={() => openModal(step.step, step.detailed, step.icon)}
              >
                {/* Workflow Icon */}
                 <motion.span
                  className={cn(
                    "rounded-full p-3 mb-4 transition-colors duration-300",
                    "bg-[#00509E] dark:bg-gray-700" // Icon background
                  )}
                  variants={iconHover} whileHover="hover"
                > <step.icon className="w-12 h-12 text-white dark:text-blue-300" /> </motion.span> {/* Icon color */}
                {/* Workflow Text */}
                <h4 className="text-lg font-bold text-white dark:text-gray-100">{step.step}</h4>
                <p className="text-gray-300 dark:text-gray-400 mt-2 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Render the Modal */}
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
