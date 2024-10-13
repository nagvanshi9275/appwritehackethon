import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the entire app with AuthProvider */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
