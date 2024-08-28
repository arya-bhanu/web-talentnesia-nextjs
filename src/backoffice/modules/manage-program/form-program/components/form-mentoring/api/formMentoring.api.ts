import { backOfficeAPI } from '@/lib/axiosConfig';
import { IMentoring } from '../formMentoring.type';

export const fetchMentors = async () => {
  try {
    return await backOfficeAPI.get('/manage-user/3/table');
  } catch (err) {
    console.error(err);
  }
};

export const createMentoring = async (payload: IMentoring) => {
  try {
    if (payload.chapterId) {
      return await backOfficeAPI.post('/mentoring', payload);
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchMentoring = async (chapterId: string) => {
  try {
    if (chapterId) {
      return await backOfficeAPI.get('/mentoring/' + chapterId);
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};
