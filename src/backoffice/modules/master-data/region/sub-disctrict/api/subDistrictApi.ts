import { backOfficeAPI } from '@/lib/axiosConfig';

export const subDistrictAPI = {
  fetch: async () => {
    try {
      const response = await backOfficeAPI.get(`/v1/sub-district`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch sub district');
      return [];
    }
  },

  all: async () => {
    try {
      const response = await backOfficeAPI.get(`/v1/subdistrict/all`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get all sub district');
      return [];
    }
  },

  getById: async (id: string) => {
    try {
      const response = await backOfficeAPI.get(`/v1/sub-district/${id}`);
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

      const response = await backOfficeAPI.post(`/v1/sub-district`, requestData);
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

      const response = await backOfficeAPI.put(`/v1/sub-district/${id}`, requestData);
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

      const response = await backOfficeAPI.delete(`/v1/sub-district/${id}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete sub district');
      return;
    }
  }
};
