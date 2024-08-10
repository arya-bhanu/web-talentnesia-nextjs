import axios from 'axios';

const API_URL = 'https://api-talentnesia.skwn.dev/api/v1';

export const fetchAcademicLevels = async () => {
  const response = await axios.get(`${API_URL}/example`);
  return response.data.data.items; 
};
