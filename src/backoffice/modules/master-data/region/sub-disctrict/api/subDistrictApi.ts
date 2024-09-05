import { fetchAxios } from '@/lib/fetchAxios';
import {
  SubDistrictResponse,
  IComboSubDistrict,
  SingleSubDistrictResponse,
} from '../subDistrict.type';

export const subDistrictAPI = {
  fetch: async () => {
    return fetchAxios<SubDistrictResponse>({
      url: `/v1/subdistrict`,
      method: 'GET',
    });
  },

  all: () => {
    return fetchAxios<IComboSubDistrict>({
      url: `/v1/subdistrict/all`,
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return fetchAxios<SingleSubDistrictResponse>({
      url: `/v1/subdistrict/${id}`,
      method: 'GET',
    });
  },

  add: async (name: string) => {
    const requestData = { name, active: 1, createdBy: '' };
    return fetchAxios<SingleSubDistrictResponse>({
      url: `/v1/subdistrict`,
      method: 'POST',
      formData: requestData,
    });
  },

  update: async (id: string, name: string) => {
    const requestData = { name, active: 1 };
    return fetchAxios<SingleSubDistrictResponse>({
      url: `/v1/subdistrict/${id}`,
      method: 'PUT',
      formData: requestData,
    });
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/subdistrict/${id}`,
      method: 'DELETE',
    });
  },
};
