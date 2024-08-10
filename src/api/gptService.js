import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const analyzeResume = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/analyze-resume`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    } catch (error) {
        console.error('Error analyzing resume:', error);
        throw new Error(error.response?.data?.error || 'An unexpected error occurred.');
    }
};
