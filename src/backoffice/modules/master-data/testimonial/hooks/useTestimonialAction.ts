import { useCallback } from 'react';
import { testimonialAPI } from '../api/testimonialApi';
import { TestimonialRequest } from '../testimonial.type';

type TestimonialActions = {
  handleDeleteTestimonial: (id: string) => Promise<void>;
  handleEditTestimonial: (id: string, data: TestimonialRequest) => Promise<void>;
  handleAddTestimonial: (data: TestimonialRequest) => Promise<void>;
};

export const useTestimonialActions = (): TestimonialActions => {
  const handleDeleteTestimonial = useCallback(async (id: string) => {
    try {
      await testimonialAPI.delete(id);
    } catch (error) {
      throw new Error('Unable to delete testimonial');
    }
  }, []);

  const handleEditTestimonial = useCallback(async (id: string, data: TestimonialRequest) => {
    try {
      await testimonialAPI.update(id, data);
    } catch (error) {
      throw new Error('Unable to edit testimonial');
    }
  }, []);  

  const handleAddTestimonial = useCallback(async (data: TestimonialRequest) => {
    try {
      await testimonialAPI.add(data);
    } catch (error) {
      throw new Error('Unable to add testimonial');
    }
  }, []);

  return {
    handleDeleteTestimonial,
    handleEditTestimonial,
    handleAddTestimonial,
  };
};
