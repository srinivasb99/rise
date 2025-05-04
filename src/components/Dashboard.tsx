// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut, updateProfile } from 'firebase/auth'; // Import updateProfile
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Import useTheme
import { Button } from './Button';
import { PageWrapper } from './PageWrapper';
import { cn } from '../utils/cn'; // Assuming cn utility
import {
  LayoutDashboard, LogOut, UserCircle, Briefcase, MessageSquare,
  Calendar, Zap, ExternalLink, Sun, Moon, Edit3, Save, AlertCircle
} from 'lucide-react';

export function Dashboard() {
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Use theme context
  const navigate = useNavigate();

  // State for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  // Update local state if currentUser changes (e.g., after update)
  useEffect(() => {
    setDisplayName(currentUser?.displayName || '');
  }, [currentUser?.displayName]);

  const handleLogout = async () => {
    // ... logout logic ...
      try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      // TODO: Show an error message to the user
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) {
      setProfileError("Not logged in.");
      return;
    }
    if (displayName === currentUser.displayName) {
        setIsEditingProfile(false); // Just close if no change
        return;
    }

    setProfileLoading(true);
    setProfileError(null);
    setProfileSuccess(null);

    try {
      await updateProfile(currentUser, { displayName: displayName });
      setProfileSuccess("Profile updated successfully!");
      setIsEditingProfile(false); // Close edit form on success
      // currentUser object might not update immediately in the context,
      // but the local state 'displayName' is already set.
      // A page refresh or context re-fetch might be needed for other components
      // relying on currentUser.displayName from context.
    } catch (error: any) {
      console.error("Profile Update Error:", error);
      setProfileError(error.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
      // Clear success/error messages after a delay
       setTimeout(() => {
           setProfileSuccess(null);
           setProfileError(null);
       }, 4000);
    }
  };


  const memberSince = currentUser?.metadata?.creationTime
    ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
    : 'N/A';

  return (
    // Apply dark mode background
    <PageWrapper className="bg-gradient-to-b from-[#E0F0FF] to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           {/* ... Dashboard Title ... */}
           <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-[#002B5B] dark:text-blue-300" />
            <h1 className="text-3xl font-bold text-[#002B5B] dark:text-gray-100">
              Client Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
             {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {/* Logout Button */}
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Welcome Message - Adjust text colors */}
        {currentUser && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 text-center sm:text-left">
                <p className="text-xl text-gray-800 dark:text-gray-100">
                Welcome back, <span className="font-semibold text-[#002B5B] dark:text-blue-300">{currentUser.displayName || 'Valued Client'}</span>!
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Logged in as: {currentUser.email}
                </p>
          </div>
        )}

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Account Overview Card - Updated with Edit */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className='flex items-center'>
                 <UserCircle className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
                 <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Account Overview</h2>
                </div>
                 {!isEditingProfile && (
                    <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)} className="ml-auto">
                        <Edit3 className="h-4 w-4" />
                    </Button>
                 )}
            </div>

            {isEditingProfile ? (
                <form onSubmit={handleProfileUpdate} className="space-y-3">
                    <div>
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Display Name</label>
                        <input
                            type="text"
                            id="displayName"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                             className={cn(
                                "appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm",
                                "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
                                "focus:ring-[#0056b3] focus:border-[#0056b3]",
                                "dark:focus:ring-blue-500 dark:focus:border-blue-500"
                             )}
                            placeholder="Enter your display name"
                        />
                    </div>
                     {/* Display messages during/after update */}
                     {profileLoading && <p className="text-sm text-blue-600 dark:text-blue-400">Saving...</p>}
                     {profileError && <p className="text-sm text-red-600 dark:text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {profileError}</p>}
                     {profileSuccess && <p className="text-sm text-green-600 dark:text-green-400">{profileSuccess}</p>}
                    <div className="flex gap-2 justify-end">
                         <Button type="button" variant="secondary" size="sm" onClick={() => { setIsEditingProfile(false); setProfileError(null); setDisplayName(currentUser?.displayName || ''); /* Reset on cancel */}}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" size="sm" disabled={profileLoading}>
                            <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                    </div>
                </form>
            ) : (
                 // Display mode
                <div className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 flex-grow">
                  <p><strong>Display Name:</strong> {currentUser?.displayName || '(Not Set)'}</p>
                  <p><strong>Email:</strong> {currentUser?.email || 'N/A'}</p>
                  <p><strong>Member Since:</strong> {memberSince}</p>
                </div>
            )}
          </div>

          {/* My Services/Projects Card (Placeholder) - Adjust styles */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">My Services & Projects</h2>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 flex-grow">
               {/* Add placeholder or fetched project data here */}
              <p>Your project details will appear here once available.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">(Feature coming soon)</p>
            </div>
             <Link to="/services" className="mt-auto w-full">
                <Button variant="primary" size="sm" className="w-full">
                    Explore Our Services
                </Button>
             </Link>
          </div>

          {/* Quick Actions Card - Adjust styles */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Quick Actions</h2>
            </div>
            <div className="space-y-3 flex flex-col flex-grow justify-center">
               <a href="https://calendly.com/riseonlinesolutions" target="_blank" rel="noopener noreferrer">
                 <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Schedule a Consultation</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400 flex-shrink-0" />
                 </Button>
               </a>
               <Link to="/contact">
                 <Button variant="outline" className="w-full justify-start text-left">
                    <MessageSquare className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span>Contact Support</span>
                 </Button>
               </Link>
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
