import axios from 'axios';
import { ListProgramCardType } from '../listProgramCard.type';

export const ListProgramCardAPI = {
  fetch: async (schoolId: string): Promise<ListProgramCardType[]> => {
    try {
      const response = await axios.get(
        `${process.env.API_SERVER_URL}/v1/manage-program/program/${schoolId}`,
      );
      const transformedData = response.data.data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        startDate: item.startDate,
        endDate: item.endDate,
        imageUrl: item.image,
        length: item.active,
        durationMinute: item.durationMinute || 0,
      }));
      return transformedData;
    } catch (error) {
      console.error('Error fetching program card data:', error);
      throw error;
    }
  },
};
