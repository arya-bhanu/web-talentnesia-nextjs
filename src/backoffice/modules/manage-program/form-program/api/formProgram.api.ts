import { backOfficeAPI } from '@/lib/axiosConfig';

export const fetchSchoolStudents = async ({
  programId,
  schoolId,
}: {
  programId: string | null;
  schoolId: string | null;
}) => {
  try {
    if (programId && schoolId) {
      return await backOfficeAPI.get(
        `/program-student/browse-all/${programId}/${schoolId}`,
      );
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};
