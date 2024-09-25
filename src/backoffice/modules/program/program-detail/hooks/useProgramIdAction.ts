import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ProgramData } from '../[id].data';

export const useProgramIdAction = () => {
  const queryClient = useQueryClient();

  const handleEditProgram = useCallback(async (id: string, data: ProgramData) => {
    console.log('Editing program', id, data);
    await queryClient.invalidateQueries({ queryKey: ['programDetails', id] });
  }, [queryClient]);

  const handleDeleteProgram = useCallback(async (id: string) => {
    console.log('Deleting program', id);
    await queryClient.invalidateQueries({ queryKey: ['programDetails'] });
  }, [queryClient]);

  const handleAddStudent = useCallback(async (programId: string, studentData: ProgramData) => {
    console.log('Adding student to program', programId, studentData);
    await queryClient.invalidateQueries({ queryKey: ['programDetails', programId] });
  }, [queryClient]);

  return {
    handleEditProgram,
    handleDeleteProgram,
    handleAddStudent,
  };
};
