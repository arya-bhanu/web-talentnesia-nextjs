import { fetchAxios } from '@/lib/fetchAxios';
import { APIResponseCategory } from '../category.type';

export const categoryAPI = {
  fetch: async () => {
    return fetchAxios<{ data: { items: APIResponseCategory[] } }>({
      url: `/v1/category`,
      method: 'GET',
    }).then((response) => response.data.items);
  },

  getById: async (id: string) => {
    return fetchAxios<{ data: APIResponseCategory }>({
      url: `/v1/category/${id}`,
      method: 'GET',
    }).then((response) => response.data);
  },

  add: async (data: { name: string; code: string; status?: number }) => {
    return fetchAxios<{ data: APIResponseCategory }>({
      url: `/v1/category`,
      method: 'POST',
      formData: data,
    }).then((response) => response.data);
  },

  update: async (id: string, data: { name: string; code: string; status?: number }) => {
    return fetchAxios<{ data: APIResponseCategory }>({
      url: `/v1/category/${id}`,
      method: 'PUT',
      formData: data,
    }).then((response) => response.data);
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/category/${id}`,
      method: 'DELETE',
    }).then((response) => response.success);
  }
};
