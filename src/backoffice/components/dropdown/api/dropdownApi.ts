import { fetchAxios } from '@/lib/fetchAxios';

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Testimonial = {
  id: string;
  code: string;
  name: string;
  description: string;
};

export type Province = {
  id: string;
  name: string;
};

export type District = {
  id: string;
  name: string;
};

export type SubDistrict = {
  id: string;
  name: string;
};


export const dropdownAPI = {
  getData: async <T>(endpoint: string, limit: number, offset: number): Promise<T[]> => {
    try {
      const response = await fetchAxios({
        url: endpoint,
        method: 'GET',
        params: { limit, offset },
      });

      if (response.data && Array.isArray(response.data.items)) {
        return response.data.items;
      } else if (Array.isArray(response.data)) {
        return response.data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  },
};

export const userAPI = {
  getUsers: (limit: number, offset: number) => 
    dropdownAPI.getData<User>('/v1/user-list/', limit, offset),
};


export const provinceAPI = {
  getProvinces: (limit: number, offset: number) => 
    dropdownAPI.getData<Province>('/v1/province/all', limit, offset),
};

export const districtAPI = {
  getDistricts: (limit: number, offset: number) => 
    dropdownAPI.getData<District>('/v1/district/all', limit, offset),
};

export const subDistrictAPI = {
  getSubDistricts: (limit: number, offset: number) =>
    dropdownAPI.getData<SubDistrict>('/v1/subdistrict/all', limit, offset),
};

