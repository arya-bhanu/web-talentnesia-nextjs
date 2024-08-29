import { useCallback } from 'react';
import { SchoolAPI } from '../api/schoolApi';

export const useSchoolActions = () => {
  const handleDeleteSchool = useCallback(async (id: string) => {
    try {
      await SchoolAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete school');
    }
  }, []);

  return {
    handleDeleteSchool,
  };
};
