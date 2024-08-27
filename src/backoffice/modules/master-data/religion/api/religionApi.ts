import axios from 'axios';

// const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';
const API_URL = 'http://127.0.0.1:8000/api/v1';

export const religionAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/religion`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch religion');
      return [];
    }
  },

  all: async () => {
    try {
      const response = await axios.get(`${API_URL}/religion/all`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get all religion', error);
      return [];
    }
  },


  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/religion/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch religion details');
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

      const response = await axios.post(`${API_URL}/religion`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add religion');
      return;
    }
  },

  update: async (id: string, data: { code: string; name: string }) => {
    try {
        const requestData = {
        ...data,
        active: 1
      };

      const response = await axios.put(`${API_URL}/religion/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update religion');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/religion/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete religion');
      return;
    }
  }
};
