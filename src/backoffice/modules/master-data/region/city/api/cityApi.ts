import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const cityAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/city`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch city');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/city/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch city details');
      return;
    }
  },

  add: async (data: { name: string }) => {
    try {
      const requestData = {
        ...data,
        active: 1,
        createdBy: ""
      };

      const response = await axios.post(`${API_URL}/city`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add city');
      return;
    }
  },

  update: async (id: string, data: { code: string; name: string }) => {
    try {
        const requestData = {
        ...data,
        active: 1
      };

      const response = await axios.put(`${API_URL}/city/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update city');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/city/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete city');
      return;
    }
  }
};
