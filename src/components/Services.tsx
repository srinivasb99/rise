import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Search, PenTool, MessageSquare, Smartphone, Shield, 
  BarChart3, Rocket, ArrowRight, CheckCircle, Zap, Globe
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
    features: ['Responsive Design', 'SEO Optimization', 'Custom Functionality', 'Performance Focused'],
    secondaryIcon: Globe
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Drive organic traffic and improve your online visibility with our proven SEO strategies.',
    icon: Search,
    features: ['Keyword Research', 'Content Strategy', 'Link Building', 'Analytics & Reporting'],
    secondaryIcon: BarChart3
  },
  {
    title: 'Branding & Strategy',
    description: 'Create a memorable brand identity that resonates with your target audience.',
    icon: PenTool,
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
    secondaryIcon: Zap
  },
  {
    title: 'Content & Social Media',
    description: 'Engage your audience with compelling content and social media management.',
    icon: MessageSquare,
    features: ['Content Creation', 'Social Media Management', 'Community Building', 'Engagement Strategy'],
    secondaryIcon: CheckCircle
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
        <div className="text-center">
          <motion.h2 
            className="text-3xl font-extrabold text-[#002B5B] sm:text-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Comprehensive digital solutions to help your business thrive online
          </motion.p>
        </div>

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
                  <motion.div 
                    className="mt-4 flex items-center text-[#002B5B] text-sm font-medium"
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
