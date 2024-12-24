import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Sparkles, Heart } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { ContactForm } from '../components/contact/ContactForm';
import { itemVariants, containerVariants, floatingAnimation } from '../utils/animations';

export function ContactPage() {
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
                Contact Us
              </motion.h1>
              <motion.p variants={itemVariants} className="mt-4 text-xl text-gray-600">
                Get in touch with us to discuss your project
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-[#002B5B] mb-6">Send us a message</h2>
              <ContactForm />
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-semibold text-[#002B5B] mb-6">Contact Information</h2>
              <motion.div className="space-y-6">
                {[
                  { icon: Phone, title: 'Phone', content: '+1 (972) 878-7527' },
                  { icon: Mail, title: 'Email', content: 'riseonlinesolutions@gmail.com' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1) }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <item.icon className="h-6 w-6 text-[#002B5B] mt-1" />
                    </motion.div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="mt-1 text-gray-600 whitespace-pre-line">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
