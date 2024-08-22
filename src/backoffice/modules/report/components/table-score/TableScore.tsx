'use client';

import React, { useState, useCallback } from 'react';
import TableScoreView from './TableScore.view';
import { TableScoreData } from './tableScore.data';

const TableScore = () => {
  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [Filter, setFilter] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const data = TableScoreData;

  const fetchData = useCallback(async () => {
    console.log("Data fetched");
  }, []);

  return (
    <TableScoreView
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

export default TableScore;
