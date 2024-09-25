import { useCallback } from 'react';
import { academicTitleAPI } from '../api/academicTitleApi';
import { FormData } from '../components/modal-form-title/modalForm.type';
import { APIResponseAcademicTitle } from '../academicTitle.type';

export const useAcademicTitleActions = () => {
  const handleAddAcademicTitle = useCallback(async (name: string) => {
    try {
      await academicTitleAPI.add(name);
    } catch (error) {
      console.error('Failed to add academic title');
    }
  }, []);

  const handleEditAcademicTitle = useCallback(async (id: string, data: string) => {
    try {
      await academicTitleAPI.update(id, data);
    } catch (error) {
      console.error('Failed to edit academic title');
    }
  }, []);

  const handleDeleteAcademicTitle = useCallback(async (id: string) => {
    try {
      await academicTitleAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete academic title');
    }
  }, []);

  return {
    handleAddAcademicTitle,
    handleEditAcademicTitle,
    handleDeleteAcademicTitle,
  };
};
