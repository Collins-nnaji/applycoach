import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      setUser({ email: accounts[0].username });
    } else {
      setUser(null);
    }
  }, [accounts]);

  const login = async (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await instance.logoutPopup();
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);