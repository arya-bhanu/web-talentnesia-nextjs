'use client';

import React, { useState, useCallback } from 'react';
import AcademicTitleView from './AcademicTitle.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { academicTitleAPI } from './api/academicTitleApi';

const AcademicTitle = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['academicTitles'],
    queryFn: academicTitleAPI.fetch,
  });

  const handleActionButtonRow = useCallback((id: string, action: "delete" | "edit") => {
    // Logic to handle action button row
  }, []);

  const handleAddAcademicTitle = useCallback(async (code: string, name: string) => {
    try {
      await academicTitleAPI.add({ code, name });
      queryClient.invalidateQueries({ queryKey: ['academicTitles'] });
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Failed to add academic Title', error);
    }
  }, [queryClient]);

  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['academicTitles'] });
  }, [queryClient]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <AcademicTitleView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddAcademicTitle={handleAddAcademicTitle}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default AcademicTitle;
