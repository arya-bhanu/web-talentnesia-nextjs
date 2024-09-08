import { fetchAxios } from '@/lib/fetchAxios';
import { IICPProgramItemApiResponse } from '../iicp.type';

export const fetchIICPProgram = async () => {
  try {
    const response = await fetchAxios<IICPProgramItemApiResponse>({
      url: '/v1/manage-program/table/iicp',
      method: 'GET',
    });
    return { data: response };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteIICPProgram = async (id: string) => {
  const response = await fetchAxios<{
    data: {
      data: string;
    };
  }>({
    url: `/v1/manage-program/${id}`,
    method: 'DELETE',
  });
  return { data: response };
};

