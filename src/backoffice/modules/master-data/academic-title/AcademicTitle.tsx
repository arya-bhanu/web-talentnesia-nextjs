'use client';

import React, { useState, useCallback } from 'react';
import AcademicTitleView from './AcademicTitle.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { academicTitleAPI } from './api/academicTitleApi';
import { useAcademicTitleActions } from './hooks/useAcademicTitleAction';

const AcademicTitle = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { handleAddAcademicTitle, handleEditAcademicTitle, handleDeleteAcademicTitle } = useAcademicTitleActions();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['academicTitle'],
    queryFn: async () => {
      const response = await academicTitleAPI.fetch();
      return response;
    },
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['academicTitle'] });
  }, [queryClient]);

  const handleActionButtonRow = useCallback(async (id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      await handleDeleteAcademicTitle(id); 
      fetchData();
    } else if (action === "edit" && rowData) {
      await handleEditAcademicTitle(id, rowData); 
      fetchData();
    }
  }, [fetchData, handleDeleteAcademicTitle, handleEditAcademicTitle]);

  const handleAdd = useCallback(async (name: string) => {
    await handleAddAcademicTitle(name); 
    fetchData();
    setIsPopupOpen(false);
  }, [fetchData, handleAddAcademicTitle]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <AcademicTitleView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      handleActionButtonRow={handleActionButtonRow}
      handleAddAcademicTitle={handleAdd}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default AcademicTitle;
