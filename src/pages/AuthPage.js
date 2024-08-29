import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../assets/logo.png';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login, signup } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleAuth = async () => {
    setError('');
    try {
      const authFunction = isLogin ? login : signup;
      await authFunction();
      navigate('/profile');
    } catch (err) {
      console.error('Authentication error:', err);
      setError(`Failed to ${isLogin ? 'login' : 'sign up'}. ${err.message || 'Please try again.'}`);
    }
  };

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-content">
        <div className="auth-form-container">
          <div className="logo">
            <img src={logo} alt="Credolay Logo" />
          </div>
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          {error && <p className="error">{error}</p>}
          <button onClick={handleAuth} className="auth-button">
            {isLogin ? 'Log In' : 'Sign Up'} with Azure AD B2C
          </button>
          <p className="toggle-auth">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="toggle-auth-button">
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;