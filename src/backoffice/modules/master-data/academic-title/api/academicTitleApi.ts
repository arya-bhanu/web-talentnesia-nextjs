import { fetchAxios } from '@/lib/fetchAxios';
import {
  AcademicTitleResponse,
  IComboAcademicTitle,
  SingleAcademicTitleResponse,
} from '../academicTitle.type';

export const academicTitleAPI = {
  fetch: async () => {
    return fetchAxios<AcademicTitleResponse>({
      url: `/v1/academic-title`,
      method: 'GET',
    });
  },

  all: () => {
    return fetchAxios<IComboAcademicTitle>({
      url: `/v1/academic-title/all`,
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return fetchAxios<SingleAcademicTitleResponse>({
      url: `/v1/academic-title/${id}`,
      method: 'GET',
    });
  },

  add: async (name: string) => {
    const requestData = { name, active: 1, createdBy: '' };
    return fetchAxios<SingleAcademicTitleResponse>({
      url: `/v1/academic-title`,
      method: 'POST',
      formData: requestData,
    });
  },

  update: async (id: string, name: string) => {
    const requestData = { name, active: 1 };
    return fetchAxios<SingleAcademicTitleResponse>({
      url: `/v1/academic-title/${id}`,
      method: 'PUT',
      formData: requestData,
    });
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/academic-title/${id}`,
      method: 'DELETE',
    });
  },
};
