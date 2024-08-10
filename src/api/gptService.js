import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_API_URL + '/analyze-pdf';


export const analyzeResume = async (formData) => {
    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error calling the backend:', error);
        throw error;
    }
};
