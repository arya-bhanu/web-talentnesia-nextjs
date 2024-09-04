import { fetchAxios } from '@/lib/fetchAxios';
import { IAPIStudentProgram } from '../components/table-students/tableStudents.type';

export const fetchSchoolStudents = async ({
  programId,
  schoolId,
}: {
  programId: string | null;
  schoolId: string | null;
}) => {
  if (programId && schoolId) {
    const response = await fetchAxios<{
      data: {
        items: IAPIStudentProgram[];
      };
    }>({
      url: `/v1/program-student/browse-all/${programId}/${schoolId}`,
      method: 'GET',
    });
    return { data: response };
  }
  return null;
};

