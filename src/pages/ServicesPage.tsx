import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { Button } from '../components/Button';
import { PageWrapper } from '../components/PageWrapper';
import { itemVariants, containerVariants, floatingAnimation } from '../utils/animations';
import { services } from '../data/services';
import { useNavigate } from 'react-router-dom';

export function ServicesPage() {
  const navigate = useNavigate(); // Move this inside the functional component

export function ServicesPage() {
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
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <motion.div 
                    className="flex items-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <span className="rounded-lg inline-flex p-3 bg-[#E0F0FF] text-[#002B5B]">
                        <Icon className="h-6 w-6" />
                      </span>
                    </motion.div>
                    <div className="ml-5">
                      <h3 className="text-xl font-semibold text-[#002B5B]">{service.title}</h3>
                    </div>
                  </motion.div>
                  <p className="mt-4 text-gray-600">{service.description}</p>
                  <motion.ul className="mt-6 space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (featureIndex * 0.1) }}
                        className="flex items-center text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#002B5B] mr-2"></div>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div
                    className="mt-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="outline" className="whitespace-nowrap">Learn More</Button>
                  </motion.div>
                </motion.div>
              );
            })}
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
            onClick={() => navigate('/consultation')}
          >
            Schedule a Consultation
          </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
