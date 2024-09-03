import { backOfficeAPI } from '@/lib/axiosConfig';

export const provinceAPI = {
  fetch: async () => {
    try {
      const response = await backOfficeAPI.get('/v1/province');
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch province');
      return [];
    }
  },

  all: async () => {
    try {
      const response = await backOfficeAPI.get('/v1/province/all');
      return response.data.data;
    } catch (error) {
      console.error('Failed to get all province', error);
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await backOfficeAPI.get(`/v1/province/${id}`);
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

      const response = await backOfficeAPI.post(`/v1/province`, requestData);
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

      const response = await backOfficeAPI.put(`/v1/province/${id}`, requestData);
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

      const response = await backOfficeAPI.delete(`/v1/province/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete province');
      return;
    }
  }
};
