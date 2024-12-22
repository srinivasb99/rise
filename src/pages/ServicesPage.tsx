import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Button } from '../components/Button';
import { PageWrapper } from '../components/PageWrapper';
import { ServiceCard } from '../components/services/ServiceCard';
import { ServiceModal } from '../components/services/ServiceModal';
import { itemVariants, containerVariants, floatingAnimation } from '../utils/animations';
import { services } from '../data/services';
import type { Service } from '../data/services';
import { useNavigate } from 'react-router-dom';

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const navigate = useNavigate(); // Move this inside the functional component

  return (
    <PageWrapper>
      <div className="pt-16">
        <div className="bg-[#E0F0FF] py-24 relative overflow-hidden">
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="absolute top-10 right-10 text-[#002B5B] opacity-10"
          >
            <Sparkles className="w-32 h-32" />
          </motion.div>
          
          <motion.div
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
            className="absolute bottom-10 left-10 text-[#002B5B] opacity-10"
          >
            <Heart className="w-24 h-24" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="initial"
              animate="animate"
              className="text-center"
            >
              <motion.h1 variants={itemVariants} className="text-4xl font-bold text-[#002B5B]">
                Our Services
              </motion.h1>
              <motion.p variants={itemVariants} className="mt-4 text-xl text-gray-600">
                Comprehensive digital solutions tailored to your business needs
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 gap-12 lg:grid-cols-2"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                onLearnMore={setSelectedService}
              />
            ))}
          </motion.div>
        </div>


  );
}
