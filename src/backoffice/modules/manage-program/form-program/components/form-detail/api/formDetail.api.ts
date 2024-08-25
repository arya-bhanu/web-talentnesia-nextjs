import { backOfficeAPI } from '@/lib/axiosConfig';
import { APIDetailForm } from '../formDetail.type';

export const fetchMentors = async () => {
  return await backOfficeAPI.get('/manage-user/mentor');
};

export const fetchSchools = async () => {
  return await backOfficeAPI.get('/educational-institution/all');
};

export const createProgram = async (
  data: Omit<APIDetailForm, 'mentors'> & { mentors: string[] },
) => {
  try {
    return await backOfficeAPI.post('/manage-program', data);
  } catch (err) {
    console.error(err);
  }
};
