// src/pages/AboutPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Sparkles, Heart } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
// *** FIX: Added fadeInUp to the import list ***
import {
  itemVariants, Added this import
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

        {/* Top Section
  floatingAnimation,
  containerVariants,
  iconHover,
  fadeInUp // Import the missing variant */}
        <div className={cn(
            "bg-primary-light dark:bg-gradient-to-b dark
} from '../utils/animations';
import { cn } from '../utils/cn';

export function AboutPage() {
  const features = [
    { icon: Users, title: 'Our Team', description: ':from-[#071324] dark:to-[#030912]", // Backgrounds
            "Expert professionals dedicated to delivering exceptional results' },
    { icon: Target, title: 'Our Mission', description:py-20 sm:py-24 relative overflow-hidden transition-colors duration-300" // 'Empowering businesses through innovative digital solutions' },
    { icon: Award, title: 'Our Values', description Padding & Styling
        )}>
          {/* Floating Icons */}
          <motion.div
            variants={floating: 'Excellence, integrity, and client success drive everything we do' },
  ];

  return (
    <Animation} initial="initial" animate="animate"
            className="absolute top-10 right-10 text-primaryPageWrapper className="bg-white dark:bg-gray-900 transition-colors duration-300/[0.08] dark:text-blue-300/10 pointer-events-none"">
      <div className="pt-16"> {/* Offset for fixed navbar */}

        {/* Top Section
          > <Sparkles className="w-24 h-24 sm:w-32 sm:h */}
        <div className={cn(
            "bg-primary-light dark:bg-gradient-to-b dark-32" /> </motion.div>
          <motion.div
            variants={floatingAnimation} initial:from-[#071324] dark:to-[#030912]", // Backgrounds
            "="initial" animate="animate"
            className="absolute bottom-10 left-10 text-primary/[py-20 sm:py-24 relative overflow-hidden transition-colors duration-300" // Padding &0.08] dark:text-blue-300/10 pointer-events-none"
            transition={{ delay: 0.5 }}
          > <Heart className="w-20 h-2 Styling
        )}>
          {/* Floating Icons */}
          <motion.div
            variants={floatingAnimation} initial="initial0 sm:w-24 sm:h-24" /> </motion.div>

          {/*" animate="animate"
            className="absolute top-10 right-10 text-primary/[0. Header Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center"
              variants={containerVariants}
              initial="initial"
              animate="visible" // Corrected state key
            >
              <motion.h1
                variants={itemVariants}
                className="text08] dark:text-blue-300/10 pointer-events-none"
          > <Spark-4xl sm:text-5xl font-bold text-primary dark:text-gray-100les className="w-24 h-24 sm:w-32 sm:h-32""
              >
                About Us
              </motion.h1>
              <motion.p
                variants={itemVariants}
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
            variants={containerVariants} /> </motion.div>
          <motion.div
            variants={floatingAnimation} initial="initial" animate="animate"
            className="absolute bottom-10 left-10 text-primary/[0.08] dark:text-blue-300/10 pointer-events-none"
            transition={{ delay: 0.5 }}
          > <Heart className="w-20 h-20 sm:w-24 sm:h-24" /> </motion.div>

          {/* Header Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center"
              variants={containerVariants}
              initial="initial"
              animate="visible" // Use 'visible' state key
            >
              <motion.h1
                variants={itemVariants} // Uses initial/visible
                className="text-4xl sm:text-5xl font-bold text-primary dark:text-gray-100"
              >
                About Us
              </motion.h1>
              <motion.p
                variants={itemVariants} // Uses initial/visible
                className="mt-4 text-lg sm:text
            initial="initial"
            animate="visible" // Corrected state key
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              >
                We're passionate about helping businesses succeed in the digital world through innovation and.div
                  key={feature.title}
                  className="text-center"
                  variants={itemVariants expertise.
              </motion.p>
            </motion.div>
          </div>
        </div>

        }
                  whileHover={{ y: -8 }}
                >
                  <motion.div
                    className="inline{/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm-block p-4 mb-4 rounded-full bg-primary-light dark:bg-gray-700 shadow":px-6 lg:px-8 py-20 sm:py-24">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md
                    variants={iconHover} // Apply iconHover variant
                    whileHover="hover" // Trigger the 'hover' state
:gap-12"
            variants={containerVariants}
            initial="initial"
            animate="visible" // Use                  >
                    <Icon className="h-10 w-10 sm:h-12 sm: 'visible' state key
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="texth-12 text-primary dark:text-blue-400" />
                  </motion.div>
                  <h3 className="mt-2 text-xl font-semibold text-primary dark:text-gray-1-center"
                  variants={itemVariants} // Animates each feature card
                  whileHover={{ y: -8 }}00">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-
                >
                  {/* Icon with hover animation */}
                  <motion.div
                    className="inline-block p-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Story/Approach Section */}4 mb-4 rounded-full bg-primary-light dark:bg-gray-700 shadow"
                    variants={iconHover} // Use the imported variant
                    whileHover="hover" // Trigger the 'hover' state
                  
          <motion.div
            className={cn(
                "mt-20 sm:mt-24 p-8 sm:p-12 rounded-xl shadow-xl",
                "bg-white dark>
                    <Icon className="h-10 w-10 sm:h-12 sm:h:bg-gray-800",
                "dark:border dark:border-gray-700-12 text-primary dark:text-blue-400" />
                  </motion.div>",
                "transition-colors duration-300"
            )}
            initial="initial"
            while
                  <h3 className="mt-2 text-xl font-semibold text-primary dark:text-gray-100">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-6InView="visible" // Use whileInView for this section
            viewport={{ once: true, amount: 00 dark:text-gray-400">{feature.description}</p>
                </motion.div0.2 }}
            transition={{ duration: 0.6 }} // Can control duration directly
          >
            <div>
              );
            })}
          </motion.div>

          {/* Story/Approach Section */}
 className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-1          <motion.div
            className={cn(
                "mt-20 sm:mt-242">
              {/* Story */}
              {/* Apply fadeInUp variant to each column */}
              <motion.div className p-8 sm:p-12 rounded-xl shadow-xl",
                "bg-white dark:bg-gray="space-y-4" variants={fadeInUp}>
                <h2 className="text-2xl sm:text-800",
                "dark:border dark:border-gray-700",
                "-3xl font-bold text-primary dark:text-gray-100">Our Story</h2>
                transition-colors duration-300"
            )}
            initial="initial"
            whileInView="<p className="text-base text-gray-600 dark:text-gray-300 leadingvisible" // Trigger animation on scroll
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration-relaxed">
                  Founded with a vision to transform how businesses operate in the digital age,
                  we've grown into a team of passionate experts dedicated to delivering
                  exceptional results for our clients through collaboration and cutting-edge technology.: 0.6 }}
            // Removed variants from container, applying to children instead
          >
            <div
                </p>
              </motion.div>
              {/* Approach */}
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12"> className="space-y-4" variants={fadeInUp}>
                <h2 className="text-2xl
              {/* Story */}
              {/* Use the now-imported fadeInUp variant */}
              <motion.div className sm:text-3xl font-bold text-primary dark:text-gray-100">Our Approach</h2>
                ="space-y-4" variants={fadeInUp}>
                <h2 className="text-2xl sm<p className="text-base text-gray-600 dark:text-gray-300 leading:text-3xl font-bold text-primary dark:text-gray-100">Our Story</h2>-relaxed">
                  We combine strategic thinking with creative design and technical expertise to deliver solutions
                  that not only look
                <p className="text-base text-gray-600 dark:text-gray-30 stunning but drive real, measurable business results. Every project
                  is an opportunity for partnership and exceeding expectations.
                0 leading-relaxed">
                  Founded with a vision to transform how businesses operate in the digital age,
                  we</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
