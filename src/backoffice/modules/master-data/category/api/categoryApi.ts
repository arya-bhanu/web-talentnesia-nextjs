import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const categoryAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/course-category`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch category');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/course-category/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch category details');
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

      const response = await axios.post(`${API_URL}/course-category`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add category');
      return;
    }
  },

  update: async (id: string, data: { name: string }) => {
    try {
        const requestData = {
        ...data,
        active: 1
      };

      const response = await axios.put(`${API_URL}/course-category/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update category');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/category/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete category');
      return;
    }
  }
};
