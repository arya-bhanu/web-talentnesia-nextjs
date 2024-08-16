import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const zipCodeAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/zip-code`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch sub district');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/zip-code/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch sub district details');
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

      const response = await axios.post(`${API_URL}/zip-code`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add sub district');
      return;
    }
  },

  update: async (id: string, data: { code: string; name: string }) => {
    try {
        const requestData = {
        ...data,
        active: 1
      };

      const response = await axios.put(`${API_URL}/zip-code/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update sub district');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/zip-code/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete sub district');
      return;
    }
  }
};
