import { backOfficeAPI } from "@/lib/axiosConfig";

export const ListTableStudentAPI = {
  fetch: async (id: string) => {
    try {
      const response = await backOfficeAPI.get(`/v1/manage-program/course/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student table data:', error);
      throw error;
    }
  },
};
