import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const provinceAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/province`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch province');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/province/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch province details');
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

      const response = await axios.post(`${API_URL}/province`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add province');
      return;
    }
  },

  update: async (id: string, data: { code: string; name: string }) => {
    try {
        const requestData = {
        ...data,
        active: 1
      };

      const response = await axios.put(`${API_URL}/province/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update province');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/province/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete province');
      return;
    }
  }
};
