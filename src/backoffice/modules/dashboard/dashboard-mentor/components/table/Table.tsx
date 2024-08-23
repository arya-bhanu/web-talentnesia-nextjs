'use client';
import { useCallback, useState } from 'react';
import TableView from './Table.view';
import { dummyData } from './table.data'; 
import { APIResponseManageModul } from './table.type';

const Table = () => {
  const [data, setData] = useState<APIResponseManageModul[]>(dummyData);
  const [selectedType, setSelectedType] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const handleTypeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    setCurrentPage(1); // Reset to the first page when filter changes
    if (selectedType === '') {
      setData(dummyData); 
    } else {
      setData(dummyData.filter(item => item.type === selectedType));
    }
  }, []);

  const handleItemsPerPageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page when items per page changes
  }, []);

  const handlePageChange = useCallback((direction: 'prev' | 'next') => {
    setCurrentPage(prevPage => direction === 'next' ? prevPage + 1 : prevPage - 1);
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <TableView
      data={paginatedData}
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
