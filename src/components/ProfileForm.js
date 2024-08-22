import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    skills: [],
    experience: '',
    interests: '',
    personalStatement: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'skills' ? value.split(',').map(skill => skill.trim()) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="skills"
        value={formData.skills.join(', ')}
        onChange={handleChange}
        placeholder="Skills (comma-separated)"
        required
      />
      <textarea
        name="experience"
        value={formData.experience}
        onChange={handleChange}
        placeholder="Work Experience"
        required
      />
      <textarea
        name="interests"
        value={formData.interests}
        onChange={handleChange}
        placeholder="Interests"
      />
      <textarea
        name="personalStatement"
        value={formData.personalStatement}
        onChange={handleChange}
        placeholder="Personal Statement"
        required
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileForm;