import { useCallback } from 'react';
import { faqAPI } from '../api/faqApi';

export const useFaqActions = () => {
  const handleAddFaq = useCallback(async (question: string, answer: string) => {
    const result = await faqAPI.add({ question, answer, active: 1 });
    return result.data;
  }, []);

  const handleEditFaq = useCallback(async (id: string, question: string, answer: string) => {
    const result = await faqAPI.update(id, { question, answer, active: 1 });
    return result;
  }, []);

  const handleDeleteFaq = useCallback(async (id: string) => {
    return await faqAPI.delete(id);
  }, []);

  return {
    handleAddFaq,
    handleEditFaq,
    handleDeleteFaq,
  };
};
