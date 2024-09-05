import { fetchAxios } from '@/lib/fetchAxios';
import {
  ProvinceResponse,
  IComboProvince,
  SingleProvinceResponse,
} from '../province.type';

export const provinceAPI = {
  fetch: async () => {
    return fetchAxios<ProvinceResponse>({
      url: `/v1/province`,
      method: 'GET',
    });
  },

  all: () => {
    return fetchAxios<IComboProvince>({
      url: `/v1/province/all`,
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return fetchAxios<SingleProvinceResponse>({
      url: `/v1/province/${id}`,
      method: 'GET',
    });
  },

  add: async (name: string) => {
    const requestData = { name, active: 1, createdBy: '' };
    return fetchAxios<SingleProvinceResponse>({
      url: `/v1/province`,
      method: 'POST',
      formData: requestData,
    });
  },

  update: async (id: string, name: string) => {
    const requestData = { name, active: 1 };
    return fetchAxios<SingleProvinceResponse>({
      url: `/v1/province/${id}`,
      method: 'PUT',
      formData: requestData,
    });
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/province/${id}`,
      method: 'DELETE',
    });
  },
};
