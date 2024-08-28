import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
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

// content

export const createContent = async (
  payload: Omit<APIContentChapter, 'id' | 'order'>,
) => {
  const response = await backOfficeAPI.post('/program-content', payload);
  return response.data;
};


// chapter
export const createChapter = async ({
  programId,
  title,
}: {
  programId: string;
  title: string;
}) => {
  const response = await backOfficeAPI.post('/program-chapter', {
    programId,
    title,
  });
  return response.data;
};

export const editChapter = async ({
  chapterId,
  title,
}: {
  chapterId: string;
  title: string;
}) => {
  const response = await backOfficeAPI.put('/program-chapter/' + chapterId, { title });
  return response.data;
};

export const fetchChapter = async (chapterId?: string | null) => {
  if (chapterId) {
    const response = await backOfficeAPI.get('/program-chapter/' + chapterId);
    return response.data;
  }
  return null;
};