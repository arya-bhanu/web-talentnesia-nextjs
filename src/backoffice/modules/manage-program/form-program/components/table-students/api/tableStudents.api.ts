import { backOfficeAPI } from '@/lib/axiosConfig';

export const fetchStudentsJoined = async (programId: string | null) => {
  try {
    if (programId) {
      return await backOfficeAPI.get('/program-student/table/' + programId);
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};
