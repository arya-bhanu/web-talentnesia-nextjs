import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const levelAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/levels`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch level');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/levels/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch level details');
      return;
    }
  },

  add: async (data: { name: string; code: string; status?: number }) => {
    try {
      const response = await axios.post(`${API_URL}/levels`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to add levels', error);
      throw error; 
    }
  },
  
  

  update: async (id: string, data: { name: string; code: string; status?: number }) => {
    try {
      const response = await axios.put(`${API_URL}/levels/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update levels', error);
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/levels/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete level');
      return;
    }
  }
};
