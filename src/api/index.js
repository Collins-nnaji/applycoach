export const uploadResumeToBlob = async (file) => {
  // Mock implementation for uploading the file to a blob storage
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('https://blobstorage.com/resume.pdf');
    }, 1000);
  });
};

export const analyzeResume = async (blobUrl) => {
  // Mock implementation for analyzing the resume
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ score: 85, recommendations: ['Improve your skills section', 'Add more work experience'] });
    }, 2000);
  });
};
