// api/gptService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API_URL + '/api/analyze';

export const analyzeResume = async (data) => {
    try {
        const response = await axios.post(API_URL, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error calling the backend:', error);
        throw error;
    }
};