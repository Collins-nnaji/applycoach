import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const analyzeResume = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/analyze-resume`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            timeout: 30000,
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Backend error:', error.response.data);
            throw new Error(error.response.data.error || 'Server error occurred.');
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from server:', error.request);
            throw new Error('No response from the server. Please try again later.');
        } else {
            // Something else caused the error
            console.error('Error setting up request:', error.message);
            throw new Error('An error occurred while setting up the request.');
        }
    }
};

