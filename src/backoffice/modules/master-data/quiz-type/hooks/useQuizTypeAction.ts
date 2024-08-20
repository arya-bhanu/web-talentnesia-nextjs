import { useCallback } from 'react';
import { quizTypeAPI } from '../api/quizTypeApi';

export const useQuizTypeActions = () => {
  const handleAddQuizType = useCallback(async (name: string) => {
    try {
      quizTypeAPI.add({ name });
    } catch (error) {
      console.error('Failed to Add Quiz Type');
    }
  }, []);

  const handleEditQuizType = useCallback(async (id: string, data: any) => {
    try {
      quizTypeAPI.update(id, data);
    } catch (error) {
      console.error('Failed to Update Quiz Type');
    }
  }, []);

  const handleDeleteQuizType = useCallback(async (id: string) => {
    try {
      quizTypeAPI.delete(id);
    } catch (error) {
      console.error('Failed to Delete Quiz Type');
    }
  }, []);

  return {
    handleAddQuizType,
    handleEditQuizType,
    handleDeleteQuizType,
  };
};
