'use client';
import React, { useState } from 'react';
import ManageModulView from './ManageModul.view';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteModul, fetchModules, startTesting } from './api/manageModelApi';

const ManageModul = () => {
  const queryClient = useQueryClient();
  const [intervalActive, setIntervalActive] = useState(false);
  const query = useQuery({
    queryKey: ['modules'],
    queryFn: fetchModules,
    refetchInterval: intervalActive ? 1500 : undefined,
  });
  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);

  const { mutateAsync: deleteModulAsync } = useMutation({
    mutationKey: ['delete', 'modul'],
    mutationFn: deleteModul,
  });

  const { mutateAsync: startTestingFetch } = useMutation({
    mutationFn: startTesting,
    mutationKey: ['test'],
  });

  const handleFetchData = async () => {
    setIntervalActive(true);
    const response = await startTestingFetch();
    console.log(response);
    setIntervalActive(false);
  };

  const handleActionButtonRow = async (
    id: string,
    action: 'delete' | 'edit',
  ) => {
    switch (action) {
      case 'delete':
        await deleteModulAsync(Number(id));
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
      handleFetchData={handleFetchData}
    />
  );
};

export default ManageModul;
