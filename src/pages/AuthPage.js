import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/msal-config";
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import logo from '../assets/logo.png';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { instance, accounts } = useMsal();

  useEffect(() => {
    if (accounts.length > 0) {
      navigate('/profile');
    }
  }, [accounts, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const result = await instance.loginPopup({
        ...loginRequest,
        prompt: isLogin ? "select_account" : "create",
      });
      if (result) {
        login({ email: result.account.username });
        navigate('/profile');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Failed to authenticate. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-page">
      <Header />
      <main className="auth-content">
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="logo">
            <img src={logo} alt="Credolay Logo" />
          </div>
          <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={20} />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <Lock size={20} />
              Password
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="toggle-password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">
                <Lock size={20} />
                Confirm Password
              </label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="toggle-password"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}
          <button type="submit" className="submit-button">
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
          <p className="toggle-auth">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="toggle-auth-button">
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AuthPage;