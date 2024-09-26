import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';
import { User } from '../user.type';

export const userAPI = {
  add: async (data: FormData | { [key: string]: User }) => {
    const config: UseFetchProps = {
      url: '/v1/manage-user',
      method: 'POST',
      formData: data,
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to add user');
      return null;
    }
  },

  show: async (id: string) => {
    const config: UseFetchProps = {
      url: `/v1/manage-user/${id}`,
      method: 'GET',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Error fetching mentor:', error);
      return null;
    }
  },

  update: async (id: string, data: FormData | { [key: string]: User }) => {
    const config: UseFetchProps = {
      url: `/v1/manage-user/${id}`,
      method: 'PUT',
      formData: data,
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to update user');
      return null;
    }
  },

  delete: async (id: string) => {
    const config: UseFetchProps = {
      url: `/v1/manage-user/${id}`,
      method: 'DELETE',
    };

    try {
      const response = await fetchAxios(config);
      return response !== null;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
};
