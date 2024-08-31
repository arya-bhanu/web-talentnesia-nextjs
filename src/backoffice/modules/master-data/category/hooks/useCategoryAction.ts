import { useCallback } from 'react';
import { categoryAPI } from '../api/categoryApi';

export const useCategoryActions = () => {
  const handleAddCategory = useCallback(async (name: string) => {
    try {
      await categoryAPI.add({
        name,
        code: '',
        status: 1,
      });
    } catch (error) {
      console.error('Failed to add category');
    }
  }, []);
  


  const handleEditCategory = useCallback(async (id: string, data: any) => {
    try {
      await categoryAPI.update(id, data);
    } catch (error) {
      console.error('Failed to edit category');
    }
  }, []);

  const handleDeleteCategory = useCallback(async (id: string) => {
    try {
      await categoryAPI.delete(id);
    } catch (error) {
      console.error('Failed to delete category');
    }
  }, []);

  return {
    handleAddCategory,
    handleEditCategory,
    handleDeleteCategory,
  };
};
