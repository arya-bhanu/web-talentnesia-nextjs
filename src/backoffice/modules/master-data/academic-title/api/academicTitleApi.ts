import { backOfficeAPI } from '@/lib/axiosConfig';

export const academicTitleAPI = {
  fetch: async () => {
    try {
      const response = await backOfficeAPI.get('/v1/academic-title');
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch academic title');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await backOfficeAPI.get(`/v1/academic-title/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch academic title details');
      return;
    }
  },

  add: async (name: string) => {
    try {
      const requestData = {
        name,
        active: 1,
        createdBy: ""
      };

      const response = await backOfficeAPI.post('/v1/academic-title', requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add academic title');
      return;
    }
  },

  update: async (id: string, name: string) => {
    try {
      const requestData = {
        name,
        active: 1
      };

      const response = await backOfficeAPI.put(`/v1/academic-title/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update academic title');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await backOfficeAPI.delete(`/v1/academic-title/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete academic title');
      return;
    }
  }
};
