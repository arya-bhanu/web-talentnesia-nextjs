"use client"

import React, { useState, useEffect } from 'react';
import HistoriExamView from './HistoriExam.view';
import { ExamData } from './historiExam.type';

interface HistoriExamProps {
  historyExam: ExamData[];
}

const HistoriExam: React.FC<HistoriExamProps> = ({ historyExam }) => {
  const [itemsToShow, setItemsToShow] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof ExamData>('no');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleViewAll = () => {
    setItemsToShow(historyExam.length);
    setShowAll(true);
  };

  const handleHide = () => {
    setItemsToShow(5);
    setShowAll(false);
  };

  const handleSort = (column: keyof ExamData) => {
    const isAscending = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAscending ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const sortedData = [...historyExam].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const visibleData = sortedData.slice(0, showAll ? sortedData.length : itemsToShow);

  return (
    <div className="mt-8">
      <HistoriExamView 
        itemsToShow={itemsToShow}
        showAll={showAll}
        onViewAll={handleViewAll}
        onHide={handleHide}
        sortedData={visibleData}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        totalItems={sortedData.length}
      />
    </div>
  );
};

export default HistoriExam;
