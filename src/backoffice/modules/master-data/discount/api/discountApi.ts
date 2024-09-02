import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const discountAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/discount`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch discount');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/discount/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch discount details');
      return;
    }
  },

  add: async (data: { code: string; name: string; persentage: number; startDate: string; endDate: string; active: number; }) => {
    try {
      const requestData = {
        ...data,
        createdBy: "fngdme2va5ndvivq"
      };
      console.log('Request data:', requestData);
      const response = await axios.post(`${API_URL}/discount`, requestData);
      console.log('Response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Failed to add discount', error);
      throw error;
    }
  },  
  update: async (id: string, data: { code: string; name: string; persentage: number; startDate: string; endDate: string; active: number; }) => {
    try {
      const requestData = {
        ...data,
        createdBy: "fngdme2va5ndvivq"
      };
      console.log('Request data:', requestData);
      const response = await axios.put(`${API_URL}/discount/${id}`, requestData);
      console.log('Response:', response.data);
      return response.data;
    } catch (error: unknown) {
      console.error('Failed to update discount', error);
      throw error;
    }
  },  

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/discount/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete discount');
      return;
    }
  }
};
