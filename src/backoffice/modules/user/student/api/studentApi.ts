import { fetchAxios } from '@/lib/fetchAxios';
import { User } from '../../user.type';

export const studentAPI = {
  fetchStudents: async () => {
    try {
      const response = await fetchAxios<{ data: { items: User[] } }>({
        url: '/v1/manage-user/4/table',
        method: 'GET',
      });

      if (response && response.data && response.data.items) {
        return response.data.items;
      } else {
        console.error('Unexpected response structure:', response);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
      return [];
    }
  },

  importStudents: async (file: File, schoolId: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('school', schoolId);

    try {
      const response = await fetchAxios<{ message: string }>({
        url: '/v1/import-student',
        method: 'POST',
        formData,
      });

      return response;
    } catch (error) {
      console.error('Failed to import students:', error);
      throw error;
    }
  },
};
