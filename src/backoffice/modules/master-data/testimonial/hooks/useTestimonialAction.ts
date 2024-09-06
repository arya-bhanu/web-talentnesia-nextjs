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
      console.error('Failed to delete testimonial', error);
      throw new Error('Unable to delete testimonial');
    }
  }, []);

  const handleEditTestimonial = useCallback(async (id: string, data: TestimonialRequest) => {
    try {
      console.log('Editing testimonial with ID:', id, 'and data:', data);
      await testimonialAPI.update(id, data);
    } catch (error) {
      console.error('Failed to edit testimonial', error);
      throw new Error('Unable to edit testimonial');
    }
  }, []);  

  const handleAddTestimonial = useCallback(async (data: TestimonialRequest) => {
    try {
      await testimonialAPI.add(data);
    } catch (error) {
      console.error('Failed to add testimonial', error);
      throw new Error('Unable to add testimonial');
    }
  }, []);

  return {
    handleDeleteTestimonial,
    handleEditTestimonial,
    handleAddTestimonial,
  };
};
