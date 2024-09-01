import React, { useState } from 'react';
import { AssignmentData } from './assignment.type';
import { assignmentData } from './assignment.data';
import AssignmentView from './Assignment.view';

const Assigement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [sortColumn, setSortColumn] = useState<keyof AssignmentData>('no');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedData = [...assignmentData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(assignmentData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSort = (column: keyof AssignmentData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <AssignmentView
      data={currentData}
      totalItems={assignmentData.length}
      totalPages={totalPages}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onNextPage={handleNextPage}
      onPrevPage={handlePrevPage}
      onItemsPerPageChange={handleItemsPerPageChange}
      onSort={handleSort}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
    />
  );
};

export default Assigement;
