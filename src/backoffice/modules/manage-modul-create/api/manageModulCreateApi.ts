import { axiosConfigBackoffice } from '@/lib/axiosConfig';
import { ManageModulCreateObject } from '../manageModulCreate.type';

export const createModul = async (data: ManageModulCreateObject) => {
  const response = await axiosConfigBackoffice.post('/modul', data);
  return response;
};
