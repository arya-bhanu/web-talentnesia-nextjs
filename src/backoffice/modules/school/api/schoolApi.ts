// schoolApi.ts

import axios from 'axios';
import { APIResponseSchool } from '../school.type';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const SchoolAPI = {
  fetch: async (): Promise<APIResponseSchool[]> => {
    try {
      const response = await axios.get(`${API_URL}/educational-institution`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch schools');
      throw new Error('Failed to fetch schools');
    }
  },

  getById: async (id: string): Promise<APIResponseSchool> => {
    try {
      const response = await axios.get(`${API_URL}/educational-institution/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch school details');
      throw new Error('Failed to fetch school details');
    }
  },

  add: async (data: Partial<APIResponseSchool>): Promise<APIResponseSchool> => {
    try {
      const requestData = {
        ...data,
        active: 1,
        createdBy: '',
        imageUrl: data.imageUrl || 'https://imagizer.imageshack.com/img923/3166/zM2TAi.jpg',
        provinceId: null,
        districtId: null,
        levelId: null,
      };

      const response = await axios.post(`${API_URL}/educational-institution`, requestData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to add school');
      console.log(error)
      throw new Error('Failed to add school');
    }
  },

  update: async (id: string, data: Partial<APIResponseSchool>): Promise<APIResponseSchool> => {
    try {
      const requestData = {
        ...data,
        active: 1,
        imageUrl: data.imageUrl,
        provinceId: null,
        districtId: null,
        levelId: null,
      };

      const response = await axios.put(`${API_URL}/educational-institution/${id}`, requestData);
      return response.data.data;
    } catch (error) {
      console.error('Failed to update school');
      throw new Error('Failed to update school');
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      if (!id) {
        throw new Error('Invalid ID format');
      }

      await axios.delete(`${API_URL}/educational-institution/${id}`);
    } catch (error) {
      console.error('Failed to delete school');
      throw new Error('Failed to delete school');
    }
  },
};