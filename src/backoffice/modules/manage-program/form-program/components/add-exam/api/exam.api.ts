import { APIExamChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import { backOfficeAPI } from '@/lib/axiosConfig';

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

export const deleteExam = async (examId: string) => {
  try {
    if (examId) {
      return await backOfficeAPI.delete('/program-exam/' + examId);
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export const reorderExam = async ({
  examId,
  questions,
}: {
  questions: string[];
  examId: string;
}) => {
  try {
    if (examId) {
      return await backOfficeAPI.post('/program-exam/reorder-exams/' + examId, {
        questions,
      });
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};
