// schoolApi.ts

import axios from 'axios';
import { APIResponseSchool } from '../school.type';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const SchoolAPI = {
  fetch: async (): Promise<APIResponseSchool[]> => {
    try {
      const response = await axios.get(`${process.env.API_SERVER_URL}/v1/educational-institution`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch schools');
      throw new Error('Failed to fetch schools');
    }
  },

  getById: async (id: string): Promise<APIResponseSchool> => {
    try {
      const response = await axios.get(`${process.env.API_SERVER_URL}/v1/educational-institution/${id}`);
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
        provinceId: null,
        districtId: null,
        levelId: null,
      };

      const response = await axios.post(`${process.env.API_SERVER_URL}/v1/educational-institution`, requestData);
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
        provinceId: null,
        districtId: null,
        levelId: null,
      };

      const response = await axios.put(`${process.env.API_SERVER_URL}/v1/educational-institution/${id}`, requestData);
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

      await axios.delete(`${process.env.API_SERVER_URL}/v1/educational-institution/${id}`);
    } catch (error) {
      console.error('Failed to delete school');
      throw new Error('Failed to delete school');
    }
  },
};