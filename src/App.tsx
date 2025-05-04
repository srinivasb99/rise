import React, { useState, useEffect } from 'react';
import {
  Routes, // Router is now in main.tsx
  Route,
  useLocation,
  Navigate // Import Navigate for redirection
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
import LoginPage from './pages/LoginPage'; // Import LoginPage
import SignupPage from './pages/SignupPage'; // Import SignupPage
import DashboardPage from './pages/DashboardPage'; // Import DashboardPage

import { Preloader } from './components/Preloader';
import { useAuth } from './context/AuthContext'; // Import useAuth

// Simple Protected Route Component within App.tsx
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // You might want to show a global loading spinner here
    // For now, just return null or a minimal loading indicator
    return <div>Loading authentication state...</div>;
  }

  if (!currentUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};


// Main App component (Removed the extra AppWrapper and Router)
function App() {
  const location = useLocation();

  // Preloader logic (kept as is)
  const [preloaderDone, setPreloaderDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloaderDone(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Preloader />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Dashboard Route */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* You might want to add a 404 Not Found route here */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}

          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App; // Export App directly
