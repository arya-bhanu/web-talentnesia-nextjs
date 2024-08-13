'use client';
import React, { useState } from 'react';
import AcademicLevelView from './AcademicLevel.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAcademicLevels } from './api/academyLevelApi';

const AcademicLevel = () => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['academicLevels'],
    queryFn: fetchAcademicLevels,
  });

  const [openPopoverIndex, setOpenPopoverIndex] = useState(-1);

  const handleActionButtonRow = async (
    id: number,
    action: 'delete' | 'edit',
  ) => {
    switch (action) {
      case 'delete':
        break;
      default:
        break;
    }
    queryClient.invalidateQueries({ queryKey: ['academicLevels'] });
  };

  return (
    <AcademicLevelView
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      data={query.data}
      handleActionButtonRow={handleActionButtonRow}
    />
  );
};

export default AcademicLevel;
