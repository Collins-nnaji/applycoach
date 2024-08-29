import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config/msal-config";
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import AnalyzeCV from './pages/AnalyzeCV';
import Resources from './pages/Resources';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';
import Error from './pages/Error';
import PrivateRoute from './components/PrivateRoute';
import { initGA, logPageView } from './GoogleAnalytics';
import './App.css';

const msalInstance = new PublicClientApplication(msalConfig);

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    initGA('G-7S4ETVNPPJ');
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <AppProvider>
          <Router>
            <RouteTracker />
            <div className="App">
              <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Fira+Code&display=swap" rel="stylesheet" />
              </Helmet>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analyze-cv" element={<AnalyzeCV />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route 
                  path="/profile" 
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } 
                />
                <Route path="/error" element={<Error />} />
              </Routes>
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </MsalProvider>
  );
};

export default App;