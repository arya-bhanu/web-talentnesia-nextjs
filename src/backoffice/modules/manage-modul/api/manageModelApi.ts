import { backOfficeAPI } from '@/lib/axiosConfig';
import { APIResponseManageModul } from '../manageModul.type';

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
  id,
}: {
  data: Pick<APIResponseManageModul, 'active' | 'name'>;
  id: string;
}) => {
  const response = await backOfficeAPI.put(`/modul/${id}`, data);
  return response.data;
};

// chapter
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
