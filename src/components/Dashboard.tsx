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
  Calendar, Zap, ExternalLink, Sun, Moon, Edit3, Save, AlertCircle,
  FolderKanban, // Icon for Projects
  KeyRound,     // Icon for SEO Keywords
  Megaphone,    // Icon for Marketing Campaigns
  ListChecks,   // Alt icon
  TrendingUp,   // Alt icon
  Target,       // Alt icon
  PlusCircle,   // Icon for adding
  Settings      // Icon for managing
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

  // Placeholder data for new sections
  const placeholderProjects = [
      { id: 1, name: 'Project Alpha', status: 'In Progress', lastUpdate: '2 days ago' },
      { id: 2, name: 'Client Beta Site', status: 'Pending Review', lastUpdate: '5 days ago' },
      { id: 3, name: 'Internal Tool', status: 'Completed', lastUpdate: '1 month ago' },
  ];

  const placeholderKeywords = [
      { id: 1, term: 'web development agency', position: 5, trend: 'up' },
      { id: 2, term: 'local SEO services', position: 12, trend: 'stable' },
      { id: 3, term: 'react developer freelance', position: 8, trend: 'down' },
  ];

  const placeholderCampaigns = [
      { id: 1, name: 'Summer Sale Promo', platform: 'Google Ads', status: 'Active' },
      { id: 2, name: 'New Service Launch', platform: 'Social Media', status: 'Planned' },
      { id: 3, name: 'Brand Awareness Q3', platform: 'Content Marketing', status: 'Ongoing' },
  ];


  return (
    // Apply dark mode background
    <PageWrapper className="bg-gradient-to-b from-[#E0F0FF] to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
           <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-[#002B5B] dark:text-blue-300" />
            <h1 className="text-3xl font-bold text-[#002B5B] dark:text-gray-100">
              Client Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Welcome Message */}
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

        {/* Dashboard Content Grid - Extended */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Account Overview Card */}
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
                     {profileLoading && <p className="text-sm text-blue-600 dark:text-blue-400">Saving...</p>}
                     {profileError && <p className="text-sm text-red-600 dark:text-red-400 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/> {profileError}</p>}
                     {profileSuccess && <p className="text-sm text-green-600 dark:text-green-400">{profileSuccess}</p>}
                    <div className="flex gap-2 justify-end">
                         <Button type="button" variant="secondary" size="sm" onClick={() => { setIsEditingProfile(false); setProfileError(null); setDisplayName(currentUser?.displayName || ''); }}>
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

          {/* My Services/Projects Card (Placeholder - Kept for context) */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
              <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">My Services</h2>
            </div>
            <div className="space-y-2 text-gray-700 dark:text-gray-300 mb-4 flex-grow">
              <p>Your active services and subscriptions.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">(Feature coming soon)</p>
            </div>
             <Link to="/services" className="mt-auto w-full">
                <Button variant="primary" size="sm" className="w-full">
                    Explore Our Services
                </Button>
             </Link>
          </div>

          {/* Quick Actions Card */}
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

          {/* --- NEW: Website Projects Card --- */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className='flex items-center'>
                <FolderKanban className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
                <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Website Projects</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => {/* Navigate to projects page or open modal */}} className="ml-auto">
                  <Settings className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm">
              {placeholderProjects.length > 0 ? (
                placeholderProjects.slice(0, 3).map(project => ( // Show first 3 projects
                  <div key={project.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                    <span>{project.name}</span>
                    <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        project.status === 'In Progress' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
                        project.status === 'Pending Review' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                        project.status === 'Completed' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    )}>
                        {project.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic">No active projects found.</p>
              )}
              {placeholderProjects.length > 3 && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">...</p>}
            </div>
             <Button variant="secondary" size="sm" className="w-full mt-auto" onClick={() => {/* Navigate to projects page */}}>
                 Manage All Projects
             </Button>
          </div>

          {/* --- NEW: SEO Keyword Tracking Card --- */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className='flex items-center'>
                 <KeyRound className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
                 <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">SEO Keywords</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => {/* Navigate or open add keyword modal */}} className="ml-auto">
                  <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm">
              {placeholderKeywords.length > 0 ? (
                  placeholderKeywords.slice(0, 3).map(keyword => (
                      <div key={keyword.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                          <span className="truncate max-w-[60%]">{keyword.term}</span>
                          <div className='flex items-center gap-1'>
                             <span className='text-xs text-gray-500 dark:text-gray-400'>Pos: {keyword.position}</span>
                              {keyword.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                              {keyword.trend === 'down' && <TrendingUp className="h-3 w-3 text-red-500 transform scale-y-[-1]" />}
                              {/* Add stable icon if needed */}
                          </div>
                      </div>
                  ))
              ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No keywords being tracked.</p>
              )}
               {placeholderKeywords.length > 3 && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">...</p>}
            </div>
            <Button variant="secondary" size="sm" className="w-full mt-auto" onClick={() => {/* Navigate to SEO report page */}}>
                 View Full SEO Report
             </Button>
          </div>

          {/* --- NEW: Marketing Campaigns Card --- */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className='flex items-center'>
                 <Megaphone className="h-6 w-6 text-[#0056b3] dark:text-blue-400 mr-3" />
                 <h2 className="text-xl font-semibold text-[#002B5B] dark:text-gray-100">Marketing Campaigns</h2>
              </div>
               <Button variant="outline" size="sm" onClick={() => {/* Navigate or open new campaign modal */}} className="ml-auto">
                  <PlusCircle className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3 text-gray-700 dark:text-gray-300 mb-4 flex-grow text-sm">
               {placeholderCampaigns.length > 0 ? (
                  placeholderCampaigns.slice(0, 3).map(campaign => (
                      <div key={campaign.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                          <div>
                            <span className='block'>{campaign.name}</span>
                            <span className='text-xs text-gray-500 dark:text-gray-400'>{campaign.platform}</span>
                          </div>
                          <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full",
                            campaign.status === 'Active' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
                            campaign.status === 'Planned' && 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200',
                            campaign.status === 'Ongoing' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
                            // Add more statuses like 'Paused', 'Completed' etc.
                          )}>
                              {campaign.status}
                          </span>
                      </div>
                  ))
               ) : (
                   <p className="text-gray-500 dark:text-gray-400 italic">No marketing campaigns running.</p>
               )}
               {placeholderCampaigns.length > 3 && <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">...</p>}
            </div>
             <Button variant="secondary" size="sm" className="w-full mt-auto" onClick={() => {/* Navigate to campaigns page */}}>
                 Manage Campaigns
             </Button>
          </div>

        </div> {/* End of Grid */}
      </div>
    </PageWrapper>
  );
}
