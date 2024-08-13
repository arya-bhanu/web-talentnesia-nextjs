'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender,
  createColumnHelper,
  ColumnOrderState
} from '@tanstack/react-table';
import Search from '../../../../public/icons/iconamoon_search-bold.svg';
import Add from '../../../../public/icons/add.svg';
import IconLeft from '../../../../public/icons/btn-left.svg';
import IconRight from '../../../../public/icons/btn-right.svg';
import { IAcademicLevelView } from './academicLevel.type';
import PopoverAcademic from '@/backoffice/components/modal-academic';
import ModalAddAcademic from '@/backoffice/components/modal-add-academic/ModalAddAcademic';
import { academicLevelAPI } from './api/academicLevelApi';

const columnHelper = createColumnHelper<any>();

const AcademicLevelView: React.FC<IAcademicLevelView> = ({
  initialData,
  handleActionButtonRow,
  setOpenPopoverIndex,
  openPopoverIndex,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [data, setData] = useState(initialData || []);
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(['code', 'name', 'action']);

  const fetchData = useCallback(async () => {
    try {
      const updatedData = await academicLevelAPI.fetch();
      setData(updatedData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = useMemo(() => [
    columnHelper.accessor('code', {
      header: 'Code',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Level Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('id', {
      id: 'action',
      header: 'Action',
      cell: info => (
        <PopoverAcademic
          handleActionButtonRow={handleActionButtonRow}
          id={info.getValue()}
          index={info.row.index}
          openPopoverIndex={openPopoverIndex}
          setOpenPopoverIndex={setOpenPopoverIndex}
          onUpdate={fetchData}
          onDelete={fetchData}
        />
      ),
    }),
  ], [handleActionButtonRow, openPopoverIndex, setOpenPopoverIndex, fetchData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
  });

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const handleAddAcademicLevel = async (code: string, name: string) => {
    try {
      await academicLevelAPI.add({ code, name });
      fetchData();  // Refresh data after adding
      setIsPopupOpen(false);
    } catch (error) {
      console.error('Failed to add academic level', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <form className="flex items-center max-w-xs w-full">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search />
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search ..."
              required
            />
          </div>
        </form>
        <button
          onClick={openPopup}
          className="flex items-center focus:outline-none text-white bg-[#FFC862] hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          <Add />
          <span className="text-black"> Add Academic Level</span>
        </button>
        <ModalAddAcademic
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleAddAcademicLevel}
        />
      </div>
      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto shadow-md sm:rounded-lg mt-5">
        {data.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} scope="col" className="px-6 py-3">
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div className="flex justify-between items-center w-full mt-5">
        <div className="flex items-center gap-2 text-[#667085]">
          <label htmlFor="pagination" className="block">
            Showing
          </label>
          <select
            id="pagination"
            className="bg-gray-50 border max-w-[5rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultChecked value={5}>
              5
            </option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <p className="w-full min-w-max">data out of {data.length}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#667085]">Data per page</p>
          <div className="flex items-center gap-2">
            <button>
              <IconLeft />
            </button>
            <button>
              <IconRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicLevelView;