import { skripsiAxios } from '@/skripsi/config/axiosConfig';

// modul
export const fetchModules = async () => {
  const response = await skripsiAxios.get('/backoffice/modul');
  return response.data;
};

export const deleteModul = async (id: number) => {
  return await skripsiAxios.delete(`/backoffice/modul/${id}`);
};

export const startTesting = async () => {
  const response = await skripsiAxios.post('/backoffice/modul/test');
  return response.data;
};
