import React from 'react';
import { motion } from 'framer-motion';
import {
  Code, Search, PenTool, MessageSquare, Globe, BarChart3, Zap,
  CheckCircle, ArrowRight, Users, Briefcase, Star, LineChart, Rocket
} from 'lucide-react';

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
  }
];

export function Services() {
  return (
    <div className="py-24 bg-white">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Section Title */}
        <div className="text-center">
          <motion.h2 className="text-3xl font-extrabold text-[#002B5B] sm:text-4xl">
            Our Services
          </motion.h2>
          <motion.p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
            Comprehensive digital solutions to help your business thrive online.
          </motion.p>
        </div>

        {/* Services Section */}
        <motion.div
          className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const Icon = service.icon;
            const SecondaryIcon = service.secondaryIcon;
            return (
              <motion.div
                key={service.title}
                variants={item}
                whileHover={{ y: -10 }}
                className="relative group bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <SecondaryIcon className="w-20 h-20 text-[#002B5B]" />
                </div>
                <div>
                  <motion.span
                    className="rounded-lg inline-flex p-3 bg-[#E0F0FF] text-[#002B5B] group-hover:bg-[#002B5B] group-hover:text-white transition-colors duration-300"
                    variants={iconAnimation}
                    whileHover="hover"
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </motion.span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-[#002B5B] group-hover:text-[#002B5B]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 group-hover:text-gray-700">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold text-[#002B5B]">Why Choose Us?</h3>
          <p className="mt-4 text-gray-600">
            We deliver professional, scalable, and tailored solutions to meet your business needs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <div className="p-4 bg-[#E0F0FF] rounded-lg shadow-md w-48">
              <LineChart className="w-12 h-12 text-[#002B5B] mb-4" />
              <p className="font-medium text-[#002B5B]">Results-Oriented</p>
            </div>
            <div className="p-4 bg-[#E0F0FF] rounded-lg shadow-md w-48">
              <Users className="w-12 h-12 text-[#002B5B] mb-4" />
              <p className="font-medium text-[#002B5B]">Expert Team</p>
            </div>
            <div className="p-4 bg-[#E0F0FF] rounded-lg shadow-md w-48">
              <Rocket className="w-12 h-12 text-[#002B5B] mb-4" />
              <p className="font-medium text-[#002B5B]">Fast Delivery</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold text-[#002B5B]">What Our Clients Say</h3>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md max-w-sm"
              >
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <h4 className="mt-4 font-semibold text-[#002B5B]">
                  {testimonial.name}, {testimonial.company}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
