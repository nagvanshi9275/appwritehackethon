import React, { createContext, useState, useContext, useEffect } from 'react';
import { account } from './appwriteConfig'; // Import Appwrite account config

export const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext); // Return the context value (user, login, logout)
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to login and update user state
  const login = (session) => {
    setUser(session);
    localStorage.setItem('user', JSON.stringify(session)); // Store user in localStorage
  };

  // Function to logout
  const logout = async () => {
    await account.deleteSession('current');
    setUser(null);
    localStorage.removeItem('user'); // Clear localStorage on logout
  };

  // Check if user is logged in on page load/refresh
  useEffect(() => {
    const handlePageRefresh = async () => {
      await logout(); // Log out the user on page reload
    };

    // Call the function to log out on page load
    handlePageRefresh();
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
