import { useCallback } from 'react';
import { academicLevelAPI } from '../api/academicLevelApi';

export const useAcademicLevelActions = () => {
  const handleAddAcademicLevel = useCallback(async (code: string, name: string) => {
    try {
      await academicLevelAPI.add({ code, name });
    } catch (error) {
      console.error('Failed to add academic level', error);
    }
  }, []);

  const handleEditAcademicLevel = useCallback(async (id: string, data: any) => {
    try {
      await academicLevelAPI.update(id, data);
    } catch (error) {
      console.error('Failed to edit academic level', error);
    }
  }, []);

  const handleDeleteAcademicLevel = useCallback(async (id: string) => {
    try {
      await academicLevelAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete academic level', error);
    }
  }, []);

  return {
    handleAddAcademicLevel,
    handleEditAcademicLevel,
    handleDeleteAcademicLevel,
  };
};
