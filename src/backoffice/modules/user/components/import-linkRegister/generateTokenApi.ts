import { fetchAxios, UseFetchProps } from '@/lib/fetchAxios';

const BASE_URL = '/v1/invite-token';

export const InviteTokenAPI = {
  generate: async (selectedInstitutionId: string): Promise<{ url: string }> => {
    const config: UseFetchProps = {
      url: `${BASE_URL}/generate`,
      method: 'POST',
      formData: {
        institutionId: selectedInstitutionId,
      },
    };
    return fetchAxios<{ data: { url: string } }>(config)
      .then(response => response.data);
  },
};
