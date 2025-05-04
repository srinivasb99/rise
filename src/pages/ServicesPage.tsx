// src/pages/ServicesPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Button } from '../components/Button'; // Assumes Button handles dark mode
import { PageWrapper } from '../components/PageWrapper';
// These components need dark mode styles applied internally:
import { ServiceCard } from '../components/services/ServiceCard';
import { ServiceModal } from '../components/services/ServiceModal';
import { itemVariants, containerVariants, floatingAnimation } from '../utils/animations';
import { services } from '../data/services'; // Assumes data source exists
import type { Service } from '../data/services'; // Assumes type definition exists
import { cn } from '../utils/cn'; // Assuming cn utility

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    // Add base page background for dark mode
    <PageWrapper className="bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="pt-16"> {/* Offset for fixed navbar */}

        {/* Top Section */}
        <div className="bg-[#E0F0FF] dark:bg-gradient-to-b dark:from-[#071324] dark:to-[#030912] py-24 relative overflow-hidden transition-colors duration-300">
           {/* Floating Icons - Adjust color/opacity */}
          <motion.div
            variants={floatingAnimation} initial="initial" animate="animate"
            className="absolute top-10 right-10 text-[#002B5B]/[0.1] dark:text-blue-300/10"
          > <Sparkles className="w-32 h-32" /> </motion.div>
          <motion.div
            variants={floatingAnimation} initial="initial" animate="animate"
            className="absolute bottom-10 left-10 text-[#002B5B]/[0.1] dark:text-blue-300/10"
            transition={{ delay: 0.5 }}
          > <Heart className="w-24 h-24" /> </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              variants={containerVariants} initial="initial" animate="animate"
              className="text-center"
            >
               {/* Heading - Dark mode text */}
              <motion.h1 variants={itemVariants} className="text-4xl font-bold text-[#002B5B] dark:text-gray-100">
                Our Services
              </motion.h1>
               {/* Subheading - Dark mode text */}
              <motion.p variants={itemVariants} className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Comprehensive digital solutions tailored to your business needs
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Services Grid Section */}
        {/* Background is handled by PageWrapper */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            variants={containerVariants} initial="initial" animate="animate"
            className="grid grid-cols-1 gap-12 md:grid-cols-2" // Adjusted grid columns
          >
            {services.map((service, index) => (
              // ServiceCard needs to handle its own dark mode styling internally
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                onLearnMore={setSelectedService}
              />
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          // Dark mode background for CTA
          className="bg-[#002B5B] dark:bg-gray-900 py-24 transition-colors duration-300"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             {/* Dark mode text */}
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white dark:text-gray-100 mb-6">
              Ready to Get Started?
            </motion.h2>
             {/* Dark mode text */}
            <motion.p variants={itemVariants} className="text-xl text-gray-300 dark:text-gray-400 mb-8">
              Let's discuss how we can help transform your business
            </motion.p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
               {/* Button component should handle dark mode variants */}
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.open('https://calendly.com/riseonlinesolutions/30min', '_blank')}
              >
                Schedule a Consultation
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ServiceModal needs to handle its own dark mode styling internally */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </PageWrapper>
  );
}
