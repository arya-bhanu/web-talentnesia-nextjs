import axios from 'axios';

const BASE_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const getUserProfile = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user-profile-setting/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (id: string, userData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/user-profile-setting/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
