import { axiosConfigBackoffice } from '@/lib/axiosConfig';
export const fetchModules = async () => {
  const response = await axiosConfigBackoffice.get('/modules');
  return response;
};
