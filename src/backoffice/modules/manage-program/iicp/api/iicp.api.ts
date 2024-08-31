import { backOfficeAPI } from '@/lib/axiosConfig';

export const fetchIICPProgram = async () => {
  try {
    return await backOfficeAPI.get('/manage-program/table/iicp');
  } catch (err) {
    console.error(err);
  }
};
