import { skripsiAxios } from '@/skripsi/config/axiosConfig';

// modul
export const fetchModules = async () => {
  const response = await skripsiAxios.get('/backoffice/modul');
  return response.data;
};
