import React from 'react';
import { Users, Target, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="pt-16">
      <div className="bg-[#E0F0FF] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#002B5B]">About Us</h1>
            <p className="mt-4 text-xl text-gray-600">
              We're passionate about helping businesses succeed in the digital world
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-[#002B5B]" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-[#002B5B]">Our Team</h3>
            <p className="mt-2 text-gray-600">
              Expert professionals dedicated to delivering exceptional results
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Target className="h-12 w-12 text-[#002B5B]" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-[#002B5B]">Our Mission</h3>
            <p className="mt-2 text-gray-600">
              Empowering businesses through innovative digital solutions
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <Award className="h-12 w-12 text-[#002B5B]" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-[#002B5B]">Our Values</h3>
            <p className="mt-2 text-gray-600">
              Excellence, integrity, and client success drive everything we do
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}