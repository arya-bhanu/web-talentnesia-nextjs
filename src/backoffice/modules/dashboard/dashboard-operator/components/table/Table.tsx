'use client';
import React, { useCallback, useState, useEffect } from 'react';
import TableView from './Table.view';
import { dashboardOperatorApi } from '../../api/dashboardOperatorApi';
import { DashboardProgressItem } from '../../dashboardOperator.type';

const Table = () => {
  const [data, setData] = useState<DashboardProgressItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [Filter, setFilter] = useState('');

  const fetchData = useCallback(async () => {
    const response = await dashboardOperatorApi.getDashboardProgress();
    if (response && response.data) {
      setData(response.data.items);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTypeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  }, []);

  return (
    <TableView
      data={data}
      selectedType={selectedType}
      onTypeChange={handleTypeChange}
      Filter={Filter}
      setFilter={setFilter}
    />
  );
};

export default Table;
