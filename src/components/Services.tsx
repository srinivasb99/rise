import React from 'react';
import { motion } from 'framer-motion';
import {
  Code, Search, PenTool, MessageSquare, Globe, BarChart3, Zap,
  CheckCircle, ArrowRight, Users, Briefcase, Star, LineChart, Rocket, Award, ShieldCheck, Layers
} from 'lucide-react';

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const iconAnimation = {
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

// Data Arrays
const services = [
  {
    title: 'Website Development',
    description: 'Custom websites that are fast, secure, and built to convert visitors into customers.',
    icon: Code,
    secondaryIcon: Globe
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Drive organic traffic and improve your online visibility with our proven SEO strategies.',
    icon: Search,
    secondaryIcon: BarChart3
  },
  {
    title: 'Branding & Strategy',
    description: 'Create a memorable brand identity that resonates with your target audience.',
    icon: PenTool,
    secondaryIcon: Zap
  },
  {
    title: 'Content & Social Media',
    description: 'Engage your audience with compelling content and social media management.',
    icon: MessageSquare,
    secondaryIcon: CheckCircle
  }
];

const testimonials = [
  {
    quote: "Rise Online Solutions transformed our business presence. Their team is professional and results-driven!",
    name: "John Doe",
    company: "Acme Corp"
  },
  {
    quote: "Excellent service and support! We saw a significant increase in organic traffic within months.",
    name: "Jane Smith",
    company: "Tech Innovators"
  },
  {
    quote: "Highly skilled team with a clear understanding of our business needs. Top-notch delivery!",
    name: "Michael Johnson",
    company: "Visionary Brands"
  }
];

const stats = [
  { label: 'Projects Completed', value: '120+', icon: Layers },
  { label: 'Satisfied Clients', value: '95%', icon: ShieldCheck },
  { label: 'Years of Experience', value: '10+', icon: Award },
  { label: 'Team Members', value: '50+', icon: Users }
];

const workflowSteps = [
  { step: 'Consultation', description: 'Understand your goals and requirements.', icon: Briefcase },
  { step: 'Strategy', description: 'Develop a tailored plan for your success.', icon: LineChart },
  { step: 'Execution', description: 'Implement solutions with precision.', icon: Rocket },
  { step: 'Delivery & Support', description: 'Deliver results and offer ongoing support.', icon: ShieldCheck }
];

export function Services() {
  return (
    <div className="py-24 bg-gray-50"> {/* Changed background to light gray for better contrast */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24"
        initial="hidden"
        animate="show"
        variants={container}
        transition={{ duration: 0.6 }}
      >
        {/* Section Title */}
        <motion.div
          className="text-center"
          variants={item}
        >
          <motion.h2 className="text-3xl font-extrabold text-[#002B5B] sm:text-4xl">
            Our Services
          </motion.h2>
          <motion.p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Comprehensive digital solutions to help your business thrive online.
          </motion.p>
        </motion.div>

        {/* Services Section */}
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
        >
          {services.map((service) => {
            const Icon = service.icon;
            const SecondaryIcon = service.secondaryIcon;
            return (
              <motion.div
                key={service.title}
                variants={item}
                whileHover={{ y: -10 }}
                className="relative group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <SecondaryIcon className="w-24 h-24 text-[#002B5B]" />
                </div>
                <motion.span
                  className="rounded-lg inline-flex p-4 bg-[#E0F0FF] text-[#002B5B] group-hover:bg-[#002B5B] group-hover:text-white transition-colors duration-300"
                  variants={iconAnimation}
                  whileHover="hover"
                >
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </motion.span>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-[#002B5B] group-hover:text-[#002B5B]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base text-gray-600 group-hover:text-gray-700">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Workflow Section */}
        <motion.div
          className="bg-white p-12 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          variants={container}
        >
          <motion.h3 className="text-2xl font-extrabold text-[#002B5B] text-center mb-8" variants={item}>
            Our Workflow
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
            variants={container}
          >
            {workflowSteps.map((step) => (
              <motion.div
                key={step.step}
                variants={item}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 transition-transform duration-300"
              >
                <motion.span
                  variants={iconAnimation}
                  whileHover="hover"
                  className="rounded-full bg-[#E0F0FF] p-3 mb-4"
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
          className="bg-white p-12 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          variants={container}
        >
          <motion.h3 className="text-2xl font-extrabold text-[#002B5B] text-center mb-8" variants={item}>
            Our Achievements
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
            variants={container}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={item}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center p-4 rounded-lg bg-gray-50 transition-transform duration-300"
              >
                <motion.span
                  variants={iconAnimation}
                  whileHover="hover"
                  className="rounded-full bg-[#E0F0FF] p-3 mb-4"
                >
                  <stat.icon className="w-16 h-16 text-[#002B5B]" />
                </motion.span>
                <h4 className="text-3xl font-extrabold text-[#002B5B]">{stat.value}</h4>
                <p className="text-gray-700 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="bg-white p-12 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          variants={container}
        >
          <motion.h3 className="text-2xl font-extrabold text-[#002B5B] text-center mb-8" variants={item}>
            What Our Clients Say
          </motion.h3>
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            variants={container}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="p-8 bg-gray-50 rounded-lg shadow-sm max-w-md text-left transition-transform duration-300"
              >
                <motion.p
                  className="text-gray-600 italic"
                  variants={iconAnimation}
                  whileHover="hover"
                >
                  "{testimonial.quote}"
                </motion.p>
                <h4 className="mt-4 font-semibold text-[#002B5B]">
                  {testimonial.name}, {testimonial.company}
                </h4>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
