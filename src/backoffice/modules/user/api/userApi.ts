import axios from 'axios';
import { User } from '../user.type';
import { MentorFormData } from '../mentor/addMentor.type';

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

  uploadFile: async (file: File, path: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', path);
  
      const response = await axios.post(`${API_URL}/file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        return response.data.path.origins;
      } else {
        console.error('Failed to upload file:', response.data);
        return null;
      }
    } catch (error) {
      console.error('Failed to upload file');
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          console.error('Response data:', axiosError.response.data);
          console.error('Response status:', axiosError.response.status);
          console.error('Response headers:', axiosError.response.headers);
        } else if (axiosError.request) {
          console.error('No response received:', axiosError.request);
        } else {
          console.error('Error message:', axiosError.message);
        }
      } else {
        console.error('Non-Axios error:', error);
      }
      return null;
    }
  },

  add: async (data: MentorFormData) => {
    try {
      console.log('Sending data to API:', data);
      const response = await axios.post(`${API_URL}/manage-user`, {
        ...data,
        role: 3,
        active: 1
      });
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to add user');
      if (axios.isAxiosError(error)) {
        const axiosError = error;
        if (axiosError.response) {
          console.error('Response data:', axiosError.response.data);
          console.error('Response status:', axiosError.response.status);
          console.error('Response headers:', axiosError.response.headers);
        } else if (axiosError.request) {
          console.error('No response received:', axiosError.request);
        } else {
          console.error('Error message:', axiosError.message);
        }
      } else {
        console.error('Non-Axios error:', error);
      }
      return null;
    }

  },
  update: async (id: string, data: MentorFormData) => {
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
