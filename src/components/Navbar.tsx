import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-[#002B5B]">Rise</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className={`${isActive('/') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${isActive('/about') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`${isActive('/services') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className={`${isActive('/portfolio') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className={`${isActive('/contact') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              Contact
            </Link>
            <Link to="/contact">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#002B5B]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className={`block px-3 py-2 ${isActive('/') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 ${isActive('/about') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`block px-3 py-2 ${isActive('/services') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              Services
            </Link>
            <Link
              to="/portfolio"
              className={`block px-3 py-2 ${isActive('/portfolio') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              Portfolio
            </Link>
            <Link
              to="/contact"
              className={`block px-3 py-2 ${isActive('/contact') ? 'text-[#002B5B]' : 'text-gray-700'} hover:text-[#002B5B]`}
            >
              Contact
            </Link>
            <div className="px-3 py-2">
              <Link to="/contact">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}