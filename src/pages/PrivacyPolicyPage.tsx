// src/pages/PrivacyPolicyPage.tsx
import React from 'react';
import { PageWrapper } from '../components/PageWrapper'; // Import PageWrapper
import { cn } from '../utils/cn'; // Assuming cn utility

export function PrivacyPolicyPage() {
  return (
    // Use PageWrapper and add base dark background
    <PageWrapper className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="pt-16 sm:pt-24"> {/* Offset for fixed navbar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Main heading with dark mode text color */}
          <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-gray-100 mb-8 sm:mb-12 text-center sm:text-left">
            Privacy Policy
          </h1>

          {/* Apply prose for typography styling and dark:prose-invert for dark mode */}
          <div className={cn(
              "prose prose-blue dark:prose-invert", // Core prose styles and dark mode inversion
              "prose-headings:text-primary dark:prose-headings:text-blue-300", // Custom heading colors
              "prose-p:text-gray-700 dark:prose-p:text-gray-300", // Custom paragraph colors
              "prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-xl prose-h2:font-semibold", // Custom h2 styles
              "prose-p:mb-4", // Custom paragraph margin
              "max-w-none" // Allow prose to fill container
          )}>
             {/* The actual content doesn't need dark: prefixes because prose-invert handles it */}
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you interact with Rise Online Solutions.
              This may include personal identification information (like name, email address, phone number) when you fill out a contact form,
              request a consultation, subscribe to our newsletter, or otherwise communicate with us. We may also collect technical data
              such as IP address, browser type, and usage data when you navigate our website, using cookies and similar technologies.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              Your information is used for several purposes: to provide, operate, and maintain our services; to improve, personalize,
              and expand our offerings; to understand and analyze how you use our website and services; to develop new products, services,
              features, and functionality; to communicate with you, either directly or through one of our partners, including for customer service,
              to provide you with updates and other information relating to the website, and for marketing and promotional purposes (with your consent where required);
              to process your transactions; and for compliance purposes, including enforcing our Terms of Service, or other legal rights.
            </p>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              Rise Online Solutions does not sell your personal information. We may share information with third-party vendors and service providers
              that perform services on our behalf, such as website hosting, data analysis, payment processing, information technology, customer service,
              email delivery, and marketing assistance. These third parties are contractually obligated to safeguard your information and use it only
              for the purposes for which it was disclosed. We may also disclose information if required by law, subpoena, or other legal processes,
              or if we have a good faith belief that disclosure is reasonably necessary to protect the rights, property, or safety of our company,
              our customers, or the public.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. We use encryption, firewalls,
              and secure server facilities to protect against unauthorized access, alteration, disclosure, or destruction of your personal data.
              However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive
              to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
            </p>

            <h2>5. Cookies and Tracking Technologies</h2>
             <p>
              We use cookies and similar tracking technologies (like web beacons and pixels) to track activity on our Service and hold certain information.
              Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all
              cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>

            <h2>6. Your Data Protection Rights</h2>
            <p>
              Depending on your location, you may have the following rights regarding your personal information: the right to access, the right to rectification,
              the right to erasure, the right to restrict processing, the right to object to processing, and the right to data portability. To exercise these rights,
              please contact us using the contact information provided on our website. We will respond to your request within a reasonable timeframe.
            </p>

             <h2>7. Changes to This Privacy Policy</h2>
            <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>

             <h2>8. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us via the information provided on our Contact page.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
