'use client';

import React, { useState } from 'react';
import AcademicLevelView from './AcademicLevel.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { academicLevelAPI } from './api/academicLevelApi';

const AcademicLevel = () => {
  const queryClient = useQueryClient();
  
  // Fetching data using useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['academicLevels'],
    queryFn: academicLevelAPI.fetch,
  });

  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  
  const handleActionButtonRow = (id: string, action: "delete" | "edit") => {
    // Implement action logic here
  };

  const handleAddAcademicLevel = async (code: string, name: string) => {
    try {
      await academicLevelAPI.add({ code, name });
      queryClient.invalidateQueries({ queryKey: ['academicLevels'] }); // Refetch data after adding
    } catch (error) {
      console.error('Failed to add academic level', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (isError) {
    return <div>Error: {error.message}</div>; // Handle error state
  }

  return (
    <AcademicLevelView
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      data={data} // Passing data to the view component
      handleActionButtonRow={handleActionButtonRow}
      handleAddAcademicLevel={handleAddAcademicLevel}
    />
  );
};

export default AcademicLevel;
