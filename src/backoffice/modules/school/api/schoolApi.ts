import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const fetchSchools = async () => {
  const response = await axios.get('https://api-talentnesia.skwn.dev/api/v1/educational-institution');
  console.log(response.data);
  return response.data;
};

export const deleteSchool = async (id: string) => {
};

export const academicInstitutionAPI = {
  all: async () => {
    try {
      const response = await axios.get(`${API_URL}/educational-institution/all`);
      return response.data.data;
    } catch (error) {
      console.error('Failed to get all academic institution', error);
      return [];
    }
  },
}