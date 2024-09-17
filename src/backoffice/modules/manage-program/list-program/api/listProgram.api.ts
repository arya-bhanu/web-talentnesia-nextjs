import { fetchAxios } from '@/lib/fetchAxios';

export const fetchIicpListProgram = async () => {
  try {
    const response = await fetchAxios({
      url: '/v1/manage-program/table/iicp',
      method: 'GET',
    });
    console.log(response)
    return { data: response };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
