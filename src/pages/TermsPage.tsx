import React from 'react';

export function TermsPage() {
  return (
    <div className="pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#002B5B] mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-blue max-w-none">
          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">2. Use License</h2>
          <p className="text-gray-600 mb-4">
            Permission is granted to temporarily download one copy of the materials (information or software) on Rise Online Solutions's website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">3. Disclaimer</h2>
          <p className="text-gray-600 mb-4">
            The materials on Rise Online Solutions's website are provided on an 'as is' basis. Rise Online Solutions makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">4. Limitations</h2>
          <p className="text-gray-600 mb-4">
            In no event shall Rise Online Solutions or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Rise Online Solutions's website.
          </p>

          <h2 className="text-xl font-semibold text-[#002B5B] mt-8 mb-4">5. Governing Law</h2>
          <p className="text-gray-600 mb-4">
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>
      </div>
    </div>
  );
}