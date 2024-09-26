import { useCallback } from 'react';
import { partnerAPI } from '../api/partnerApi';

export  interface PartnerData {
  name: string, 
  address: string, 
  logo: string, 
  description: string
}
export const usePartnerActions = () => {
  const handleAddPartner = useCallback(async (name: string) => {
    try {
      await partnerAPI.add({
        name,
        address: '',
        logo: '',
        description: ''
      });
    } catch (error) {
      console.error('Failed to add partner');
    }
  }, []);

  const handleEditPartner = useCallback(async (id: string, data: PartnerData) => {
    try {
      await partnerAPI.update(id, data);
    } catch (error) {
      console.error('Failed to edit partner');
    }
  }, []);

  const handleDeletePartner = useCallback(async (id: string) => {
    try {
      await partnerAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete partner');
    }
  }, []);

  return {
    handleAddPartner,
    handleEditPartner,
    handleDeletePartner,
  };
};
