'use client';
import { useCallback, useState, useEffect } from 'react';
import TableView from './Table.view';
import { dashboardMentorApi } from '../../api/dashboardMentorApi';
import { DashboardProgressItem } from '../../dashboardMentor.type';

const Table = () => {
  const [data, setData] = useState<DashboardProgressItem[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchData = useCallback(async () => {
    const response = await dashboardMentorApi.getDashboardProgress(currentPage, selectedType);
    if (response && response.data) {
      setData(response.data.items);
      setTotalPages(response.data.meta.lastPage);
    }
  }, [currentPage, selectedType]);

  useEffect(() => {
    fetchData();
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
