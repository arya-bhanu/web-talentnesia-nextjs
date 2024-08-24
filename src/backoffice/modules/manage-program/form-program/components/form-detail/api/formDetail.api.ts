import { backOfficeAPI } from '@/lib/axiosConfig';

export const fetchMentors = async () => {
  return await backOfficeAPI.get('/manage-user/mentor');
};
