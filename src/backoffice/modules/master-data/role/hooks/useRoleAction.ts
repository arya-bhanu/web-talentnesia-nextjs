import { useCallback } from 'react';
import { roleAPI } from '../api/roleApi';
import { APIResponseRole } from '../role.type';

export const useRoleActions = () => {
  const handleAddRole = useCallback(async (name: string) => {
    try {
       roleAPI.add({name});
    } catch (error) {
      console.error('Failed to Add Role');
    }
  }, []);

  const handleEditRole = useCallback(async (id: string, data: APIResponseRole) => {
    try {
       roleAPI.update(id, data);
    } catch (error) {
      console.error('Failed to Update Role');
    }
  }, []);

  const handleDeleteRole = useCallback(async (id: string) => {
    try {
       roleAPI.delete(id);
    } catch (error) {
      console.error('Failed to Delete Role');
    }
  }, []);

  return {
    handleAddRole,
    handleEditRole,
    handleDeleteRole,
  };
};
