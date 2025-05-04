// src/App.tsx
import React from 'react'; // Removed useState, useEffect as Preloader handles its own logic
import {
  Routes,
  Route,
  useLocation,
  // Navigate is used within ProtectedRoute now
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Core Layout Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';

// Page Components (Using your page structure)
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

// Auth Components (Using the components we created)
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';

// Auth Helper Component
import { ProtectedRoute } from './components/ProtectedRoute'; // Import the separate component

// Placeholder for 404 Page
const NotFoundPage = () => (
    <div className="pt-16 min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl font-bold text-[#002B5B] mb-4">404</h1>
        <p className="text-xl text-gray-700">Oops! The page you're looking for doesn't exist.</p>
        {/* You could add a link back to the home page here */}
    </div>
);

// NOTE: Ensure AuthProvider wraps <App /> in your main entry point (e.g., main.tsx or index.tsx)
// As per your original comment, Router is in main.tsx, so AuthProvider should be there too.

function App() {
  const location = useLocation(); // Get location for AnimatePresence key and conditional Footer

  // Preloader logic is now handled within the Preloader component itself

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Preloader will manage its own display and fade-out */}
      <Preloader />

      {/* Navbar is present on all pages */}
      <Navbar />

      {/* Main content area where pages are rendered */}
      <main className="flex-grow">
        {/* AnimatePresence enables animations between route changes */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Auth Routes - Using Login and Signup components */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Dashboard Route - Using Dashboard component */}
            <Route
              path="/dashboard"
              element={
                // ProtectedRoute component handles auth check and redirection
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for 404 Not Found pages */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </AnimatePresence>
      </main>

      {/* Footer - Conditionally rendered (hidden on login/signup) */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}
    </div>
  );
}

export default App; // Export App component
