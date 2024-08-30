import React, { useState, useEffect, useCallback } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest, b2cPolicies } from "../config/msal-config";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Mail, Briefcase, BookOpen, GraduationCap, MapPin, Globe, Edit } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { instance, accounts, inProgress } = useMsal();
  const [profile, setProfile] = useState({
    givenName: '',
    surname: '',
    displayName: '',
    email: '',
    jobTitle: '',
    bio: '',
    city: '',
    country: '',
    skills: '',
    experience: '',
    education: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      if (accounts.length > 0) {
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0]
        });

        const claims = response.idTokenClaims;
        console.log("Token claims:", claims); // For debugging
        setProfile({
          givenName: claims.given_name || '',
          surname: claims.family_name || '',
          displayName: claims.name || '',
          email: claims.emails ? claims.emails[0] : '',
          jobTitle: claims.jobTitle || '',
          bio: claims.bio || '',
          city: claims.city || '',
          country: claims.country || '',
          skills: claims.skills || '',
          experience: claims.experience || '',
          education: claims.education || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to fetch profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [accounts, instance]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    const handleRedirect = async () => {
      if (inProgress === 'none') {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
          await instance.setActiveAccount(accounts[0]);
          await fetchProfile();
        }
      }
    };

    handleRedirect();
  }, [inProgress, instance, fetchProfile]);

  const handleEditProfile = async () => {
    try {
      const editProfileRequest = {
        authority: b2cPolicies.authorities.editProfile.authority,
        scopes: loginRequest.scopes,
      };

      await instance.loginRedirect(editProfileRequest);
    } catch (error) {
      console.error('Error redirecting to edit profile:', error);
      setError('Unable to edit profile. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-content">
        {error && <div className="error-message">{error}</div>}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <User size={64} />
            </div>
            <h1>{profile.displayName || `${profile.givenName} ${profile.surname}` || 'Your Profile'}</h1>
            <button onClick={handleEditProfile} className="edit-profile-btn">
              Edit Profile
              <Edit size={20} />
            </button>
          </div>
          <div className="profile-body">
            <div className="profile-info">
              <div className="info-group">
                <User size={20} />
                <p>{`${profile.givenName} ${profile.surname}`}</p>
              </div>
              <div className="info-group">
                <Mail size={20} />
                <p>{profile.email}</p>
              </div>
              {profile.jobTitle && (
                <div className="info-group">
                  <Briefcase size={20} />
                  <p>{profile.jobTitle}</p>
                </div>
              )}
              {profile.bio && (
                <div className="info-group">
                  <BookOpen size={20} />
                  <p>{profile.bio}</p>
                </div>
              )}
              {profile.city && (
                <div className="info-group">
                  <MapPin size={20} />
                  <p>{profile.city}</p>
                </div>
              )}
              {profile.country && (
                <div className="info-group">
                  <Globe size={20} />
                  <p>{profile.country}</p>
                </div>
              )}
              {profile.skills && (
                <div className="info-group">
                  <BookOpen size={20} />
                  <p>{profile.skills}</p>
                </div>
              )}
              {profile.experience && (
                <div className="info-group">
                  <Briefcase size={20} />
                  <p>{profile.experience}</p>
                </div>
              )}
              {profile.education && (
                <div className="info-group">
                  <GraduationCap size={20} />
                  <p>{profile.education}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;