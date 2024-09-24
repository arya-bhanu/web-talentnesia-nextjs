import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

export const dashboardMentorApi = {
  getDashboard: async (date: string) => {
    const config: UseFetchProps = {
      url: `/v1/mentor/dashboard?date=${date}`,
      method: 'GET',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Error fetching mentor dashboard:', error);
      return null;
    }
  },
};
