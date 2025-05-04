// src/pages/AboutPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Sparkles, Heart } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
// Ensure all needed variants are imported correctly
import {
  itemVariants,
  floatingAnimation,
  containerVariants,
  iconHover,
  fadeInUp // Make sure fadeInUp is exported from animations.ts
} from '../utils/animations';
import { cn } from '../utils/cn';

export function AboutPage() {
  const features = [
    { icon: Users, title: 'Our Team', description: 'Expert professionals dedicated to delivering exceptional results' },
    { icon: Target, title: 'Our Mission', description: 'Empowering businesses through innovative digital solutions' },
    { icon: Award, title: 'Our Values', description: 'Excellence, integrity, and client success drive everything we do' },
  ];

  return (
    <PageWrapper className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="pt-16"> {/* Offset for fixed navbar */}

        {/* Top Section */}
        <div className={cn(
            "bg-primary-light dark:bg-gradient-to-b dark:from-[#071324] dark:to-[#030912]",
            "py-20 sm:py-24 relative overflow-hidden transition-colors duration-300"
        )}>
          {/* Floating Icons */}
          <motion.div
            variants={floatingAnimation}
            // No initial needed if defined in variant
            animate="animate" // Use 'animate' key from floatingAnimation
            className="absolute top-10 right-10 text-primary/[0.08] dark:text-blue-300/10 pointer-events-none"
          > <Sparkles className="w-24 h-24 sm:w-32 sm:h-32" /> </motion.div>
          <motion.div
            variants={floatingAnimation}
            animate="animate" // Use 'animate' key from floatingAnimation
            className="absolute bottom-10 left-10 text-primary/[0.08] dark:text-blue-300/10 pointer-events-none"
            transition={{ delay: 0.5 }} // This delay is for the start of the infinite loop, not the variant transition itself
          > <Heart className="w-20 h-20 sm:w-24 sm:h-24" /> </motion.div>

          {/* Header Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center"
              variants={containerVariants}
              initial="initial"
              animate="visible" // Use 'visible' state key from containerVariants
            >
              <motion.h1
                variants={itemVariants} // Uses initial/visible from itemVariants
                className="text-4xl sm:text-5xl font-bold text-primary dark:text-gray-100"
              >
                About Us
              </motion.h1>
              <motion.p
                variants={itemVariants} // Uses initial/visible from itemVariants
                className="mt-4 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              >
                We're passionate about helping businesses succeed in the digital world through innovation and expertise.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
            variants={containerVariants}
            initial="initial"
            animate="visible" // Use 'visible' state key
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  variants={itemVariants} // Animates each feature card using initial/visible
                  whileHover={{ y: -8 }}
                >
                  {/* Icon with hover animation */}
                  <motion.div
                    className="inline-block p-4 mb-4 rounded-full bg-primary-light dark:bg-gray-700 shadow"
                    variants={iconHover} // Apply iconHover variant
                    whileHover="hover" // Trigger the 'hover' state
                  >
                    <Icon className="h-10 w-10 sm:h-12 sm:h-12 text-primary dark:text-blue-400" />
                  </motion.div>
                  <h3 className="mt-2 text-xl font-semibold text-primary dark:text-gray-100">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Story/Approach Section */}
          <motion.div
            className={cn(
                "mt-20 sm:mt-24 p-8 sm:p-12 rounded-xl shadow-xl",
                "bg-white dark:bg-gray-800",
                "dark:border dark:border-gray-700",
                "transition-colors duration-300"
            )}
            initial="initial" // Use initial from containerVariants if staggering, or from fadeInUp if not
            whileInView="visible" // Use visible state from variants
            viewport={{ once: true, amount: 0.2 }}
            // variants={containerVariants} // Option 1: Apply container variants to stagger children
            // Option 2 below: Animate the block itself slightly + children individually
             transition={{ duration: 0.4 }} // Animate the block fade-in
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {/* Story Column */}
              <motion.div
                className="space-y-4"
                variants={fadeInUp} // Apply fadeInUp (uses initial/visible keys)
                // If NOT using containerVariants on parent, apply initial/whileInView here too
                // initial="initial"
                // whileInView="visible"
                // viewport={{ once: true, amount: 0.2 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-primary dark:text-gray-100">Our Story</h2>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Founded with a vision to transform how businesses operate in the digital age,
                  we've grown into a team of passionate experts dedicated to delivering
                  exceptional results for our clients through collaboration and cutting-edge technology.
                </p>
              </motion.div>
              {/* Approach Column */}
              <motion.div
                className="space-y-4"
                variants={fadeInUp} // Apply fadeInUp (uses initial/visible keys)
                 // If NOT using containerVariants on parent, apply initial/whileInView here too
                // initial="initial"
                // whileInView="visible"
                // viewport={{ once: true, amount: 0.2 }}
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-primary dark:text-gray-100">Our Approach</h2>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  We combine strategic thinking with creative design and technical expertise to deliver solutions
                  that not only look stunning but drive real, measurable business results. Every project
                  is an opportunity for partnership and exceeding expectations.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
