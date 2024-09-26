import { useCallback } from 'react';
import { certificateAPI } from '../api/certificateApi';
import { FormData } from '../add-certificate/addCertificate.type';

export const useCertificateActions = () => {
  const handleAddCertificate = useCallback(async (name: string, file: string) => {
    try {
      const result = await certificateAPI.add({ name, file });
      return result;
    } catch (error) {
      console.error('Failed to add certificate', error);
      throw error;
    }
  }, []);
  const handleEditCertificate = useCallback(async (id: string, data: {name: string, file: string, active?: number}) => {
    try {
      await certificateAPI.update(id, { name: data.name, file: data.file, active: data.active });
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
