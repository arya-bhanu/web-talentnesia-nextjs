'use client';
import React, { useEffect, useRef, useState } from 'react';
import ManageModulView from './ManageModul.view';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteModule, fetchModules } from './api/manageModelApi';

const ManageModul = () => {
  const queryClient = useQueryClient();
  const [activeActionPopup, setActivePopup] = useState(-1);
  const query = useQuery({ queryKey: ['modules'], queryFn: fetchModules });
  const { mutateAsync: deleteModuleAsync } = useMutation({
    mutationFn: deleteModule,
  });
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
    setActivePopup(-1);
  };
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      e.preventDefault();
      if (e.target) {
        const isOutside = !(e.target as HTMLElement).closest('.popup-action');

        if (isOutside) {
          setActivePopup(-1);
        }
      }
    };
    document.body.addEventListener('click', listener);
    return () => {
      document.body.removeEventListener('click', listener);
    };
  }, []);
  return (
    <ManageModulView
      data={query.data?.data}
      activeActionPopup={activeActionPopup}
      handleActionButtonRow={handleActionButtonRow}
      setActivePopup={setActivePopup}
    />
  );
};

export default ManageModul;
