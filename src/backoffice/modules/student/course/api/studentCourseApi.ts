import { APIResponseCourse } from '../studentCourse.type';
import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

const BASE_URL = `${process.env.API_SERVER_URL}`;

export const StudentCourseAPI = {
  fetch: async (): Promise<APIResponseCourse> => {
    const config: UseFetchProps = {
      url: `/v1/course`,
      method: 'GET',
    };
    return fetchAxios<APIResponseCourse>(config);
  },
};
