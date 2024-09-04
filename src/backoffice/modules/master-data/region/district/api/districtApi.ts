import { fetchAxios } from '@/lib/fetchAxios';
import {
  DistrictResponse,
  IComboDistrict,
  SingleDistrictResponse,
} from '../district.type';

export const districtAPI = {
  fetch: async () => {
    return fetchAxios<DistrictResponse>({
      url: `/v1/district`,
      method: 'GET',
    });
  },

  all: () => {
    return fetchAxios<IComboDistrict>({
      url: `/v1/district/all`,
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return fetchAxios<SingleDistrictResponse>({
      url: `/v1/district/${id}`,
      method: 'GET',
    });
  },

  add: async (name: string) => {
    const requestData = { name, active: 1, createdBy: '' };
    return fetchAxios<SingleDistrictResponse>({
      url: `/v1/district`,
      method: 'POST',
      formData: requestData,
    });
  },

  update: async (id: string, name: string) => {
    const requestData = { name, active: 1 };
    return fetchAxios<SingleDistrictResponse>({
      url: `/v1/district/${id}`,
      method: 'PUT',
      formData: requestData,
    });
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/district/${id}`,
      method: 'DELETE',
    });
  },
};
