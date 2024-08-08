import { BlobServiceClient } from '@azure/storage-blob';
import { AzureKeyCredential, DocumentAnalysisClient } from '@azure/ai-form-recognizer';

// Hardcoded Azure credentials and configuration
const storageAccountName = 'credolaystorage';
const storageAccountKey = 'UxpaFJt94cAgsEaTyjqvKtWFlmluwfjPY8pDM3W1EzXfQXUkYHXdsDuPWnKUvjapNzYgQZq4O+pI+AStMhuiEg==';
const formRecognizerEndpoint = 'https://credolaydocumentintelligence.cognitiveservices.azure.com/';
const formRecognizerKey = '7729fd81f7534ba789db0f681dd649bf';
const containerName = 'cv-uploads';

// Initialize BlobServiceClient and DocumentAnalysisClient
const blobServiceClient = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net`,
  new AzureKeyCredential(storageAccountKey)
);

const documentClient = new DocumentAnalysisClient(
  formRecognizerEndpoint,
  new AzureKeyCredential(formRecognizerKey)
);

export const uploadResumeToBlob = async (file) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobName = `${new Date().getTime()}-${file.name}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.uploadBrowserData(file);
  return blockBlobClient.url;
};

export const analyzeResume = async (blobUrl) => {
  const poller = await documentClient.beginAnalyzeDocumentFromUrl('prebuilt-document', blobUrl);
  const { documents } = await poller.pollUntilDone();

  if (!documents || documents.length <= 0) {
    throw new Error('Analysis failed.');
  }

  return documents[0].fields;
};
