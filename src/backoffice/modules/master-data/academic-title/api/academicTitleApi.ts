import axios from 'axios';

// const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';
const API_URL = 'http://127.0.0.1:8000/api/v1';

export const academicTitleAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/academic-title`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch academic title');
      return [];
    }
  },

  all: async () => {
    try {
      const response = await axios.get(`${API_URL}/academic-title/all`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get all academic title', error);
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/academic-title/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch academic title details');
      return;
    }
  },

  add: async (name: string) => {
    try {
      const requestData = {
        name,
        active: 1,
        createdBy: ""
      };

      const response = await axios.post(`${API_URL}/academic-title`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add academic title');
      return;
    }
  },

  update: async (id: string, name: string) => {
    try {
        const requestData = {
        name,
        active: 1
      };

      const response = await axios.put(`${API_URL}/academic-title/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update academic title');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/academic-title/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete academic title');
      return;
    }
  }
};
