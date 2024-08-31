import { backOfficeAPI } from '@/lib/axiosConfig';
import { APIDetailProgramIICP } from '../formDetail.type';

export const fetchMentors = async () => {
  return await backOfficeAPI.get('/manage-user/mentor');
};

export const fetchSchools = async () => {
  return await backOfficeAPI.get('/educational-institution/all');
};

export const createProgram = async (
  data: Omit<APIDetailProgramIICP, 'mentors'> & { mentors: string[] },
) => {
  try {
    return await backOfficeAPI.post('/manage-program', data);
  } catch (err) {
    console.error(err);
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
