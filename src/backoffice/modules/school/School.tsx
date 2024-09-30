'use client';

import React, { useState, useCallback } from 'react';
import SchoolView from './School.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SchoolAPI } from './api/schoolApi';
import { useSchoolActions } from './hooks/useSchoolAction';
import Loading from '@/components/loading';

const School = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleDeleteSchool } = useSchoolActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['school'],
    queryFn: async () => {
      const response = await SchoolAPI.fetch();
      return response;
    },
  });

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['school'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(
    async (id: string, action: 'delete' | 'edit', rowData?: string) => {
      if (action === 'delete') {
        await handleDeleteSchool(id);
        fetchData();
      } else if (action === 'edit' && rowData) {
        // await handleEditSchool(id, rowData);
        fetchData();
      }
    },
    [fetchData, handleDeleteSchool],
  );

  const handleAdd = useCallback(
    async (name: string) => {
      // await handleAddSchool(name);
      fetchData();
      setIsPopupOpen(false);
    },
    [fetchData],
  );

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Loading isLoading={isLoading}>
      <SchoolView
        data={data ?? []}
        openPopoverIndex={openPopoverIndex}
        setOpenPopoverIndex={setOpenPopoverIndex}
        handleActionButtonRow={handleActionButtonRow}
        handleAddSchool={handleAdd}
        Filter={Filter}
        setFilter={setFilter}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        fetchData={fetchData}
      />
    </Loading>
  );
};

export default School;
