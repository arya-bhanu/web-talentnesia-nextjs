import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const categoryAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/category`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch category', error);
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/category/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch category details', error);
      return;
    }
  },

  add: async (data: { name: string; code: string; status?: number }) => {
    try {
      const response = await axios.post(`${API_URL}/category`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to add category', error);
      throw error; 
    }
  },
  
  

  update: async (id: string, data: { name: string; code: string; status?: number }) => {
    try {
      const response = await axios.put(`${API_URL}/category/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update category', error);
      return;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/category/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete category', error);
      return;
    }
  }
};

