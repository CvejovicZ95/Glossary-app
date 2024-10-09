import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setAuthUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    document.cookie = `token=${userData.token}; path=/; secure; HttpOnly`;
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('currentUser');
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure; HttpOnly";
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = { children: PropTypes.any };
