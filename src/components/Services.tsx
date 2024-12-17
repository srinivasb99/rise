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
  CheckIcon,
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

            <div className="text-gray-700 space-y-6">
              {/* Overview */}
              {content.overview && (
                <div>
                  <h3 className="font-semibold mb-2">Overview</h3>
                  <p>{content.overview}</p>
                </div>
              )}

              {/* Key Features */}
              {content.keyFeatures && content.keyFeatures.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Key Features</h3>
                  <ul className="space-y-1">
                    {content.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckIcon className="w-5 h-5 text-green-600 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process */}
              {content.process && content.process.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Process</h3>
                  <ul className="space-y-3">
                    {content.process.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-semibold">{step.name}</span>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing */}
              {content.pricing && (
                <div>
                  <h3 className="font-semibold mb-2">Pricing</h3>
                  <p>{content.pricing}</p>
                </div>
              )}

              {/* Additional Info */}
              {content.additionalInfo && (
                <div>
                  <h3 className="font-semibold mb-2">Additional Information</h3>
                  <p>{content.additionalInfo}</p>
                </div>
              )}

              {/* Case Studies */}
              {content.caseStudies && content.caseStudies.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Case Studies</h3>
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

              {/* Buttons */}
              <div className="flex flex-wrap gap-2 justify-start">
                {/* Custom buttons from content */}
                {content.buttons && content.buttons.map((button, index) => (
                  button.action === 'close' ? (
                    <button
                      key={index}
                      onClick={onClose}
                      className="bg-white border border-[#002B5B] text-[#002B5B] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
                    >
                      {button.label}
                    </button>
                  ) : (
                    <a
                      key={index}
                      href={button.link}
                      target={button.external ? "_blank" : "_self"}
                      rel={button.external ? "noopener noreferrer" : ""}
                      className="bg-[#002B5B] text-white px-6 py-3 rounded-full hover:bg-[#003C75] transition-colors duration-300"
                    >
                      {button.label}
                    </a>
                  )
                ))}

                {/* If no close button is provided, add one */}
                {!content.buttons?.some(b => b.action === 'close') && (
                  <button
                    onClick={onClose}
                    className="bg-white border border-[#002B5B] text-[#002B5B] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors duration-300"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Updated Data Arrays with consistent modal fields
const services = [
  {
    title: 'Website Development',
    description: 'Custom websites tailored to meet your business needs.',
    icon: Code,
    secondaryIcon: Globe,
    detailed: {
      overview: "Custom websites that are fast, secure, and built to convert visitors into customers.",
      keyFeatures: [
        "Responsive Design",
        "SEO Optimization",
        "Custom Functionality",
        "Performance Focused"
      ],
      process: [
        {
          name: "Discovery & Planning",
          description: "We analyze your requirements and create a detailed project roadmap."
        },
        {
          name: "Design & Prototyping",
          description: "Creating wireframes and interactive prototypes for your approval."
        },
        {
          name: "Development",
          description: "Building your website with clean, efficient code and modern technologies."
        },
        {
          name: "Testing & Launch",
          description: "Rigorous testing and smooth deployment of your website."
        }
      ],
      pricing: "Starting at $2,000 - includes custom design, responsive layout, and initial SEO setup.",
      additionalInfo: "We offer monthly maintenance packages and on-demand support services.",
      caseStudies: [
        { title: 'E-Commerce Growth for ABC Retail', link: '/case-studies/abc-retail' },
        { title: 'Tech Startup Launch for XYZ Innovations', link: '/case-studies/xyz-innovations' }
      ],
      buttons: [
        { label: 'Get Started', link: '/services', external: false },
        { label: 'View Portfolio', link: '/portfolio', external: false },
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
      keyFeatures: [
        "Keyword Research",
        "Content Strategies",
        "PPC Campaigns",
        "Social Media Advertising"
      ],
      process: [
        {
          name: "Audit & Strategy",
          description: "We assess your current visibility and craft a custom marketing plan."
        },
        {
          name: "Implementation",
          description: "Executing on-page SEO, content marketing, and paid campaigns."
        },
        {
          name: "Monitoring & Optimization",
          description: "Regular analysis and adjustments to ensure continuous growth."
        },
        {
          name: "Reporting",
          description: "Transparent reporting on key metrics, conversions, and ROI."
        }
      ],
      pricing: "Custom monthly retainers starting at $500/month.",
      additionalInfo: "Short-term campaigns and long-term growth strategies available.",
      caseStudies: [
        { title: 'Traffic Boost for Local Bakery', link: '/case-studies/local-bakery' },
        { title: 'Lead Generation for SaaS Company', link: '/case-studies/saas-lead-gen' }
      ],
      buttons: [
        { label: 'Our Marketing Packages', link: '/pricing', external: false },
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
      keyFeatures: [
        "Custom Logo & Assets",
        "Brand Messaging",
        "Market Research",
        "Emotional Storytelling"
      ],
      process: [
        {
          name: "Brand Discovery",
          description: "Understanding your brand values, audience, and competition."
        },
        {
          name: "Visual Identity",
          description: "Creating logos, color schemes, typography, and imagery."
        },
        {
          name: "Messaging & Guidelines",
          description: "Defining clear brand messaging and building cohesive guidelines."
        },
        {
          name: "Launch & Integration",
          description: "Integrating your new branding across all platforms."
        }
      ],
      pricing: "Branding packages start at $1,500.",
      additionalInfo: "Options to include brand workshops and training sessions.",
      caseStudies: [
        { title: 'Rebranding for a Consulting Firm', link: '/case-studies/consulting-rebrand' }
      ],
      buttons: [
        { label: 'View Brand Guidelines Samples', link: '/resources/brand-guidelines', external: false },
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
      keyFeatures: [
        "Content Calendars",
        "High-Quality Blogs & Videos",
        "Influencer Collaborations",
        "Analytics & Performance Tracking"
      ],
      process: [
        {
          name: "Strategy Development",
          description: "Identifying channels, topics, and posting schedules."
        },
        {
          name: "Content Creation",
          description: "Producing engaging blogs, videos, and graphics."
        },
        {
          name: "Community Management",
          description: "Interacting with followers and nurturing brand loyalty."
        },
        {
          name: "Performance Optimization",
          description: "Using analytics to refine content strategy and improve results."
        }
      ],
      pricing: "Monthly content packages starting at $300.",
      additionalInfo: "Custom packages available for multiple platforms.",
      caseStudies: [
        { title: 'Viral Social Campaign for Startup', link: '/case-studies/viral-campaign' }
      ],
      buttons: [
        { label: 'Social Media Packages', link: '/pricing', external: false },
        { label: 'Content Samples', link: '/portfolio-content', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  }
];

// For testimonials, stats, and workflow steps, we adapt the structure:

const testimonials = [
  {
    quote: "Rise Online Solutions transformed our business presence. Their team is professional and results-driven!",
    name: "John Doe",
    company: "Acme Corp",
    detailed: {
      overview: "A remarkable increase in visibility and measurable results through strategic website development and digital strategy.",
      keyFeatures: [
        "Dedicated Support",
        "Clear Communication",
        "Tailored Solutions"
      ],
      process: [], // Not applicable, leave empty
      pricing: null, // Not applicable
      additionalInfo: "Our ongoing partnership includes quarterly reviews and updates.",
      caseStudies: [
        { title: 'Acme Corp Website Redesign', link: '/case-studies/acme-website' }
      ],
      buttons: [
        { label: 'Read Full Testimonial', link: '/testimonials#acme-corp', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    quote: "Excellent service and support! We saw a significant increase in organic traffic within months.",
    name: "Jane Smith",
    company: "Tech Innovators",
    detailed: {
      overview: "By implementing robust SEO & marketing strategies, Tech Innovators experienced significant organic growth.",
      keyFeatures: [
        "Increased Organic Traffic",
        "Targeted SEO Tactics",
        "Ongoing Optimization"
      ],
      process: [],
      pricing: null,
      additionalInfo: "Tech Innovators continues to see year-over-year growth.",
      caseStudies: [
        { title: 'Tech Innovators SEO Case Study', link: '/case-studies/tech-innovators-seo' }
      ],
      buttons: [
        { label: 'Explore Marketing Packages', link: '/pricing', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    quote: "Highly skilled team with a clear understanding of our business needs. Top-notch delivery!",
    name: "Michael Johnson",
    company: "Visionary Brands",
    detailed: {
      overview: "Through strategic branding, Visionary Brands aligned their brand identity with their business goals.",
      keyFeatures: [
        "Cohesive Brand Messaging",
        "Improved Market Positioning",
        "Consistent Brand Identity"
      ],
      process: [],
      pricing: null,
      additionalInfo: "We now have cohesive brand messaging across all platforms.",
      caseStudies: [
        { title: 'Visionary Brands Rebranding', link: '/case-studies/visionary-brands' }
      ],
      buttons: [
        { label: 'View Branding Services', link: '/services', external: false },
        { label: 'Close', action: 'close' }
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
      overview: "A track record of successful projects spanning various industries and solutions.",
      keyFeatures: [
        "Diverse Industry Experience",
        "Customized Solutions",
        "Proven Results"
      ],
      process: [],
      pricing: null,
      additionalInfo: "See our portfolio for highlights and success stories.",
      caseStudies: [],
      buttons: [
        { label: 'View Portfolio', link: '/portfolio', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    label: '95% Satisfied Clients',
    value: '95%',
    icon: ShieldCheck,
    detailed: {
      overview: "Our commitment to quality, communication, and results has earned us a 95% satisfaction rate.",
      keyFeatures: [
        "Personalized Attention",
        "Transparent Communication",
        "Measurable Growth"
      ],
      process: [],
      pricing: null,
      additionalInfo: "Our customer support team is available 24/7.",
      caseStudies: [],
      buttons: [
        { label: 'Read Client Testimonials', link: '/testimonials', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    label: '10+ Years of Experience',
    value: '10+',
    icon: Award,
    detailed: {
      overview: "Over a decade of expertise in delivering cutting-edge digital solutions.",
      keyFeatures: [
        "Up-to-Date with Trends",
        "Skilled Professionals",
        "Long-Term Partnerships"
      ],
      process: [],
      pricing: null,
      additionalInfo: "We invest in continuous learning and professional development.",
      caseStudies: [],
      buttons: [
        { label: 'Meet the Team', link: '/about', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    label: '50+ Team Members',
    value: '50+',
    icon: Users,
    detailed: {
      overview: "A growing team of experts dedicated to delivering the best possible results.",
      keyFeatures: [
        "Cross-Functional Expertise",
        "Collaborative Workflows",
        "Constant Innovation"
      ],
      process: [],
      pricing: null,
      additionalInfo: "Join our team! We're always looking for talented individuals.",
      caseStudies: [],
      buttons: [
        { label: 'Careers', link: '/careers', external: false },
        { label: 'Close', action: 'close' }
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
      overview: "We begin by getting to know your business goals and challenges.",
      keyFeatures: [
        "Thorough Requirements Analysis",
        "Customized Approach",
        "Clear Timeline & Deliverables"
      ],
      process: [],
      pricing: null,
      additionalInfo: "We offer a free 30-minute consultation for new clients.",
      caseStudies: [],
      buttons: [
        { label: 'Book a Consultation', link: '/contact', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    step: 'Strategy',
    description: 'We develop a tailored and actionable plan for success.',
    icon: LineChart,
    detailed: {
      overview: "Data-driven strategies to ensure measurable outcomes.",
      keyFeatures: [
        "Market Research",
        "Target Audience Insights",
        "Strategic Roadmapping"
      ],
      process: [],
      pricing: null,
      additionalInfo: "We use data analytics tools to refine strategy over time.",
      caseStudies: [],
      buttons: [
        { label: 'View Strategy Templates', link: '/resources/strategy-templates', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    step: 'Execution',
    description: 'We bring your project to life with precision.',
    icon: Rocket,
    detailed: {
      overview: "From development to marketing, we implement your plan efficiently.",
      keyFeatures: [
        "Agile Methodologies",
        "Quality Assurance",
        "Transparent Communication"
      ],
      process: [],
      pricing: null,
      additionalInfo: "We use project management tools for real-time updates.",
      caseStudies: [],
      buttons: [
        { label: 'Project Management FAQs', link: '/faq#project-management', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  },
  {
    step: 'Delivery & Support',
    description: 'We deliver results and provide ongoing support for long-term success.',
    icon: ShieldCheck,
    detailed: {
      overview: "Seamless handover and long-term support to ensure sustained growth.",
      keyFeatures: [
        "Training & Documentation",
        "Maintenance Plans",
        "Continuous Optimization"
      ],
      process: [],
      pricing: null,
      additionalInfo: "We offer extended support and maintenance contracts.",
      caseStudies: [],
      buttons: [
        { label: 'Support Plans', link: '/support', external: false },
        { label: 'Close', action: 'close' }
      ]
    }
  }
];

export function Services() {
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

        {/* Workflow Section */}
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

        {/* Achievements Section */}
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

        {/* Testimonials Section */}
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
