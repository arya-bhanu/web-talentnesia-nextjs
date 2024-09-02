import { useCallback } from 'react';
import { levelAPI } from '../api/levelApi';

export const useLevelActions = () => {
  const handleAddLevel = useCallback(async (name: string) => {
    try {
      await levelAPI.add({
        name,
        code: '',
        status: 0,
      });
    } catch (error) {
      console.error('Failed to add category');
    }
  }, []);

  const handleEditLevel = useCallback(async (id: string, data: any) => {
    try {
       levelAPI.update(id, data);
    } catch (error) {
      console.error('Failed to  level');
    }
  }, []);

  const handleDeleteLevel = useCallback(async (id: string) => {
    try {
       levelAPI.delete(id);
    } catch (error) {
      console.error('Failed to  level');
    }
  }, []);

  return {
    handleAddLevel,
    handleEditLevel,
    handleDeleteLevel,
  };
};
