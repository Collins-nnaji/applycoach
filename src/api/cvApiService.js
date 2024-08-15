// src/services/cvApiService.js

const API_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:5000';

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'An error occurred');
    }
    return response.json();
}

export async function analyzeCV(resumeText, jobDescription) {
    const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription }),
    });
    return handleResponse(response);
}

export async function optimizeCV(resumeText, jobDescription, analysis) {
    const response = await fetch(`${API_URL}/api/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, jobDescription, analysis }),
    });
    return handleResponse(response);
}