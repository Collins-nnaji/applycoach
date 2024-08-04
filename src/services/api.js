// src/services/api.js

import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const storageAccountName = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_NAME;
const storageAccountKey = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT_KEY;
const containerName = 'cv-uploads'; // Make sure this matches your actual container name

const blobServiceClient = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net`,
  new StorageSharedKeyCredential(storageAccountName, storageAccountKey)
);

export const uploadResume = async (file) => {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(file.name);

  await blockBlobClient.uploadBrowserData(file);
  return { fileName: file.name };
};
