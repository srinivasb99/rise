// src/components/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { PageWrapper } from './PageWrapper';
import { LayoutDashboard, LogOut } from 'lucide-react';

export function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Failed to log out:', error);
      // Optionally show an error message to the user
    }
  };

  return (
    <PageWrapper className="bg-gray-100 min-h-screen py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
               <LayoutDashboard className="h-8 w-8 text-[#002B5B]" />
                <h1 className="text-3xl font-bold text-[#002B5B]">Dashboard</h1>
            </div>
             <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
             </Button>
          </div>

          {currentUser ? (
            <p className="text-lg text-gray-700">
              Welcome, <span className="font-semibold">{currentUser.email}</span>!
            </p>
          ) : (
             <p className="text-lg text-gray-700">Loading user data...</p>
          )}

          {/* Add more dashboard content here */}
          <div className="mt-8 p-6 border border-dashed border-gray-300 rounded-lg">
              <p className="text-center text-gray-500">Your dashboard content will go here.</p>
              {/* Example: Link to profile settings, view projects, etc. */}
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}
