import React from 'react';

export function PrivacyPolicyPage() {
  return (
    <div className="pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#002B5B] mb-8">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none">
          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information that you provide directly to us, including when you fill out a contact form, subscribe to our newsletter, or interact with our services.
          </p>

          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect to provide, maintain, and improve our services, communicate with you, and comply with legal obligations.
          </p>

          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">3. Information Sharing</h2>
          <p className="text-gray-600 mb-4">
            We do not sell or share your personal information with third parties except as described in this policy or with your consent.
          </p>

          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">4. Security</h2>
          <p className="text-gray-600 mb-4">
            We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.
          </p>

          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">5. Your Rights</h2>
          <p className="text-gray-600 mb-4">
            You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
          </p>
        </div>
      </div>
    </div>
  );
}