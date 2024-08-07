'use client';
import React, { useState } from 'react';
import ManageModulView from './ManageModul.view';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteModule, fetchModules } from './api/manageModelApi';

const ManageModul = () => {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['modules'], queryFn: fetchModules });
  const { mutateAsync: deleteModuleAsync } = useMutation({
    mutationFn: deleteModule,
  });
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);
  
  const handleActionButtonRow = async (
    id: number,
    action: 'delete' | 'edit',
  ) => {
    switch (action) {
      case 'delete':
        await deleteModuleAsync(id);
        break;
      default:
        break;
    }
    queryClient.invalidateQueries({ queryKey: ['modules'] });
  };

  return (
    <ManageModulView
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      data={query.data?.data}
      handleActionButtonRow={handleActionButtonRow}
    />
  );
};

export default ManageModul;
