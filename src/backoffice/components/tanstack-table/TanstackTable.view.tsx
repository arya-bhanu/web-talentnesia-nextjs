import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ITanstackTableViewProps } from './tanstackTable.type';

/**
 * TanstackTableView component to display data in a table format
 * with support for search, sorting, and pagination.
 *
 * @template T - The data type displayed in the table.
 *
 * @param {Object} props - Properties for this component.
 * @param {T[]} props.data - The data to be displayed in the table.
 * @param {Column<T>[]} props.columns - Column definitions for the table.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalPages - Total number of pages.
 * @param {number} props.pageSize - Number of items displayed per page.
 * @param {number[]} props.pageSizeOptions - Options for items per page.
 * @param {string} props.searchTerm - The current search term.
 * @param {string} props.sortBy - The currently sorted column.
 * @param {'asc' | 'desc'} props.sortOrder - Sort order (asc or desc).
 * @param {(value: string) => void} props.setSearchTerm - Function to set the search term.
 * @param {(value: number) => void} props.setPageSize - Function to set the page size.
 * @param {(field: string) => void} props.handleSort - Function to handle column sorting.
 * @param {() => void} props.handlePreviousPage - Function to handle navigating to the previous page.
 * @param {() => void} props.handleNextPage - Function to handle navigating to the next page.
 */

const TanstackTableView = <T,>({
  data,
  columns,
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  searchTerm,
  sortBy,
  sortOrder,
  setSearchTerm,
  setPageSize,
  handleSort,
  handlePreviousPage,
  handleNextPage,
}: ITanstackTableViewProps<T>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-2">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4"
      />

      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  <div
                    onClick={() => {
                      handleSort(header.column.id);
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {sortBy === header.column.id &&
                      (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center gap-2">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div>
        Page {currentPage} of {totalPages}
      </div>

      <div className="mt-4">
        <label htmlFor="pageSize">Items per page: </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border p-2"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanstackTableView;
