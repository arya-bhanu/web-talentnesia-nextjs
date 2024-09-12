import { fetchAxios } from '@/lib/fetchAxios';
import {
  AcademicLevelResponse,
  IComboAcademicLevel,
  SingleAcademicLevelResponse,
} from '../academicLevel.type';

export const academicLevelAPI = {
  fetch: async () => {
    const response = await fetchAxios<AcademicLevelResponse>({
      url: `/v1/education-level`,
      method: 'GET',
    });
    console.log('data academic level', response.data);
    return response;
  },

  all: () => {
    return fetchAxios<IComboAcademicLevel>({
      url: `/v1/education-level/all`,
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return fetchAxios<SingleAcademicLevelResponse>({
      url: `/v1/education-level/${id}`,
      method: 'GET',
    });
  },

  add: async (name: string) => {
    const requestData = { name, active: 1, createdBy: '' };
    return fetchAxios<SingleAcademicLevelResponse>({
      url: `/v1/education-level`,
      method: 'POST',
      formData: requestData,
    });
  },

  update: async (id: string, name: string) => {
    const requestData = { name, active: 1 };
    return fetchAxios<SingleAcademicLevelResponse>({
      url: `/v1/education-level/${id}`,
      method: 'PUT',
      formData: requestData,
    });
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/education-level/${id}`,
      method: 'DELETE',
    });
  },
};
