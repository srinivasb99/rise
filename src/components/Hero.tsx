import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

// Using "?component" so Vite knows to treat these as React components
import { ReactComponent as CalendarIcon } from '../assets/icons/calendar.svg';
import { ReactComponent as ArrowRightIcon } from '../assets/icons/arrow-right.svg';


const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#E0F0FF] pt-24 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl tracking-tight font-extrabold text-[#002B5B] sm:text-5xl md:text-6xl"
          >
            <span className="block">Elevate Your</span>
            <span className="block text-[#002B5B]">Digital Presence</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Transform your business with cutting-edge web solutions. We deliver innovative digital strategies that drive growth and engagement.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
          >
            <div className="rounded-md shadow mb-3 sm:mb-0 sm:mr-3">
              <Button
                size="lg"
                onClick={() => navigate('/consultation')}
                className="flex items-center justify-center gap-2 rounded-full px-6 py-3 text-white bg-[#002B5B] hover:bg-[#001f44] transition-colors duration-300"
              >
                <CalendarIcon className="w-5 h-5" />
                Schedule a Consultation
              </Button>
            </div>

            <div className="rounded-md shadow">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/services')}
                className="flex items-center justify-center gap-2 rounded-full px-6 py-3 border-2 border-[#002B5B] text-[#002B5B] hover:bg-[#E0F0FF] transition-colors duration-300"
              >
                <ArrowRightIcon className="w-5 h-5" />
                Learn More
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 fill-current text-white" viewBox="0 0 1440 48">
          <path d="M0 48h1440V0c-624 23-936 23-1440 0v48z" />
        </svg>
      </div>
    </div>
  );
}
