import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Search,
  PenTool,
  MessageSquare,
  Globe,
  BarChart3,
  Zap,
  CheckCircle,
  Users,
  Briefcase,
  LineChart,
  Rocket,
  Award,
  ShieldCheck,
  Layers,
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
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
              <h2 id="modal-title" className="text-2xl font-bold text-[#002B5B]">{title}</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              {content.details && (
                <div>
                  <h3 className="font-semibold">Details:</h3>
                  <ul className="list-disc list-inside">
                    {content.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
              {content.outcome && (
                <div>
                  <h3 className="font-semibold">Outcome:</h3>
                  <p>{content.outcome}</p>
                </div>
              )}
              {content.serviceFocus && (
                <div>
                  <h3 className="font-semibold">Service Focus:</h3>
                  <p>{content.serviceFocus}</p>
                </div>
              )}
              <a href="/services">
                <button className="mt-4 bg-[#002B5B] text-white px-6 py-3 rounded-full hover:bg-[#003C75] transition-colors duration-300">
                  Get Started
                </button>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Data Arrays with Detailed Content
const services = [
  {
    title: 'Website Development',
    description: 'Custom websites tailored to meet your business needs.',
    icon: Code,
    secondaryIcon: Globe,
    detailed: {
      details: [
        'Fast, secure, and user-friendly websites optimized for SEO.',
        'Mobile and desktop responsiveness to ensure a seamless user experience.',
        'Built to convert visitors into customers with intuitive design.',
        'Features include eCommerce integration, custom forms, and CMS setups.',
        'Post-launch maintenance to ensure long-term website performance.'
      ]
    }
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Enhance your online visibility and drive organic growth.',
    icon: Search,
    secondaryIcon: BarChart3,
    detailed: {
      details: [
        'Advanced Search Engine Optimization (SEO) to improve rankings on Google.',
        'Keyword research and content strategies tailored to your audience.',
        'Paid advertising (PPC campaigns) for targeted outreach and ROI.',
        'Analytics and reporting to track growth, user behavior, and conversions.',
        'Social media advertising to engage new audiences and retain customers.'
      ]
    }
  },
  {
    title: 'Branding & Strategy',
    description: 'Build a strong and unique brand identity.',
    icon: PenTool,
    secondaryIcon: Zap,
    detailed: {
      details: [
        'Custom logo creation and branding assets (colors, typography, etc.).',
        'Brand messaging strategies to align with business goals and audience.',
        'Market research and competitor analysis for strategic positioning.',
        'Storytelling techniques to foster emotional connections with customers.',
        'Comprehensive brand guidelines to maintain consistency across platforms.'
      ]
    }
  },
  {
    title: 'Content & Social Media',
    description: 'Grow your audience with engaging content and managed campaigns.',
    icon: MessageSquare,
    secondaryIcon: CheckCircle,
    detailed: {
      details: [
        'Custom social media calendars to ensure consistent posting.',
        'High-quality content creation: blogs, videos, infographics, and more.',
        'Engagement strategies to connect with followers and build brand loyalty.',
        'Influencer collaborations to expand brand visibility.',
        'Analytics and reports to measure content performance and audience impact.'
      ]
    }
  }
];

const testimonials = [
  {
    quote: "Rise Online Solutions transformed our business presence. Their team is professional and results-driven!",
    name: "John Doe",
    company: "Acme Corp",
    detailed: {
      outcome: "Increased business visibility and measurable results.",
      serviceFocus: "Website development and digital strategy."
    }
  },
  {
    quote: "Excellent service and support! We saw a significant increase in organic traffic within months.",
    name: "Jane Smith",
    company: "Tech Innovators",
    detailed: {
      outcome: "Boosted organic traffic with SEO strategies.",
      serviceFocus: "SEO & Digital Marketing."
    }
  },
  {
    quote: "Highly skilled team with a clear understanding of our business needs. Top-notch delivery!",
    name: "Michael Johnson",
    company: "Visionary Brands",
    detailed: {
      outcome: "Precise and effective delivery tailored to business goals.",
      serviceFocus: "Branding & Strategy."
    }
  }
];

const stats = [
  {
    label: '120+ Projects Completed',
    value: '120+',
    icon: Layers,
    detailed: {
      details: [
        'Our team has successfully completed over 120 projects across multiple industries.',
        'Tailored solutions for local businesses, global enterprises, and startups.',
        'Projects include web design, digital campaigns, branding, and content strategies.',
        'Proven track record of exceeding goals and delivering transformative results.'
      ]
    }
  },
  {
    label: '95% Satisfied Clients',
    value: '95%',
    icon: ShieldCheck,
    detailed: {
      details: [
        'We are proud to maintain a 95% client satisfaction rate.',
        'Personalized attention to every client’s unique needs and challenges.',
        'Regular updates, clear communication, and top-notch execution.',
        'Results-driven approach to achieve measurable growth and ROI.'
      ]
    }
  },
  {
    label: '10+ Years of Experience',
    value: '10+',
    icon: Award,
    detailed: {
      details: [
        'With over a decade of experience, we combine creativity with expertise.',
        'Diverse portfolio of solutions spanning industries like retail, tech, and healthcare.',
        'Skilled professionals who stay updated with the latest trends and technologies.',
        'Long-lasting partnerships built on trust, results, and innovation.'
      ]
    }
  },
  {
    label: '50+ Team Members',
    value: '50+',
    icon: Users,
    detailed: {
      details: [
        'A growing team of over 50 experts committed to your success.',
        'Professionals specializing in development, strategy, design, and marketing.',
        'Collaborative workflows to deliver high-quality solutions efficiently.',
        'Regular team development and learning to stay at the forefront of innovation.'
      ]
    }
  }
];

const workflowSteps = [
  {
    step: 'Consultation',
    description: 'In this initial phase, we work to understand your vision and requirements.',
    icon: Briefcase,
    detailed: {
      details: [
        'A deep-dive consultation to identify pain points and opportunities.',
        'Business goals aligned with project objectives.',
        'Clear timelines, milestones, and deliverables set for accountability.',
        'Personalized approach to ensure a smooth workflow.'
      ]
    }
  },
  {
    step: 'Strategy',
    description: 'We develop a tailored and actionable plan for success.',
    icon: LineChart,
    detailed: {
      details: [
        'Comprehensive research on target audiences and market trends.',
        'Data-driven strategies to achieve measurable outcomes.',
        'Detailed project roadmap with milestones and KPIs.',
        'Flexible plans that allow room for feedback and adjustments.'
      ]
    }
  },
  {
    step: 'Execution',
    description: 'This is where we bring your project to life with precision.',
    icon: Rocket,
    detailed: {
      details: [
        'Step-by-step implementation following the approved strategy.',
        'Development, testing, and refinement to meet quality standards.',
        'Constant communication with stakeholders for project alignment.',
        'Agile methodology for adaptability during the process.'
      ]
    }
  },
  {
    step: 'Delivery & Support',
    description: 'We deliver results and provide ongoing support to ensure long-term success.',
    icon: ShieldCheck,
    detailed: {
      details: [
        'Final project delivery with documentation and training (if needed).',
        'Post-launch support for monitoring and troubleshooting.',
        'Maintenance plans to keep websites, campaigns, or content optimized.',
        'Continuous evaluation to identify areas for further improvement.'
      ]
    }
  }
];

// Updated Services Component
export function Services() {
  // Modal State Management
  const [modalData, setModalData] = useState({ isOpen: false, title: '', content: {}, Icon: null });

  const openModal = (title, content, Icon) => {
    setModalData({ isOpen: true, title, content, Icon });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, title: '', content: {}, Icon: null });
  };

  return (
    <div className="py-24 bg-white w-full">
      <motion.div
        className="w-full px-4 sm:px-6 lg:px-8 space-y-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: 0.6 }}
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

        {/* Our Workflow Section */}
        <motion.div
          className="w-full mt-24 bg-[#001F3F] py-12 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-extrabold text-white text-center mb-12" variants={itemVariants}>
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
                className="flex flex-col items-center text-center bg-[#004080] p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(step.step, step.detailed, step.icon)}
              >
                <motion.span
                  className="rounded-full bg-[#00509E] p-3 mb-4"
                  variants={iconHover}
                  whileHover="hover"
                >
                  <step.icon className="w-12 h-12 text-[#FFFFFF]" />
                </motion.span>
                <h4 className="text-lg font-bold text-white">{step.step}</h4>
                <p className="text-gray-300 mt-2">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Our Achievements Section */}
        <motion.div
          className="w-full mt-24 bg-[#001F3F] py-12 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-extrabold text-white text-center mb-12" variants={itemVariants}>
            Our Achievements
          </motion.h3>
          <motion.div
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center bg-[#00509E] p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(stat.label, stat.detailed, stat.icon)}
              >
                <motion.span
                  className="rounded-full bg-[#0066CC] p-3 mb-4"
                  variants={iconHover}
                  whileHover="hover"
                >
                  <stat.icon className="w-16 h-16 text-[#FFFFFF]" />
                </motion.span>
                <h4 className="text-3xl font-extrabold text-white">{stat.value}</h4>
                <p className="text-gray-300 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* What Our Clients Say Section */}
        <motion.div
          className="w-full mt-24 bg-[#001F3F] py-12 px-4 sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h3 className="text-2xl font-extrabold text-white text-center mb-12" variants={itemVariants}>
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
                className="p-8 bg-[#00509E] rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer max-w-md"
                onClick={() => openModal(`${testimonial.name}, ${testimonial.company}`, testimonial.detailed, null)}
              >
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                <h4 className="mt-4 font-semibold text-white">
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
