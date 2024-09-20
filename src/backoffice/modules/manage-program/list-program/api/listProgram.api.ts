import { fetchAxios } from '@/lib/fetchAxios';

export const fetchIicpListProgram = async (page: number = 1) => {
  try {
    const response = await fetchAxios({
      url: `/v1/manage-program/table/iicp?page=${page}`,
      method: 'GET',
    });
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
