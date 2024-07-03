import axios from 'axios';

const API_BASE_URL = 'https://your-azure-function-app.azurewebsites.net/api';

export const uploadCV = async (file) => {
  const formData = new FormData();
  formData.append('cv', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/uploadCV`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading CV:', error);
    throw error;
  }
};

export const analyzeJobDescription = async (jobDescription) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyzeJobDescription`, { jobDescription });
    return response.data;
  } catch (error) {
    console.error('Error analyzing job description:', error);
    throw error;
  }
};

export const getMatchResults = async (cvId, jobDescriptionId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/match`, { cvId, jobDescriptionId });
    return response.data;
  } catch (error) {
    console.error('Error getting match results:', error);
    throw error;
  }
};