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
  Smartphone,
  Lock,
  BarChart,
  Heart,
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
            className="bg-white rounded-lg shadow-lg relative max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]"
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
                  <ul className="list-disc list-inside space-y-1">
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
              {content.pricing && (
                <div>
                  <h3 className="font-semibold">Pricing:</h3>
                  <p>{content.pricing}</p>
                </div>
              )}
              {content.caseStudies && content.caseStudies.length > 0 && (
                <div>
                  <h3 className="font-semibold">Case Studies:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {content.caseStudies.map((cs, idx) => (
                      <li key={idx}>
                        <a href={cs.link} target="_blank" rel="noopener noreferrer" className="text-[#002B5B] hover:underline">
                          {cs.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {content.additionalInfo && (
                <div>
                  <h3 className="font-semibold">Additional Information:</h3>
                  <p>{content.additionalInfo}</p>
                </div>
              )}
              {content.buttons && content.buttons.length > 0 && (
                <div className="space-x-2 flex flex-wrap">
                  {content.buttons.map((button, index) => (
                    <a 
                      key={index} 
                      href={button.link} 
                      className="mt-4 bg-[#002B5B] text-white px-6 py-3 rounded-full hover:bg-[#003C75] transition-colors duration-300"
                      target={button.external ? "_blank" : "_self"}
                      rel={button.external ? "noopener noreferrer" : ""}
                    >
                      {button.label}
                    </a>
                  ))}
                </div>
              )}
              {/* Existing default button */}
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
      ],
      pricing: "Starting at $2,000 - includes custom design, responsive layout, and initial SEO setup.",
      additionalInfo: "We offer monthly maintenance packages and on-demand support services.",
      caseStudies: [
        { title: 'E-Commerce Growth for ABC Retail', link: '/case-studies/abc-retail' },
        { title: 'Tech Startup Launch for XYZ Innovations', link: '/case-studies/xyz-innovations' }
      ],
      buttons: [
        { label: 'View Portfolio', link: '/portfolio', external: false },
        { label: 'Request a Quote', link: '/contact', external: false }
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
        'Advanced SEO to improve Google rankings.',
        'Keyword research and targeted content strategies.',
        'Paid advertising (PPC campaigns) for targeted outreach.',
        'Analytics and reporting to track growth and conversions.',
        'Social media advertising to engage new audiences.'
      ],
      pricing: "Custom monthly retainers starting at $500/month.",
      additionalInfo: "Short-term campaigns and long-term growth strategies available.",
      caseStudies: [
        { title: 'Traffic Boost for Local Bakery', link: '/case-studies/local-bakery' },
        { title: 'Lead Generation for SaaS Company', link: '/case-studies/saas-lead-gen' }
      ],
      buttons: [
        { label: 'Our Marketing Packages', link: '/pricing', external: false },
        { label: 'Free SEO Audit', link: '/contact', external: false }
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
        'Custom logo creation and full branding suites.',
        'Brand messaging strategies that resonate with audiences.',
        'Market research and competitor analysis for positioning.',
        'Emotional storytelling to connect with customers.',
        'Comprehensive brand guidelines for consistency.'
      ],
      pricing: "Branding packages start at $1,500.",
      additionalInfo: "Options to include brand workshops and training sessions.",
      caseStudies: [
        { title: 'Rebranding for a Consulting Firm', link: '/case-studies/consulting-rebrand' }
      ],
      buttons: [
        { label: 'View Brand Guidelines Samples', link: '/resources/brand-guidelines', external: false }
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
        'Content calendars to ensure consistent posting.',
        'High-quality blogs, videos, and infographics.',
        'Engagement strategies to build brand loyalty.',
        'Influencer collaborations for expanded reach.',
        'Analytics to measure content performance.'
      ],
      pricing: "Monthly content packages starting at $300.",
      additionalInfo: "Custom packages available for multiple platforms.",
      caseStudies: [
        { title: 'Viral Social Campaign for Startup', link: '/case-studies/viral-campaign' }
      ],
      buttons: [
        { label: 'Social Media Packages', link: '/pricing', external: false },
        { label: 'Content Samples', link: '/portfolio-content', external: false }
      ]
    }
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications for exceptional user experiences.',
    icon: Smartphone,
    secondaryIcon: Rocket,
    detailed: {
      details: [
        'iOS & Android expertise.',
        'Cross-platform solutions (React Native, Flutter).',
        'UI/UX Design tailored to mobile users.',
        'App Store Optimization and launch support.'
      ],
      pricing: "Custom quotes depending on feature set and complexity.",
      additionalInfo: "Maintenance and upgrade plans available post-launch.",
      caseStudies: [
        { title: 'Fitness App Launch', link: '/case-studies/fitness-app' }
      ],
      buttons: [
        { label: 'Schedule a Consultation', link: '/contact', external: false }
      ]
    }
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your digital assets with our comprehensive security solutions.',
    icon: Lock,
    secondaryIcon: ShieldCheck,
    detailed: {
      details: [
        'Security Audits to identify vulnerabilities.',
        'SSL Certificates and encryption protocols.',
        'Data Protection and compliance solutions.',
        'Regular monitoring and threat response.'
      ],
      pricing: "Monthly security packages starting at $200.",
      additionalInfo: "One-time audits and ongoing protection plans.",
      caseStudies: [
        { title: 'Security Overhaul for E-commerce Site', link: '/case-studies/security-ecommerce' }
      ],
      buttons: [
        { label: 'Security Audit Request', link: '/contact', external: false }
      ]
    }
  },
  {
    title: 'Analytics & Reporting',
    description: 'Make data-driven decisions with our detailed analytics and reporting services.',
    icon: BarChart,
    secondaryIcon: LineChart,
    detailed: {
      details: [
        'Custom Dashboards tailored to KPIs.',
        'Performance Metrics tracking.',
        'User Behavior analysis.',
        'Conversion Tracking and A/B Testing.'
      ],
      pricing: "Analytics setup starting at $150, monthly reporting packages available.",
      additionalInfo: "Integration with Google Analytics, Mixpanel, and more.",
      caseStudies: [
        { title: 'Data Insights for Healthcare Firm', link: '/case-studies/healthcare-data' }
      ],
      buttons: [
        { label: 'View Demo Dashboard', link: '/demo-dashboard', external: false }
      ]
    }
  },
  {
    title: 'Digital Transformation',
    description: 'Transform your business processes with cutting-edge digital solutions.',
    icon: Heart,
    secondaryIcon: Rocket,
    detailed: {
      details: [
        'Process Automation using the latest tools.',
        'Cloud Solutions for scalability.',
        'Digital Strategy consulting.',
        'Technology Integration for seamless workflows.'
      ],
      pricing: "Custom quotes based on organizational size and scope.",
      additionalInfo: "Long-term consulting partnerships for ongoing transformation.",
      caseStudies: [
        { title: 'Automation for Manufacturing Processes', link: '/case-studies/automation-manufacturing' }
      ],
      buttons: [
        { label: 'Learn About Our Approach', link: '/about', external: false }
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
      serviceFocus: "Website development and digital strategy.",
      caseStudies: [
        { title: 'Acme Corp Website Redesign', link: '/case-studies/acme-website' }
      ],
      additionalInfo: "Our ongoing partnership includes quarterly reviews and updates.",
      buttons: [
        { label: 'Read Full Testimonial', link: '/testimonials#acme-corp', external: false }
      ]
    }
  },
  {
    quote: "Excellent service and support! We saw a significant increase in organic traffic within months.",
    name: "Jane Smith",
    company: "Tech Innovators",
    detailed: {
      outcome: "Boosted organic traffic with SEO strategies.",
      serviceFocus: "SEO & Digital Marketing.",
      caseStudies: [
        { title: 'Tech Innovators SEO Case Study', link: '/case-studies/tech-innovators-seo' }
      ],
      additionalInfo: "Tech Innovators continues to see year-over-year growth.",
      buttons: [
        { label: 'Explore Marketing Packages', link: '/pricing', external: false }
      ]
    }
  },
  {
    quote: "Highly skilled team with a clear understanding of our business needs. Top-notch delivery!",
    name: "Michael Johnson",
    company: "Visionary Brands",
    detailed: {
      outcome: "Precise and effective delivery tailored to business goals.",
      serviceFocus: "Branding & Strategy.",
      caseStudies: [
        { title: 'Visionary Brands Rebranding', link: '/case-studies/visionary-brands' }
      ],
      additionalInfo: "We now have cohesive brand messaging across all platforms.",
      buttons: [
        { label: 'View Branding Services', link: '/services', external: false }
      ]
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
        'Over 120 projects across multiple industries.',
        'Tailored solutions for local businesses and global enterprises.',
        'Includes web design, digital campaigns, branding, and more.',
        'Proven track record of exceeding goals.'
      ],
      additionalInfo: "See our portfolio for highlights and success stories.",
      buttons: [
        { label: 'View Portfolio', link: '/portfolio', external: false }
      ]
    }
  },
  {
    label: '95% Satisfied Clients',
    value: '95%',
    icon: ShieldCheck,
    detailed: {
      details: [
        'Maintaining a 95% client satisfaction rate.',
        'Personalized attention to each client’s unique needs.',
        'Clear communication and top-notch execution.',
        'Results-driven approach with measurable growth.'
      ],
      additionalInfo: "Our customer support team is available 24/7.",
      buttons: [
        { label: 'Read Client Testimonials', link: '/testimonials', external: false }
      ]
    }
  },
  {
    label: '10+ Years of Experience',
    value: '10+',
    icon: Award,
    detailed: {
      details: [
        'Over a decade of combined experience.',
        'Diverse portfolio spanning various industries.',
        'Skilled professionals up-to-date with latest trends.',
        'Long-lasting partnerships built on trust and innovation.'
      ],
      additionalInfo: "We invest in continuous learning and professional development.",
      buttons: [
        { label: 'Meet the Team', link: '/about', external: false }
      ]
    }
  },
  {
    label: '50+ Team Members',
    value: '50+',
    icon: Users,
    detailed: {
      details: [
        'A growing team of over 50 experts.',
        'Professionals in development, strategy, design, and marketing.',
        'Collaborative workflows for efficient delivery.',
        'Constant skill development and innovation.'
      ],
      additionalInfo: "Join our team! We're always looking for talented individuals.",
      buttons: [
        { label: 'Careers', link: '/careers', external: false }
      ]
    }
  }
];

const workflowSteps = [
  {
    step: 'Consultation',
    description: 'In this initial phase, we understand your vision and requirements.',
    icon: Briefcase,
    detailed: {
      details: [
        'Deep-dive consultation to identify goals and challenges.',
        'Business objectives aligned with project scope.',
        'Clear timelines, milestones, and deliverables.',
        'Personalized approach to ensure smooth workflow.'
      ],
      additionalInfo: "We offer a free 30-minute consultation for new clients.",
      buttons: [
        { label: 'Book a Consultation', link: '/contact', external: false }
      ]
    }
  },
  {
    step: 'Strategy',
    description: 'We develop a tailored and actionable plan for success.',
    icon: LineChart,
    detailed: {
      details: [
        'Comprehensive research on target audiences.',
        'Data-driven strategies for measurable outcomes.',
        'Detailed project roadmap with milestones.',
        'Flexible plans for feedback and adjustments.'
      ],
      additionalInfo: "We use data analytics tools to refine strategy over time.",
      buttons: [
        { label: 'View Strategy Templates', link: '/resources/strategy-templates', external: false }
      ]
    }
  },
  {
    step: 'Execution',
    description: 'We bring your project to life with precision.',
    icon: Rocket,
    detailed: {
      details: [
        'Step-by-step implementation following the approved plan.',
        'Development, testing, and quality checks.',
        'Constant communication and updates.',
        'Agile methodology for adaptability.'
      ],
      additionalInfo: "We use project management tools for transparency.",
      buttons: [
        { label: 'Project Management FAQs', link: '/faq#project-management', external: false }
      ]
    }
  },
  {
    step: 'Delivery & Support',
    description: 'We deliver results and provide ongoing support for long-term success.',
    icon: ShieldCheck,
    detailed: {
      details: [
        'Final delivery with documentation and training.',
        'Post-launch support and troubleshooting.',
        'Maintenance plans for continuous optimization.',
        'Periodic evaluations for ongoing improvement.'
      ],
      additionalInfo: "We offer extended support and maintenance contracts.",
      buttons: [
        { label: 'Support Plans', link: '/support', external: false }
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
    <div className="py-24 bg-[#001F3F] w-full">
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
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
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
                className="relative group bg-[#003366] p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(service.title, service.detailed, service.icon)}
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <SecondaryIcon className="w-20 h-20 text-[#FFFFFF]" />
                </div>
                <motion.span
                  className="rounded-lg inline-flex p-3 bg-[#004080] text-[#FFFFFF] group-hover:bg-[#00509E] group-hover:text-white transition-colors duration-300 mb-4 block"
                  variants={iconHover}
                  whileHover="hover"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </motion.span>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-300">
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
