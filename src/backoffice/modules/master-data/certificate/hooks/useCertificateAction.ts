import { useCallback } from 'react';
import { certificateAPI } from '../api/certificateApi';

export const useCertificateActions = () => {
  const handleAddCertificate = useCallback(async (name: string) => {
    try {
      await certificateAPI.add({name});
    } catch (error) {
      console.error('Failed to add certificate');
    }
  }, []);

  const handleEditCertificate = useCallback(async (id: string, data: any) => {
    try {
      await certificateAPI.update(id, data);
    } catch (error) {
      console.error('Failed to edit certificate');
    }
  }, []);

  const handleDeleteCertificate = useCallback(async (id: string) => {
    try {
      await certificateAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete certificate');
    }
  }, []);

  return {
    handleAddCertificate,
    handleEditCertificate,
    handleDeleteCertificate,
  };
};
