import React from 'react';
import { Button } from './Button';

export function Hero() {
  return (
    <div className="relative bg-[#E0F0FF] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-[#002B5B] sm:text-5xl md:text-6xl">
            <span className="block">Elevate Your</span>
            <span className="block text-[#002B5B]">Digital Presence</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Transform your business with cutting-edge web solutions. We deliver innovative digital strategies that drive growth and engagement.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Button size="lg">
                Schedule a Consultation
              </Button>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 fill-current text-white" viewBox="0 0 1440 48">
          <path d="M0 48h1440V0c-624 23-936 23-1440 0v48z" />
        </svg>
      </div>
    </div>
  );
}