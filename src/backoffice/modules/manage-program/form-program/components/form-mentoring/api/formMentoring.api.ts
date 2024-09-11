import { IMentoring } from '../formMentoring.type';
import { fetchAxios } from '@/lib/fetchAxios';

// mentor
export const fetchMentors = async () => {
  const response = await fetchAxios({
    url: '/v1/manage-user/3/table',
    method: 'GET',
  });
  return { data: response };
};

// mentoring
export const createMentoring = async (payload: IMentoring) => {
  if (payload.chapterId) {
    const response = await fetchAxios({
      url: '/v1/mentoring',
      method: 'POST',
      formData: payload,
    });
    return { data: response };
  }
};

export const fetchOneMentoring = async (mentoringId: string | null) => {
  if (mentoringId) {
    const response = await fetchAxios({
      url: `/v1/mentoring/${mentoringId}`,
      method: 'GET',
    });
    return { data: response };
  }
  return null;
};

export const fetchMentoring = async (chapterId: string) => {
  if (chapterId) {
    const response = await fetchAxios({
      url: `/v1/mentoring/add-mentoring/${chapterId}`,
      method: 'GET',
    });
    return { data: response };
  }
  return null;
};

export const deleteMentoring = async (mentoringId: string) => {
  if (mentoringId) {
    const response = await fetchAxios({
      url: `/v1/mentoring/${mentoringId}`,
      method: 'DELETE',
    });
    return { data: response };
  }
  return null;
};

export const editMentoring = async ({
  mentoringId,
  payload,
}: {
  mentoringId: string;
  payload: IMentoring;
}) => {
  if (mentoringId) {
    const response = await fetchAxios({
      url: `/v1/mentoring/${mentoringId}`,
      method: 'PUT',
      formData: payload,
    });
    return { data: response };
  }
  return null;
};
