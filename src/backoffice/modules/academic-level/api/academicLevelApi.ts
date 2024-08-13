import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const academicLevelAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/example`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch academic levels', error);
      throw new Error('Failed to fetch academic levels');
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/example/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch academic level details', error);
      throw new Error('Failed to fetch academic level details');
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
      console.error('Failed to add academic level', error);
      throw new Error('Failed to add academic level');
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
      console.error('Failed to update academic level', error);
      throw new Error('Failed to update academic level');
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
      console.error('Failed to delete academic level', error);
      console.log('ID:', id)
      throw new Error('Failed to delete academic level');
    }
  }
};
