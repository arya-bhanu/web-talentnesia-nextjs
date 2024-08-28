import axios from 'axios';
import { ListProgramCardType } from '../listProgramCard.type';

export const ListProgramCardAPI = {
  fetch: async (schoolId: string): Promise<ListProgramCardType[]> => {
    try {
      const response = await axios.get(`${process.env.API_SERVER_URL}/v1/manage-program/program/${schoolId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching program card data:', error);
      throw error;
    }
  },
};
