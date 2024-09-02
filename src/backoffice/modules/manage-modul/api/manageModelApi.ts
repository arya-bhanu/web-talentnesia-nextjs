import { backOfficeAPI } from '@/lib/axiosConfig';
import {
  APIContentChapter,
  APIExamChapter,
  APIResponseManageModul,
} from '../manageModul.type';
import { fetchAxios } from '@/lib/fetchAxios';
import { questions } from '../../school/components/course-sidebar/exam/exam.data';

// modul
export const fetchModules = async () => {
  const response = await backOfficeAPI.get('/v1/manage-module');
  return response.data;
};

export const fetchModule = async (id?: string | null) => {
  if (id) {
    const response = await backOfficeAPI.get('/v1/manage-module/' + id);
    return response.data;
  }
  return null;
};

export const deleteModule = async (id: string) => {
  const response = await backOfficeAPI.delete('/v1/manage-module/' + id);
  return response.data;
};

export const createModul = async (
  data: Pick<APIResponseManageModul, 'active' | 'name'>,
) => {
  const response = await backOfficeAPI.post('/v1/manage-module', data);
  return response.data;
};

export const updateModul = async ({
  data,
  moduleId,
}: {
  data: Pick<APIResponseManageModul, 'active' | 'name'>;
  moduleId: string;
}) => {
  const response = await backOfficeAPI.put(
    `/v1/manage-module/${moduleId}`,
    data,
  );
  return response.data;
};

// chapter
export const fetchChapter = async (chapterId?: string | null) => {
  if (chapterId) {
    const response = await backOfficeAPI.get('/v1/chapter/' + chapterId);
    return response.data;
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
  const response = await backOfficeAPI.post('/v1/chapter', { moduleId, title });
  return response.data;
};

export const editChapter = async ({
  chapterId,
  title,
}: {
  chapterId: string;
  title: string;
}) => {
  const response = await backOfficeAPI.put('/v1/chapter/' + chapterId, {
    title,
  });
  return response.data;
};

export const deleteChapter = async (id: string) => {
  const response = await backOfficeAPI.delete('/v1/chapter/' + id);
  return response.data;
};

// content
export const fetchContent = async (id?: string) => {
  if (id) {
    const response = await backOfficeAPI.get('/v1/content/' + id);
    return response.data;
  }
  return null;
};
export const createContent = async (
  payload: Omit<APIContentChapter, 'id' | 'order'>,
) => {
  const response = await backOfficeAPI.post('/v1/content', payload);
  return response.data;
};
export const editContent = async ({
  id,
  data,
}: {
  id?: string;
  data: Pick<APIContentChapter, 'title' | 'body' | 'type' | 'duration'>;
}) => {
  if (id) {
    const response = await backOfficeAPI.put('/v1/content/' + id, data);
    return response.data;
  }
  return null;
};
export const deleteContent = async (id: string) => {
  const response = await backOfficeAPI.delete('/v1/content/' + id);
  return response.data;
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
  const response = await backOfficeAPI.post(
    '/v1/content/reorder-contents/' + chapterId,
    {
      contents,
    },
  );
  return response.data;
};
export const chapterReorder = async ({
  chapters,
  modulId,
}: {
  modulId: string;
  chapters: string[];
}) => {
  const response = await backOfficeAPI.post(
    '/v1/chapter/reorder-chapters/' + modulId,
    {
      chapters,
    },
  );
  return response.data;
};
