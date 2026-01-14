import axios from 'axios';

const BASE_URL = 'https://brainstudio-minutes-production.up.railway.app';

// API Service for all backend communications
const apiService = {
  // Fetch transcripts from Fireflies API (Backend handles auth)
  fetchTranscripts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/fireflies/transcripts`);
      // Adjust based on actual response structure, assuming array or { data: [] }
      return response.data;
    } catch (error) {
      console.error('Error fetching transcripts:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch transcripts from Fireflies');
    }
  },

  // Upload document to backend
  uploadDocument: async (file, onProgress) => {
    try {
      const formData = new FormData();
      formData.append('document', file);

      const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) {
            onProgress(percentCompleted);
          }
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw new Error(error.response?.data?.message || 'Failed to upload document');
    }
  },

  // Analyze meeting (Used for both Summary and Full Analysis based on prompt requirements)
  analyzeMeeting: async (id, focus = 'general') => {
    try {
      const response = await axios.post(`${BASE_URL}/api/analyze/${id}`, {
        focus
      });
      return response.data;
    } catch (error) {
      console.error('Error analyzing meeting:', error);
      throw new Error(error.response?.data?.message || 'Failed to generate analysis');
    }
  }
};

export default apiService;