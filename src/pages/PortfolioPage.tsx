import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Heart } from 'lucide-react';
import { containerVariants, itemVariants, floatingAnimation } from '../utils/animations';

const projects = [
  {
    title: 'E-Commerce Platform',
    category: 'Web Development',
    description: 'A full-featured e-commerce platform with advanced product filtering, cart management, and secure checkout.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    title: 'Healthcare Portal',
    category: 'Web Application',
    description: 'A secure healthcare portal allowing patients to schedule appointments and access medical records.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['Angular', 'Express', 'PostgreSQL', 'HIPAA Compliant'],
  },
  {
    title: 'Real Estate App',
    category: 'Mobile Development',
    description: 'A mobile app for real estate listings with virtual tours and property management features.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['React Native', 'Firebase', 'Google Maps API'],
  },
  {
    title: 'Marketing Dashboard',
    category: 'Analytics',
    description: 'A comprehensive marketing analytics dashboard with real-time data visualization.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['Vue.js', 'D3.js', 'AWS', 'Google Analytics'],
  },
  {
    title: 'Restaurant Booking System',
    category: 'Web Development',
    description: 'An online reservation system for restaurants with table management and customer notifications.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'Prisma', 'Twilio API'],
  },
  {
    title: 'Fitness Tracking App',
    category: 'Mobile Development',
    description: 'A fitness tracking application with workout plans, progress monitoring, and social features.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    tags: ['Flutter', 'Firebase', 'HealthKit'],
  },
];

export function PortfolioPage() {
  return (
    <div className="pt-16">
      <div className="bg-[#E0F0FF] py-24 relative overflow-hidden">
        <motion.div
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          className="absolute top-10 right-10 text-[#002B5B] opacity-10"
        >
          <Heart className="w-32 h-32" />
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
              Our Portfolio
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-xl text-gray-600"
            >
              Showcasing our best work and successful projects
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <ExternalLink className="text-white h-8 w-8" />
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm text-[#002B5B] font-medium mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#E0F0FF] text-[#002B5B] text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
