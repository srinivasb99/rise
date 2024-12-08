import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#E0F0FF] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl tracking-tight font-extrabold text-[#002B5B] sm:text-5xl md:text-6xl"
          >
            <span className="block">Elevate Your</span>
            <span className="block text-[#002B5B]">Digital Presence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Transform your business with cutting-edge web solutions. We deliver innovative digital strategies that drive growth and engagement.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8"
          >
            <div className="rounded-md shadow">
              <Button
                size="lg"
                onClick={() => navigate('/consultation')}
              >
                Schedule a Consultation
              </Button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/services')}
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 fill-current text-white" viewBox="0 0 1440 48">
          <path d="M0 48h1440V0c-624 23-936 23-1440 0v48z" />
        </svg>
      </div>
    </div>
  );
}
