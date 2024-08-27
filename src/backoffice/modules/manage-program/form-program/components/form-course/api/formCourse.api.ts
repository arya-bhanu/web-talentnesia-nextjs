import { backOfficeAPI } from '@/lib/axiosConfig';

export const fetchCourseData = ({
  modulId,
  programId,
}: {
  modulId: string | null;
  programId: string | null;
}) => {
  try {
    if (modulId && programId) {
      return backOfficeAPI.post('/manage-program/save-module', {
        modulId,
        programId,
      });
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export const fetchModule = () => {
  try {
    return backOfficeAPI.get('/manage-module/all');
  } catch (err) {
    console.error(err);
  }
};
