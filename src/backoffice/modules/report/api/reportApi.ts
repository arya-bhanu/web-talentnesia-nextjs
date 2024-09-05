import { fetchAxios } from '@/lib/fetchAxios';

export const fetchReportPrograms = async () => {
  return await fetchAxios({
    url: '/v1/report/program-progress',
    method: 'GET',
  });
};

export const fetchDetailProgram = async (programId: string | null) => {
  if (programId) {
    return await fetchAxios({
      url: `/v1/report/program-progress/${programId}`,
      method: 'GET',
    });
  }
  return null;
};
