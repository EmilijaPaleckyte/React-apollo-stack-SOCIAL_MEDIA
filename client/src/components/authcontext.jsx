import { createContext, useContext, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { parseJwt } from "./utils/parsejwt";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("AuthProvider useEffect triggered");
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);
    if (token) {
      const { exp } = parseJwt(token);
      if (exp && Date.now() < exp * 1000) {
        setUser({ token }); // Include token in the user object
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  const login = (token, expirationTimeInSeconds) => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimeInSeconds + expirationTimeInSeconds;
    const tokenWithExpiration = { token, exp: expirationTimestamp };
    localStorage.setItem("token", JSON.stringify(tokenWithExpiration));
    setUser({ token }); // Include token in the user object
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
