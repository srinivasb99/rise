// src/pages/ServicesPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Button } from '../components/Button'; // Assumes Button handles dark mode
import { PageWrapper } from '../components/PageWrapper';
// Import the ServiceCard and ServiceModal (ensure they have dark mode styles)
import { ServiceCard } from '../components/services/ServiceCard';
import { ServiceModal } from '../components/services/ServiceModal';
import { itemVariants, containerVariants, floatingAnimation } from '../utils/animations';
import { services } from '../data/services'; // Assumes data source exists
import type { Service } from '../data/services'; // Assumes type definition exists
import { cn } from '../utils/cn'; // Assuming cn utility

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Function to handle opening the modal
  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    // Add base page background for dark mode and transition
    <PageWrapper className="bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="pt-16"> {/* Offset for fixed navbar */}

        {/* Top Section */}
        <div className={cn(
            "py-20 sm:py-24 relative overflow-hidden transition-colors duration-300",
            "bg-[#E0F0FF] dark:bg-gradient-to-b dark:from-[#071324] dark:to-[#030912]" // Light blue or Dark gradient
        )}>
           {/* Floating Icons - Adjust color/opacity */}
          <motion.div
            variants={floatingAnimation} initial="initial" animate="animate"
            className="absolute top-10 right-10 text-[#002B5B]/[0.1] dark:text-blue-300/10 pointer-events-none" // Ensure icons don't block interaction
          > <Sparkles className="w-24 h-24 sm:w-32 sm:h-32" /> </motion.div>
          <motion.div
            variants={floatingAnimation} initial="initial" animate="animate"
            className="absolute bottom-10 left-10 text-[#002B5B]/[0.1] dark:text-blue-300/10 pointer-events-none"
            transition={{ delay: 0.5 }}
          > <Heart className="w-20 h-20 sm:w-24 sm:h-24" /> </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              variants={containerVariants} initial="initial" whileInView="visible" viewport={{ once: true }} // Animate when visible
              className="text-center"
            >
               {/* Heading - Dark mode text */}
              <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-primary dark:text-gray-100">
                Our Services
              </motion.h1>
               {/* Subheading - Dark mode text */}
              <motion.p variants={itemVariants} className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Comprehensive digital solutions tailored to elevate your business needs and drive success.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Services Grid Section */}
        {/* Background is handled by PageWrapper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="visible" // Animate grid when it comes into view
            viewport={{ once: true, amount: 0.1 }} // Trigger earlier
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10" // Adjusted gaps
          >
            {services.map((service, index) => (
              // ServiceCard component now handles its own internal dark mode styles
              <ServiceCard
                key={service.title}
                service={service}
                index={index} // Pass index if needed for stagger
                onLearnMore={handleLearnMore} // Pass handler
              />
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }} // Simple fade-in for CTA
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          // Dark mode background for CTA
          className={cn(
              "py-20 sm:py-24",
              "bg-primary dark:bg-gray-900", // Dark background
              "transition-colors duration-300"
          )}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             {/* Dark mode text */}
            <h2 className="text-3xl sm:text-4xl font-bold text-white dark:text-gray-100 mb-5">
              Ready to Elevate Your Business?
            </h2>
             {/* Dark mode text */}
            <p className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's connect and discuss how our tailored digital solutions can help you achieve your goals.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               {/* Button component handles dark mode variants */}
              <Button
                variant="secondary" // Secondary might look better on dark blue bg
                size="lg"
                onClick={() => window.open('https://calendly.com/riseonlinesolutions/30min', '_blank')}
              >
                Schedule Your Free Consultation
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ServiceModal component needs to handle its own dark mode styling internally */}
      <ServiceModal
        service={selectedService}
        onClose={handleCloseModal} // Use handler
      />
    </PageWrapper>
  );
}
