import axios from 'axios';
import { ListProgramCardType } from '../listProgramCard.type';

export const ListProgramCardAPI = {
  fetchProgram: async (schoolId: string): Promise<ListProgramCardType[]> => {
    try {
      const response = await axios.get(
        `${process.env.API_SERVER_URL}/v1/manage-program/program/${schoolId}`,
      );
      const transformedData = response.data.data.items.map((item: ListProgramCardType) => ({
        id: item.id,
        name: item.name,
        startDate: item.startDate,
        endDate: item.endDate,
        imageUrl: item.imageUrl,
        length: item.length,
        durationMinute: item.durationMinute || 0,
      }));
      return transformedData;
    } catch (error) {
      console.error('Error fetching program card data:');
      throw error;
    }
  },
  
  fetchDetailProgram: async (id: string) => {
    try {
      const response = await axios.get(`${process.env.API_SERVER_URL}/v1/manage-program/course/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student table data:', error);
      throw error;
    }
  },
};
