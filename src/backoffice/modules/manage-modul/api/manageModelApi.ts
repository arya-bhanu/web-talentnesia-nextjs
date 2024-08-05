import { axiosConfigBackoffice } from '@/lib/axiosConfig';
export const fetchModules = async () => {
  const response = await axiosConfigBackoffice.get('/modules');
  return response;
};

export const deleteModule = async (id: number) => {
  const response = await axiosConfigBackoffice.delete('/modul/' + id);
  return response;
};
