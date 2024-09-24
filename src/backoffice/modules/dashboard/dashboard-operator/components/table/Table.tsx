'use client';
import React, { useCallback, useState, useEffect, useRef } from 'react';
import TableView from './Table.view';
import { dashboardOperatorApi } from '../../api/dashboardOperatorApi';
import { DashboardProgressItem } from '../../dashboardOperator.type';

const Table = () => {
  const [data, setData] = useState<DashboardProgressItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const tableRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    const response = await dashboardOperatorApi.getDashboardProgress(currentPage, selectedType);
    if (response && response.data) {
      setData(response.data.items);
      setTotalPages(response.data.meta.lastPage);
    }
  }, [currentPage, selectedType]);

  useEffect(() => {
    fetchData().then(() => {
      setTimeout(() => {
        tableRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }, 0);
    });
  }, [fetchData]);

  const handleTypeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value;
    setSelectedType(newType);
    setCurrentPage(1);
  }, []);

  const handleItemsPerPageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((direction: 'prev' | 'next') => {
    setCurrentPage(prevPage => direction === 'next' ? prevPage + 1 : prevPage - 1);
  }, []);

  return (
    <TableView
      ref={tableRef}
      data={data}
      selectedType={selectedType}
      onTypeChange={handleTypeChange}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      onItemsPerPageChange={handleItemsPerPageChange}
      itemsPerPage={itemsPerPage}
    />
  );
};

export default Table;
