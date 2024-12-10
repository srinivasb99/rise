import React from 'react';
import { Code, Search, PenTool, MessageSquare, MonitorSmartphone, ShieldCheck, BarChart, Rocket } from 'lucide-react';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export default function ConsultationSection() {
  const navigate = useNavigate();

const services = [
  {
    title: 'Website Development',
    description: 'Custom websites that are fast, secure, and built to convert visitors into customers.',
    icon: Code,
    features: ['Responsive Design', 'SEO Optimization', 'Custom Functionality', 'Performance Focused'],
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Drive organic traffic and improve your online visibility with our proven SEO strategies.',
    icon: Search,
    features: ['Keyword Research', 'Content Strategy', 'Link Building', 'Analytics & Reporting'],
  },
  {
    title: 'Branding & Strategy',
    description: 'Create a memorable brand identity that resonates with your target audience.',
    icon: PenTool,
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy'],
  },
  {
    title: 'Content & Social Media',
    description: 'Engage your audience with compelling content and social media management.',
    icon: MessageSquare,
    features: ['Content Creation', 'Social Media Management', 'Community Building', 'Engagement Strategy'],
  },
  {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
    icon: MonitorSmartphone,
    features: ['iOS & Android', 'Cross-platform', 'UI/UX Design', 'App Store Optimization'],
  },
  {
    title: 'Cybersecurity',
    description: 'Protect your digital assets with our comprehensive security solutions.',
    icon: ShieldCheck,
    features: ['Security Audits', 'SSL Certificates', 'Data Protection', 'Regular Monitoring'],
  },
  {
    title: 'Analytics & Reporting',
    description: 'Make data-driven decisions with our detailed analytics and reporting services.',
    icon: BarChart,
    features: ['Custom Dashboards', 'Performance Metrics', 'User Behavior', 'Conversion Tracking'],
  },
  {
    title: 'Digital Transformation',
    description: 'Transform your business processes with cutting-edge digital solutions.',
    icon: Rocket,
    features: ['Process Automation', 'Cloud Solutions', 'Digital Strategy', 'Technology Integration'],
  },
];

export function ServicesPage() {
  return (
    <div className="pt-16">
      <div className="bg-[#E0F0FF] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#002B5B]">Our Services</h1>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="rounded-lg inline-flex p-3 bg-[#E0F0FF] text-[#002B5B]">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-[#002B5B]">{service.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{service.description}</p>
                <ul className="mt-6 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#002B5B] mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    <div className="bg-[#002B5B] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Let's discuss how we can help transform your business
        </p>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigate('/consultation')}
        >
          Schedule a Consultation
        </Button>
      </div>
    </div>
  );
}
