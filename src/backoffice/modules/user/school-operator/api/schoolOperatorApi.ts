import { backOfficeAPI } from '@/lib/axiosConfig';

export const schoolOperatorAPI = {

  fetchSchoolOperators: async () => {
    try {
      const response = await backOfficeAPI.get(`v1/manage-user/2/table`);
      if (response.data && response.data.data && response.data.data.items) {
        return response.data.data.items;
      } else {
        console.error('Unexpected response structure:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch schoolOperators:', error);
      return [];
    }
  },

};
