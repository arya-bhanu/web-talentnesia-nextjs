import { APIContentChapter } from '@/backoffice/modules/manage-modul/manageModul.type';
import { backOfficeAPI } from '@/lib/axiosConfig';

// course
export const fetchChapterCourse = async (programId: string | null) => {
  try {
    if (programId) {
      return backOfficeAPI.get(`/manage-program/course/${programId}`);
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export const addCourseChapterDefault = async ({
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

export const fetchModule = async () => {
  try {
    return backOfficeAPI.get('/manage-module/all');
  } catch (err) {
    console.error(err);
  }
};

// content
export const fetchContent = async (contentId?: string | null) => {
  try {
    if (contentId) {
      const response = await backOfficeAPI.get('/program-content/' + contentId);
      return response;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export const createContent = async (
  payload: Omit<APIContentChapter, 'id' | 'order'>,
) => {
  const response = await backOfficeAPI.post('/program-content', payload);
  return response.data;
};

export const deleteContent = async (contentId: string) => {
  try {
    const response = await backOfficeAPI.delete(
      '/program-content/' + contentId,
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const editContent = async ({
  contentId,
  payload,
}: {
  contentId: string;
  payload: APIContentChapter;
}) => {
  try {
    const response = await backOfficeAPI.put(
      '/program-content/' + contentId,
      payload,
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

// exam
export const deleteExam = async (examId: string) => {
  try {
    const response = await backOfficeAPI.delete('/program-exam/' + examId);
    return response;
  } catch (err) {
    console.error(err);
  }
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
  const response = await backOfficeAPI.put('/program-chapter/' + chapterId, {
    title,
  });
  return response.data;
};

export const fetchChapter = async (chapterId?: string | null) => {
  if (chapterId) {
    const response = await backOfficeAPI.get('/program-chapter/' + chapterId);
    return response.data;
  }
  return null;
};

export const deleteChapter = async (id: string) => {
  const response = await backOfficeAPI.delete('/program-chapter/' + id);
  return response.data;
};

export const reorderChapter = async ({
  chapters,
  programId,
}: {
  programId: string;
  chapters: string[];
}) => {
  try {
    const response = await backOfficeAPI.post(
      '/program-chapter/reorder-chapters/' + programId,
      { chapters },
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

// schedule
export const updateSchedule = async ({
  contentId,
  payload,
}: {
  contentId: string;
  payload: {
    date: string;
    duration: string;
  };
}) => {
  try {
    const response = await backOfficeAPI.post(
      '/program-content/update-schedule/' + contentId,
      payload,
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};
