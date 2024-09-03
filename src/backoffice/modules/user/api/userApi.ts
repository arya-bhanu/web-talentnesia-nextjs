import { backOfficeAPI } from '@/lib/axiosConfig';

export const userAPI = {

  uploadFile: async (file: File, path: string) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', path);
  
      const response = await backOfficeAPI.post(`v1/file`, formData, {
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
      return null;
    }
  },


  add: async <T>(data: T) => {
    try {
      console.log('Sending data to API:', data);
      const response = await backOfficeAPI.post(`v1/manage-user`, data);
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to add user');
      return null;
    }
  },

  getFile: async (filePath: string): Promise<Blob | null> => {
    try {
      const response = await backOfficeAPI.get(`v1/file/${filePath}`, {
        responseType: 'blob'
      });
      return new Blob([response.data], { type: response.headers['content-type'] });
    } catch (error) {
      console.error('Error fetching file:', error);
      return null;
    }
  },

  show: async (id: string) => {
    try {
      const response = await backOfficeAPI.get(`v1/manage-user/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mentor:', error);
      return null;
    }
  },

  update: async <T>(id: string, data: T) => {
    try {
      const response = await backOfficeAPI.put(`v1/manage-user/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Failed to update user');
      return null;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await backOfficeAPI.delete(`v1/manage-user/${id}`);
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
