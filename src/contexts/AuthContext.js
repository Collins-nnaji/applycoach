import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/msal-config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { instance, accounts } = useMsal();
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

  const handleAuth = async (isLogin) => {
    try {
      const result = await instance.loginPopup(loginRequest);
      console.log(`${isLogin ? 'Login' : 'Signup'} result:`, result);
      setUser({
        name: result.account.name,
        username: result.account.username,
      });
      return result;
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Signup'} failed`, error);
      throw error;
    }
  };

  const login = () => handleAuth(true);
  const signup = () => handleAuth(false);

  const logout = async () => {
    try {
      await instance.logoutPopup();
      setUser(null);
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
    <AuthContext.Provider value={{ user, login, signup, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);