import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const studentAPI = {

  fetchStudents: async () => {
    try {
      const response = await axios.get(`${API_URL}/manage-user/4/table`);
      if (response.data && response.data.data && response.data.data.items) {
        return response.data.data.items;
      } else {
        console.error('Unexpected response structure:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
      return [];
    }
  },

};
