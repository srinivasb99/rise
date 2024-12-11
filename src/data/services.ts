import { Code, Search, PenTool, MessageSquare, MonitorSmartphone, ShieldCheck, BarChart, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}

export const services: Service[] = [
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
