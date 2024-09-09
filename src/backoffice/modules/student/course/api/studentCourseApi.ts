import { APIResponseCourseDetail } from '../../course-detail/courseDetail.type';
import { APIResponseCourse } from '../studentCourse.type';
import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

export const StudentCourseAPI = {
  fetch: async (): Promise<APIResponseCourse> => {
    const config: UseFetchProps = {
      url: `/v1/student-course`,
      method: 'GET',
    };
    return fetchAxios<APIResponseCourse>(config);
  },
  fetchDetail: async (courseId: string): Promise<APIResponseCourseDetail> => {
    const config: UseFetchProps = {
      url: `/v1/student-course/${courseId}`,
      method: 'GET',
    };
    return fetchAxios<APIResponseCourseDetail>(config);
  },

  checkAndNext: async (contentId: string): Promise<APIResponseCourseDetail> => {
    const config: UseFetchProps = {
      url: `/v1/student-course/mark/${contentId}`,
      method: 'GET',
    };
    return fetchAxios<APIResponseCourseDetail>(config);
  },
};
