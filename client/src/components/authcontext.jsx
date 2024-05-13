import { createContext, useContext, useEffect, useState } from "react";

import PropTypes from "prop-types"; // Import PropTypes

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Add PropTypes validation
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch or initialize user data here
    const fetchedUser = { username: "JohnDoe" }; // Example user data
    setUser(fetchedUser);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define prop types for AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
