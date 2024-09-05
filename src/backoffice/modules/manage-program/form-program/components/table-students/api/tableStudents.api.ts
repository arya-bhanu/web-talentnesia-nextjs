import { backOfficeAPI } from '@/lib/axiosConfig';
import { fetchAxios } from '@/lib/fetchAxios';
import { IAPIStudentProgram } from '../tableStudents.type';

export const fetchStudentsJoined = async (programId: string | null) => {
  if (programId) {
    const response = await fetchAxios<{
        data: {
          items: IAPIStudentProgram[];
        }
    }>({
      url: `/v1/program-student/table/${programId}`,
      method: 'GET',
    });
    return {data: response};
  }
  return null;
};

export const createStudentJoin = async ({
  programId,
  users,
}: {
  programId?: string;
  users: string[];
}) => {
  if (programId) {
    const response = await fetchAxios<{
        data: IAPIStudentProgram; 
    }>({
      url: '/v1/program-student/save-student',
      method: 'POST',
      formData: { programId, users },
    });
    return { data: response };
  }
  return null;
};
