// src/azureDocumentIntelligence.js
import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";
import { BlobServiceClient } from "@azure/storage-blob";
import { setUploadProgress } from './store/resumeSlice';

const formRecognizerKey = process.env.REACT_APP_AZURE_FORM_RECOGNIZER_KEY;
const formRecognizerEndpoint = process.env.REACT_APP_AZURE_FORM_RECOGNIZER_ENDPOINT;
const storageConnectionString = process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING;
const jobMatchingAPIEndpoint = process.env.REACT_APP_JOB_MATCHING_API_ENDPOINT;

const documentClient = new DocumentAnalysisClient(formRecognizerEndpoint, new AzureKeyCredential(formRecognizerKey));

export async function analyzeResume(fileUrl) {
  try {
    console.log('Analyzing resume at URL:', fileUrl);
    const poller = await documentClient.beginAnalyzeDocumentFromUrl("prebuilt-resume", fileUrl);
    const { documents } = await poller.pollUntilDone();

    if (!documents || documents.length === 0) {
      throw new Error("No documents found.");
    }

    const resume = documents[0];
    const skills = resume.fields.skills ? resume.fields.skills.values.map(skill => skill.content) : [];
    const summary = resume.content;

    return { summary, skills };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
}

export async function uploadFileToBlob(file, dispatch) {
  try {
    console.log('Uploading file to Azure Blob Storage...');
    const blobServiceClient = BlobServiceClient.fromConnectionString(storageConnectionString);
    const containerClient = blobServiceClient.getContainerClient("resumes");
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);

    const uploadOptions = {
      onProgress: (progress) => {
        const percentCompleted = (progress.loadedBytes / file.size) * 100;
        dispatch(setUploadProgress(percentCompleted));
      },
    };

    await blockBlobClient.uploadData(file, uploadOptions);
    const fileUrl = `https://credolaystorage.blob.core.windows.net/resumes/${file.name}`;
    console.log('File uploaded. URL:', fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Failed to upload file to Azure Blob Storage", error);
    throw error;
  }
}

export async function getJobMatches(skills) {
  try {
    const response = await fetch(jobMatchingAPIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skills }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch job matches.');
    }

    const jobMatches = await response.json();
    return jobMatches;
  } catch (error) {
    console.error('Error fetching job matches:', error);
    throw error;
  }
}
