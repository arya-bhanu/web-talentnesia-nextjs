import { useCallback } from 'react';
import { zipCodeAPI } from '../api/zipCodeApi';
import { APIResponseZipCode } from '../zipCode.type';

export const useZipCodeActions = () => {
  const handleAddZipCode = useCallback(async (name: string) => {
    try {
      zipCodeAPI.add({name});
    } catch (error) {
      console.error('Failed to add zip code');
    }
  }, []);

  const handleEditZipCode = useCallback(async (id: string, data: APIResponseZipCode) => {
    try {
      zipCodeAPI.update(id, data);
    } catch (error) {
      console.error('Failed to update zip code');
    }
  }, []);

  const handleDeleteZipCode = useCallback(async (id: string) => {
    try {
      zipCodeAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete zip code');
    }
  }, []);

  return {
    handleAddZipCode,
    handleEditZipCode,
    handleDeleteZipCode,
  };
};
