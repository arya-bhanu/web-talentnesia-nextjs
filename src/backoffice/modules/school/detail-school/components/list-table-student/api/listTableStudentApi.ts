import { backOfficeAPI } from '@/lib/axiosConfig';
import { fetchAxios } from '@/lib/fetchAxios';

export const ListTableStudentAPI = {
  // fetch: async (id: string) => {
  //   try {
  //     const response = await backOfficeAPI.get(`/v1/user-educational-institution/table/${id}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching student table data:', error);
  //     throw error;
  //   }
  // },

  fetch: async (id: string) => {
    try {
      const response = await fetchAxios({
        url: `/v1/user-educational-institution/table/${id}`,
        method: 'GET',
      })
      return response.data;
    } catch (error) {
      console.error('Error fetching student table data:', error);
      throw error;
    }
  }
};