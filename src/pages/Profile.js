import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Mail, Briefcase, BookOpen, Save, X } from 'lucide-react';
import './Profile.css';

const API_URL = 'https://credolay-profilebackend.vercel.app';

const Profile = () => {
  const { user, getAccessToken, logout } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: user?.username || '',
    jobTitle: '',
    bio: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        setError('Unable to acquire access token. Please try logging in again.');
        return;
      }

      const response = await fetch(`${API_URL}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const profileData = await response.json();
        setProfile(prevProfile => ({
          ...prevProfile,
          ...profileData,
          email: user?.username || '', // Ensure email is always set
        }));
        setError('');
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch profile:', errorData);
        setError(`Failed to fetch profile: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(`An error occurred while fetching your profile: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [getAccessToken, user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        setError('Unable to authenticate. Please try logging in again.');
        return;
      }

      const response = await fetch(`${API_URL}/api/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        setIsEditing(false);
        setError('');
        // Refresh the profile to ensure we have the latest data
        fetchProfile();
      } else {
        console.error('Failed to update profile');
        setError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating your profile.');
    } finally {
      setIsSaving(false);
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
            <h1>{profile.name || 'Your Profile'}</h1>
            {!isEditing && (
              <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
                Edit Profile
              </button>
            )}
          </div>
          <div className="profile-body">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">
                    <User size={20} />
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={20} />
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jobTitle">
                    <Briefcase size={20} />
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={profile.jobTitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">
                    <BookOpen size={20} />
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-profile-btn" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Profile'}
                    {!isSaving && <Save size={20} />}
                  </button>
                  <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">
                    Cancel
                    <X size={20} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="profile-info">
                <div className="info-group">
                  <Mail size={20} />
                  <p>{profile.email}</p>
                </div>
                <div className="info-group">
                  <Briefcase size={20} />
                  <p>{profile.jobTitle || 'No job title set'}</p>
                </div>
                <div className="info-group">
                  <BookOpen size={20} />
                  <p>{profile.bio || 'No bio available'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;