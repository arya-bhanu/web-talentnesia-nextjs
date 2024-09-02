import React, { useState } from 'react';
import AttendanceView from './Attendance.view';
import { attendanceData } from './attendance.data';
import { AttendanceData } from './attendance.type';

const Attendance: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [sortColumn, setSortColumn] = useState<keyof AttendanceData>('no');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedData = [...attendanceData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(attendanceData.length / itemsPerPage);

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

  const handleSort = (column: keyof AttendanceData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <AttendanceView
      data={currentData}
      totalItems={attendanceData.length}
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

export default Attendance;
