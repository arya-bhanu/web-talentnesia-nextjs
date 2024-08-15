import { backOfficeAPI } from '@/lib/axiosConfig';
import { APIContentChapter, APIResponseManageModul } from '../manageModul.type';

// modul
export const fetchModules = async () => {
  const response = await backOfficeAPI.get('/modul');
  return response.data;
};

export const fetchModule = async (id?: string) => {
  if (id) {
    const response = await backOfficeAPI.get('/modul/' + id);
    return response.data;
  }
  return null;
};

export const deleteModule = async (id: string) => {
  const response = await backOfficeAPI.delete('/modul/' + id);
  return response.data;
};

export const createModul = async (
  data: Pick<APIResponseManageModul, 'active' | 'name'>,
) => {
  const response = await backOfficeAPI.post('/modul', data);
  return response.data;
};

export const updateModul = async ({
  data,
  moduleId,
}: {
  data: Pick<APIResponseManageModul, 'active' | 'name'>;
  moduleId: string;
}) => {
  const response = await backOfficeAPI.put(`/modul/${moduleId}`, data);
  return response.data;
};

// chapter
export const fetchChapter = async (chapterId?: string | null) => {
  if (chapterId) {
    const response = await backOfficeAPI.get('/chapter/' + chapterId);
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
  const response = await backOfficeAPI.post('/chapter', { moduleId, title });
  return response.data;
};
export const editChapter = async ({
  chapterId,
  title,
}: {
  chapterId: string;
  title: string;
}) => {
  const response = await backOfficeAPI.put('/chapter/' + chapterId, { title });
  return response.data;
};
export const deleteChapter = async (id: string) => {
  const response = await backOfficeAPI.delete('/chapter/' + id);
  return response.data;
};

// content
export const fetchContent = async (id?: string) => {
  const response = await backOfficeAPI.get('/content/' + id);
  return response.data;
};
export const createContent = async (
  payload: Omit<APIContentChapter, 'id' | 'order'>,
) => {
  const response = await backOfficeAPI.post('/content', payload);
  return response.data;
};
export const editContent = async (id?: string) => {
  if (id) {
    const response = await backOfficeAPI.get('/content/' + id);
    return response.data;
  }
  return null;
};
export const deleteContent = async (id: string) => {
  const response = await backOfficeAPI.delete('/content/' + id);
  return response.data;
};
