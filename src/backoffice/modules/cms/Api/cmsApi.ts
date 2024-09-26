import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

export const cmsApi = {

  // BLOG
  add: async (data: FormData | { [key: string]: any }) => {
    const config: UseFetchProps = {
      url: '/v1/blog',
      method: 'POST',
      formData: data,
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to add blog');
      return null;
    }
  },

  update: async (id: string, data: FormData | { [key: string]: any }) => {
    const config: UseFetchProps = {
      url: `/v1/blog/${id}`,
      method: 'PUT',
      formData: data,
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to update blog');
      return null;
    }
  },

  show: async (id: string) => {
    const config: UseFetchProps = {
      url: `/v1/blog/${id}`,
      method: 'GET',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to fetch blog');
      return null;
    }
  },

  delete: async (id: string) => {
    const config: UseFetchProps = {
      url: `/v1/blog/${id}`,
      method: 'DELETE',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to delete blog');
      return null;
    }
  },

  // TAG
  addTag: async (data: FormData | { [key: string]: any }) => {
    const config: UseFetchProps = {
      url: '/v1/tag',
      method: 'POST',
      formData: data,
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to add tag');
      return null;
    }
  },

  getTags: async () => {
    const config: UseFetchProps = {
      url: '/v1/tag/all',
      method: 'GET',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to fetch tags');
      return null;
    }
  },
};
