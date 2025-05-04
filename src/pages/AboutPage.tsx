// src/pages/AboutPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Sparkles, Heart } from 'lucide-react'; // Removed Zap as it wasn't used
import { PageWrapper } from '../components/PageWrapper';
import { itemVariants, floatingAnimation, containerVariants } from '../utils/animations'; // Assuming these are correctly defined
import { cn } from '../utils/cn'; // Assuming cn utility

export function AboutPage() {
  const features = [
    { icon: Users, title: 'Our Team', description: 'Expert professionals dedicated to delivering exceptional results' },
    { icon: Target, title: 'Our Mission', description: 'Empowering businesses through innovative digital solutions' },
    { icon: Award, title: 'Our Values', description: 'Excellence, integrity, and client success drive everything we do' },
  ];

  return (
    <PageWrapper className="bg-white dark:bg-gray-900 transition-colors duration-300"> {/* Base page background */}
      <div className="pt-16"> {/* Offset for fixed navbar */}

        {/* Top Section */}
        <div className="bg-[#E0F0FF] dark:bg-gradient-to-b dark:from-[#071324] dark:to-[#030912] py-24 relative overflow-hidden transition-colors duration-300">
          {/* Floating Icons - Adjust color/opacity */}
          <motion.div
            variants={floatingAnimation} initial="initial" animate="animate"
            className="absolute top-10 right-10 text-[#002B5B]/[0.1] dark:text-blue-300/10"
          >
            <Sparkles className="w-32 h-32" />
          </motion.div>
          <motion.div
            variants={floatingAnimation} initial="initial" animate="animate"
            className="absolute bottom-10 left-10 text-[#002B5B]/[0.1] dark:text-blue-300/10"
             transition={{ delay: 0.5 }} // Add slight delay
          >
            <Heart className="w-24 h-24" />
          </motion.div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"> {/* Ensure content is above icons */}
            <motion.div
              className="text-center"
              variants={containerVariants} initial="initial" animate="animate"
            >
              {/* Heading - Dark mode text */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold text-[#002B5B] dark:text-gray-100"
              >
                About Us
              </motion.h1>
              {/* Subheading - Dark mode text */}
              <motion.p
                variants={itemVariants}
                className="mt-4 text-xl text-gray-600 dark:text-gray-300"
              >
                We're passionate about helping businesses succeed in the digital world
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants} initial="initial" animate="animate"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    className="flex justify-center mb-4" // Added margin bottom
                    whileHover={{ scale: 1.2, rotate: 15 }} // Simplified rotation
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                     {/* Icon Color - Dark Mode */}
                    <Icon className="h-12 w-12 text-[#002B5B] dark:text-blue-400" />
                  </motion.div>
                   {/* Text Color - Dark Mode */}
                  <h3 className="mt-4 text-xl font-semibold text-[#002B5B] dark:text-gray-100">{feature.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Story/Approach Section */}
          <motion.div
            className="mt-24 bg-white dark:bg-gray-800 rounded-lg shadow-xl dark:border dark:border-gray-700 p-8 sm:p-12 transition-colors duration-300" // Dark mode card styles
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} // Trigger animation sooner
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Story */}
              <motion.div
                variants={itemVariants}
                // whileHover={{ scale: 1.02 }} - removed hover scale for simplicity
                className="space-y-4" // Adjusted spacing
              >
                 {/* Text Color - Dark Mode */}
                <h2 className="text-3xl font-bold text-[#002B5B] dark:text-gray-100">Our Story</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed"> {/* Adjusted line height */}
                  Founded with a vision to transform how businesses operate in the digital age,
                  we've grown into a team of passionate experts dedicated to delivering
                  exceptional results for our clients.
                </p>
              </motion.div>
              {/* Approach */}
              <motion.div
                variants={itemVariants}
                className="space-y-4"
              >
                 {/* Text Color - Dark Mode */}
                <h2 className="text-3xl font-bold text-[#002B5B] dark:text-gray-100">Our Approach</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We combine creativity with technical expertise to deliver solutions
                  that not only look great but drive real business results. Every project
                  is an opportunity to exceed expectations.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
