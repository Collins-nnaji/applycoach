import axios from 'axios';

// Replace with your Vercel backend URL
const API_URL = 'https://credolay-backend.vercel.app';

export const analyzeResume = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/analyze-resume`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw new Error(error.response ? error.response.data.error : 'An unexpected error occurred.');
    }
};
