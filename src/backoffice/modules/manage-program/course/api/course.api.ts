import { fetchAxios } from '@/lib/fetchAxios';
import { CourseProgramItemApiResponse } from '../course.type';

export const fetchCourseProgram = async () => {
  try {
    const response = await fetchAxios<CourseProgramItemApiResponse>({
      url: '/v1/manage-program/table/course',
      method: 'GET',
    });
    console.log(response);
    return { data: response };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteCourseProgram = async (id: string) => {
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

