import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

// NEW: import the Preloader
import { Preloader } from './components/Preloader';

function AppWrapper() {
  const location = useLocation();

  // We rely on the Preloader to unmount itself after 2 seconds.
  // But we can also track if it's visible here, if desired.
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Optional: if you want to handle the preloader state from here
  // rather than inside the Preloader component, you can do so.
  // But typically letting Preloader manage itself is easier.

  useEffect(() => {
    // After 2.5s, assume preloader is done. This just ensures
    // that even if user navigates quickly, we consider it "hidden".
    const timer = setTimeout(() => {
      setPreloaderDone(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* The Preloader will appear on top of everything until it unmounts. */}
      <Preloader />

      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
