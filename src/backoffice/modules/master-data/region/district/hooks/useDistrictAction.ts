import { useCallback } from 'react';
import { districtAPI } from '../api/districtApi';

export const useDistrictActions = () => {
  const handleAddDistrict = useCallback(async (name: string) => {
    try {
      await districtAPI.add(name);
    } catch (error) {
      console.error('Failed to add district');
    }
  }, []);

  const handleEditDistrict = useCallback(async (id: string, data: {name: string}) => {
    try {
      await districtAPI.update(id, data.name);
    } catch (error) {
      console.error('Failed to edit district');
    }
  }, []);

  const handleDeleteDistrict = useCallback(async (id: string) => {
    try {
      await districtAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete district');
    }
  }, []);

  return {
    handleAddDistrict,
    handleEditDistrict,
    handleDeleteDistrict,
  };
};
