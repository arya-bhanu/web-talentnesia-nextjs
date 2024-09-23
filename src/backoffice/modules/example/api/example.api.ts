import { fetchAxios } from '@/lib/fetchAxios';

interface ExampleResponse {
  data: Example[];
  total: number;
}

interface SingleExampleResponse {
  data: Example;
}

interface Example {
  id: string;
  code: string;
  name: string;
  active: number;
  createdBy: string;
}

export const exampleAPI = {
  fetch: async () => {
    const response = await fetchAxios<ExampleResponse>({
      url: `/v1/example`,
      method: 'GET',
    });
    return response;
  },

  getById: async (id: string) => {
    return fetchAxios<SingleExampleResponse>({
      url: `/v1/example/${id}`,
      method: 'GET',
    });
  },

  add: async (data: { name: string; active: number; createdBy: string }) => {
    return fetchAxios<SingleExampleResponse>({
      url: `/v1/example`,
      method: 'POST',
      formData: data,
    });
  },

  update: async (id: string, data: { name: string; active: number }) => {
    return fetchAxios<SingleExampleResponse>({
      url: `/v1/example/${id}`,
      method: 'PUT',
      formData: data,
    });
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/example/${id}`,
      method: 'DELETE',
    });
  },
};
