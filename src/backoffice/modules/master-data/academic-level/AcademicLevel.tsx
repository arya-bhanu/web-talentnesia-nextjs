'use client';

import React, { useState, useCallback } from 'react';
import AcademicLevelView from './AcademicLevel.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { academicLevelAPI } from './api/academicLevelApi';

const AcademicLevel = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['academicLevels'],
    queryFn: academicLevelAPI.fetch,
  });
  
  const fetchData = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['academicLevels'] });
  }, [queryClient]);
  
  const handleActionButtonRow = useCallback((id: string, action: "delete" | "edit", rowData?: any) => {
    if (action === "delete") {
      academicLevelAPI.delete(id).then(() => {
        fetchData();
      }).catch(error => {
        console.error('Failed to delete academic level', error);
      });
    } else if (action === "edit") {
      academicLevelAPI.update(id, rowData).then(() => {
        fetchData();
      }).catch(error => {
        console.error('Failed to update academic level', error);
      });
    }
  }, [fetchData]);
  

  const handleAddAcademicLevel = useCallback(async (code: string, name: string) => {
    try {
      await academicLevelAPI.add({ code, name });
      queryClient.invalidateQueries({ queryKey: ['academicLevels'] });
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Failed to add academic level', error);
    }
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
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default AcademicLevel;
