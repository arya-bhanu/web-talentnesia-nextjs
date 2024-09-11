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
  getData: async <T extends { id: string }>(endpoint: string, limit: number, offset: number): Promise<T[]> => {
    try {
      const response = await fetchAxios({
        url: endpoint,
        method: 'GET',
        params: { limit, offset },
      });

      let items: T[];
      if (response.data && Array.isArray(response.data.items)) {
        items = response.data.items;
      } else if (Array.isArray(response.data)) {
        items = response.data;
      } else {
        items = [];
      }
      const uniqueItems = Array.from(new Set(items.map(item => item.id)))
        .map(id => items.find(item => item.id === id)) as T[];
      return uniqueItems;
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
  getDistrictsByProvince: (provinceId: string, limit: number, offset: number) =>
    dropdownAPI.getData<District>(`/v1/district/province/${provinceId}`, limit, offset),
};

export const subDistrictAPI = {
  getSubDistricts: (limit: number, offset: number) =>
    dropdownAPI.getData<SubDistrict>('/v1/subdistrict/all', limit, offset),
  getSubDistrictsByDistrict: (districtId: string, limit: number, offset: number) =>
    dropdownAPI.getData<SubDistrict>(`/v1/subdistrict/district/${districtId}`, limit, offset),
};
