// src/main.tsx (or index.tsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './index.css'; // Your global styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router> {/* Router wraps AuthProvider and App */}
      <AuthProvider> {/* AuthProvider wraps App */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
);
