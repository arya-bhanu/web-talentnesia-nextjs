import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const academicTitleAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/example`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch academic Titles', error);
      throw new Error('Failed to fetch academic Titles');
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/example/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch academic Title details', error);
      throw new Error('Failed to fetch academic Title details');
    }
  },

  add: async (data: { code: string; name: string }) => {
    try {
      const requestData = {
        ...data,
        active: 1,
        createdBy: ""
      };

      const response = await axios.post(`${API_URL}/example`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add academic Title', error);
      throw new Error('Failed to add academic Title');
    }
  },

  update: async (id: string, data: { code: string; name: string }) => {
    try {
        const requestData = {
        ...data,
        active: 1
      };

      const response = await axios.put(`${API_URL}/example/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update academic Title', error);
      throw new Error('Failed to update academic Title');
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/example/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete academic Title', error);
      console.log('ID:', id)
      throw new Error('Failed to delete academic Title');
    }
  }
};
