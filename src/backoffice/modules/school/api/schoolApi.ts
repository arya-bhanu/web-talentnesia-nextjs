// schoolApi.ts

import { APIResponseSchool } from '../school.type';
import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

const BASE_URL = '/v1/educational-institution';

export const SchoolAPI = {
  all: async (): Promise<APIResponseSchool[]> => {
    const config: UseFetchProps = {
      url: `${BASE_URL}/all`,
      method: 'GET',
    };
    return fetchAxios<{ data: APIResponseSchool[] }>(config).then(response => response.data);
  },

  fetch: async (): Promise<APIResponseSchool[]> => {
    const config: UseFetchProps = {
      url: BASE_URL,
      method: 'GET',
    };
    return fetchAxios<{ data: { items: APIResponseSchool[] } }>(config).then(response => response.data.items);
  },

  getById: async (id: string): Promise<APIResponseSchool> => {
    const config: UseFetchProps = {
      url: `${BASE_URL}/${id}`,
      method: 'GET',
    };
    return fetchAxios<{ data: APIResponseSchool }>(config).then(response => response.data);
  },

  add: async (data: Partial<APIResponseSchool>): Promise<APIResponseSchool> => {
    const requestData = {
      ...data,
      active: 1,
      createdBy: '',
      provinceId: null,
      districtId: null,
      levelId: null,
    };
    const config: UseFetchProps = {
      url: BASE_URL,
      method: 'POST',
      formData: requestData,
    };
    return fetchAxios<{ data: APIResponseSchool }>(config).then(response => response.data);
  },

  update: async (id: string, data: Partial<APIResponseSchool>): Promise<APIResponseSchool> => {
    const requestData = {
      ...data,
      active: 1,
      provinceId: null,
      districtId: null,
      levelId: null,
    };
    const config: UseFetchProps = {
      url: `${BASE_URL}/${id}`,
      method: 'PUT',
      formData: requestData,
    };
    return fetchAxios<APIResponseSchool>(config);
  },

  delete: async (id: string): Promise<void> => {
    if (!id) {
      throw new Error('Invalid ID format');
    }
    const config: UseFetchProps = {
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
    };
    return fetchAxios(config);
  },
};
