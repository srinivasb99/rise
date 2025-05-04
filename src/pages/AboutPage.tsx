// src/pages/AboutPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Sparkles, Heart } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
// Make sure to import iconHover if you use it
import { itemVariants, floatingAnimation, containerVariants, iconHover } from '../utils/animations';
import { cn } from '../utils/cn'; // Assuming cn utility exists

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
            "bg-primary-light dark:bg-gradient-to-b dark:from-[#071324] dark:to-[#030912]", // Backgrounds
            "py-20 sm:py-24 relative overflow-hidden transition-colors duration-300" // Padding & Styling
        )}>
          {/* Floating Icons */}
          <motion.div
            variants={floatingAnimation} initial="initial" animate="animate"
            className="absolute top-10 right-10 text-primary/[0.08] dark:text-blue-300/10 pointer-events-none" // Updated opacity syntax
          > <Sparkles className="w-24 h-24 sm:w-32 sm:h-32" /> </motion.div>
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
              // Use 'visible' state key from variants
              animate="visible"
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
            className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12" // Adjusted gap
            variants={containerVariants}
            initial="initial"
             // Use 'visible' state key here as well
            animate="visible"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="text-center"
                  variants={itemVariants} // Animates each feature card
                  whileHover={{ y: -8 }} // Subtle lift on hover
                >
                  {/* Icon with hover animation */}
                  <motion.div
                    className="inline-block p-4 mb-4 rounded-full bg-primary-light dark:bg-gray-700 shadow" // Added background and shadow
                    variants={iconHover} // Use the imported iconHover variant
                    whileHover="hover" // Trigger the 'hover' state defined in iconHover
                  >
                    <Icon className="h-10 w-10 sm:h-12 sm:h-12 text-primary dark:text-blue-400" />{/* Dark icon color */}
                  </motion.div>
                  <h3 className="mt-2 text-xl font-semibold text-primary dark:text-gray-100">{feature.title}</h3>{/* Dark text */}
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400">{feature.description}</p>{/* Dark text */}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Story/Approach Section */}
          <motion.div
            className={cn(
                "mt-20 sm:mt-24 p-8 sm:p-12 rounded-xl shadow-xl", // Base styles
                "bg-white dark:bg-gray-800", // Dark bg
                "dark:border dark:border-gray-700", // Dark border
                "transition-colors duration-300"
            )}
            // Use viewport animation for this section
            initial="initial" // Corresponds to 'initial' in itemVariants/fadeInUp etc.
            whileInView="visible" // Corresponds to 'visible' in itemVariants/fadeInUp etc.
            viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% visible
            transition={{ duration: 0.6 }} // Control duration directly if needed
            // Apply containerVariants to stagger children if desired, or animate the whole block
            // variants={containerVariants} // Option 1: Stagger children below
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
              {/* Story */}
              {/* Option 2: Animate each column individually if not using container stagger */}
              <motion.div className="space-y-4" variants={fadeInUp}>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary dark:text-gray-100">Our Story</h2>{/* Dark text */}
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">{/* Dark text */}
                  Founded with a vision to transform how businesses operate in the digital age,
                  we've grown into a team of passionate experts dedicated to delivering
                  exceptional results for our clients through collaboration and cutting-edge technology.
                </p>
              </motion.div>
              {/* Approach */}
              <motion.div className="space-y-4" variants={fadeInUp}>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary dark:text-gray-100">Our Approach</h2>{/* Dark text */}
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">{/* Dark text */}
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
