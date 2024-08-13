import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API_URL + '/api/analyze';

export const analyzeResume = async (data) => {
    try {
        const response = await axios.post(API_URL, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: 180000 // 3 minutes timeout
        });
        return response.data;
    } catch (error) {
        console.error('Error calling the backend:', error);
        if (error.response) {
            throw new Error(error.response.data.error || 'An error occurred while analyzing the resume.');
        } else if (error.request) {
            throw new Error('No response received from the server. Please try again later.');
        } else {
            throw new Error(`An unexpected error occurred: ${error.message}`);
        }
    }
};