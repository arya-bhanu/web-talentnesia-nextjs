import {
  APIChapterModul,
  APIContentChapter,
  APIResponseManageModul,
} from '@/backoffice/modules/manage-modul/manageModul.type';
import { backOfficeAPI } from '@/lib/axiosConfig';
import { fetchAxios } from '@/lib/fetchAxios';
import { IFormCourse } from '../formCourse.type';
import { IListDraggable } from '@/backoffice/components/list-draggable/listDraggable.type';

// course
export const fetchChapterCourse = async (programId: string | null) => {
  if (programId) {
    const response = await fetchAxios<{
      data: IFormCourse;
    }>({
      url: `/v1/manage-program/course/${programId}`,
      method: 'GET',
    });
    return { data: response };
  }
  return null;
};

export const addCourseChapterDefault = async ({
  modulId,
  programId,
}: {
  modulId: string | null;
  programId: string | null;
}) => {
  if (modulId && programId) {
    const response = await fetchAxios<{
      data: {
        data: IFormCourse;
      };
    }>({
      url: '/v1/manage-program/save-module',
      method: 'POST',
      formData: { modulId, programId },
    });
    return { data: response };
  }
  return null;
};

export const fetchModule = async () => {
  const response = await fetchAxios<{
    data: APIResponseManageModul[];
  }>({
    url: '/v1/manage-module/all',
    method: 'GET',
  });
  return { data: response };
};

// content
export const fetchContent = async (contentId?: string | null) => {
  if (contentId) {
    const response = await fetchAxios<{
      data: {
        data: APIContentChapter;
      };
    }>({
      url: `/v1/program-content/${contentId}`,
      method: 'GET',
    });
    return { data: response };
  }
  return null;
};

export const createContent = async (
  payload: Omit<APIContentChapter, 'id' | 'order'>,
) => {
  const response = await fetchAxios<{
    data: {
      data: APIContentChapter;
    };
  }>({
    url: '/v1/program-content',
    method: 'POST',
    formData: payload,
  });
  return { data: response };
};

export const deleteContent = async (contentId: string) => {
  const response = await fetchAxios<{
    data: {
      data: string;
    };
  }>({
    url: `/v1/program-content/${contentId}`,
    method: 'DELETE',
  });
  return { data: response };
};

export const editContent = async ({
  contentId,
  payload,
}: {
  contentId: string;
  payload: APIContentChapter;
}) => {
  const response = await fetchAxios<{
    data: {
      data: APIContentChapter;
    };
  }>({
    url: `/v1/program-content/${contentId}`,
    method: 'PUT',
    formData: payload,
  });
  return { data: response };
};

export const reorderContent = async ({
  chapterId,
  contents,
}: {
  chapterId: string;
  contents: string[];
}) => {
  const response = await fetchAxios<{
    data: {
      data: IListDraggable;
    };
  }>({
    url: `/v1/program-content/reorder-contents/${chapterId}`,
    method: 'POST',
    formData: { contents },
  });
  return { data: response };
};

// exam
export const deleteExam = async (examId: string) => {
  const response = await fetchAxios<{
    data: {
      data: string;
    };
  }>({
    url: `/v1/program-exam/${examId}`,
    method: 'DELETE',
  });
  return { data: response };
};

export const reorderExam = async ({
  examId,
  questions,
}: {
  examId: string;
  questions: string[];
}) => {
  const response = await fetchAxios<{
      data: string;
  }>({
    url: `/v1/program-exam/reorder-exams/${examId}`,
    method: 'POST',
    formData: { questions },
  });
  return { data: response };
};

// chapter
export const fetchChapter = async (chapterId?: string | null) => {
  if (chapterId) {
    const response = await fetchAxios<{
      data: APIChapterModul;
    }>({
      url: `/v1/program-chapter/${chapterId}`,
      method: 'GET',
    });
    console.log(response);
    return {
      data: response.data,
    };
  }
  return null;
};

export const createChapter = async ({
  programId,
  title,
}: {
  programId: string;
  title: string;
}) => {
  const response = await fetchAxios<{
    data: APIChapterModul;
  }>({
    url: '/v1/program-chapter',
    method: 'POST',
    formData: { programId, title },
  });
  return { data: response.data };
};

export const editChapter = async ({
  chapterId,
  title,
}: {
  chapterId: string;
  title: string;
}) => {
  const response = await fetchAxios<{
      data: APIChapterModul;
  }>({
    url: `/v1/program-chapter/${chapterId}`,
    method: 'PUT',
    formData: { title },
  });
  console.log(response);
  return { data: response.data };
};

export const deleteChapter = async (id: string) => {
  const response = await fetchAxios<{
    data: string;
  }>({
    url: `/v1/program-chapter/${id}`,
    method: 'DELETE',
  });
  return { data: response.data };
};

export const reorderChapter = async ({
  chapters,
  programId,
}: {
  programId: string;
  chapters: string[];
}) => {
  const response = await fetchAxios<{
    data: APIChapterModul;
  }>({
    url: `/v1/program-chapter/reorder-chapters/${programId}`,
    method: 'POST',
    formData: { chapters },
  });
  return { data: response };
};

// schedule
export const updateSchedule = async ({
  contentId,
  payload,
}: {
  contentId: string;
  payload: {
    date: string;
    duration: string;
  };
}) => {
  return fetchAxios<{
    data: {
      date: string;
      duration: string;
    };
  }>({
    url: `/v1/program-content/update-schedule/${contentId}`,
    method: 'POST',
    formData: payload,
  });
};
