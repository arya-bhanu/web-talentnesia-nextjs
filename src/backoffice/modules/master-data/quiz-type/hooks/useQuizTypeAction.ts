import { useCallback } from 'react';
import { quizTypeAPI } from '../api/quizTypeApi';
import { APIResponseQuizType } from '../quizType.type';

interface QuizTypeFormData {
  quizType: string;
}
export const useQuizTypeActions = () => {
  const handleAddQuizType = useCallback(async (name: string) => {
    try {
      quizTypeAPI.add({ name });
    } catch (error) {
      console.error('Failed to Add Quiz Type');
    }
  }, []);

  const handleEditQuizType = useCallback(async (id: string, data: APIResponseQuizType) => {
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
