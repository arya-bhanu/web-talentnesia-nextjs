import { backOfficeAPI } from '@/lib/axiosConfig';
import { APIDetailProgramIICP, Schools } from '../formDetail.type';
import { fetchAxios } from '@/lib/fetchAxios';
import { Mentor } from '@/backoffice/components/mentor-selector/mentorSelector.type';

export const fetchMentors = async () => {
  const response = await fetchAxios<{
    data: Mentor[];
  }>({
    url: '/v1/manage-user/mentor',
    method: 'GET',
  });
  return { data: response };
};

export const fetchSchools = async () => {
  const response = await fetchAxios<{ data: Schools[] }>({
    url: '/v1/educational-institution/all',
    method: 'GET',
  });
  console.log('Fetched schools:', response);
  return { data: response };
};

export const createProgram = async (
  data: Omit<APIDetailProgramIICP, 'mentors'> & { mentors: string[] },
) => {
  try {
    const response = await fetchAxios<{ data: any }>({
      url: '/v1/manage-program',
      method: 'POST',
      formData: data,
    });
    console.log('Created program:', response);
    return response;
  } catch (err) {
    console.error('Error creating program:', err);
    throw err;
  }
};

export const fetchDetailProgram = async (programId?: string | null) => {
  try {
    if (programId) {
      return await backOfficeAPI.get('/manage-program/detail/' + programId);
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};
