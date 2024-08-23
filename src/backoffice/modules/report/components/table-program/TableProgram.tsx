'use client';

import React, { useState, useCallback } from 'react';
import TableProgramView from './TableProgram.view';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TableProgramData } from './tableProgram.data';

const TableProgram = () => {
  const queryClient = useQueryClient();
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const data = TableProgramData;

  const fetchData = useCallback(async () => {
    console.log("Data fetched");
  }, []);

  return (
    <TableProgramView
      data={data}
      openPopoverIndex={openPopoverIndex}
      setOpenPopoverIndex={setOpenPopoverIndex}
      Filter={Filter}
      setFilter={setFilter}
      isPopupOpen={isPopupOpen}
      setIsPopupOpen={setIsPopupOpen}
      fetchData={fetchData}
    />
  );
};

export default TableProgram;
