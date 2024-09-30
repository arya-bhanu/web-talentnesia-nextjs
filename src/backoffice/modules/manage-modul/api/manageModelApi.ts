import {
  APIContentChapter,
  APIExamChapter,
  APIResponseManageModul,
} from '../manageModul.type';
import { fetchAxios } from '@/lib/fetchAxios';
import { questions } from '../../school/components/course-sidebar/exam/exam.data';

// modul
export const fetchModules = async () => {
  const response = await fetchAxios<{
    data: {
      items: APIResponseManageModul[];
    };
    success: boolean;
    code: number;
    status: string;
    errors: unknown;
    messages: string;
  }>({
    url: '/v1/manage-module',
    method: 'GET',
  });
  return response.data.items;
};

export const fetchModule = async (id?: string | null) => {
  if (id) {
    const response = await fetchAxios<{ data: APIResponseManageModul }>({
      url: '/v1/manage-module/' + id,
      method: 'GET',
    });
    return response.data;
  }
  return null;
};

export const deleteModule = async (id: string) => {
  const response = await fetchAxios<{ success: boolean }>({
    url: '/v1/manage-module/' + id,
    method: 'DELETE',
  });
  return response;
};

export const createModul = async (
  data: Pick<APIResponseManageModul, 'active' | 'name'>,
) => {
  const response = await fetchAxios<{ data: APIResponseManageModul }>({
    url: '/v1/manage-module',
    method: 'POST',
    formData: data,
  });
  return response.data;
};

export const updateModul = async ({
  data,
  moduleId,
}: {
  data: Pick<APIResponseManageModul, 'active' | 'name'>;
  moduleId: string;
}) => {
  const response = await fetchAxios<{ data: APIResponseManageModul }>({
    url: `/v1/manage-module/${moduleId}`,
    method: 'PUT',
    formData: data,
  });
  return response.data;
};

// chapter
export const fetchChapter = async (chapterId?: string | null) => {
  if (chapterId) {
    const response = await fetchAxios({
      url: '/v1/chapter/' + chapterId,
      method: 'GET',
    });
    return response;
  }
  return null;
};

export const createChapter = async ({
  moduleId,
  title,
}: {
  moduleId: string;
  title: string;
}) => {
  const response = await fetchAxios({
    url: '/v1/chapter',
    method: 'POST',
    formData: { moduleId, title },
  });
  return response;
};

export const editChapter = async ({
  chapterId,
  title,
}: {
  chapterId: string;
  title: string;
}) => {
  const response = await fetchAxios({
    url: '/v1/chapter/' + chapterId,
    method: 'PUT',
    formData: { title },
  });
  return response;
};

export const deleteChapter = async (id: string) => {
  const response = await fetchAxios({
    url: '/v1/chapter/' + id,
    method: 'DELETE',
  });
  return response;
};

// content
export const fetchContent = async (id?: string) => {
  if (id) {
    const response = await fetchAxios({
      url: '/v1/content/' + id,
      method: 'GET',
    });
    return response;
  }
  return null;
};

export const createContent = async (
  payload: Omit<APIContentChapter, 'id' | 'order'>,
) => {
  const response = await fetchAxios({
    url: '/v1/content',
    method: 'POST',
    formData: payload,
  });
  return response;
};

export const editContent = async ({
  id,
  data,
}: {
  id?: string;
  data: Pick<APIContentChapter, 'title' | 'body' | 'type' | 'duration' | 'fileOrigin'>;
}) => {
  if (id) {
    const response = await fetchAxios({
      url: '/v1/content/' + id,
      method: 'PUT',
      formData: data,
    });
    return response;
  }
  return null;
};

export const deleteContent = async (id: string) => {
  const response = await fetchAxios({
    url: '/v1/content/' + id,
    method: 'DELETE',
  });
  return response;
};

// exam
export const createExam = async (
  data: Omit<APIExamChapter, 'id' | 'order'>,
) => {
  const response = await fetchAxios({
    url: '/v1/exam',
    method: 'POST',
    formData: data,
  });
  return response.data;
};

export const updateExam = async ({
  data,
  id,
}: {
  data: Omit<APIExamChapter, 'id' | 'order'>;
  id: string;
}) => {
  const response = await fetchAxios({
    method: 'PUT',
    url: `/v1/exam/${id}`,
    formData: data,
  });
  return response.data;
};

export const getExam = async (id: string | null | undefined) => {
  if (id) {
    const response = await fetchAxios({ method: 'GET', url: '/v1/exam/' + id });
    return response.data;
  }
  return null;
};

export const deleteExam = async (id: string) => {
  const response = await fetchAxios({
    method: 'DELETE',
    url: '/v1/exam/' + id,
  });
  return response.data;
};

// sorting request
export const examReorder = async ({
  examId,
  questions,
}: {
  questions: string[];
  examId: string;
}) => {
  const response = await fetchAxios({
    method: 'POST',
    url: '/v1/exam/reorder-exams/' + examId,
    formData: { questions },
  });
  return response.data;
};

export const contentsReorder = async ({
  contents,
  chapterId,
}: {
  contents: string[];
  chapterId: string;
}) => {
  const response = await fetchAxios({
    method: 'POST',
    url: '/v1/content/reorder-contents/' + chapterId,
    formData: { contents },
  });
  return response;
};

export const chapterReorder = async ({
  chapters,
  modulId,
}: {
  modulId: string;
  chapters: string[];
}) => {
  const response = await fetchAxios({
    method: 'POST',
    url: '/v1/chapter/reorder-chapters/' + modulId,
    formData: { chapters },
  });
  return response;
};
