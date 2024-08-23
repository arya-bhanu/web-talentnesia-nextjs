import axios from 'axios';

export const fetchSchools = async () => {
  const response = await axios.get('https://api-talentnesia.skwn.dev/api/v1/educational-institution');
  console.log(response.data);
  return response.data;
};

export const deleteSchool = async (id: string) => {
};
