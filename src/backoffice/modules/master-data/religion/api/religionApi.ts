import { fetchAxios } from '@/lib/fetchAxios';
import {
  ReligionResponse,
  IComboReligion,
  SingleReligionResponse,
} from '../religion.type';

export const religionAPI = {
  fetch: async () => {
    return fetchAxios<ReligionResponse>({
      url: `/v1/religion`,
      method: 'GET',
    });
  },

  all: () => {
    return fetchAxios<IComboReligion>({
      url: `/v1/religion/all`,
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return fetchAxios<SingleReligionResponse>({
      url: `/v1/religion/${id}`,
      method: 'GET',
    });
  },

  add: async (name: string) => {
    const requestData = { name, active: 1, createdBy: '' };
    return fetchAxios<SingleReligionResponse>({
      url: `/v1/religion`,
      method: 'POST',
      formData: requestData,
    });
  },

  update: async (id: string, name: string) => {
    const requestData = { name, active: 1 };
    return fetchAxios<SingleReligionResponse>({
      url: `/v1/religion/${id}`,
      method: 'PUT',
      formData: requestData,
    });
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/religion/${id}`,
      method: 'DELETE',
    });
  },
};
