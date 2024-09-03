import { fetchAxios } from '@/lib/fetchAxios';
import { AcademicLevelResponse, SingleAcademicLevelResponse } from '../academicLevel.type';

export const academicLevelAPI = {
  fetch: async () => {
    return fetchAxios<AcademicLevelResponse>({
      url: `${process.env.API_SERVER_URL}/v1/education-level`,
      method: 'GET',
    });
  },

  all: async () => {
    return fetchAxios<AcademicLevelResponse>({
      url: `${process.env.API_SERVER_URL}/v1/education-level/all`,
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return fetchAxios<SingleAcademicLevelResponse>({
      url: `${process.env.API_SERVER_URL}/v1/education-level/${id}`,
      method: 'GET',
    });
  },

  add: async (name: string) => {
    const requestData = { name, active: 1, createdBy: "" };
    return fetchAxios<SingleAcademicLevelResponse>({
      url: `${process.env.API_SERVER_URL}/v1/education-level`,
      method: 'POST',
      formData: requestData,
    });
  },

  update: async (id: string, name: string) => {
    const requestData = { name, active: 1 };
    return fetchAxios<SingleAcademicLevelResponse>({
      url: `${process.env.API_SERVER_URL}/v1/education-level/${id}`,
      method: 'PUT',
      formData: requestData,
    });
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `${process.env.API_SERVER_URL}/v1/education-level/${id}`,
      method: 'DELETE',
    });
  }
};

