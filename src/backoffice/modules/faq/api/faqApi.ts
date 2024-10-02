import { fetchAxios } from '@/lib/fetchAxios';
import { APIResponseFAQ } from '../faq.type';

export const faqAPI = {
  fetch: async () => {
    return fetchAxios<{ data: { items: APIResponseFAQ[] } }>({
      url: `/v1/faq`,
      method: 'GET',
    }).then((response) => response.data.items);
  },
  getById: async (id: string) => {
    return fetchAxios<{ data: APIResponseFAQ }>({
      url: `/v1/faq/${id}`,
      method: 'GET',
    }).then((response) => response.data);
  },

  add: async (data: { question: string; answer: string; active: number }) => {
    const cleanedData = {
      ...data,
      answer: data.answer.replace(/<\/?[^>]+(>|$)/g, ""),
    };
    return fetchAxios<{ data: APIResponseFAQ; message: string }>({
      url: `/v1/faq`,
      method: 'POST',
      formData: cleanedData,
    });
  },

  update: async (id: string, data: { question: string; answer: string; active: number }) => {
    const cleanedData = {
      ...data,
      answer: data.answer.replace(/<\/?[^>]+(>|$)/g, ""),
    };
    return fetchAxios<{ data: APIResponseFAQ }>({
      url: `/v1/faq/${id}`,
      method: 'PUT',
      formData: cleanedData,
    }).then((response) => response.data);
  },

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/faq/${id}`,
      method: 'DELETE',
    }).then((response) => response.success);
  },
};
