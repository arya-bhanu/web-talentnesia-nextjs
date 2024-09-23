'use client';

import React, { useEffect, useState } from 'react';
import { ITanstackTable } from './tanstackTable.type';
import TanstackTableView from './TanstackTable.view';
import { fetchAxios } from '@/lib/fetchAxios';

/**
 * TanstackTable component to display data in a table format with support for
 * search, sorting, and pagination.
 *
 * @template T - The data type displayed in the table.
 *
 * @param {Object} props - Properties for this component.
 * @param {string} props.apiUrl - The API URL to fetch table data.
 * @param {Column<T>[]} props.columns - Column definitions for the table.
 * @param {number[]} [props.pageSizeOptions] - Options for the number of items displayed per page (default: [10, 20, 30, 40, 50]).
 */

const TanstackTable = <T,>({
  apiUrl,
  columns,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: ITanstackTable<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAxios({
          url: `${apiUrl}?page=${currentPage}&perPage=${pageSize}&search=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
          method: 'GET',
        });

        const paginatedData = response.data;
        setData(paginatedData.items);
        setTotalPages(paginatedData.meta.lastPage);
        setTotalData(paginatedData.meta.total);
        setCurrentPage(paginatedData.meta.currentPage);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, searchTerm, pageSize, sortBy, sortOrder]);

  // Sorting handler
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <TanstackTableView<T>
      data={data}
      columns={columns}
      currentPage={currentPage}
      totalPages={totalPages}
      totalData={totalData}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      searchTerm={searchTerm}
      sortBy={sortBy}
      sortOrder={sortOrder}
      setSearchTerm={setSearchTerm}
      setPageSize={setPageSize}
      handleSort={handleSort}
      handlePreviousPage={handlePreviousPage}
      handleNextPage={handleNextPage}
    />
  );
};

export default TanstackTable;
