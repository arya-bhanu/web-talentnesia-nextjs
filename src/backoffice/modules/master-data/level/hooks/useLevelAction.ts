import { useCallback } from 'react';
import { levelAPI } from '../api/levelApi';

export const useLevelActions = () => {
  const handleAddLevel = useCallback(async (name: string) => {
    try {
      await levelAPI.add({
        name,
        code: '',
        active: 0,
      });
    } catch (error) {
      console.error('Failed to add level:', error);
      throw error;
    }
  }, []);

  const handleEditLevel = useCallback(async (id: string, data: any) => {
    try {
      await levelAPI.update(id, data);
    } catch (error) {
      console.error('Failed to update level:', error);
      throw error;
    }
  }, []);

  const handleDeleteLevel = useCallback(async (id: string) => {
    try {
      await levelAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete level:', error);
      throw error;
    }
  }, []);

  return {
    handleAddLevel,
    handleEditLevel,
    handleDeleteLevel,
  };
};