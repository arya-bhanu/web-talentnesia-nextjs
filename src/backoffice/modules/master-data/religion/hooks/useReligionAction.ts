import { useCallback } from 'react';
import { religionAPI } from '../api/religionApi';

export const useReligionActions = () => {
  const handleAddReligion = useCallback(async (name: string) => {
    try {
       religionAPI.add(name);
    } catch (error) {
      console.error('Failed to  religion');
    }
  }, []);

  const handleEditReligion = useCallback(async (id: string, data: { name: string }) => {
    try {
      await religionAPI.update(id, data.name); 
    } catch (error) {
      console.error('Failed to update religion');
    }
  }, []);

  const handleDeleteReligion = useCallback(async (id: string) => {
    try {
       religionAPI.delete(id);
    } catch (error) {
      console.error('Failed to  religion');
    }
  }, []);

  return {
    handleAddReligion,
    handleEditReligion,
    handleDeleteReligion,
  };
};
