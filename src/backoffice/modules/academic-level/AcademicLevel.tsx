'use client';

import React, { useState, useCallback } from 'react';
import AcademicLevelView from './AcademicLevel.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { academicLevelAPI } from './api/academicLevelApi';

const AcademicLevel = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['academicLevels'],
    queryFn: academicLevelAPI.fetch,
  });

  const handleActionButtonRow = useCallback((id: string, action: "delete" | "edit") => {
    // Logic to handle action button row
  }, []);

  const handleAddAcademicLevel = useCallback(async (code: string, name: string) => {
    try {
      await academicLevelAPI.add({ code, name });
      queryClient.invalidateQueries({ queryKey: ['academicLevels'] });
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Failed to add academic level', error);
    }
  }, [queryClient]);

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['academicLevels'] });
  }, [queryClient]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <AcademicLevelView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddAcademicLevel={handleAddAcademicLevel}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default AcademicLevel;
