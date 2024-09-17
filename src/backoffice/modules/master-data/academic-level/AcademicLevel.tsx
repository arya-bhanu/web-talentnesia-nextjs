'use client';

import React, { useState, useCallback, useEffect } from 'react';
import AcademicLevelView from './AcademicLevel.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { academicLevelAPI } from './api/academicLevelApi';
import { useAcademicLevelActions } from './hooks/useAcademicLevelAction';

const AcademicLevel = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    handleAddAcademicLevel,
    handleEditAcademicLevel,
    handleDeleteAcademicLevel,
  } = useAcademicLevelActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['academicLevel'],
    queryFn: async () => {
      const response = await academicLevelAPI.fetch();
      return response.data;
    },
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['academicLevel'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(
    async (id: string, action: 'delete' | 'edit', rowData?: any) => {
      if (action === 'delete') {
        await handleDeleteAcademicLevel(id);
        fetchData();
      } else if (action === 'edit' && rowData) {
        await handleEditAcademicLevel(id, rowData);
        fetchData();
      }
    },
    [fetchData, handleDeleteAcademicLevel, handleEditAcademicLevel],
  );

  const handleAdd = useCallback(
    async (name: string) => {
      await handleAddAcademicLevel(name);
      fetchData();
      setIsPopupOpen(false);
    },
    [fetchData, handleAddAcademicLevel],
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <AcademicLevelView
      data={data?.items || []}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddAcademicLevel={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default AcademicLevel;
