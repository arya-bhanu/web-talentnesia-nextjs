'use client';
import React, { useState } from 'react';
import ManageModulView from './ManageModul.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchModules } from './api/manageModelApi';

const ManageModul = () => {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['modules'], queryFn: fetchModules });
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);

  const handleActionButtonRow = async (
    id: string,
    action: 'delete' | 'edit',
  ) => {
    switch (action) {
      case 'delete':
        break;
      case 'edit':
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
      data={query.data}
      handleActionButtonRow={handleActionButtonRow}
    />
  );
};

export default ManageModul;
