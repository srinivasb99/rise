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

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#002B5B] py-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-6"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8"
            >
              Let's discuss how we can help transform your business
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  window.open('https://calendly.com/riseonlinesolutions/30min', '_blank')
                }
              >
                Schedule a Consultation
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </PageWrapper>
  );
}
