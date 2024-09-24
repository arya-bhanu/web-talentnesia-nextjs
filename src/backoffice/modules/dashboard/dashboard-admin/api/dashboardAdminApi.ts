import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

export const dashboardAdminAPI = {
  get: async (quarter: number) => {
    const config: UseFetchProps = {
      url: `/v1/admin/dashboard?quarter=${quarter}`,
      method: 'GET',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return null;
    }
  },
};
