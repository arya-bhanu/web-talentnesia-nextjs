import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnOrderState,
  SortingState,
  getSortedRowModel 
} from '@tanstack/react-table';
import IconLeft from '../../../../public/icons/btn-left.svg';
import IconRight from '../../../../public/icons/btn-right.svg';
import { TableProps } from './universalTable.type';

export function UniversalTableView<T>({ 
  data, 
  columns, 
  initialSorting = [], 
  initialColumnOrder,
  globalFilter,
  setGlobalFilter
}: TableProps<T>) {
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(initialColumnOrder || []);
  const [pageSize, setPageSize] = React.useState(5);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
      globalFilter,
      sorting,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onColumnOrderChange: setColumnOrder,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: (updater) => {
      const { pageIndex: newPageIndex, pageSize: newPageSize } =
        typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
      setPageIndex(newPageIndex);
      setPageSize(newPageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="overflow-x-auto overflow-y-auto shadow-sm sm:rounded-lg mt-5">
        {data.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-md font-bold text-[#323232] font-lato bg-[#FFFFFF] border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="bg-[#FFFFFF] border-b font-lato">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
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
        ) : (
          <p>No data Available</p>
        )}
      </div>
      <div className="flex justify-between items-center w-full mt-5">
        <div className="flex items-center gap-2 text-[#667085]">
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
            className="bg-[#FFFFFF] border max-w-[5rem] border-gray-300 text-[#667085] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
          >
            {[5, 10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          <p className="w-full min-w-max">
            data out of {data.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#667085]">Data per page</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconLeft />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
