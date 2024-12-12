import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Calendar, ArrowRight, Sparkles, Rocket, Target } from 'lucide-react';

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function Hero() {
  return (
    <div className="relative bg-[#E0F0FF] pt-24 overflow-hidden">
      <motion.div
        className="absolute top-20 right-10 text-[#002B5B] opacity-10"
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
      >
        <Sparkles className="w-24 h-24" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-10 text-[#002B5B] opacity-10"
        variants={floatingAnimation}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      >
        <Target className="w-32 h-32" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8"
          >
            <Rocket className="mx-auto h-16 w-16 text-[#002B5B]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4 mb-8"
          >
            <h1 className="text-4xl tracking-tight font-extrabold text-[#002B5B] sm:text-5xl md:text-6xl leading-tight">
              <span className="block mb-2">Elevate Your</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[#002B5B] to-[#0056b3] pb-2">
                Digital Presence
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Transform your business with cutting-edge web solutions. We deliver innovative digital strategies that drive growth and engagement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 max-w-md mx-auto sm:flex sm:justify-center sm:gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.location.href = 'https://calendly.com/riseonlinesolutions'}
              >
                <Calendar className="h-5 w-5" />
                <span>Schedule Now</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto mt-3 sm:mt-0"
                onClick={() => window.location.href = '/services'}
              >
                <span>Learn More</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 fill-current text-white" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path d="M0 48h1440V0c-624 23-936 23-1440 0v48z" />
        </svg>
      </div>
    </div>
  );
}
