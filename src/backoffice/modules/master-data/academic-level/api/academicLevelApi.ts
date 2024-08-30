import { backOfficeAPI } from '@/lib/axiosConfig';

export const academicLevelAPI = {
  fetch: async () => {
    try {
      const response = await backOfficeAPI.get('/v1/education-level');
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch academic levels');
      throw new Error('Failed to fetch academic levels');
    }
  },

  getById: async (id: string) => {
    try {
      const response = await backOfficeAPI.get(`/v1/education-level/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch academic level details');
      throw new Error('Failed to fetch academic level details');
    }
  },

  add: async (name: string) => {
    try {
      const requestData = {
        name,
        active: 1,
        createdBy: ""
      };

      const response = await backOfficeAPI.post('/v1/education-level', requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add academic level');
      throw new Error('Failed to add academic level');
    }
  },

  update: async (id: string, name: string ) => {
    try {
      const requestData = {
        name,
        active: 1
      };

      const response = await backOfficeAPI.put(`/v1/education-level/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update academic level');
      throw new Error('Failed to update academic level');
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await backOfficeAPI.delete(`/v1/education-level/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete academic level');
      throw new Error('Failed to delete academic level');
    }
  }
};
