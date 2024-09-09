import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const certificateAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/certificate`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch certificate');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/certificate/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch certificate details');
      return;
    }
  },

  add: async (data: { name: string, file: string }) => {
    try {
      const requestData = {
        ...data,
        active: 1,
        createdBy: ""
      };
      const response = await axios.post(`${API_URL}/certificate`, requestData);
      return response.data;
    } catch (error: unknown) {
      console.error('Failed to add certificate', error);
      throw error;
    }
  },  
  
  update: async (id: string, data: { name: string, file: string }) => {
    try {
      const requestData = {
        ...data,
        active: 1,
        createdBy: ""
      };
      console.log('Request data:', requestData);
      const response = await axios.put(`${API_URL}/certificate/${id}`, requestData);
      console.log('Response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Failed to update certificate', error);
      throw error;
    }
  },  

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/certificate/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete certificate');
      return;
    }
  }
};
