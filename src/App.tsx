import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import Preloader from "./components/Preloader"; // Update the path as needed
import MainLayout from "./layouts/MainLayout"; // Your main content layout


function AppWrapper() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* AnimatePresence should wrap Routes and receive location & key */}
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

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <Preloader onFinish={() => setIsLoaded(true)} />}
      </AnimatePresence>
      {isLoaded && <MainLayout />}
    </>
  );
} 

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
