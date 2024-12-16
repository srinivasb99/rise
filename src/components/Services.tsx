import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Search, PenTool, MessageSquare, Globe, BarChart3, Zap,
  CheckCircle, ArrowRight, Users, Briefcase, Star, LineChart, Rocket, Award, ShieldCheck, Layers,
  X
} from 'lucide-react';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 50,
      damping: 20,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};

const iconHover = {
  hover: {
    scale: 1.2,
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

// Modal Animation Variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  }
};

// Reusable Modal Component
const Modal = ({ isOpen, onClose, title, content, Icon }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-lg relative max-w-lg w-full p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center mb-4">
              {Icon && <Icon className="w-8 h-8 text-[#002B5B] mr-2" />}
              <h2 className="text-2xl font-bold text-[#002B5B]">{title}</h2>
            </div>
            <div className="text-gray-700">
              {content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Data Arrays
const services = [
  {
    title: 'Website Development',
    description: 'Custom websites that are fast, secure, and built to convert visitors into customers.',
    icon: Code,
    secondaryIcon: Globe,
    detailed: 'Detailed information about Website Development services...'
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Drive organic traffic and improve your online visibility with our proven SEO strategies.',
    icon: Search,
    secondaryIcon: BarChart3,
    detailed: 'Detailed information about SEO & Digital Marketing services...'
  },
  {
    title: 'Branding & Strategy',
    description: 'Create a memorable brand identity that resonates with your target audience.',
    icon: PenTool,
    secondaryIcon: Zap,
    detailed: 'Detailed information about Branding & Strategy services...'
  },
  {
    title: 'Content & Social Media',
    description: 'Engage your audience with compelling content and social media management.',
    icon: MessageSquare,
    secondaryIcon: CheckCircle,
    detailed: 'Detailed information about Content & Social Media services...'
  }
];

const testimonials = [
  {
    quote: "Rise Online Solutions transformed our business presence. Their team is professional and results-driven!",
    name: "John Doe",
    company: "Acme Corp",
    detailed: "Detailed testimonial from John Doe..."
  },
  {
    quote: "Excellent service and support! We saw a significant increase in organic traffic within months.",
    name: "Jane Smith",
    company: "Tech Innovators",
    detailed: "Detailed testimonial from Jane Smith..."
  },
  {
    quote: "Highly skilled team with a clear understanding of our business needs. Top-notch delivery!",
    name: "Michael Johnson",
    company: "Visionary Brands",
    detailed: "Detailed testimonial from Michael Johnson..."
  }
];

const stats = [
  { label: 'Projects Completed', value: '120+', icon: Layers, detailed: 'We have successfully completed over 120 projects...' },
  { label: 'Satisfied Clients', value: '95%', icon: ShieldCheck, detailed: '95% of our clients are satisfied with our services...' },
  { label: 'Years of Experience', value: '10+', icon: Award, detailed: 'With over 10 years of experience in the industry...' },
  { label: 'Team Members', value: '50+', icon: Users, detailed: 'Our team consists of over 50 dedicated professionals...' }
];

const workflowSteps = [
  { step: 'Consultation', description: 'Understand your goals and requirements.', icon: Briefcase, detailed: 'In the consultation phase, we...' },
  { step: 'Strategy', description: 'Develop a tailored plan for your success.', icon: LineChart, detailed: 'During the strategy phase, we...' },
  { step: 'Execution', description: 'Implement solutions with precision.', icon: Rocket, detailed: 'In the execution phase, our team...' },
  { step: 'Delivery & Support', description: 'Deliver results and offer ongoing support.', icon: ShieldCheck, detailed: 'After delivery, we provide ongoing support...' }
];

export function Services() {
  // Modal State Management
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: '', Icon: null });

  const openModal = (title, content, Icon) => {
    setModalData({ isOpen: true, title, content, Icon });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, title: '', content: '', Icon: null });
  };

  return (
    <div className="py-24 bg-white w-full">
      <motion.div
        className="w-full px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-extrabold text-[#002B5B] sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Comprehensive digital solutions to help your business thrive online.
          </p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          className="w-full grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
        >
          {services.map((service) => {
            const Icon = service.icon;
            const SecondaryIcon = service.secondaryIcon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="relative group bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(service.title, service.detailed, service.icon)}
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <SecondaryIcon className="w-20 h-20 text-[#002B5B]" />
                </div>
                <motion.span
                  className="rounded-lg inline-flex p-3 bg-[#E0F0FF] text-[#002B5B] group-hover:bg-[#002B5B] group-hover:text-white transition-colors duration-300 mb-4 block"
                  variants={iconHover}
                  whileHover="hover"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </motion.span>
                <div>
                  <h3 className="text-xl font-bold text-[#002B5B]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Workflow Section */}
        <motion.div
          className="w-full mt-24 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-extrabold text-[#002B5B] text-center mb-12" variants={itemVariants}>
            Our Workflow
          </motion.h3>
          <motion.div
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {workflowSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(step.step, step.detailed, step.icon)}
              >
                <motion.span
                  className="rounded-full bg-[#E0F0FF] p-3 mb-4"
                  variants={iconHover}
                  whileHover="hover"
                >
                  <step.icon className="w-12 h-12 text-[#002B5B]" />
                </motion.span>
                <h4 className="text-lg font-bold text-[#002B5B]">{step.step}</h4>
                <p className="text-gray-600 mt-2">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="w-full mt-24 px-4 sm:px-6 lg:px-8 bg-[#F9FAFB] py-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-extrabold text-[#002B5B] text-center mb-12" variants={itemVariants}>
            Our Achievements
          </motion.h3>
          <motion.div
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            variants={containerVariants}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(stat.label, stat.detailed, stat.icon)}
              >
                <motion.span
                  className="rounded-full bg-[#E0F0FF] p-3 mb-4"
                  variants={iconHover}
                  whileHover="hover"
                >
                  <stat.icon className="w-16 h-16 text-[#002B5B]" />
                </motion.span>
                <h4 className="text-3xl font-extrabold text-[#002B5B]">{stat.value}</h4>
                <p className="text-gray-700 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="w-full mt-24 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-extrabold text-[#002B5B] text-center mb-12" variants={itemVariants}>
            What Our Clients Say
          </motion.h3>
          <motion.div
            className="w-full flex flex-wrap justify-center gap-8"
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer max-w-md"
                onClick={() => openModal(`${testimonial.name} from ${testimonial.company}`, testimonial.detailed, null)}
              >
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <h4 className="mt-4 font-semibold text-[#002B5B]">
                  {testimonial.name}, {testimonial.company}
                </h4>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal Component */}
      <Modal 
        isOpen={modalData.isOpen}
        onClose={closeModal}
        title={modalData.title}
        content={modalData.content}
        Icon={modalData.Icon}
      />
    </div>
  );
}
