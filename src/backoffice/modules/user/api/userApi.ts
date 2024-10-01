import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';
import { AxiosError } from 'axios';

export const userAPI = {
  add: async (data: FormData | { [key: string]: any }) => {
    const config: UseFetchProps = {
      url: '/v1/manage-user',
      method: 'POST',
      formData: data,
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to add user');
      return (error as AxiosError).response?.data || error;
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
      return (error as AxiosError).response?.data || error;
    }
  },

  update: async (id: string, data: FormData | { [key: string]: any }) => {
    const config: UseFetchProps = {
      url: `/v1/manage-user/${id}`,
      method: 'PUT',
      formData: data,
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.log('Failed to update user', error);
      return (error as AxiosError).response?.data || error;
    }
  },

  delete: async (id: string) => {
    const config: UseFetchProps = {
      url: `/v1/manage-user/${id}`,
      method: 'DELETE',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Error deleting user:', error);
      return (error as AxiosError).response?.data || error;
    }
  }
};
