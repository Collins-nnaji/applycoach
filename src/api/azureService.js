import { BlobServiceClient } from '@azure/storage-blob';
import { AzureKeyCredential, DocumentAnalysisClient } from '@azure/ai-form-recognizer';

// Azure credentials and configuration
const storageAccountName = 'credolaystorage';
const storageAccountKey = 'UxpaFJt94cAgsEaTyjqvKtWFlmluwfjPY8pDM3W1EzXfQXUkYHXdsDuPWnKUvjapNzYgQZq4O+pI+AStMhuiEg==';
const formRecognizerEndpoint = 'https://credolaydocumentintelligence.cognitiveservices.azure.com/';
const formRecognizerKey = '7729fd81f7534ba789db0f681dd649bf';
const containerName = 'cv-uploads';

// Initialize BlobServiceClient
const blobServiceClient = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net`,
  new AzureKeyCredential(storageAccountKey)
);

// Initialize DocumentAnalysisClient
const documentClient = new DocumentAnalysisClient(
  formRecognizerEndpoint,
  new AzureKeyCredential(formRecognizerKey)
);

// Function to upload file to Blob Storage
export const uploadResumeToBlob = async (file) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists(); // Ensure the container exists
    const blobName = `${new Date().getTime()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadBrowserData(file);
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading file to Blob Storage:', error);
    throw new Error('Failed to upload file to Blob Storage.');
  }
};

// Function to analyze the uploaded resume
export const analyzeResume = async (blobUrl) => {
  try {
    const poller = await documentClient.beginAnalyzeDocumentFromUrl('prebuilt-document', blobUrl);
    const { documents } = await poller.pollUntilDone();

    if (!documents || documents.length <= 0) {
      throw new Error('No documents found in analysis result.');
    }

    return documents[0].fields;
  } catch (error) {
    console.error('Error analyzing document with Form Recognizer:', error);
    throw new Error('Failed to analyze document.');
  }
};
