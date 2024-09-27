import { useCallback } from 'react';
import { provinceAPI } from '../api/provinceApi';

export const useProvinceActions = () => {
  const handleAddProvince = useCallback(async (name: string) => {
    try {
      provinceAPI.add(name);
    } catch (error) {
      console.error('Failed to add province');
    }
  }, []);

  const handleEditProvince = useCallback(async (id: string, data: any) => {
    try {
      provinceAPI.update(id, data);
    } catch (error) {
      console.error('Failed to update province');
    }
  }, []);

  const handleDeleteProvince = useCallback(async (id: string) => {
    try {
      provinceAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete province');
    }
  }, []);

  return {
    handleAddProvince,
    handleEditProvince,
    handleDeleteProvince,
  };
};
