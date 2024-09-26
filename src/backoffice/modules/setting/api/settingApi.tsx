import { backOfficeAPI } from '@/lib/axiosConfig';
import { UserData } from '../Setting';

export const getUserProfile = async (id: string) => {
  try {
    const response = await backOfficeAPI.get(`/v1/user-profile-setting/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user profile');
    throw error;
  }
};

export const updateUserProfile = async (id: string, userData: UserData) => {
  try {
    const response = await backOfficeAPI.put(`/v1/user-profile-setting/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile');
    throw error;
  }
};