import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

export const dashboardOperatorApi = {
  getDashboard: async (date: string) => {
    const config: UseFetchProps = {
      url: `/v1/operator/dashboard?date=${date}`,
      method: 'GET',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Error fetching operator dashboard:', error);
      return null;
    }
  },

  getDashboardProgress: async (page?: number, type?: string) => {
    let url = '/v1/manage-program/dashboard-progress';
    const params = new URLSearchParams();

    if (page) params.append('page', page.toString());
    if (type) params.append('type', type);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const config: UseFetchProps = {
      url,
      method: 'GET',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Error fetching dashboard progress:', error);
      return null;
    }
  },
};
