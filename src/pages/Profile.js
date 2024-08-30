import React, { useState, useEffect, useCallback } from 'react';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/msal-config";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Mail, Briefcase, BookOpen, GraduationCap, MapPin, Phone, Save, X } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { instance, accounts } = useMsal();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    jobTitle: '',
    bio: '',
    education: '',
    location: '',
    phone: '',
    skills: '',
    experience: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      if (accounts.length > 0) {
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0]
        });

        const userDetails = await getUserDetails(response.accessToken);

        setProfile({
          name: userDetails.displayName || '',
          email: userDetails.userPrincipalName || '',
          jobTitle: userDetails.jobTitle || '',
          bio: userDetails.aboutMe || '',
          education: userDetails.schools ? userDetails.schools.map(s => s.description).join(', ') : '',
          location: userDetails.city || '',
          phone: userDetails.mobilePhone || '',
          skills: userDetails.skills ? userDetails.skills.join(', ') : '',
          experience: userDetails.pastProjects ? userDetails.pastProjects.join(', ') : '',
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
      const token = await instance.acquireTokenSilent(loginRequest);
      await updateUserDetails(token.accessToken, profile);
      setIsEditing(false);
      setError('');
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating your profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const getUserDetails = async (accessToken) => {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    return response.json();
  };

  const updateUserDetails = async (accessToken, userProfile) => {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobTitle: userProfile.jobTitle,
        aboutMe: userProfile.bio,
        city: userProfile.location,
        mobilePhone: userProfile.phone,
        skills: userProfile.skills.split(',').map(skill => skill.trim()),
        pastProjects: userProfile.experience.split(',').map(exp => exp.trim()),
        schools: [{ description: userProfile.education }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update user details');
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
                    readOnly
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
                <div className="form-group">
                  <label htmlFor="education">
                    <GraduationCap size={20} />
                    Education
                  </label>
                  <input
                    type="text"
                    id="education"
                    name="education"
                    value={profile.education}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">
                    <MapPin size={20} />
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={20} />
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="skills">
                    <BookOpen size={20} />
                    Skills (comma-separated)
                  </label>
                  <textarea
                    id="skills"
                    name="skills"
                    value={profile.skills}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="experience">
                    <Briefcase size={20} />
                    Experience (comma-separated)
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    rows="3"
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
                <div className="info-group">
                  <GraduationCap size={20} />
                  <p>{profile.education || 'No education information'}</p>
                </div>
                <div className="info-group">
                  <MapPin size={20} />
                  <p>{profile.location || 'No location set'}</p>
                </div>
                <div className="info-group">
                  <Phone size={20} />
                  <p>{profile.phone || 'No phone number set'}</p>
                </div>
                <div className="info-group">
                  <BookOpen size={20} />
                  <p>{profile.skills || 'No skills listed'}</p>
                </div>
                <div className="info-group">
                  <Briefcase size={20} />
                  <p>{profile.experience || 'No experience listed'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;