import { backOfficeAPI } from '@/lib/axiosConfig';
import { fetchAxios } from '@/lib/fetchAxios';
import { UserData } from '../setting.type';

export const getUserProfile = async (id: string) => {
  try {
    const response = await fetchAxios ({
      url: `/v1/user-profile-setting/${id}`,
      method: 'GET',
    })
    return response.data
  } catch {
    console.error('Error fetching user profile');
  }
}

export const updateUserProfile = async (id: string, userData: UserData) => {
  try {
    const response = await fetchAxios({
      url: `/v1/user-profile-setting/${id}`,
      method: 'PUT',
      formData: userData
    })
    return response.data
  } catch {
    console.error('Error updating user profile');
  }
}