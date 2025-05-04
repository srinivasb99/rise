// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure this path points to your firebase.ts initialization file

// Define the shape of the context data
interface AuthContextType {
  currentUser: User | null; // Holds the authenticated user object or null
  loading: boolean;        // Indicates if the auth state is still being determined
}

// Create the context with an initial undefined value to enforce provider usage
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to use the AuthContext.
 * Throws an error if used outside of an AuthProvider.
 * @returns {AuthContextType} The authentication context values.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This error prevents using the context without wrapping the component tree
    // in AuthProvider, ensuring currentUser and loading are always available.
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode; // Accepts any valid React child nodes
}

/**
 * Provider component that wraps parts of the app needing authentication state.
 * It listens to Firebase auth state changes and provides the currentUser
 * and loading status to descendant components via context.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start in loading state

  // Effect runs once on mount to set up the Firebase auth state listener
  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe function.
    // Firebase handles user persistence (e.g., remembering login across sessions).
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // When the auth state changes (login, logout, initial check),
      // update the currentUser state.
      setCurrentUser(user);
      // Set loading to false once the initial check is complete.
      setLoading(false);
    });

    // Cleanup function: Unsubscribe from the listener when the component unmounts
    // to prevent memory leaks.
    return unsubscribe;
  }, []); // Empty dependency array ensures this effect runs only once

  // The value object provided to consuming components
  const value = {
    currentUser,
    loading,
  };

  // Render children only after the initial loading is complete.
  // This prevents rendering components that depend on auth state
  // before the state is definitively known (either null or a User object).
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
