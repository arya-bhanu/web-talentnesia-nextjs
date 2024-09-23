import React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ITanstackTableViewProps } from './tanstackTable.type';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';
import SortArrow from '../../../../public/icons/sort-arrow.svg';
import SortArrowUp from '../../../../public/icons/sort-arrow-up.svg';

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
  totalData,
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
    <>
      <div className="p-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#FFFFFF] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4"
        />

        <div className="overflow-x-auto sm:rounded-lg mt-5">
          <table className="w-full relative z-0 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-md font-bold text-[#323232] bg-[#FFFFFF] border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      className={
                        header.column.id === 'action' ||
                        header.column.id === 'actions'
                          ? 'px-6 py-3 text-center'
                          : 'px-6 py-3'
                      }
                      onClick={() => handleSort(header.column.id)}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {sortBy === header.column.id ? (
                          sortOrder === 'asc' ? (
                            <SortArrowUp className="ml-1" />
                          ) : (
                            <SortArrowUp className="ml-1 transform rotate-180" />
                          )
                        ) : (
                          <SortArrow className="ml-1" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="bg-[#FFFFFF] border-b">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={
                        cell.column.id === 'action' ||
                        cell.column.id === 'actions'
                          ? 'px-6 py-4 text-center items-center'
                          : 'px-6 py-4'
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center w-full mt-5">
          <div className="flex items-center gap-2 text-[#667085]">
            <label htmlFor="pageSize" className="block">
              Showing
            </label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-[#FFFFFF] border max-w-[5rem] border-gray-300 text-[#667085] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <p className="w-full min-w-max">data out of {totalData}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[#667085]">Data per page</p>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`transition-opacity duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:opacity-80'}`}
              >
                <IconLeft />
              </button>
              {/* <span className="text-[#667085]">
                Page {currentPage} of {totalPages}
              </span> */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`transition-opacity duration-300 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:opacity-80'}`}
              >
                <IconRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TanstackTableView;
