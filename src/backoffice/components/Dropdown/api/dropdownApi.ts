import { fetchAxios } from '@/lib/fetchAxios';

export type User = {
  id: string;
  name: string;
  email: string;
};

export const userAPI = {
  getUsers: async (limit: number, offset: number): Promise<User[]> => {
    try {
      const response = await fetchAxios({
        url: '/v1/user-list/',
        method: 'GET',
        params: { limit, offset },
      });

      return response.data; // Pastikan response.data adalah array User[]
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
};
