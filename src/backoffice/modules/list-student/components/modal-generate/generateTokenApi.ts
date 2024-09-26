import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

const BASE_URL = '/v1/invite-token';

export const InviteTokenAPI = {
  generate: async (institutionId: string): Promise<{ registrationUrl: string }> => {
    const config: UseFetchProps = {
      url: `${BASE_URL}/generate`,
      method: 'POST',
      formData: {
        institutionId: institutionId,
      },
    };
    return fetchAxios<{ data: { registrationUrl: string } }>(config)
      .then(response => response.data);
  },
};



