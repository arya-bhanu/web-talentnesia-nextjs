import { axiosConfigBackoffice } from '@/lib/axiosConfig';
import { ModuleObject } from '../components/form/formManageModul.type';

export const fetchModules = async () => {
  const response = await axiosConfigBackoffice.get('/modules');
  return response;
};

export const fetchModule = async (id?: number) => {
  if (id) {
    const response = await axiosConfigBackoffice.get('/module/' + id);
    return response;
  }
  return null;
};

export const deleteModule = async (id: number) => {
  const response = await axiosConfigBackoffice.delete('/modul/' + id);
  return response;
};

export const createModul = async (data: ModuleObject) => {
  const response = await axiosConfigBackoffice.post('/modul', data);
  return response;
};

export const updateModul = async ({
  data,
  id,
}: {
  data: ModuleObject;
  id: number;
}) => {
  const response = await axiosConfigBackoffice.put(`/modul/${id}`, data);
  return response;
};
