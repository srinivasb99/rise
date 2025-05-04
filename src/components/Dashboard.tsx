// src/components/Dashboard.tsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { PageWrapper } from './PageWrapper';
import {
  LayoutDashboard,
  LogOut,
  UserCircle,
  Briefcase,
  MessageSquare,
  Calendar,
  Zap, // Using Zap consistent with Services page
  ExternalLink // For external links like Calendly
} from 'lucide-react';

export function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Failed to log out:', error);
      // TODO: Show an error message to the user
    }
  };

  // Placeholder data - replace with actual data fetching later
  const userProjects = []; // Example: [{ id: 1, name: 'Website Redesign', status: 'In Progress' }]
  const accountDetails = {
    name: currentUser?.displayName || 'Valued Client', // Use displayName if available, else fallback
    memberSince: currentUser?.metadata?.creationTime
        ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
        : 'N/A',
  };

  return (
    <PageWrapper className="bg-gradient-to-b from-[#E0F0FF] to-gray-50 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="h-8 w-8 text-[#002B5B]" />
            <h1 className="text-3xl font-bold text-[#002B5B]">
              Client Dashboard
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Welcome Message */}
        {currentUser && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center sm:text-left">
                <p className="text-xl text-gray-800">
                Welcome back, <span className="font-semibold text-[#002B5B]">{accountDetails.name}</span>!
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    Logged in as: {currentUser.email}
                </p>
          </div>
        )}

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Account Overview Card */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <UserCircle className="h-6 w-6 text-[#0056b3] mr-3" />
              <h2 className="text-xl font-semibold text-[#002B5B]">Account Overview</h2>
            </div>
            <div className="space-y-2 text-gray-700 mb-4 flex-grow">
              <p><strong>Email:</strong> {currentUser?.email || 'N/A'}</p>
              <p><strong>Member Since:</strong> {accountDetails.memberSince}</p>
              {/* Add more details if available, e.g., Company Name */}
            </div>
            <Button variant="secondary" size="sm" className="mt-auto w-full" onClick={() => alert('Profile editing coming soon!')}>
              Edit Profile (Coming Soon)
            </Button>
             {/* TODO: Link to actual profile page when created */}
          </div>

          {/* My Services/Projects Card */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <Briefcase className="h-6 w-6 text-[#0056b3] mr-3" />
              <h2 className="text-xl font-semibold text-[#002B5B]">My Services & Projects</h2>
            </div>
            <div className="space-y-2 text-gray-700 mb-4 flex-grow">
              {userProjects.length > 0 ? (
                userProjects.map((project: any) => ( // Use specific type if available
                  <div key={project.id} className="border-b pb-2 last:border-b-0">
                     <p><strong>{project.name}</strong></p>
                     <p className="text-sm text-gray-500">Status: {project.status}</p>
                  </div>
                ))
              ) : (
                <p>You currently have no active services or projects with us. Ready to start one?</p>
              )}
               {/* TODO: Fetch and display actual user projects/services */}
            </div>
             <Link to="/services" className="mt-auto w-full">
                <Button variant="primary" size="sm" className="w-full">
                    Explore Our Services
                </Button>
             </Link>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-[#0056b3] mr-3" />
              <h2 className="text-xl font-semibold text-[#002B5B]">Quick Actions</h2>
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
                {/* Add more relevant actions like "View Invoices", "Documentation" etc. */}
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
