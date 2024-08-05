import { backOfficeAPI } from '@/lib/axiosConfig';
import { ModuleObject } from '../components/form/formManageModul.type';

export const fetchModules = async () => {
  const response = await backOfficeAPI.get('/modules');
  return response;
};

export const fetchModule = async (id?: number) => {
  if (id) {
    const response = await backOfficeAPI.get('/module/' + id);
    return response;
  }
  return null;
};

export const deleteModule = async (id: number) => {
  const response = await backOfficeAPI.delete('/modul/' + id);
  return response;
};

export const createModul = async (data: ModuleObject) => {
  const response = await backOfficeAPI.post('/modul', data);
  return response;
};

export const updateModul = async ({
  data,
  id,
}: {
  data: ModuleObject;
  id: number;
}) => {
  const response = await backOfficeAPI.put(`/modul/${id}`, data);
  return response;
};
