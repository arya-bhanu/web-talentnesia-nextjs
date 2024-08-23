import axios from 'axios';

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get('https://talentnesia-skwn.khil.me/api/v1/admin/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};