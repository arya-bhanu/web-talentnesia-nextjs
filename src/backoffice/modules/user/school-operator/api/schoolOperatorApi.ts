import { fetchAxios } from '@/lib/fetchAxios';

export const schoolOperatorAPI = {
  fetchSchoolOperators: async () => {
    try {
      const response = await fetchAxios<{ data: { items: any[] } }>({
        url: '/v1/manage-user/2/table',
        method: 'GET',
      });

      if (response && response.data && response.data.items) {
        return response.data.items;
      } else {
        console.error('Unexpected response structure:', response);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch schoolOperators:', error);
      return [];
    }
  },
};
