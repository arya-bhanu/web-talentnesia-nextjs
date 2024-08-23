import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useProgramIdAction = () => {
  const queryClient = useQueryClient();

  const handleEditProgram = useCallback(async (id: string, data: any) => {
    console.log('Editing program', id, data);
    await queryClient.invalidateQueries({ queryKey: ['programDetails', id] });
  }, [queryClient]);

  const handleDeleteProgram = useCallback(async (id: string) => {
    console.log('Deleting program', id);
    await queryClient.invalidateQueries({ queryKey: ['programDetails'] });
  }, [queryClient]);

  const handleAddStudent = useCallback(async (programId: string, studentData: any) => {
    console.log('Adding student to program', programId, studentData);
    await queryClient.invalidateQueries({ queryKey: ['programDetails', programId] });
  }, [queryClient]);

  return {
    handleEditProgram,
    handleDeleteProgram,
    handleAddStudent,
  };
};
