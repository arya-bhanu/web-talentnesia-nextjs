import { useCallback } from 'react';
import { districtAPI } from '../api/cityApi';

export const useCityActions = () => {
  const handleAddCity = useCallback(async (name: string) => {
    try {
      districtAPI.add({name});
    } catch (error) {
      console.error('Failed to city');
    }
  }, []);

  const handleEditCity = useCallback(async (id: string, data: any) => {
    try {
      districtAPI.update(id, data);
    } catch (error) {
      console.error('Failed to city');
    }
  }, []);

  const handleDeleteCity = useCallback(async (id: string) => {
    try {
      districtAPI.delete(id);
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
