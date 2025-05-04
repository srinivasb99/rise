// src/pages/TermsPage.tsx
import React from 'react';
import { PageWrapper } from '../components/PageWrapper'; // Import PageWrapper
import { cn } from '../utils/cn'; // Assuming cn utility

export function TermsPage() {
  return (
    // Use PageWrapper and add base dark background
    <PageWrapper className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="pt-16 sm:pt-24"> {/* Offset for fixed navbar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Main heading with dark mode text color */}
          <h1 className="text-3xl sm:text-4xl font-bold text-primary dark:text-gray-100 mb-8 sm:mb-12 text-center sm:text-left">
            Terms & Conditions
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
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Rise Online Solutions website ("Site"), you acknowledge that you have read, understood,
              and agree to be bound by these Terms and Conditions ("Terms"), including our Privacy Policy incorporated herein by reference.
              If you do not agree with any part of these Terms, you must not use this Site. We reserve the right to modify these Terms
              at any time, and such modifications shall be effective immediately upon posting the modified Terms on the Site.
            </p>

            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on the Site for personal,
              non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
              modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
              attempt to decompile or reverse engineer any software contained on the Site; remove any copyright or other proprietary notations
              from the materials; or transfer the materials to another person or "mirror" the materials on any other server. This license shall
              automatically terminate if you violate any of these restrictions and may be terminated by Rise Online Solutions at any time.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on the Site are provided on an 'as is' basis. Rise Online Solutions makes no warranties, expressed or implied,
              and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              Further, Rise Online Solutions does not warrant or make any representations concerning the accuracy, likely results, or reliability
              of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>

            <h2>4. Limitations of Liability</h2>
            <p>
              In no event shall Rise Online Solutions or its suppliers, partners, or affiliates be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Site,
              even if Rise Online Solutions or a Rise Online Solutions authorized representative has been notified orally or in writing of the possibility
              of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential
              or incidental damages, these limitations may not apply to you.
            </p>

             <h2>5. Intellectual Property</h2>
             <p>
                All content present on this Site, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads,
                data compilations, and software, is the property of Rise Online Solutions or its content suppliers and protected by international
                copyright laws. The compilation of all content on this site is the exclusive property of Rise Online Solutions.
            </p>

            <h2>6. Revisions and Errata</h2>
            <p>
                The materials appearing on the Site could include technical, typographical, or photographic errors. Rise Online Solutions does not warrant
                that any of the materials on its website are accurate, complete, or current. Rise Online Solutions may make changes to the materials
                contained on its website at any time without notice. Rise Online Solutions does not, however, make any commitment to update the materials.
            </p>

            <h2>7. Links to Other Websites</h2>
             <p>
                Our Site may contain links to third-party web sites or services that are not owned or controlled by Rise Online Solutions.
                Rise Online Solutions has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any
                third party web sites or services. You further acknowledge and agree that Rise Online Solutions shall not be responsible or liable,
                directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any
                such content, goods or services available on or through any such web sites or services.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction, e.g., the State of California]
              without regard to its conflict of law provisions. You irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located
              in [Your City, Your State].
            </p>

            <h2>9. Modifications</h2>
            <p>
                Rise Online Solutions may revise these terms of service for its website at any time without notice. By using this website you are agreeing
                to be bound by the then current version of these terms of service.
            </p>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
