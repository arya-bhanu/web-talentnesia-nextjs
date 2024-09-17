import { fetchAxios } from '@/lib/fetchAxios';
import { TestimonialRequest, SingleTestimonialResponse, TestimonialResponse } from '../testimonial.type';

export const testimonialAPI = {
  fetch: async () => {
    return fetchAxios<TestimonialResponse>({
      url: `/v1/testimonial`,
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return fetchAxios<SingleTestimonialResponse>({
      url: `/v1/testimonial/${id}`,
      method: 'GET',
    });
  },

  add: async (data: { code: string; name: string; description: string; active: number; }) => {
    const requestData = { ...data };
    const response = await fetchAxios({
      url: '/v1/testimonial/',
      method: 'POST',
      formData: requestData,
    });
    console.log(response)
    return { data: response }
  },

  update: async (id: string, data: TestimonialRequest) => {
    return fetchAxios<SingleTestimonialResponse>({
      url: `/v1/testimonial/${id}`,
      method: 'PUT',
      formData: data,
    });
  },  

  delete: async (id: string) => {
    return fetchAxios<{ success: boolean }>({
      url: `/v1/testimonial/${id}`,
      method: 'DELETE',
    });
  },
};
