'use client';
import React, { useCallback, useState, useEffect } from 'react';
import TableView from './Table.view';
import { dashboardMentorApi } from '../../api/dashboardMentorApi';
import { DashboardProgressItem } from '../../dashboardMentor.type';

const Table = () => {
  const [data, setData] = useState<DashboardProgressItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [Filter, setFilter] = useState('');

  const fetchData = useCallback(async () => {
    const response = await dashboardMentorApi.getDashboardProgress();
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
