import { useCallback } from 'react';
import { subDistrictAPI } from '../api/subDistrictApi';

export const useSubDistrictActions = () => {
  const handleAddSubDistrict = useCallback(async (name: string) => {
    try {
      subDistrictAPI.add(name);
    } catch (error) {
      console.error('Failed to sub district');
    }
  }, []);

  const handleEditSubDistrict = useCallback(async (id: string, data: any) => {
    try {
      subDistrictAPI.update(id, data);
    } catch (error) {
      console.error('Failed to sub district');
    }
  }, []);

  const handleDeleteSubDistrict = useCallback(async (id: string) => {
    try {
      subDistrictAPI.delete(id);
    } catch (error) {
      console.error('Failed to sub district');
    }
  }, []);

  return {
    handleAddSubDistrict,
    handleEditSubDistrict,
    handleDeleteSubDistrict,
  };
};
