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
  return { data: response };
};

export const createProgram = async (
  data: Omit<APIDetailProgramIICP, 'mentors'> & { mentors: string[] },
) => {
  try {
    const response = await fetchAxios<{
      data: Omit<APIDetailProgramIICP, 'mentors'> & { mentors: string[] };
    }>({
      url: '/v1/manage-program',
      method: 'POST',
      formData: data,
    });
    return response;
  } catch (err) {
    console.error('Error creating program:', err);
    throw err;
  }
};

export const fetchDetailProgram = async (programId?: string | null) => {
  try {
    if (programId) {
      const response = await fetchAxios<{ data: Omit<APIDetailProgramIICP, 'mentors'> & { mentors: string[] } }>({
        url: `/v1/manage-program/detail/${programId}`,
        method: 'GET',
      });
      return { data: response };
    }
    return null;
  } catch (err) {
    console.error('Error fetching program detail:', err);
    throw err;
  }
};
