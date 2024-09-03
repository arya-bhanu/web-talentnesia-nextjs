import { backOfficeAPI } from '@/lib/axiosConfig';


export const religionAPI = {
  fetch: async () => {
    try {
      const response = await backOfficeAPI.get(`/v1/religion`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch religion');
      return [];
    }
  },

  all: async () => {
    try {
      const response = await backOfficeAPI.get(`/v1/religion/all`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get all religion', error);
      return [];
    }
  },


  getById: async (id: string) => {
    try {
      const response = await backOfficeAPI.get(`/v1/religion/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch religion details');
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

      const response = await backOfficeAPI.post(`/v1/religion`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to add religion');
      return;
    }
  },

  update: async (id: string, data: { code: string; name: string }) => {
    try {
        const requestData = {
        ...data,
        active: 1
      };

      const response = await backOfficeAPI.put(`/v1/religion/${id}`, requestData);
      return response.data;
    } catch (error) {
      console.error('Failed to update religion');
      return;
    }
  },

  delete: async (id: string) => {
    try {
      if (typeof id !== 'string' || !id) {
        throw new Error('Invalid ID format');
      }

      const response = await backOfficeAPI.delete(`/v1/religion/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete religion');
      return;
    }
  }
};
