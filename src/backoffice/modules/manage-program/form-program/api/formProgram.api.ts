import { APIExamChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
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

// exam
export const createExam = async (payload: APIExamChapter) => {
  try {
    return await backOfficeAPI.post('/program-exam', payload);
  } catch (err) {
    console.error(err);
  }
};

export const getExam = async (examId: string | null) => {
  try {
    if (examId) {
      return await backOfficeAPI.get('/program-exam/' + examId);
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export const updateExam = async ({
  examId,
  payload,
}: {
  examId: string;
  payload: APIExamChapter;
}) => {
  try {
    if (examId) {
      return await backOfficeAPI.put('/program-exam/' + examId, payload);
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};
