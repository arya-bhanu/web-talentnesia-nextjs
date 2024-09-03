'use client';

import React, { useState } from 'react';
import TableProgramView from './TableProgram.view';
import { useQuery } from '@tanstack/react-query';
import { fetchReportPrograms } from '../../api/reportApi';
import Loading from '@/components/loading';

const TableProgram = () => {
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { data: programs, isLoading: isLoadingPrograms } = useQuery({
    queryKey: ['report', 'program'],
    queryFn: fetchReportPrograms,
  });

  return (
    <Loading isLoading={isLoadingPrograms}>
      <TableProgramView
        data={programs?.data?.items}
        openPopoverIndex={openPopoverIndex}
        setOpenPopoverIndex={setOpenPopoverIndex}
        Filter={Filter}
        setFilter={setFilter}
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
      />
    </Loading>
  );
};

export default TableProgram;
