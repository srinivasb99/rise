// src/components/Signup.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path is correct
import { Button } from './Button';
import { PageWrapper } from './PageWrapper';
import { UserPlus, Mail, Lock, AlertCircle } from 'lucide-react';
import { cn } from '../utils/cn'; // Assuming cn utility

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optional: Update profile displayName immediately if you collect it
      // await updateProfile(auth.currentUser, { displayName: '...' });
      navigate('/dashboard'); // Redirect on success
    } catch (err: any) {
      console.error("Firebase Signup Error:", err);
      // Refined error handling
      let friendlyError = 'Failed to create account. Please try again.';
       switch (err.code) {
        case 'auth/email-already-in-use':
          friendlyError = 'This email address is already registered.';
          break;
        case 'auth/invalid-email':
          friendlyError = 'Invalid email format.';
          break;
        case 'auth/weak-password':
          friendlyError = 'Password is too weak (must be at least 6 characters).';
          break;
        case 'auth/operation-not-allowed':
            friendlyError = 'Email/Password sign-up is not enabled for this app.'; // Should be fixed in console
            break;
       }
      setError(friendlyError);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Signup Page Specific Background - Subtle gradient
    <PageWrapper className="bg-gradient-to-br from-[#E0F0FF] via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-black min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* Signup Card Styling - Slightly different dark border */}
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800/90 p-8 sm:p-10 rounded-xl shadow-xl dark:border dark:border-gray-600/50 backdrop-blur-sm dark:backdrop-blur-md">
         {/* Header */}
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-auto text-primary dark:text-blue-400" />
          <h2 className="mt-6 text-3xl font-extrabold text-primary dark:text-gray-100">
            Create Your Account
          </h2>
           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Join Rise Online Solutions today.
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
                    "dark:bg-gray-700/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white", // Slightly transparent dark input
                    "focus:ring-primary focus:border-primary focus:z-10",
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
                autoComplete="new-password"
                required
                 className={cn(
                    "appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm",
                    "dark:bg-gray-700/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white", // Slightly transparent dark input
                    "focus:ring-primary focus:border-primary focus:z-10",
                    "dark:focus:ring-blue-500 dark:focus:border-blue-500 transition"
                )}
                placeholder="Password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className={cn(
                    "appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm",
                    "dark:bg-gray-700/80 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white", // Slightly transparent dark input
                    "focus:ring-primary focus:border-primary focus:z-10",
                    "dark:focus:ring-blue-500 dark:focus:border-blue-500 transition"
                )}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </div>
        </form>

        {/* Link to Login */}
        <div className="text-sm text-center mt-6">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
              Log in instead
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
