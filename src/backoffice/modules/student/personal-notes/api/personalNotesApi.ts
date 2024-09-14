import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

export const personalNoteAPI = {
    get: async (page: number = 1) => {
        const config: UseFetchProps = {
          url: `/v1/user-personal-note?page=${page}`,
          method: 'GET',
        };
    
        try {
          return await fetchAxios(config);
        } catch (error) {
          console.error('Error fetching personal notes:', error);
          return null;
        }
      },

  getById: async (id: string) => {
    const config: UseFetchProps = {
      url: `/v1/user-personal-note/${id}`,
      method: 'GET',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Error fetching personal note by ID:', error);
      return null;
    }
  },

  add: async (data: { title: string; body: string; programId: string; color?: string }) => {
    const config: UseFetchProps = {
      url: '/v1/user-personal-note',
      method: 'POST',
      formData: data,
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to add personal note');
      return null;
    }
  },

  update: async (id: string, data: { title: string; body: string; programId: string; color?: string }) => {
    const config: UseFetchProps = {
      url: `/v1/user-personal-note/${id}`,
      method: 'PUT',
      formData: data,
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Failed to update personal note');
      return null;
    }
  },

  delete: async (id: string) => {
    const config: UseFetchProps = {
      url: `/v1/user-personal-note/${id}`,
      method: 'DELETE',
    };

    try {
      const response = await fetchAxios(config);
      return response !== null;
    } catch (error) {
      console.error('Error deleting personal note:', error);
      return false;
    }
  },
  
  getStudentCourses: async (page: number = 1) => {
    const config: UseFetchProps = {
      url: `/v1/student-course?page=${page}`,
      method: 'GET',
    };

    try {
      return await fetchAxios(config);
    } catch (error) {
      console.error('Error fetching student courses:', error);
      return null;
    }
  },
};
