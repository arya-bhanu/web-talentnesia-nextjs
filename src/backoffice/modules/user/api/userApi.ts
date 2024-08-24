import axios from 'axios';
import { User } from '../user.type';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const userAPI = {
  fetchMentors: async () => {
    try {
      const response = await axios.get(`${API_URL}/manage-user/3/table`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch mentors');
      return [];
    }
  },

  fetchStudents: async () => {
    try {
      const response = await axios.get(`${API_URL}/manage-user/4/table`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch students');
      return [];
    }
  },

  fetchSchoolOperators: async () => {
    try {
      const response = await axios.get(`${API_URL}/manage-user/2/table`);
      return response.data.data.items;
    } catch (error) {
      console.error('Failed to fetch school operators');
      return [];
    }
  },

  add: async (data: { name: string }) => {
    try {
      const response = await axios.post(`${API_URL}/manage-user`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to add user');
      return null;
    }
  },

  update: async (id: string, data: User) => {
    try {
      const response = await axios.put(`${API_URL}/manage-user/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update user');
      return null;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/manage-user/${id}`);
      if (response.status === 200) {
        console.log('User deleted successfully');
        return true;
      } else {
        console.error('Failed to delete user');
        return false;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
};
