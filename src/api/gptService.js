import axios from 'axios';

const functionUrl = "https://credolayfunction.azurewebsites.net/api/analyzeResumeFunction?code=B4WZp2hI4hZVZjYP1tGUVzDYRSXFr4Chz0uv3cS9FhfuAzFulTnb9Q%3D%3D";

export const analyzeResume = async (formData) => {
    try {
        const response = await axios.post(functionUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error calling the Azure Function:', error);
        throw error;
    }
};
