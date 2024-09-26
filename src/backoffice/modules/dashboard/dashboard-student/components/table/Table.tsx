'use client';
import React, { useCallback, useState, useMemo } from 'react';
import TableView from './Table.view';
import { dummyData } from './table.data';
import { APIResponseManageModul } from './table.type';

const Table = () => {
  const [data, setData] = useState<APIResponseManageModul[]>(dummyData);
  const [selectedType, setSelectedType] = useState<string>('');
  const [Filter, setFilter] = useState('');

  const handleTypeChange = useCallback((type: string) => {
    setSelectedType(type);
    if (type === '') {
      setData(dummyData);
    } else {
      setData(dummyData.filter(item => item.type === type));
    }
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.class.toLowerCase().includes(Filter.toLowerCase()) ||
      item.type.toLowerCase().includes(Filter.toLowerCase())
    );
  }, [data, Filter]);

  return (
    <TableView
      data={filteredData}
      selectedType={selectedType}
      onTypeChange={handleTypeChange}
      Filter={Filter}
      setFilter={setFilter}
    />
  );
};

export default Table;
