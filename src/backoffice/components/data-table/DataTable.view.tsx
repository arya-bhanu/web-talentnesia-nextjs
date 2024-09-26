import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnOrderState,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import IconLeft from '@/../public/icons/btn-left.svg';
import IconRight from '@/../public/icons/btn-right.svg';
import { DataTableProps } from './DataTable.type';
import Image from 'next/image';

export function DataTableView<T>({
  data,
  columns,
  sorting = [],
  initialColumnOrder,
  filter: { Filter, setFilter },
}: DataTableProps<T>) {
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    initialColumnOrder || [],
  );
  const [pageSize, setPageSize] = React.useState(5);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [Sorting, setSorting] = React.useState<SortingState>(sorting);

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      columnOrder,
      globalFilter: Filter,
      sorting: Sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: (updater) => {
      const { pageIndex: newPageIndex, pageSize: newPageSize } =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPageIndex);
      setPageSize(newPageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="overflow-x-auto sm:rounded-lg mt-5">
        <table className="w-full relative z-0 text-xs sm:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs sm:text-md font-bold text-[#323232] bg-[#FFFFFF] border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    scope="col"
                    className={
                      header.column.id === 'action'
                        ? 'px-6 py-3 text-center'
                        : 'px-6 py-3'
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="bg-[#FFFFFF] border-b">
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={cell.id}
                      className={
                        cell.column.id === 'action'
                          ? 'px-6 py-4 text-center items-center '
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
              ))
            ) : (
              <tr className="bg-[#FFFFFF] border-b">
                <td
                  colSpan={table.getAllColumns().length}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-5 space-y-4 sm:space-y-0">
        <div className="flex justify-between w-full sm:w-auto items-center gap-2 text-[#667085] text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <label htmlFor="pagination" className="block">
              Showing
            </label>
            <select
              id="pagination"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageIndex(0);
              }}
              className="bg-[#FFFFFF] border max-w-[5rem] border-gray-300 text-[#667085] text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            >
              {[5, 10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <p className="w-full sm:w-auto">data out of {data && data.length}</p>
        </div>
        <div className="flex justify-between w-full sm:w-auto items-center gap-2 text-xs sm:text-sm">
          <p className="text-[#667085]">Data per page</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Image
                src="/icons/btn-left.svg"
                alt="Previous"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-8 sm:h-8"
              />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <Image
                src="/icons/btn-right.svg"
                alt="Next"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-8 sm:h-8"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
