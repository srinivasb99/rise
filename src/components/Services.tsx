// src/components/Services.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Search, PenTool, MessageSquare, Globe, BarChart3, Zap, CheckCircle,
  CheckIcon, Users, Briefcase, LineChart, Rocket, Award, ShieldCheck, Layers,
  Smartphone, Lock, BarChart, Heart, X
} from 'lucide-react';
import { Button } from './Button'; // Import the Button component
import { cn } from '../utils/cn'; // Assuming cn utility exists

// --- Animation Variants --- (No changes needed for dark mode)
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

// --- Reusable Modal Component (Updated with Dark Mode) ---
const Modal = ({ isOpen, onClose, title, content, Icon }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        // Overlay with dark mode adjustment
        <motion.div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[100] p-4" // Increased z-index
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Content Card */}
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="modal-title"
            className={cn(
              "bg-white dark:bg-gray-800 rounded-lg shadow-xl relative max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]", // Dark bg
              "transition-colors duration-300"
            )}
            variants={modalVariants} initial="hidden" animate="visible" exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose} aria-label="Close Modal"
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            > <X className="w-6 h-6" /> </button>

            {/* Modal Header */}
            <div className="flex items-start mb-5 pr-8"> {/* Allow wrapping */}
              {Icon && <Icon className="w-8 h-8 text-primary dark:text-blue-400 mr-3 mt-1 flex-shrink-0" />} {/* Dark icon color */}
              <h2 id="modal-title" className="text-2xl font-bold text-primary dark:text-gray-100">{title}</h2> {/* Dark title color */}
            </div>

            {/* Modal Body */}
            <div className="text-gray-700 dark:text-gray-300 space-y-5"> {/* Dark base text color */}
              {/* Overview */}
              {content.overview && (
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Overview</h3>
                  <p className="text-sm sm:text-base">{content.overview}</p>
                </div>
              )}
              {/* Key Features */}
              {content.keyFeatures && content.keyFeatures.length > 0 && (
                <div>
                   <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Features</h3>
                   <ul className="space-y-1.5">
                    {content.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                         <CheckIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Process */}
               {content.process && content.process.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Process</h3>
                  <ul className="space-y-3">
                    {content.process.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                         {/* Dark step number style */}
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-light text-primary dark:bg-blue-900/50 dark:text-blue-300 font-bold flex-shrink-0 text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">{step.name}</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Pricing */}
              {content.pricing && (
                  <div>
                      <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Pricing</h3>
                      <p className="text-sm sm:text-base">{content.pricing}</p>
                  </div>
              )}
              {/* Additional Info */}
              {content.additionalInfo && (
                <div>
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Additional Information</h3>
                  <p className="text-sm sm:text-base">{content.additionalInfo}</p>
                </div>
              )}

              {/* Modal Footer Buttons - USING THE BUTTON COMPONENT */}
              <div className="flex flex-wrap gap-2 justify-start pt-5 border-t border-gray-200 dark:border-gray-700">
                 {content.buttons?.map((button, index) => (
                    button.action === 'close' ? (
                        // Use Button component for Close action
                        <Button key={index} onClick={onClose} variant="outline" size="sm">{button.label}</Button>
                    ) : (
                        // Use Button component wrapped in anchor for links
                        <a key={index} href={button.link} target={button.external ? "_blank" : "_self"} rel={button.external ? "noopener noreferrer" : ""}>
                            <Button variant="primary" size="sm">{button.label}</Button>
                        </a>
                    )
                 ))}
                 {/* Default close button using Button component */}
                 {!content.buttons?.some(b => b.action === 'close') && (
                    <Button onClick={onClose} variant="outline" size="sm">Close</Button>
                 )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// --- Data Arrays --- (Keep as they are - content only)
const services = [
  {
    title: 'Website Development',
    description: 'Custom websites tailored to meet your business needs.',
    icon: Code,
    secondaryIcon: Globe,
    detailed: {
      overview: "Custom websites that are fast, secure, and built to convert visitors into customers.",
      keyFeatures: ["Responsive Design", "SEO Optimization", "Custom Functionality", "Performance Focused"],
      process: [
        { name: "Discovery & Planning", description: "We analyze your requirements and create a detailed project roadmap." },
        { name: "Design & Prototyping", description: "Creating wireframes and interactive prototypes for your approval." },
        { name: "Development", description: "Building your website with clean, efficient code and modern technologies." },
        { name: "Testing & Launch", description: "Rigorous testing and smooth deployment of your website." }
      ],
      pricing: "Starting at $200 - includes custom design, responsive layout, and initial SEO setup.",
      additionalInfo: "We offer monthly maintenance packages and on-demand support services.",
      buttons: [
        { label: 'Explore Web Dev', link: '/services', external: false }, // Example specific link
        { label: 'Request a Quote', link: '/contact', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
   {
    title: 'SEO & Digital Marketing',
    description: 'Enhance your online visibility and drive organic growth.',
    icon: Search,
    secondaryIcon: BarChart3,
    detailed: {
      overview: "Advanced strategies to improve your rankings, boost traffic, and maximize ROI.",
      keyFeatures: ["Keyword Research", "Content Strategies", "PPC Campaigns", "Social Media Advertising"],
      process: [
        { name: "Audit & Strategy", description: "We assess your current visibility and craft a custom marketing plan." },
        { name: "Implementation", description: "Executing on-page SEO, content marketing, and paid campaigns." },
        { name: "Monitoring & Optimization", description: "Regular analysis and adjustments to ensure continuous growth." },
        { name: "Reporting", description: "Transparent reporting on key metrics, conversions, and ROI." }
      ],
      pricing: "Custom monthly retainers starting at $50/month.",
      additionalInfo: "Short-term campaigns and long-term growth strategies available.",
      buttons: [
        { label: 'Marketing Packages', link: '/pricing', external: false },
        { label: 'Free SEO Audit', link: '/contact', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    title: 'Branding & Strategy',
    description: 'Build a strong and unique brand identity.',
    icon: PenTool,
    secondaryIcon: Zap,
    detailed: {
      overview: "Craft a memorable brand image that resonates with your target audience.",
      keyFeatures: ["Custom Logo & Assets", "Brand Messaging", "Market Research", "Emotional Storytelling"],
      process: [
        { name: "Brand Discovery", description: "Understanding your brand values, audience, and competition." },
        { name: "Visual Identity", description: "Creating logos, color schemes, typography, and imagery." },
        { name: "Messaging & Guidelines", description: "Defining clear brand messaging and building cohesive guidelines." },
        { name: "Launch & Integration", description: "Integrating your new branding across all platforms." }
      ],
      pricing: "Branding packages start at $150.",
      additionalInfo: "Options to include brand workshops and training sessions.",
      buttons: [
        { label: 'View Branding Samples', link: '/portfolio', external: false }, // Point to portfolio
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    title: 'Content & Social Media',
    description: 'Grow your audience with engaging content and managed campaigns.',
    icon: MessageSquare,
    secondaryIcon: CheckCircle,
    detailed: {
      overview: "Attract, engage, and retain followers through high-quality, consistent content.",
      keyFeatures: ["Content Calendars", "High-Quality Blogs & Videos", "Influencer Collaborations", "Analytics & Performance Tracking"],
      process: [
        { name: "Strategy Development", description: "Identifying channels, topics, and posting schedules." },
        { name: "Content Creation", description: "Producing engaging blogs, videos, and graphics." },
        { name: "Community Management", description: "Interacting with followers and nurturing brand loyalty." },
        { name: "Performance Optimization", description: "Using analytics to refine content strategy and improve results." }
      ],
      pricing: "Monthly content packages starting at $50.",
      additionalInfo: "Custom packages available for multiple platforms.",
      buttons: [
        { label: 'Content Packages', link: '/pricing', external: false },
        { label: 'See Content Examples', link: '/portfolio', external: false }, // Point to portfolio
        { label: 'Close', action: 'close' }
      ]
    }
  }
];

// Removed stats array as it wasn't used in the render function below
const workflowSteps = [
 {
    step: 'Consultation',
    description: 'Understand your vision and requirements.',
    icon: Briefcase,
    detailed: {
      overview: "We begin by getting to know your business goals and challenges.",
      keyFeatures: ["Thorough Requirements Analysis", "Customized Approach", "Clear Timeline & Deliverables"],
      additionalInfo: "We offer a free 30-minute consultation for new clients.",
      buttons: [ { label: 'Book Consultation', link: '/contact', external: false }, { label: 'Close', action: 'close' } ]
    }
  },
  {
    step: 'Strategy',
    description: 'Develop a tailored, actionable plan.',
    icon: LineChart,
    detailed: {
      overview: "Data-driven strategies to ensure measurable outcomes.",
      keyFeatures: ["Market Research", "Target Audience Insights", "Strategic Roadmapping"],
      additionalInfo: "We use data analytics tools to refine strategy over time.",
      buttons: [ { label: 'View Strategy Insights', link: '/blog', external: false }, { label: 'Close', action: 'close' } ] // Example link
    }
  },
  {
    step: 'Execution',
    description: 'Bring your project to life with precision.',
    icon: Rocket,
    detailed: {
      overview: "From development to marketing, we implement your plan efficiently.",
      keyFeatures: ["Agile Methodologies", "Quality Assurance", "Transparent Communication"],
      additionalInfo: "We use project management tools for real-time updates.",
      buttons: [ { label: 'Learn About Our Process', link: '/about', external: false }, { label: 'Close', action: 'close' } ]
    }
  },
  {
    step: 'Delivery & Support',
    description: 'Deliver results and provide ongoing support.',
    icon: ShieldCheck,
    detailed: {
      overview: "Seamless handover and long-term support to ensure sustained growth.",
      keyFeatures: ["Training & Documentation", "Maintenance Plans", "Continuous Optimization"],
      additionalInfo: "We offer extended support and maintenance contracts.",
      buttons: [ { label: 'Support Options', link: '/contact#support', external: false }, { label: 'Close', action: 'close' } ] // Example link
    }
  }
];


// --- Main Services Component ---
export function Services() { // Changed name from ServicesPage if this is intended as a component
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: {}, Icon: null });

  const openModal = (title, content, Icon) => {
    setModalData({ isOpen: true, title, content, Icon });
  };
  const closeModal = () => {
    setModalData({ isOpen: false, title: '', content: {}, Icon: null });
  };

  return (
    // Main container with dark background and transition
    <div className={cn(
        "py-20 sm:py-24 w-full", // Adjusted padding
        "bg-primary dark:bg-gray-950", // Dark mode background
        "transition-colors duration-300"
    )}>
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24" // Responsive spacing
        // Animation applied when component scrolls into view
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }} // Trigger animation earlier
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div className="text-center max-w-3xl mx-auto" variants={itemVariants}>
           {/* Dark mode text colors */}
          <h2 className="text-3xl font-extrabold text-white dark:text-gray-100 sm:text-4xl md:text-5xl">
            What We Offer
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-300 dark:text-gray-400">
            Comprehensive digital solutions designed to elevate your brand and drive growth.
          </p>
        </motion.div>

        {/* Services Section Grid */}
        <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
          {services.map((service) => {
            const Icon = service.icon;
            const SecondaryIcon = service.secondaryIcon;
            return (
              // Service Card Styling for dark mode
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -6 }} // Slightly increased hover effect
                className={cn(
                    "relative group p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden", // Added overflow hidden
                    "bg-[#003366] dark:bg-gray-800" // Card background
                )}
                onClick={() => openModal(service.title, service.detailed, service.icon)}
              >
                {/* Secondary Icon Styling */}
                <div className="absolute -top-4 -right-4 p-2 opacity-10 group-hover:opacity-15 dark:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 group-hover:scale-110 group-hover:rotate-6">
                   <SecondaryIcon className="w-24 h-24 text-white/30 dark:text-gray-600" /> {/* Adjusted colors/opacity */}
                </div>
                {/* Primary Icon */}
                 <motion.span
                  className={cn(
                      "relative z-10 rounded-lg inline-flex p-3 text-white group-hover:text-white transition-colors duration-300 mb-4",
                      "bg-[#004080] dark:bg-gray-700 dark:text-blue-300", // Icon background/color
                      "group-hover:bg-[#00509E] dark:group-hover:bg-gray-600 shadow-md" // Hover background
                  )}
                  variants={iconHover} whileHover="hover"
                > <Icon className="h-6 w-6" aria-hidden="true" /> </motion.span>
                {/* Text Content */}
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-white dark:text-gray-100">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-gray-300 dark:text-gray-400 line-clamp-3"> {/* Limit lines */}
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Workflow Section */}
        <motion.div
          className="w-full pt-12" // Consistent padding
          variants={containerVariants} // Apply stagger to children here too
        >
           {/* Title Dark Mode */}
           <motion.h3 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-gray-100 text-center mb-12" variants={itemVariants}>
            Our Simple Workflow
          </motion.h3>
          <motion.div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4" > {/* Removed variants here, parent handles stagger */}
            {workflowSteps.map((step) => (
              // Workflow Card Styling for Dark Mode
              <motion.div
                key={step.step}
                variants={itemVariants} // Each item animates individually
                whileHover={{ y: -6 }}
                className={cn(
                    "flex flex-col items-center text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer",
                    "bg-[#004080] dark:bg-gray-800" // Card background
                )}
                onClick={() => openModal(step.step, step.detailed, step.icon)}
              >
                {/* Workflow Icon */}
                 <motion.span
                  className={cn(
                    "rounded-full p-4 mb-4 transition-colors duration-300 shadow-md", // Increased padding
                    "bg-[#00509E] dark:bg-gray-700" // Icon background
                  )}
                  variants={iconHover} whileHover="hover"
                > <step.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white dark:text-blue-300" /> </motion.span> {/* Icon color & size */}
                {/* Workflow Text */}
                <h4 className="text-md sm:text-lg font-bold text-white dark:text-gray-100">{step.step}</h4>
                <p className="text-gray-300 dark:text-gray-400 mt-2 text-sm flex-grow">{step.description}</p> {/* Allow description to grow */}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Render the Modal */}
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
