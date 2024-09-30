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
import Image from 'next/image';
import { DataTableAccordionProps } from './dataTableAccordion.type';
import ArrowUp from '@/../public/icons/arrow-up.svg';
import Edit from '@/../public/icons/edit.svg';
import Trash from '@/../public/icons/trash.svg';
import clsx from 'clsx';

export function DataTableAccordionView<T>({
  data,
  columns,
  sorting = [],
  initialColumnOrder,
  filter: { Filter, setFilter },
  accordionProps,
  handleEdit,
  handleDelete,
}: DataTableAccordionProps<T> & {
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}) {
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
    initialColumnOrder || [],
  );
  const [pageSize, setPageSize] = React.useState(5);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [Sorting, setSorting] = React.useState<SortingState>(sorting);
  const [activeAccordion, setActiveAccordion] = React.useState(-1);

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
          <tbody>
            {data && data.length > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <tr key={row.id}>
                  <td colSpan={table.getAllColumns().length}>
                    <div className="py-1 flex items-start">
                      <div className="flex-grow border border-gray-200 rounded-md mb-2 mr-4">
                        <div className="p-4">
                          <div
                            onClick={() => {
                              setActiveAccordion(index === activeAccordion ? -1 : index);
                            }}
                            role="button"
                            aria-pressed={false}
                            className="flex items-center justify-between w-full cursor-pointer"
                          >
                            <h2 className="font-lato text-[14px] font-semibold">{accordionProps.question}</h2>
                            <span
                              className={clsx(
                                'transition-all',
                                index === activeAccordion ? 'rotate-0' : 'rotate-180',
                              )}
                            >
                              <ArrowUp />
                            </span>
                          </div>
                        </div>
                        <div
                          className={clsx(
                            'p-4',
                            index === activeAccordion ? 'block' : 'hidden',
                          )}
                        >
                          <p className="text-sm font-lato text-[14px] text-[#667085]">{accordionProps.answer}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-3">
                        <button type="button" onClick={() => handleEdit(accordionProps.id)}>
                          <Edit />
                        </button>
                        <button type="button" onClick={() => handleDelete(accordionProps.id)}>
                          <Trash />
                        </button>
                      </div>
                    </div>
                  </td>
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
      <div className="flex flex-row justify-between items-center w-full mt-6">
        <div className="flex justify-center items-center gap-2 text-[#667085] text-xs sm:text-sm">
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
          <p className="hidden sm:block">data out of {data && data.length}</p>
        </div>
        <div className="flex gap-2 text-xs sm:text-sm items-center">
          <p className="text-[#667085]">Data per page</p>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8"
            >
              <Image
                src="/icons/btn-left.svg"
                alt="Previous"
                width={8}
                height={8}
                className="w-8 h-8"
              />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8"
            >
              <Image
                src="/icons/btn-right.svg"
                alt="Next"
                width={8}
                height={8}
                className="w-8 h-8"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
