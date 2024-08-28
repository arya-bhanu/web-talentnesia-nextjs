import axios from 'axios';

export const ListTableStudentAPI = {
  fetch: async (id: string) => {
    try {
      const response = await axios.get(`https://api-talentnesia.skwn.dev/api/v1/manage-program/course/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching student table data:', error);
      throw error;
    }
  },
};
