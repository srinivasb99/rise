// src/components/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct
import { Button } from './Button';
import { PageWrapper } from './PageWrapper';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn'; // Assuming cn utility

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect on success
    } catch (err: any) {
      console.error("Firebase Login Error:", err);
      // Refined error handling
      let friendlyError = 'Failed to log in. Please try again.';
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          friendlyError = 'Invalid email or password.';
          break;
        case 'auth/invalid-email':
          friendlyError = 'Invalid email format.';
          break;
        case 'auth/too-many-requests':
          friendlyError = 'Access temporarily disabled due to too many attempts. Try again later.';
          break;
        case 'auth/user-disabled':
          friendlyError = 'This user account has been disabled.';
          break;
      }
      setError(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Login Page Specific Background - Simple solid colors
    <PageWrapper className="bg-[#E0F0FF] dark:bg-gray-900 min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Login Card Styling - Subtle dark border */}
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-xl shadow-xl dark:border dark:border-gray-700">
        {/* Header */}
        <div className="text-center">
          <LogIn className="mx-auto h-12 w-auto text-primary dark:text-blue-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-primary dark:text-gray-100">
            Welcome Back
          </h2>
           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Log in to access your dashboard.
           </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Error Alert */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 dark:bg-red-900/30 dark:border-red-600 dark:text-red-300 rounded" role="alert">
               <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0"/>
                    <span className="font-medium">{error}</span>
               </div>
            </div>
          )}

          {/* Input Fields Container */}
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={cn(
                    "appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm",
                    "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                    "focus:ring-primary focus:border-primary focus:z-10", // Use brand color for focus
                    "dark:focus:ring-blue-500 dark:focus:border-blue-500 transition"
                )}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={cn(
                    "appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm",
                    "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                    "focus:ring-primary focus:border-primary focus:z-10", // Use brand color for focus
                    "dark:focus:ring-blue-500 dark:focus:border-blue-500 transition"
                )}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center"
              size="lg"
              disabled={loading}
              variant="primary" // Explicitly use primary variant
            >
              {loading ? 'Logging in...' : 'Log In'}
            </Button>
          </div>
        </form>

        {/* Link to Signup */}
        <div className="text-sm text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Sign up here
            </Link>
          </p>
          {/* Add forgot password link if needed */}
          {/* <p className="mt-2">
             <Link to="/forgot-password" className="font-medium text-sm text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                Forgot password?
            </Link>
          </p> */}
        </div>
      </div>
    </PageWrapper>
  );
}
