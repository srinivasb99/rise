// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { cn } from '../utils/cn'; // Assuming cn utility exists

export function Footer() {
  return (
    // Update background and text colors
    <footer className={cn(
        "bg-[#002B5B] text-white",
        "dark:bg-gray-900 dark:border-t dark:border-gray-700",
        "transition-colors duration-300" // Added transition
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Rise Online Solutions</h3>
            <p className="text-sm text-gray-300 dark:text-gray-400">
              Transforming businesses through innovative digital solutions.
            </p>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              {/* Update link colors */}
              <li><Link to="/" className="text-sm text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors">About</Link></li>
              <li><Link to="/services" className="text-sm text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Services</Link></li>
            </ul>
          </div>
          {/* Column 3 */}
           <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-sm text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Connect With Us</h3>
            <div className="flex space-x-4">
               {/* Update icon link colors */}
              <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <Facebook size={20} />
              </a>
              {/* ... other social links ... */}
              <a href="#" aria-label="Twitter" className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <Linkedin size={20} />
              </a>
              {/* --- FIX IS HERE --- */}
              {/* Wrap the Mail icon in its own anchor tag */}
              <a href="/contact" aria-label="Contact Us" className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                <Mail size={20} />
              </a>
              {/* The extra closing </a> tag was removed */}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-600">
          <p className="text-sm text-center text-gray-300 dark:text-gray-400">
            © {new Date().getFullYear()} Rise Online Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
