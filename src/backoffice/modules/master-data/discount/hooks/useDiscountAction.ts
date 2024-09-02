import { useCallback } from 'react';
import { discountAPI } from '../api/discountApi';

export const useDiscountActions = () => {
  const handleAddDiscount = useCallback(async (name: string) => {
    try {
      await discountAPI.add({
        name,
        code: '',
        active: 0,
        persentage: 0,
        startDate: '',
        endDate: ''
      });
    } catch (error) {
      console.error('Failed to add Discount');
    }
  }, []);

  const handleEditDiscount = useCallback(async (id: string, data: any) => {
    try {
      await discountAPI.update(id, data);
    } catch (error) {
      console.error('Failed to edit Discount');
    }
  }, []);

  const handleDeleteDiscount = useCallback(async (id: string) => {
    try {
      await discountAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete Discount');
    }
  }, []);

  return {
    handleAddDiscount,
    handleEditDiscount,
    handleDeleteDiscount,
  };
};
