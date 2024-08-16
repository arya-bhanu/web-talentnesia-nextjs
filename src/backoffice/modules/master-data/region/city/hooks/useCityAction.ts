import { useCallback } from 'react';
import { cityAPI } from '../api/cityApi';

export const useCityActions = () => {
  const handleAddCity = useCallback(async (name: string) => {
    try {
      cityAPI.add({name});
    } catch (error) {
      console.error('Failed to city');
    }
  }, []);

  const handleEditCity = useCallback(async (id: string, data: any) => {
    try {
      cityAPI.update(id, data);
    } catch (error) {
      console.error('Failed to city');
    }
  }, []);

  const handleDeleteCity = useCallback(async (id: string) => {
    try {
      cityAPI.delete(id);
    } catch (error) {
      console.error('Failed to city');
    }
  }, []);

  return {
    handleAddCity,
    handleEditCity,
    handleDeleteCity,
  };
};
