'use client';
import React, { useState } from 'react';
import ManageModulView from './ManageModul.view';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteModule, fetchModules } from './api/manageModelApi';
import { useStatusModalStore } from '@/lib/store';

const ManageModul = () => {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['modules'], queryFn: fetchModules });
  const { mutateAsync: deleteModuleAsync } = useMutation({
    mutationFn: deleteModule,
  });
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  const { openModal } = useStatusModalStore();

  const handleActionButtonRow = async (
    id: string,
    action: 'delete' | 'edit',
  ) => {
    try {
      switch (action) {
        case 'delete':
          await deleteModuleAsync(id);
          break;
        default:
          break;
      }
      openModal({ status: 'success', action: 'delete' });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    } catch (err) {
      console.error(err);
      openModal({ status: 'error' });
    }
  };
  return (
    <ManageModulView
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      data={query.data?.data?.items}
      handleActionButtonRow={handleActionButtonRow}
      isLoading={query.isLoading}
    />
  );
};

export default ManageModul;
