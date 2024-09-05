import { APIExamChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import { backOfficeAPI } from '@/lib/axiosConfig';
import { fetchAxios } from '@/lib/fetchAxios';

// exam
export const getExam = async (examId: string | null) => {
  if (examId) {
    const response = await fetchAxios<{
      data: APIExamChapter;
    }>({
      url: `/v1/program-exam/${examId}`,
      method: 'GET',
    });
    console.log(response);
    return { data: response };
  }
  return null;
};

export const createExam = async (payload: APIExamChapter) => {
  const response = await fetchAxios<{
    data: APIExamChapter;
  }>({
    url: '/v1/program-exam',
    method: 'POST',
    formData: payload,
  });
  console.log('create', response);
  return { data: response };
};

export const updateExam = async ({
  examId,
  payload,
}: {
  examId: string;
  payload: APIExamChapter;
}) => {
  const response = await fetchAxios<{
      data: APIExamChapter;
  }>({
    url: `/v1/program-exam/${examId}`,
    method: 'PUT',
    formData: payload,
  });
  console.log(response);
  return { data: response };
};

export const deleteExam = async (examId: string) => {
  const response = await fetchAxios<{
    data: string;
  }>({
    url: `/v1/program-exam/${examId}`,
    method: 'DELETE',
  });
  console.log('delete', response);
  return { data: response };
};

export const reorderExam = async ({
  examId,
  questions,
}: {
  questions: string[];
  examId: string;
}) => {
  const response = await fetchAxios<{
    data: any;
  }>({
    url: `/v1/program-exam/reorder-exams/${examId}`,
    method: 'POST',
    formData: { questions },
  });
  console.log('Re Order Exam', response);
  return { data: response };
};
