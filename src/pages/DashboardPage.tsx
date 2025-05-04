import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      {currentUser ? (
        <p>Welcome, {currentUser.email}!</p>
      ) : (
        <p>Loading user information...</p>
      )}
      <button onClick={handleLogout} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem' }}>
        Logout
      </button>
      {/* Add more dashboard content here */}
    </div>
  );
};

export default DashboardPage;
