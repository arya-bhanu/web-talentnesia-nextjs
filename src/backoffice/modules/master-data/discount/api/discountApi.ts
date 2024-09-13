import { fetchAxios } from '@/lib/fetchAxios';
import { APIResponseDiscount } from '../discount.type';

export const discountAPI = {
  fetch: async () => {
    return fetchAxios<{ data: { items: APIResponseDiscount[] } }>({
      url: `/v1/discount`,
      method: 'GET',
    }).then((response) => response.data.items);
  },

  getById: async (id: string) => {
    return fetchAxios<{ data: APIResponseDiscount }>({
      url: `/v1/discount/${id}`,
      method: 'GET',
    }).then((response) => response.data);
  },

  add: async (data: {
    code: string;
    name: string;
    persentage: number;
    startDate: string;
    endDate: string;
    active: number;
  }) => {
    return fetchAxios<{ data: APIResponseDiscount }>({
      url: `/v1/discount`,
      method: 'POST',
      formData: data,
    }).then((response) => response.data);
  },

  update: async (id: string, data: {
    code: string;
    name: string;
    persentage: number;
    startDate: string;
    endDate: string;
    active: number;
  }) => {
    return fetchAxios<{ data: APIResponseDiscount }>({
      url: `/v1/discount/${id}`,
      method: 'PUT',
      formData: data,
    }).then((response) => response.data);
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/discount/${id}`,
      method: 'DELETE',
    }).then((response) => response.success);
  }
};