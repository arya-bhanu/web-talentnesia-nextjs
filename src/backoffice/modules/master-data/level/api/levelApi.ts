import { fetchAxios } from '@/lib/fetchAxios';
import { APIResponseLevel } from '../level.type';

export const levelAPI = {
  fetch: async () => {
    return fetchAxios<{ data: { items: APIResponseLevel[] } }>({
      url: `/v1/levels`,
      method: 'GET',
    }).then((response) => response.data.items);
  },

  getById: async (id: string) => {
    return fetchAxios<{ data: APIResponseLevel }>({
      url: `/v1/levels/${id}`,
      method: 'GET',
    }).then((response) => response.data);
  },

  generateCode: () => {
    const randomString = Math.random().toString(36).substring(2, 5).toUpperCase();
    const timestamp = new Date().getTime().toString().slice(-4);
    return `LVL-${randomString}${timestamp}`;
  },

  add: async (data: { name: string; code: string; active: number }) => {
    return fetchAxios<{ data: APIResponseLevel; message: string }>({
      url: `/v1/levels`,
      method: 'POST',
      formData: data,
    });
  },
  
  update: async (id: string, data: { name: string; code: string; active: number }) => {
    return fetchAxios<{ data: APIResponseLevel }>({
      url: `/v1/levels/${id}`,
      method: 'PUT',
      formData: data,
    }).then((response) => response.data);
  },
  

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/levels/${id}`,
      method: 'DELETE',
    }).then((response) => response.success);
  }
};
