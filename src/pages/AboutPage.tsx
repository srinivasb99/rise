import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="relative bg-gradient-to-b from-[#002B5B] to-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center relative z-10"
                >
                    <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight">
                        About Us
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
                        We are passionate about helping businesses succeed in the digital world. Our team is dedicated to delivering exceptional results through innovative solutions.
                    </p>
                </motion.div>

                <div className="mt-12 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="bg-white rounded-lg shadow-lg p-6 text-center"
                    >
                        <h2 className="text-2xl font-bold text-[#002B5B]">Our Mission</h2>
                        <p className="mt-4 text-gray-600">
                            Empowering businesses to thrive online through innovative digital solutions tailored to their unique needs.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="bg-white rounded-lg shadow-lg p-6 text-center"
                    >
                        <h2 className="text-2xl font-bold text-[#002B5B]">Our Team</h2>
                        <p className="mt-4 text-gray-600">
                            A group of passionate professionals committed to delivering exceptional results and fostering long-term success.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
