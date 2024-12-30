// src/components/Hero.tsx

import React from "react";

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-5xl font-bold mb-4">Elevate Your Digital Presence</h1>
                <p className="text-lg mb-8">Transform your business with cutting-edge web solutions. We deliver innovative strategies that drive growth and engagement.</p>
                <div className="flex justify-center space-x-4">
                    <a
                        href="#services"
                        className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition duration-300"
                    >
                        Schedule Now
                    </a>
                    <a
                        href="#learn-more"
                        className="bg-transparent border border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white hover:text-blue-700 transition duration-300"
                    >
                        Learn More
                    </a>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-20 bg-wave-pattern bg-repeat-x"></div>
        </section>
    );
};

export default Hero;
