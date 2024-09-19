import { useCallback } from 'react';
import { academicLevelAPI } from '../api/academicLevelApi';

export const useAcademicLevelActions = () => {
  const handleAddAcademicLevel = useCallback(async (name: string) => {
    try {
      await academicLevelAPI.add(name);
    } catch (error) {
      console.error('Failed to add academic level');
    }
  }, []);

  const handleEditAcademicLevel = useCallback(async (id: string, data: { name: string }) => {
    try {
      await academicLevelAPI.update(id, data.name);
    } catch (error) {
      console.error('Failed to edit academic level', error);
    }
  }, []);

  const handleDeleteAcademicLevel = useCallback(async (id: string) => {
    try {
      await academicLevelAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete academic level');
    }
  }, []);

  return {
    handleAddAcademicLevel,
    handleEditAcademicLevel,
    handleDeleteAcademicLevel,
  };
};