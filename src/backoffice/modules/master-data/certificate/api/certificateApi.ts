import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const certificateAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/certificates`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch certificates');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/certificates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch certificate details');
      return;
    }
  },

  add: async (data: { code: string; name: string }) => {
    try {
      const requestData = {
        ...data,
        active: 1,
        createdBy: ""
      };

      const response = await axios.post(`${API_URL}/certificates`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add certificate');
      return;
    }
  },

  update: async (id: string, data: { code: string; name: string }) => {
    try {
        const requestData = {
        ...data,
        active: 1
      };

      const response = await axios.put(`${API_URL}/certificates/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update certificate');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/certificates/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete certificate');
      return;
    }
  }
};
