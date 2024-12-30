import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Sparkles, Heart, Zap } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { itemVariants, floatingAnimation, containerVariants } from '../utils/animations';

export function AboutPage() {
  const features = [
    { icon: Users, title: 'Our Team', description: 'Expert professionals dedicated to delivering exceptional results' },
    { icon: Target, title: 'Our Mission', description: 'Empowering businesses through innovative digital solutions' },
    { icon: Award, title: 'Our Values', description: 'Excellence, integrity, and client success drive everything we do' },
  ];

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
              className="text-center"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-4xl font-bold text-[#002B5B]"
              >
                About Us
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="mt-4 text-xl text-gray-600"
              >
                We're passionate about helping businesses succeed in the digital world
              </motion.p>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="initial"
            animate="animate"
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
                    className="flex justify-center"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <Icon className="h-12 w-12 text-[#002B5B]" />
                  </motion.div>
                  <h3 className="mt-4 text-xl font-semibold text-[#002B5B]">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div 
            className="mt-24 bg-white rounded-lg shadow-xl p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#002B5B]">Our Story</h2>
                <p className="text-gray-600">
                  Founded with a vision to transform how businesses operate in the digital age, 
                  we've grown into a team of passionate experts dedicated to delivering 
                  exceptional results for our clients.
                </p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-[#002B5B]">Our Approach</h2>
                <p className="text-gray-600">
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
