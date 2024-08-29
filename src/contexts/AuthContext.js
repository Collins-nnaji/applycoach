import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/msal-config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts, inProgress } = useMsal();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (accounts.length > 0) {
      setUser({
        name: accounts[0].name,
        username: accounts[0].username,
      });
    } else {
      setUser(null);
    }
  }, [accounts]);

  const login = async () => {
    try {
      await instance.loginPopup(loginRequest);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const signup = async () => {
    try {
      await instance.loginPopup({
        ...loginRequest,
        prompt: 'create',
      });
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const logout = async () => {
    try {
      await instance.logoutPopup();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getAccessToken = async () => {
    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0]
      });
      return response.accessToken;
    } catch (error) {
      console.error("Error acquiring token:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, getAccessToken, inProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);