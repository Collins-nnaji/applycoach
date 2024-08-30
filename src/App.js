import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { MsalProvider, MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig, b2cPolicies } from "./config/msal-config";
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

// Handle redirect after login or profile edit
msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS || 
      event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
    if (event.payload.account) {
      msalInstance.setActiveAccount(event.payload.account);
    }
  }
});

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);

  return null;
};

const ProfileContent = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        if (event.payload.authority === b2cPolicies.authorities.editProfile.authority) {
          // Profile has been edited, reload profile data
          navigate('/profile');
        }
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance, navigate]);

  return <Profile />;
};

const App = () => {
  useEffect(() => {
    initGA('G-7S4ETVNPPJ');
  }, []);

  const authRequest = {
    scopes: ["openid", "profile"]
  };

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
                    <MsalAuthenticationTemplate 
                      interactionType="redirect" 
                      authenticationRequest={authRequest}
                    >
                      <PrivateRoute>
                        <ProfileContent />
                      </PrivateRoute>
                    </MsalAuthenticationTemplate>
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