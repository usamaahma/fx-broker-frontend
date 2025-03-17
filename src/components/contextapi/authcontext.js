import React, { createContext, useState, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook for using AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Store token in state

  // Login function
  const loginUser = (newToken) => {
    setToken(newToken);
  };

  // Logout function
  const logoutUser = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
