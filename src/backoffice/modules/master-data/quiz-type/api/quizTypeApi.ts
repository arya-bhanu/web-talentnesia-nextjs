import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const quizTypeAPI = {
  fetch: async () => {
    try {
      const response = await axios.get(`${API_URL}/quiz-type`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch quiz type');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/quiz-type/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch quiz-type details');
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

      const response = await axios.post(`${API_URL}/quiz-type`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add quiz-type');
      return;
    }
  },

  update: async (id: string, data: { code: string; name: string }) => {
    try {
        const requestData = {
        ...data,
        active: 1
      };

      const response = await axios.put(`${API_URL}/quiz-type/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update quiz-type');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await axios.delete(`${API_URL}/quiz-type/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete quiz-type');
      return;
    }
  }
};
