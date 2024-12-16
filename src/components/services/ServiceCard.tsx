import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../Button';
import type { Service } from '../../data/services';
import { itemVariants } from '../../utils/animations';

interface ServiceCardProps {
  service: Service;
  index: number;
  onLearnMore: (service: Service) => void;
}

export function ServiceCard({ service, index, onLearnMore }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10 }}
      className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <motion.div 
        className="flex items-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <span className="rounded-lg inline-flex p-3 bg-[#E0F0FF] text-[#002B5B]">
            <Icon className="h-6 w-6" />
          </span>
        </motion.div>
        <div className="ml-5">
          <h3 className="text-xl font-semibold text-[#002B5B]">{service.title}</h3>
        </div>
      </motion.div>
      <p className="mt-4 text-gray-600">{service.description}</p>
      <motion.ul className="mt-6 space-y-3">
        {service.features.map((feature, featureIndex) => (
          <motion.li
            key={feature}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (index * 0.1) + (featureIndex * 0.1) }}
            className="flex items-center text-gray-600"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#002B5B] mr-2"></div>
            {feature}
          </motion.li>
        ))}
      </motion.ul>
      <motion.div
        className="mt-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="outline" 
          className="whitespace-nowrap"
          onClick={() => onLearnMore(service)}
        >
          Learn More
        </Button>
      </motion.div>
    </motion.div>
  );
}
