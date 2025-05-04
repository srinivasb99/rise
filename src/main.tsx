import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router> {/* Wrap App with Router */} 
      <AuthProvider> {/* Wrap App with AuthProvider */} 
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>
);
